<template>
	<q-page
		class="flex flex-start content-center items-center column text-center q-pt-xl"
	>
		<q-img
			class="width-30 q-my-xl"
			src="../assets/werecipe-logo.png"
			alt="large app logo"
		/>

		<h1 class="GeorgeItalic text-h3 q-mb-xs">Welcome to Werecipe app</h1>
		<h2 class="GeorgeBold text-h4 q-mt-none q-pt-xs">
			Search. Save. Own. Cook. Share. Repeat.
		</h2>
		<p class="petrona text-h5">The complete food and recipe app</p>
		<p class="petrona text-h5">
			To save your recipes, access recipes from all over the world please
			<router-link to="./login" class="underline cursor-pointer"
				>Log-in</router-link
			>
			or
			<router-link to="./sign-up" class="underline cursor-pointer"
				>Sign-up</router-link
			>
		</p></q-page
	>
</template>

<script>
	export default {
		name: "PageIndex",
	};
</script>
