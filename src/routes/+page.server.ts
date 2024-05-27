import type { Actions } from './$types';

import { fail } from '@sveltejs/kit';

import { createLinkService } from '../services/links';

import { InvalidShortUrlError, InvalidUrlError, ShortUrlExistsError } from '$lib/errors';

import { FIELD_NAMES } from '../constants';

export const actions = {
	default: async ({ request, platform }) => {
		const formData = await request.formData();
		const origin = new URL(request.url).origin;

		const url = String(formData.get(FIELD_NAMES.URL));
		const shortUrl = String(formData.get(FIELD_NAMES.SHORT_URL));

		const { createLink } = createLinkService(platform);

		const errors: Record<string, string> = {};

		try {
			await createLink(shortUrl, url);
		} catch (error) {
			//TODO: better to use validation libraries like zod
			if (error instanceof ShortUrlExistsError) {
				errors[FIELD_NAMES.SHORT_URL] = error.message;
			} else if (error instanceof InvalidUrlError) {
				errors[FIELD_NAMES.URL] = error.message;
			} else if (error instanceof InvalidShortUrlError) {
				errors[FIELD_NAMES.SHORT_URL] = error.message;
			} else {
				errors.general = 'An unexpected error occurred';
			}
			return fail(400, { errors, data: Object.fromEntries(formData) });
		}

		return {
			shortUrl: `${origin}/${shortUrl}/stats`
		};
	}
} satisfies Actions;
