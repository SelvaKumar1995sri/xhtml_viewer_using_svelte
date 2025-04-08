<script lang="ts">
    export let id: string | null = null;
    export let lines: string | Boolean | null = null;
    export let noescape = false;
</script>

<pre data-id={id || null}>
    <code
        data-trim
        data-line-number={lines || null}
        data-noescape={noescape || null}
    >
        <slot />
    </code>
</pre>