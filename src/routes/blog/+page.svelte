<script lang="ts">
	import type { PageData } from './$types';

	// Destructure the 'data' prop and type it as PageData
	let { data }: { data: PageData } = $props();
</script>

<h1>Blog</h1>

{#if data.error}
	<p>{data.error}</p>
{:else if data.summaries.length === 0}
	<p>No posts found.</p>
{:else}
	<ul>
		{#each data.summaries as { slug, title, excerpt }}
			<li>
				<a href="/blog/{slug}">{title}</a>
				<p>{@html excerpt}</p>
				<!-- Render the HTML of the excerpt -->
			</li>
		{/each}
	</ul>
{/if}
