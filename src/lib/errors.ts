import type { FieldNames } from '$lib/types';

export class CreateUrlError extends Error {
	constructor(
		public readonly field: FieldNames,
		message: string
	) {
		super(message);
	}
}
