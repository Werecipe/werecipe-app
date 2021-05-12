<template>
	<div>
		<h1 class="text-h4 text-center georgeItalic">My saved recipes</h1>
		<div class="q-pa-md row items-center justify-center q-gutter-sm">
			<recipe-card v-for="el in userSavedRecipes" :key="el.index" :recipe="el">
			</recipe-card>
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