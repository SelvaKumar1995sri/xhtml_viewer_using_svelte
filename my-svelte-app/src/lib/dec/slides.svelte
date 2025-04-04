<!-- <script lang="ts">
    import { onMount } from "svelte";

    import "reveal.js/dist/reveal.css";
    import "reveal.js/dist/theme/black.css";
    import "reveal.js/plugin/highlight/monokai.css";

    let htmlSlides: string[] = []; // Array to store HTML content

    // Load HTML files dynamically
    onMount(async () => {
        console.log("onMount triggered");
        if (typeof window !== "undefined") {
            try {
                console.log("Initializing Reveal.js...");
                const Reveal = (await import("reveal.js")).default;
                const Markdown = (await import("reveal.js/plugin/markdown/markdown")).default;
                const Highlight = (await import("reveal.js/plugin/highlight/highlight")).default;
                const Notes = (await import("reveal.js/plugin/notes/notes")).default;

                const deck = new Reveal({
                    autoAnimateEasing: "ease",
                    autoAnimateDuration: 1,
                    hash: true,
                    controls: true,
                    progress: true,
                });

                deck.initialize({
                    plugins: [Markdown, Highlight, Notes]
                });

                console.log("Reveal.js initialized successfully");

                // Fetch the list of HTML files from the API
                const response = await fetch('/api/slides');
                const files: string[] = await response.json();

                // Fetch the content of each HTML file
                htmlSlides = await Promise.all(
                    files.map(async (file) => {
                        const response = await fetch(`/html_slides/${file}`);
                        return response.ok ? await response.text() : `<p>Error loading ${file}</p>`;
                    })
                );
            } catch (error) {
                console.error("Error initializing Reveal.js:", error);
            }
        }
    });
</script>

<div class="reveal">
    <div class="slides">
        {#each htmlSlides as htmlContent}
            <section>
                {@html htmlContent}
            </section>
        {/each}
    </div>
</div> -->



<script lang="ts">
    import { onMount } from "svelte";

    import "reveal.js/dist/reveal.css";
    import "reveal.js/dist/theme/black.css";
    import "reveal.js/plugin/highlight/monokai.css";

    import Presentation from '$lib/dec/presentation.svelte'; // Assuming this is the correct path to your presentation component

    onMount(async () => {
        console.log("onMount triggered");
        if (typeof window !== "undefined") {
            try {
                console.log("Initializing Reveal.js...");
                const Reveal = (await import("reveal.js")).default;
                const Markdown = (await import("reveal.js/plugin/markdown/markdown")).default;
                const Highlight = (await import("reveal.js/plugin/highlight/highlight")).default;
                const Notes = (await import("reveal.js/plugin/notes/notes")).default;

                const deck = new Reveal({
                    autoAnimateEasing: "ease",
                    autoAnimateDuration: 1,
                    hash: true,
                    controls: true,
                    progress: true,
                });
                deck.initialize({
                    plugins: [Markdown, Highlight, Notes]
                });
                console.log("Reveal.js initialized successfully");
            } catch (error) {
                console.error("Error initializing Reveal.js:", error);
            }
        }
    });
</script>

<div class="reveal">
    <div class="slides">
        <Presentation />
    </div>
</div>