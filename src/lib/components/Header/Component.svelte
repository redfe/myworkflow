<script lang="ts">
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
	import { ArrowLeftIcon, MenuIcon, LogOutIcon, SettingsIcon, XIcon } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import type { HeaderProps } from './types';
	import { Link } from '$lib/components/Link';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';

	const { breadCrumbs }: HeaderProps = $props();

	let elemModal: HTMLDialogElement | null;
</script>

<AppBar
	background="preset-filled-surface-50-950"
	classes="opacity-80 sm:space-y-0 py-2 sm:py-4"
	toolbarClasses="items-center"
>
	{#snippet lead()}
		{#if breadCrumbs.length > 1}
			<a class="sm:hidden" href={breadCrumbs[breadCrumbs.length - 2].href}>
				<ArrowLeftIcon size={24} class="sm:hidden" />
			</a>
		{/if}
	{/snippet}
	{#snippet trail()}
		<div class="hidden space-x-4 sm:flex">
			<Link
				class="hover:bg-surface-100-900 rounded-container p-1"
				title={m.btn_title_logout()}
				onclick={() => goto('/.auth/logout')}
				href="#"><LogOutIcon size={20} /></Link
			>
		</div>
		<div class="block sm:hidden">
			<button
				onclick={(e) => {
					elemModal?.showModal();
				}}
				class="hover:bg-surface-100-900 rounded-container p-1"
				title={m.btn_title_menu()}
			>
				<MenuIcon size={24} />
			</button>
		</div>
	{/snippet}
	<Link href={'/'} class="opacity-100">{m.app_name()}</Link>
</AppBar>

<!-- スマホ用メニューダイアログ -->
<dialog
	bind:this={elemModal}
	data-dialog
	class="bg-surface-100-900 backdrop:bg-surface-50/75 dark:backdrop:bg-surface-950/75 top-0 right-0 z-10 w-full max-w-[640px] min-w-[320px] space-y-4 p-4 text-inherit"
	onclick={(event) => {
		// ダイアログ外をクリックしたら閉じる
		let target = event?.target as HTMLElement | null;
		if (target === elemModal) {
			elemModal?.close();
		}
	}}
>
	<div class="">
		<Navigation.Rail
			tilesClasses="pt-6"
			classes="flex modal-container"
			tilesJustify="start"
			expanded={true}
		>
			{#snippet tiles()}
				<button
					class="absolute top-3 right-5"
					title={m.btn_title_close()}
					onclick={() => elemModal?.close()}><XIcon /></button
				>
				<Navigation.Tile
					title={m.page_title_setting()}
					labelExpanded={m.page_title_setting()}
					onclick={() => elemModal?.close()}
					href={localizeHref('/setting')}><SettingsIcon /></Navigation.Tile
				>
				<Navigation.Tile
					title={m.btn_title_logout()}
					labelExpanded={m.btn_title_logout()}
					onclick={() => goto('/.auth/logout')}><LogOutIcon /></Navigation.Tile
				>
			{/snippet}
		</Navigation.Rail>
	</div>
</dialog>

<style>
	/* NOTE: add the following styles to your global stylesheet. */
	dialog,
	dialog::backdrop {
		--anim-duration: 250ms;
		transition:
			display var(--anim-duration) allow-discrete,
			overlay var(--anim-duration) allow-discrete,
			opacity var(--anim-duration);
		opacity: 0;
	}
	/* Animate In */
	dialog[open],
	dialog[open]::backdrop {
		opacity: 1;
		backdrop-filter: blur(2px);
	}
	/* Animate Out */
	@starting-style {
		dialog[open],
		dialog[open]::backdrop {
			opacity: 0;
		}
	}
</style>
