<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { FieldNames } from '$lib/types';

	import { fade } from 'svelte/transition';

	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
			await invalidateAll();
		};
	};

	let inputProps: Record<FieldNames, HTMLInputAttributes> = {
		url: {},
		shortUrl: {}
	};

	$: urlError = form?.errors?.url;
	$: shortUrlError = form?.errors?.shortUrl;
	$: generalError = form?.errors?.general;

	$: {
		inputProps.url['aria-invalid'] = urlError ? true : undefined;
		inputProps.shortUrl['aria-invalid'] = shortUrlError ? true : undefined;
		inputProps.url['aria-describedby'] = urlError ? 'invalid-url' : '';
		inputProps.shortUrl['aria-describedby'] = shortUrlError ? 'invalid-short-url' : '';
	}
</script>

<section>
	{#if !!form?.shortUrl}
		<article transition:fade class="pico-color-green-400">
			Created short url - <a href={form.shortUrl}>{form.shortUrl}</a>
		</article>
	{/if}
	<form method="POST" use:enhance={handleSubmit}>
		<fieldset>
			<label>
				URL
				<input
					required
					name="url"
					value={form?.data?.url ?? ''}
					placeholder="Enter long url"
					aria-invalid="true"
					{...inputProps.url}
				/>
				{#if !!urlError}
					<small id="invalid-url">{urlError}</small>
				{/if}
			</label>

			<span class="arrow">
				<i />
			</span>
			<label>
				Short URL
				<input
					required
					name="shortUrl"
					value={form?.data?.shortUrl ?? ''}
					placeholder="Enter short url"
					{...inputProps.shortUrl}
				/>
				{#if !!shortUrlError}
					<small id="invalid-short-url">{shortUrlError}</small>
				{/if}
			</label>
		</fieldset>

		<button disabled={loading} aria-busy={loading} class:secondary={loading} type="submit">
			{#if !loading}Create{/if}
		</button>
		{#if generalError}
			<span class="pico-color-red-250">{generalError}</span>
		{/if}
	</form>
</section>

<style>
	section {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		max-width: 680px;
		margin: 0 auto;
		height: 100%;
	}

	article {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	form {
		width: 100%;
	}

	.arrow {
		display: flex;
		justify-content: center;
		margin: 30px 0;
	}

	.arrow i {
		border: solid var(--pico-primary);
		border-width: 0 10px 10px 0;
		display: inline-block;
		padding: 10px;
		transform: rotate(45deg);
	}
</style>
