<template>
	<q-page
		class="flex flex-start content-center items-center column text-center q-pt-xl"
	>
		<h1 class="GeorgeItalic text-h4 q-mb-xs">Welcome to Werecipe app</h1>
		<p class="GeorgeBold q-mt-none q-pt-xs q-mb-xl">
			Search. Save. Own. Cook. Share. Repeat.
		</p>
		<div class="bg-warning q-pa-lg rounded-borders">
			<p>Please</p>
			<q-btn color="secondary" icon-right="login" label="Login" to="./login" />
			<p class="petrona">OR</p>
			<q-btn
				color="info"
				icon-right="person_add"
				label="Create account"
				to="./sign-up"
			/>
			<p>to continue</p>
		</div>
	</q-page>
</template>

<script>
	export default {};
</script>

<style scoped lang="scss">
	p {
		margin: 1rem;
	}
</style>
