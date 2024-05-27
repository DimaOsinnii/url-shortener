import { redirect } from '@sveltejs/kit';
import { createHistoryService } from '../../services/history';
import { createLinkService } from '../../services/links';

export async function GET({ params, platform, request }) {
	const { shortUrl } = params;
	const { getLink } = createLinkService(platform);

	const targetUrl = await getLink(shortUrl);

	if (!targetUrl) {
		return new Response('Not Found', { status: 404 });
	}

	const userAgent = request.headers.get('user-agent');
	const ip = request.headers.get('cf-connecting-ip');
	const geo = request.headers.get('cf-ipcountry');

	const { createHistoryItem } = createHistoryService(platform);

	await createHistoryItem(shortUrl, { userAgent, ip, geo, timestamp: new Date().toISOString() });

	throw redirect(302, targetUrl);
}
