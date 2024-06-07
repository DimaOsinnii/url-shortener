export const KV_NAMESPACE = {
	LINKS: 'LINKS',
	HISTORY: 'HISTORY'
} as const;

export const FIELD_NAMES = {
	URL: 'url',
	SHORT_URL: 'shortUrl'
};

export const FIELD_LABELS = {
	[FIELD_NAMES.URL]: 'URL',
	[FIELD_NAMES.SHORT_URL]: 'Short URL'
};

export const FIELD_PLACEHOLDERS = {
	[FIELD_NAMES.URL]: 'Enter long url',
	[FIELD_NAMES.SHORT_URL]: 'Enter short url'
};
