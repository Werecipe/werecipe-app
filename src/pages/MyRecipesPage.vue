<template>
	<div>
		<h1 class="text-h3 text-center georgeItalic">My saved recipes</h1>
		<div
			v-if="userSavedRecipes"
			class="q-pa-md row items-center justify-center q-gutter-sm"
		>
			<recipe-card v-for="el in userSavedRecipes" :key="el.index" :recipe="el">
			</recipe-card>
		</div>
		<div v-else class="text-center text-primary petrona">
			<h2 class="text-h4">You have not saved any recipes yet</h2>
			<p class="text-h6">
				<router-link to="/recipeSearch" class="text-info text-underline"
					>search</router-link
				>
				for recipes and save the ones you like
			</p>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	export default {
		name: "UserRecipes",
		data() {
			return {};
		},
		components: {
			recipeCard: () => import("../components/recipeCard"),
		},

		computed: {
			...mapState("auth", ["userSavedRecipes"]),
		},

		methods: {
			...mapActions("auth", ["getRecipeFromDb"]),
		},

		beforeMount: function () {
			console.log("recipe get");
			this.getRecipeFromDb();
		},
	};
</script>

<style>
</style>