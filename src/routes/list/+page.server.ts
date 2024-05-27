import { createLinkService } from '../../services/links';

export async function load({ platform, url }) {
	const { getLinkLists } = createLinkService(platform);

	const linkList = await getLinkLists();

	return {
		list: linkList.map((link) => ({
			url: link.url,
			shortUrl: `${url.origin}/${link.shortUrl}`,
			createdAt: link.createdAt.toLocaleString()
		}))
	};
}
