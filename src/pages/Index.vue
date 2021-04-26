<template>
	<q-page class="flex flex-center">
		<h1>Welcome to Werecipe app</h1>
		<p>The complete food and recipe app</p>
		<p>
			To save your recipes, access content and professional recipes from all
			over the world please
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
