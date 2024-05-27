import { createLinkService } from '../../services/links';

export async function load({ platform, url, setHeaders }) {
	const { getLinkLists } = createLinkService(platform);

	const linkList = await getLinkLists();

	setHeaders({
		'cache-control': 'no-store'
	});

	return {
		list: linkList.map((link) => ({
			...link,
			shortUrl: `${url.origin}/${link.shortUrl}`
		}))
	};
}
