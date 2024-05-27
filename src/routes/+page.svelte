<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	import { enhance } from '$app/forms';

	import { FIELD_LABELS, FIELD_NAMES, FIELD_PLACEHOLDERS } from '../constants';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};

	$: urlError = form?.errors?.[FIELD_NAMES.URL];
	$: shortUrlError = form?.errors?.[FIELD_NAMES.SHORT_URL];
	$: generalError = form?.errors?.general;

	let inputProps: Record<string, HTMLInputAttributes> = {
		[FIELD_NAMES.URL]: {},
		[FIELD_NAMES.SHORT_URL]: {}
	};

	$: {
		inputProps[FIELD_NAMES.URL]['aria-invalid'] = urlError ? true : undefined;
		inputProps[FIELD_NAMES.URL]['aria-describedby'] = urlError ? 'invalid-url' : '';

		if (shortUrlError) {
			inputProps[FIELD_NAMES.SHORT_URL]['aria-invalid'] = true;
			inputProps[FIELD_NAMES.SHORT_URL]['aria-describedby'] = 'invalid-short-url';
		}
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
				{FIELD_LABELS[FIELD_NAMES.URL]}
				<input
					required
					name={FIELD_NAMES.URL}
					value={form?.data?.[FIELD_NAMES.URL] ?? ''}
					placeholder={FIELD_PLACEHOLDERS[FIELD_NAMES.URL]}
					aria-invalid="true"
					{...inputProps[FIELD_NAMES.URL]}
				/>
				{#if !!urlError}
					<small id="invalid-url">{urlError}</small>
				{/if}
			</label>

			<span class="arrow">
				<i />
			</span>
			<label>
				{FIELD_LABELS[FIELD_NAMES.SHORT_URL]}
				<input
					required
					name={FIELD_NAMES.SHORT_URL}
					value={form?.data?.[FIELD_NAMES.SHORT_URL] ?? ''}
					placeholder={FIELD_PLACEHOLDERS[FIELD_NAMES.SHORT_URL]}
					{...inputProps[FIELD_NAMES.SHORT_URL]}
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
