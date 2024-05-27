import { createHistoryService } from '../../../services/history';

export async function load({ params, platform, url, setHeaders }) {
	const { getAllHistory } = createHistoryService(platform);

	const { shortUrl } = params;

	const list = await getAllHistory(shortUrl);

	setHeaders({
		'cache-control': 'no-store'
	});

	return {
		list,
		shortUrl: `${url.origin}/${shortUrl}`
	};
}
