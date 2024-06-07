import { createHistoryService } from '$lib/services/history';

export async function load({ params, platform, url }) {
	const { getAllHistory } = createHistoryService(platform);

	const { shortUrl } = params;

	const list = await getAllHistory(shortUrl);

	return {
		list,
		shortUrl: `${url.origin}/${shortUrl}`
	};
}
