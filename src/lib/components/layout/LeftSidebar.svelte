<script lang="ts">
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let show: boolean;
    const dispatch = createEventDispatcher();

    let windowWidth: number;
    let windowHeight: number;

    // Responsive sidebar width based on orientation
    $: isVertical = windowHeight > windowWidth;
    $: sidebarWidthClass = isVertical ? 'w-1/2' : 'w-1/6';

    // Navigation structure with expandable sections
    let nav = [
        {
            name: 'Writeups',
            path: 'writeups',
            expanded: false,
            children: [
                {
                    name: 'TryHackMe',
                    path: 'writeups/TryHackMe',
                    expanded: false,
                    children: [
                        { name: 'Blue', path: 'writeups/TryHackMe/Blue' },
                        { name: 'Metasploit: Meterpreter', path: 'writeups/TryHackMe/Metasploit-Meterpreter' }
                    ]
                }
            ]
        },
        {
            name: 'Projects',
            path: 'projects',
            expanded: false,
            children: [
                { name: 'Clifford Benchmark', path: 'projects/CliffordBenchmark' }
            ]
        }
    ];

    // Toggle expand/collapse for a navigation item (support any expandable item)
    function toggleExpand(item: { expanded: boolean }) {
        item.expanded = !item.expanded;
        nav = nav; // Trigger Svelte reactivity
    }

    // Dispatch navigation event
    function handleNavigate(path: string) {
        dispatch('navigate', { path });
    }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if show}
    <div
        in:fly={{ x: -100, duration: 600, delay: 300 }}
        out:fly={{ x: -100, duration: 400 }}
        class="pointer-events-auto absolute left-0 top-16 bottom-0 flex flex-col justify-center overflow-y-auto p-6 text-slate-100 {sidebarWidthClass}"
    >
        <ul class="w-full space-y-4">
            {#each nav as section}
                <li class="flex flex-col items-start">
                    <div class="flex items-center gap-1">
                        <!-- Expand/collapse button for sections with children -->
                        <div class="flex items-center justify-center w-6 h-6">
                            {#if section.children && section.children.length > 0}
                                <button
                                    type="button"
                                    class="text-slate-500 hover:text-white transition-colors"
                                    on:click={() => toggleExpand(section)}
                                    aria-label="{section.expanded ? `Collapse ${section.name}` : `Expand ${section.name}`}"
                                >
                                    <i class="fas fa-star text-xs"></i>
                                </button>
                            {/if}
                        </div>
                        <!-- Section navigation button -->
                        <button
                            class="text-3xl font-bold text-left hover:text-white"
                            on:click={() => handleNavigate(section.path)}
                            style="font-family: 'Amatic SC', cursive;" 
                        >
                            {section.name}
                        </button>
                    </div>

                    {#if section.expanded}
                        <ul class="w-full pl-3 pt-2 space-y-2 border-l border-slate-700 ml-3">
                            {#each section.children as child}
                                <li class="flex flex-col items-start">
                                    <div class="flex items-center gap-1">
                                        <!-- Expand/collapse button for child items with children -->
                                        <div class="flex items-center justify-center w-6 h-6">
                                            {#if child.children && child.children.length > 0}
                                                <button
                                                    type="button"
                                                    class="text-slate-500 hover:text-white transition-colors"
                                                    on:click={() => toggleExpand(child)}
                                                    aria-label="{child.expanded ? `Collapse ${child.name}` : `Expand ${child.name}`}"
                                                >
                                                    <i class="fas fa-star text-xs"></i>
                                                </button>
                                            {/if}
                                        </div>
                                        <!-- Child navigation button -->
                                        <button
                                            class="text-2xl text-left hover:text-white"
                                            on:click={() => handleNavigate(child.path)}
                                        >
                                            {child.name}
                                        </button>
                                    </div>

                                    {#if child.expanded && child.children}
                                        <ul class="w-full pl-3 pt-2 space-y-1 border-l border-slate-700 ml-3">
                                            {#each child.children as sub}
                                                <li>
                                                    <!-- Sub-item navigation button -->
                                                    <button
                                                        class="w-full pl-6 text-left text-xl text-slate-300 hover:text-white"
                                                        on:click={() => handleNavigate(sub.path)}
                                                    >
                                                        {sub.name}
                                                    </button>
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}