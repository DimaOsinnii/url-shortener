export class ShortUrlExistsError extends Error {
	constructor() {
		super('Short URL already exists');
		this.name = 'ShortUrlExistsError';
	}
}

export class InvalidShortUrlError extends Error {
	constructor() {
		super('Short URL can only contain letters, digits, and dashes');
		this.name = 'InvalidShortUrlError';
	}
}

export class InvalidUrlError extends Error {
	constructor() {
		super('Invalid URL');
		this.name = 'InvalidUrlError';
	}
}
