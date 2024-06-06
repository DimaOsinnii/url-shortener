<script lang="ts">
	import type { PageServerData } from './$types';
	import { afterNavigate, invalidateAll } from '$app/navigation';

	export let data: PageServerData;

	afterNavigate(() => invalidateAll());

	$: tableRows = data.list.slice(0, 100);

	let total = data.list.length;
</script>

<section>
	<div class="page-header">
		<strong>Short url: <a href={data.shortUrl}>{data.shortUrl}</a></strong>
		<strong>Total: {total}</strong>
	</div>
	<hr />
	{#if !total}
		<p class="empty">There is no history related to short url</p>
	{:else}
		<table class="striped">
			<thead data-theme="light">
				<tr>
					<th>User Agent</th>
					<th>IP</th>
					<th>Geo</th>
					<th>Timestamp</th>
				</tr>
			</thead>
			<tbody>
				{#each tableRows as row}
					<tr>
						<td>{row.userAgent}</td>
						<td>{row.ip ?? '-'}</td>
						<td>{row.geo ?? '-'}</td>
						<td>{row.timestamp.toLocaleString()}</td>
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
