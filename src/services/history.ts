import { KV_NAMESPACE } from '../constants';

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

	const store = platform.env[KV_NAMESPACE.HISTORY];

	// As we need to get total clicks we should get all history at once,
	// but we  could optimise this by creating another KV(COUNTER) and use DurableObject to safely
	// mutate COUNTER
	async function getAllHistory(prefix: string) {
		const history: Array<History> = [];

		async function getListRecur(cursor?: string) {
			const result = await store.list<HistoryMetadata>({ cursor, prefix });

			const data = result.keys
				.map(({ metadata }) => metadata)
				.filter((metadata): metadata is HistoryMetadata => metadata !== undefined);

			data.forEach(({ timestamp, ...rest }) => {
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
