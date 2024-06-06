interface History {
	userAgent: string | null;
	ip: string | null;
	geo: string | null;
	timestamp: Date;
}

interface HistoryMetadata extends Omit<History, 'timestamp'> {
	timestamp: string;
}

export function createHistoryService(platform?: App.Platform) {
	if (!platform) {
		throw new Error('Platform is not specified!');
	}

	const store = platform.env.HISTORY;

	// As we need to get total clicks we should get all history at once,
	// but we  could optimise this by creating another KV(COUNTER) and use DurableObject to safely
	// mutate COUNTER (DurableObjects included in paid plan)
	async function getAllHistory(prefix: string) {
		const history: Array<History> = [];

		async function getListRecur(cursor?: string) {
			const result = await store.list<HistoryMetadata>({ cursor, prefix });

			result.keys.forEach(({ metadata }) => {
				if (!metadata) return;

				const { timestamp, ...rest } = metadata;

				history.push({
					...rest,
					timestamp: new Date(timestamp)
				});
			});

			if (!result.list_complete) {
				await getListRecur(result.cursor);
			}
		}

		await getListRecur();

		history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

		return history;
	}

	async function createHistoryItem(prefix: string, metadata: HistoryMetadata) {
		const hash = crypto.randomUUID();
		const key = `${prefix}:log:${hash}`;

		await store.put(key, '', { metadata });
	}

	return {
		createHistoryItem,
		getAllHistory
	};
}
