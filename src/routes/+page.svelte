<!-- <script lang="ts">
    import Slides from '$lib/dec/slides.svelte'; // Renamed to start with an uppercase letter
    import "../app.css";
</script>

<svelte:head>
    <title>Presentation</title>
</svelte:head>

<Slides></Slides> Updated to match the renamed import -->

<script lang="ts">
	import Presentation from '$lib/dec/presentation.svelte';
	export let data: { books: string[] };
	let books: string[] = data.books;

	let selectedBook: string | null = null;

	function openBook(book: string): void {
        console.log('Opening book:', book); 
		selectedBook = book;
	}

	function goBack(): void {
        console.log('Going back to library');
		selectedBook = null;
	}
</script>

{#if !selectedBook}
	<h1 class="title">📚 E-Book Library</h1>

	<div class="grid-container">
		{#each books as book (book)}
			<div class="book-card" role="button" tabindex="0"
				on:click={() => openBook(book)}
				on:keydown={(e) => {
					if (e.key === 'Enter') openBook(book);
				}}
				aria-label={`Open book ${book}`}
			>
				<div class="image-frame">
					<img
						src={`/covers/${book}.jpg`}
						alt={`Cover of ${book}`}
						on:error={(e) => {
							const target = e.target as HTMLImageElement | null;
							if (target) target.src = `/covers/${book}.png`;
						}}
					>
				</div>
				<p class="book-title">{book}</p>
			</div>
		{/each}
	</div>

	<style>
		.title {
			font-size: 4rem;
			font-weight: bold;
			margin-bottom: 1rem;
		}
		.grid-container {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 20px;
		}
		.book-card {
			width: 280px;
			height: 360px;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10px;
			background: white;
			border-radius: 10px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.1);
			cursor: pointer;
			transition: transform 0.2s ease;
		}
		/* .book-card:hover {
			transform: scale(1.03);
		} */
		.image-frame {
			width: 140px;
			height: 200px;
			background-color: #f1f1f1;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			border-radius: 6px;
		}
		.image-frame img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.book-title {
			margin-top: 8px;
			font-size: 0.9rem;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 100%;
		}
	</style>
{:else}
	<button
		on:click={() => goBack()}
		class="mb-4 text-blue-600 underline"
		aria-label="Go back to library"
	>
		← Back to Library
	</button>
	<Presentation book={selectedBook} />
{/if}
