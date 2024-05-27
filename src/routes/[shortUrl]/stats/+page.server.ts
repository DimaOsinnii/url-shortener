import { createHistoryService } from '../../../services/history';

export async function load({ params, platform, url }) {
	const { getAllHistory } = createHistoryService(platform);

	const { shortUrl } = params;

	const history = await getAllHistory(shortUrl);

	return {
		list: history.map(({ timestamp, ...rest }) => ({
			timestamp: new Date(timestamp).toLocaleString(),
			...rest
		})),
		shortUrl: `${url.origin}/${shortUrl}`
	};
}
