<template>
	<q-card class="my-card relative petrona" flat bordered>
		<q-img :src="recipe.image" />
		<div class="text-overline text-secondary row absolute-top">
			<q-chip class="q-px-sm q-mr-sm">
				<q-avatar icon="restaurant" color="secondary" text-color="white" />
				{{ recipe.yield }}
			</q-chip>

			<q-chip class="q-px-sm">
				<q-avatar icon="access_time" color="secondary" text-color="white" />
				{{ recipe.totalTime }}min
			</q-chip>
		</div>

		<q-card-section class="row height-150">
			<div class="text-overline text-secondary col-12 row justify-between">
				Source: {{ recipe.source }}

				<div v-if="recipeSearch">
					<q-btn
						color="positive"
						icon="save"
						label="Save"
						dense
						size="sm"
						@click="saveRecipe(recipe)"
					/>
				</div>
			</div>

			<div class="text-h6 text-primary col-12 georgeItalic">
				{{ recipe.label }}
			</div>
		</q-card-section>

		<q-card-actions>
			<a :href="recipe.url" target="blank"
				><q-btn flat color="info" label="Go to recipe"
			/></a>

			<q-space />

			<q-btn
				flat
				dense
				color="primary"
				label="Ingredients"
				:icon-right="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
				@click="expanded = !expanded"
			/>

			<!-- <q-btn
				color="primary"
				round
				flat
				dense
				:icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
				@click="expanded = !expanded"
			/> -->
		</q-card-actions>

		<q-slide-transition>
			<div v-show="expanded" class="height-200">
				<q-separator />
				<q-card-section class="text-subtitle2">
					<q-list bordered class="rounded-borders" style="max-width: 300px">
						<q-item-label header>Ingredients</q-item-label>

						<q-item
							clickable
							v-ripple
							v-for="item in recipe.ingredients"
							:key="item.index"
						>
							<q-item-section avatar>
								<q-avatar>
									<img :src="item.image" />
								</q-avatar>
							</q-item-section>

							<q-item-section>
								<q-item-label caption lines="2">
									<span class="text-weight-bold">{{ item.text }}</span>
									{{ item.weight.toFixed(2) }}gr
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
			</div>
		</q-slide-transition>
	</q-card>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		name: "Card",
		props: {
			recipe: {
				type: Object,
			},
		},
		data() {
			return {
				expanded: false,
			};
		},
		computed: {
			recipeSearch() {
				return this.$router.currentRoute.path == "/recipeSearch";
			},
		},

		methods: {
			...mapActions("auth", ["setRecipes"]),

			saveRecipe(el) {
				let rcp = el;
				this.setRecipes(rcp);
			},
		},
		mounted() {},
	};
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
	}
	.height-150 {
		height: 100px;
		min-height: 150px;
	}
	.height-200 {
		max-height: 350px;
		overflow-y: scroll;
	}
	.my-card {
		width: 100%;
		max-width: 300px;
	}
</style>