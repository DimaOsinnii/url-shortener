<script>
	import '@picocss/pico';
	import '@picocss/pico/css/pico.colors.css';
</script>

<header>
	<nav class="container">
		<ul>
			<li>
				<a href="/" class="contrast">
					<strong> URL Shortener </strong>
				</a>
			</li>
		</ul>
		<ul>
			<li>
				<a href="/list">List</a>
			</li>
		</ul>
	</nav>
</header>
<main class="container"><slot /></main>
<footer></footer>

<style>
	header {
		height: 80px;
		border-bottom: 1px solid var(--pico-primary-underline);
	}

	header .container {
		height: 100%;
		display: flex;
		align-items: center;
	}

	a:first-child {
		text-decoration: none;
	}

	main {
		height: calc(100vh - 100px);
	}
</style>
