import { CreateUrlError } from '$lib/errors';

interface LinkMetadata {
	url: string;
	createdAt: string;
}

export function createLinkService(platform?: App.Platform) {
	if (!platform) {
		throw new Error('Platform is not specified!');
	}

	const store = platform.env.LINKS;

	async function getLink(url: string) {
		const { metadata } = await store.getWithMetadata<LinkMetadata>(url);

		return metadata?.url;
	}

	async function createLink(shortUrl: string, longUrl: string) {
		//this is bad solution and might cause link overriding
		const url = await getLink(shortUrl);

		if (url) {
			throw new CreateUrlError('shortUrl', 'Short URL already exists');
		}

		await store.put(shortUrl, '', {
			metadata: {
				url: longUrl,
				createdAt: new Date().toISOString()
			}
		});
	}

	// TODO: duplicated from getAllHistory need to make generic helper
	async function getLinkLists() {
		const linkList: Array<{ url: string; createdAt: Date; shortUrl: string }> = [];

		async function getListRecur(cursor?: string) {
			const result = await store.list<LinkMetadata>({ cursor });

			result.keys.forEach(({ metadata, name }) => {
				if (!metadata) return;

				const { createdAt, url } = metadata;

				linkList.push({
					url,
					shortUrl: name,
					createdAt: new Date(createdAt)
				});
			});

			if (!result.list_complete) {
				await getListRecur(result.cursor);
			}
		}

		await getListRecur();

		linkList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return linkList;
	}

	return {
		getLink,
		createLink,
		getLinkLists
	};
}
