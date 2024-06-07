import { createLinkService } from '$lib/services/links';

export async function load({ platform, url }) {
	const { getLinkLists } = createLinkService(platform);

	const linkList = await getLinkLists();

	return {
		list: linkList.map((link) => ({
			...link,
			shortUrl: `${url.origin}/${link.shortUrl}`
		}))
	};
}
