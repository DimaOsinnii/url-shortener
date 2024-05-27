<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let tableRows = data.list.slice(0, 100);
	let total = data.list.length;
</script>

<section>
	<div class="page-header">
		<strong>All created urls</strong>
		<strong>Total: {total}</strong>
	</div>
	<hr />
	{#if !data.list.length}
		<p class="empty">There are no urls yet</p>
	{:else}
		<table class="striped">
			<thead data-theme="light">
				<tr>
					<th>Short url</th>
					<th>Long url</th>
					<th>Created at</th>
				</tr>
			</thead>
			<tbody>
				{#each tableRows as row (row.shortUrl)}
					<tr>
						<td><a href={row.shortUrl}>{row.shortUrl}</a></td>
						<td><a href={row.url}>{row.url}</a></td>
						<td>{row.createdAt}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if total > 100 && tableRows.length !== total}
			<button on:click={() => (tableRows = data.list)}>Show all</button>
		{/if}
	{/if}
</section>

<style>
	section {
		overflow-x: auto;
	}

	.empty {
		text-align: center;
	}
	.page-header {
		padding-top: 32px;
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
</style>
