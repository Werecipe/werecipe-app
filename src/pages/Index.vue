<template>
	<q-page
		class="flex flex-start content-center items-center column text-center q-pt-xl"
	>
		<h1 class="GeorgeItalic text-h4 q-mb-xs">Werecipe app</h1>
		<p class="GeorgeBold q-mt-none q-pt-xs text-uppercase">
			Search. Save. Own. Cook. Share. Repeat.
		</p>
		<p class="petrona text-h6">The complete food and recipe app</p>

		<q-btn color="secondary" icon-right="login" label="Login" to="./login" />
		<p class="petrona">OR</p>
		<q-btn
			color="info"
			icon-right="person_add"
			label="Create account"
			to="./sign-up"
		/>
	</q-page>
</template>

<script>
	export default {
		name: "PageIndex",
	};
</script>
<style scoped lang="scss">
	p {
		margin: 0.5rem;
	}
</style>
