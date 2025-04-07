<script lang="ts">
	import Slide from './slide.svelte';
	import Code from './code.svelte';
	import Markdown from './markdown.svelte'; 
	import Notes from './notes.svelte'; 
	import { onMount } from 'svelte';

	let slideContents: string[] = [];

	onMount(async () => {
		try {
			const res = await fetch('/api/html_files');
			slideContents = await res.json(); // Already cleaned XHTML content
			console.log('✅ Loaded cleaned slide contents:', slideContents);
		} catch (err) {
			console.error('❌ Error loading slides:', err);
		}
	});

    const pairSlides = (slides: string[]) => {
		const pairs: string[][] = [];
		for (let i = 2; i < slides.length; i += 1) {
			pairs.push([slides[i], slides[i + 1] ?? '']); // Second slide might be undefined
		}
		return pairs;
	};
</script>

<style>
	.book-view {
		display: flex;
		gap: 1rem;
		justify-content: center;
        
	}
	.book-slide {
		width: 481px;
        height: 699px;
		border: 1px solid #ccc;
		padding: 1rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		background-color: white;
	}
</style>

<div class="reveal">
    <div class="slides">
        <section>
            {#if slideContents.length > 0}
                {#each pairSlides(slideContents) as pair}
                    <section class="vertical-slide">
                        <div class="book-view">
                            <div class="book-slide">
                                {@html pair[0]}
                            </div>
                            <!-- {#if pair[1]}
                                <div class="book-slide">
                                    {@html pair[1]}
                                </div>
                            {/if} -->
                        </div>
                    </section>
                {/each}
            {:else}
                <section class="center-align">
                    <h1>No slides available</h1>
                </section>
            {/if}
        </section>
    </div>
</div>
<!-- <div class="reveal">
	<div class="slides">
		{#if slideContents.length > 0}
			{#each slideContents as html}
				<section>{@html html}</section>
			{/each}
		{:else}
			<section>
				<h1>No slides available</h1>
			</section>
		{/if}
	</div>
</div> -->

<!-- <style>
    .center-align {
        justify-content: center;
        align-items: center;
        height: 699px; /* Full viewport height */
        width: 28.49vw;
        overflow: hidden;
        text-align: center;
    }

    .slide-inner {
        justify-content: center;
        align-items: center;
        max-width: 100%;
        max-height: 100%;
    }

    .slide-inner img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
    }
</style> -->

<!-- <Slide>
    <h1>slide</h1>
    
    <Notes>Notes</Notes>
</Slide>

<Slide>
    <p class="capitalize">Svelte deck 🔥</p>
</Slide>

<Slide>
    <p class="capitalize">Horizontal slide</p>
</Slide> -->

<!-- Vertical slides -->
<!-- <section>
    <section>
        <Slide>
            <p class="capitalize">Vertical slide 1</p>
        </Slide>
    </section>
    <section>
        <Slide>
            <p class="capitalize">Vertical slide 2</p>
        </Slide>
    </section>
</section>

<section>
    <Slide id="animate" animate>
        <p class="capitalize">Animate elements</p>
    </Slide>
</section>

<section>
    <Slide id="animate" animate>
        <p class="capitalize">Animate elements</p>
        <p class="capitalize">Across slides</p>
    </Slide>
</section> -->

<!-- <section>
    <Slide id="list" animate>
        <ul>
            <li>React</li>
            <li>Solid</li>
            <li>Svelte</li>
            <li>Vue</li>
        </ul>
    </Slide>
</section>

<section>
    <Slide id="list" animate>
        <ul>
            <li>Svelte</li>
            <li>React</li>
            <li>Solid</li>
            <li>Vue</li>
        </ul>
    </Slide>
</section> -->
<!-- 
<section>
    <Slide id="list" animate>
        <ul>
            <li>Svelte ❤️</li>
            <li>React</li>
            <li>Solid</li>
            <li>Vue</li>
        </ul>
    </Slide>
</section>

<section>
    <Slide>
        <p class="capitalize">Code Blocks</p>
    </Slide>
</section> -->

<!-- <section>
    <Slide animate>
        <Code id="code" lines="1|3">
            {`
                <Slide animate> -->
                    <!-- .. -->
                <!-- </Slide>
            `}
        </Code>
    </Slide>
</section> -->

<!-- <section>
    <Slide animate>
        <Code id="code" lines="2|4">
            {`
                <Slide animate>
                    <Code lines> -->
                        <!-- ... -->
                    <!-- </Code>
                </Slide>
            `}
        </Code>
    </Slide>
</section>

<section>
    <Slide animate>
        <Code id="code" lines="3-5|1-7">
            {`
                <Slide animate>
                    <Code lines>
                        {code\`
                            ...
                        \`}
                    </Code>
                </Slide>
            `}
        </Code>
    </Slide>
</section> -->

<!-- <section>
    <Slide id="boxes" animate>
        <p class="capitalize">Cool transitions</p>
        <div class="flex gap-2 place-content-center">
            <div data-id="box-1" class="w-[100px] h-[100px] bg-gray-400"></div>
            <div data-id="box-2" class="w-[100px] h-[100px] bg-gray-400"></div>
            <div data-id="box-3" class="w-[100px] h-[100px] bg-gray-400"></div>
        </div>
    </Slide>
</section>

<section>
    <Slide id="boxes" animate>
        <p class="capitalize">Moving boxes</p>
        <div class="flex gap-2 place-content-center">
            <div data-id="box-1" class="w-[200px] h-[200px] bg-red-400"></div>
            <div data-id="box-2" class="w-[200px] h-[200px] bg-green-400"></div>
            <div data-id="box-3" class="w-[200px] h-[200px] bg-blue-400"></div>
        </div>
        <p class="capitalize">Cool transitions</p>
    </Slide>
</section>

<section>
    <Slide id="boxes" animate>
        <p>Moving boxes</p>
        <div class="flex gap-2 place-content-center">
            <div data-id="box-1" class="w-[200px] h-[200px] bg-gray-400"></div>
            <img class="w-[200px] h-[200px]" src="https://media1.tenor.com/m/vs3KA18T1G8AAAAd/dance-link.gif" alt="Whoa" />
            <div data-id="box-3" class="w-[200px] h-[200px] bg-gray-400"></div>
        </div>
        <p>Whoa!</p>
    </Slide>
</section>


<Markdown>
    {`
        ## Markdown ❤️
        You can use **HTML** or **Markdown** for slides.
    `}
</Markdown>

<Markdown name="example.md" external />

<Slide>
    <p class="capitalize">Get started 😎</p>
</Slide> -->