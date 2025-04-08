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
	<h1 class="mb-4 text-2xl font-bold">📚 E-Book Library</h1>
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each books as book (book)}
			<button
				type="button"
				class="cursor-pointer text-center p-2 bg-white rounded-xl shadow hover:shadow-lg transition duration-200"
				on:click={() => {
                    console.log('Book clicked:', book); // Debugging: Log the clicked book
                    openBook(book);
                }}
                on:keydown={(e) => {
                    if (e.key === 'Enter') {
                        console.log('Book selected with Enter key:', book); // Debugging: Log keyboard selection
                        openBook(book);
                    }
                }}
				aria-label={`Open book ${book}`}
			>
                <img
                    src={`/covers/${book}.jpg`}
                    alt={`Cover of ${book}`}
                    on:error={(e) => {
                        const target = e.target as HTMLImageElement | null;
                        if (target) {
                            target.src = `/covers/${book}.png`;
                        }
                    }}
                    class="w-full max-w-[160px] h-[220px] object-cover rounded-md mb-2 mx-auto"
                 />
				<p class="text-sm font-semibold truncate">{book}</p>
			</button>
		{/each}
	</div>
{:else}
	<button
        on:click={() => {
            console.log('Back button clicked'); // Debugging: Log back button click
            goBack();
        }}
		class="mb-4 text-blue-600 underline"
		aria-label="Go back to library"
	>
		← Back to Library
	</button>
	<Presentation book={selectedBook} />
{/if}