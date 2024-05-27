import { KV_NAMESPACE } from './constants';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: { [KV_NAMESPACE.LINKS]: KVNamespace; [KV_NAMESPACE.HISTORY]: KVNamespace };
		}
	}
}

export {};
