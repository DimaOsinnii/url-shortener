import { CreateUrlError } from '$lib/errors';

const allowedProtocols = ['http:', 'https:'];
const shortUrlRegexp = /^[a-zA-Z0-9-]+$/;

export function validateCreateUrlFormData(formData: FormData) {
	const url = formData.get('url');
	const shortUrl = formData.get('shortUrl');

	if (typeof url !== 'string') {
		throw new CreateUrlError('url', 'URL must be a string');
	}

	if (typeof shortUrl !== 'string') {
		throw new CreateUrlError('shortUrl', 'Short URL must be a string');
	}

	let parsedUrl: URL;

	try {
		parsedUrl = new URL(url);
	} catch (_) {
		throw new CreateUrlError('url', 'Invalid URL');
	}

	if (!allowedProtocols.includes(parsedUrl.protocol)) {
		throw new CreateUrlError('url', 'Only HTTP and HTTPS URLs are allowed');
	}

	if (!shortUrlRegexp.test(shortUrl)) {
		throw new CreateUrlError('shortUrl', 'Short URL can only contain letters, digits, and dashes');
	}

	return { url, shortUrl };
}
