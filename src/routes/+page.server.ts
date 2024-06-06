import type { Actions } from './$types';
import type { FieldNames } from '$lib/types';

import { fail } from '@sveltejs/kit';

import { CreateUrlError } from '$lib/errors';
import { createLinkService } from '$lib/services/links';
import { validateCreateUrlFormData } from '$lib/validation';

type ActionData = {
	data: Record<string, FormDataEntryValue>;
	errors: Partial<Record<FieldNames | 'general', string>>;
};

export const actions = {
	default: async ({ request, platform }) => {
		const { createLink } = createLinkService(platform);

		const formData = await request.formData();
		const origin = new URL(request.url).origin;

		try {
			const { shortUrl, url } = validateCreateUrlFormData(formData);

			await createLink(shortUrl, url);

			return {
				shortUrl: `${origin}/${shortUrl}/stats`
			};
		} catch (error) {
			const data = Object.fromEntries(formData);

			if (error instanceof CreateUrlError) {
				return fail<ActionData>(400, { errors: { [error.field]: error.message }, data });
			}

			return fail<ActionData>(500, { errors: { general: 'An unexpected error occurred' }, data });
		}
	}
} satisfies Actions;
