// place files you want to import through the `$lib` alias in this folder.

//TODO: make more stronger validation, if its required from domain logic
export function isValidUrl(url: string) {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}

export function isValidShortUrl(shortUrl: string) {
	const regex = /^[a-zA-Z0-9-]+$/;
	return regex.test(shortUrl);
}
