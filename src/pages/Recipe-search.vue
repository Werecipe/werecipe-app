<template>
	<div>
		<div
			class="full-width column justify-center items-center content-center petrona"
		>
			<h1 class="text-h4 text-center georgeItalic">
				Your dedicated recipe search
			</h1>
			<q-input
				v-model="recipeName"
				outlined
				dense
				placeholder="Search"
				style="max-width: 550px; width: 100%"
				class="q-mb-md"
			>
				<template v-slot:append>
					<q-icon name="search" clickable @click="search" />
				</template>
			</q-input>
			<p class="petrona text-primary">
				Use the filter options bellow to narrow down your search
			</p>
		</div>
		<div class="row justify-start border-bottom q-mx-xl">
			<q-btn
				flat
				icon="manage_search"
				@click="filter = !filter"
				label="filter"
				color="primary"
				no-caps
			/>
			<div class="border-btn-right q-px-md q-mr-md">
				<q-btn flat color="negative" label="reset" no-caps />
			</div>

			<p class="q-mb-none q-pb-none petrona text-primary">
				Your filter parameters:
			</p>
		</div>
		<q-slide-transition>
			<div v-show="filter">
				<q-splitter v-model="splitterModel">
					<template v-slot:before>
						<q-tabs
							v-model="tab"
							vertical
							inline-label
							content-class="text-secondary my-class flex-start content-start justify-start q-ml-xl"
							dense
							shrink
						>
							<q-tab
								name="ingredients"
								icon="kitchen"
								label="Ingredients"
								no-caps
							/>
							<q-tab name="meal" icon="brunch_dining" label="Meal" no-caps />
							<q-tab name="dish" icon="local_dining" label="Dish" no-caps />
							<q-tab name="cuisine" icon="language" label="Cuisine" no-caps />
							<q-tab name="time" icon="access_time" label="Time" no-caps />
							<q-tab name="diet" icon="no_food" label="Diet" no-caps />
							<q-tab
								name="health"
								icon="health_and_safety"
								label="Health and allergy"
								no-caps
							/>
							<q-tab
								name="lifestyle"
								icon="self_improvement"
								label="Lifestyle"
								no-caps
							/>
							<q-tab name="servings" icon="group" label="Servings" no-caps />
							<q-tab name="energy" icon="bolt" label="Energy" no-caps />
							<q-btn
								name="Close"
								icon="close"
								label="Close filter"
								no-caps
								flat
								@click="filter = !filter"
							/>
						</q-tabs>
					</template>

					<template v-slot:after>
						<q-tab-panels
							v-model="tab"
							animated
							swipeable
							vertical
							keep-alive
							transition-prev="jump-up"
							transition-next="jump-up"
						>
							<q-tab-panel name="ingredients">
								<div class="text-h4 q-mb-md petrona text-primary">
									Ingredients
								</div>
								<div class="row full-width full-height">
									<div class="col-xs-12 col-md-6 border-right">
										<p class="petrona text-primary">
											Wright ingredients that you want in your dish
										</p>
										<div class="list">
											<div class="item multiple-lines">
												<q-input
													v-model="plusIngredient"
													outlined
													rounded
													placeholder="add ingredient name"
												>
													<template v-slot:append>
														<q-icon
															name="add"
															color="secondary"
															@click="addPlusIngredient()"
														/>
													</template>
												</q-input>
												<div class="item-content">
													<q-chip
														v-for="item in chosenIngredientsPlus"
														:key="item"
														removable
														block
														@remove="removePlus(item)"
														color="primary"
														text-color="white"
														icon="cake"
													>
														{{ item }}
													</q-chip>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xs-12 col-md-6">
										<p class="petrona text-primary">
											Wright ingredients that you don't want in your dish
										</p>
										<div class="list">
											<div class="item multiple-lines">
												<q-input
													v-model="minusIngredient"
													outlined
													rounded
													placeholder="add ingredient name"
												>
													<template v-slot:append>
														<q-icon
															name="add"
															color="secondary"
															@click="addMinusIngredient()"
														/>
													</template>
												</q-input>
												<div class="item-content">
													<q-chip
														v-for="item in chosenIngredientsMinus"
														:key="item"
														removable
														block
														@remove="removeMin(item)"
														color="primary"
														text-color="white"
														icon="cake"
													>
														{{ item }}
													</q-chip>
												</div>
											</div>
										</div>
									</div>
								</div>
							</q-tab-panel>

							<q-tab-panel name="meal">
								<div class="text-h4 q-mb-md petrona text-primary">Meal</div>
								<p>Chose a meal</p>
								<q-option-group
									name="meals"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem"
									v-model="chosenMeals"
									:options="meal"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>

							<q-tab-panel name="dish">
								<div class="text-h4 q-mb-md petrona text-primary">Dish</div>

								<p>Choose the dish.</p>
								<q-option-group
									name="dish"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem"
									v-model="chosenDish"
									:options="dish"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="cuisine">
								<div class="text-h4 q-mb-md petrona text-primary">
									Worlds cuisines
								</div>

								<p>Chose the cuisine you prefer.</p>
								<div>
									<q-option-group
										name="cuisines"
										keep-color
										inline
										dense
										size="2.2rem"
										class="q-mr-md petrona text-1rem"
										v-model="chosenCuisines"
										:options="cuisines"
										color="secondary"
										type="toggle"
									/>
								</div>
							</q-tab-panel>
							<q-tab-panel name="time">
								<div class="text-h4 q-mb-md petrona text-primary">
									Meal cook duration
								</div>

								<p>Chose the maximum time you want to spend cooking.</p>
								<q-option-group
									name="time"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem"
									v-model="chosenTimes"
									:options="times"
									color="secondary"
									type="radio"
								/>
							</q-tab-panel>
							<q-tab-panel name="diet">
								<div class="text-h4 q-mb-md petrona text-primary">
									Dietary choices
								</div>

								<p>Please chose a diet.</p>
								<q-option-group
									name="diet"
									keep-color
									inline
									dense
									class="q-mr-md petrona text-1rem"
									v-model="chosenDiets"
									:options="diets"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="health">
								<div class="text-h4 q-mb-md petrona text-primary">
									Health and allergy concerns
								</div>

								<q-option-group
									name="health"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem"
									v-model="chosenHealths"
									:options="healths"
									color="secondary"
									type="toggle"
								/>

								<p>Chose which ingredients to exclude from the meal.</p>
							</q-tab-panel>
							<q-tab-panel name="lifestyle">
								<div class="text-h4 q-mb-md petrona text-primary">
									Lifestyle choices
								</div>

								<p>Chose from these culinary lifestyle.</p>
								<q-option-group
									name="lifestyle"
									keep-color
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem"
									inline
									v-model="chosenLifestyles"
									:options="lifestyles"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="servings">
								<div class="text-h4 q-mb-md petrona text-primary">
									No of servings
								</div>

								<p>Chose number of servings.</p>
							</q-tab-panel>
							<q-tab-panel name="energy">
								<div class="text-h4 q-mb-md petrona text-primary">
									Max number of calories per serving
								</div>

								<p>Chose the max number per serving.</p>
								<q-option-group
									name="energy"
									keep-color
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem"
									inline
									v-model="chosenCalories"
									:options="energy"
									color="secondary"
									type="radio"
								/>
							</q-tab-panel>
						</q-tab-panels>
					</template>
				</q-splitter>
			</div>
		</q-slide-transition>
	</div>
</template>

<script>
	export default {
		name: "recipeSearch",
		data() {
			return {
				tab: "ingredients",
				splitterModel: 15,
				filter: true,
				recipeName: "",
				plusIngredient: "",
				minusIngredient: "",
				chosenIngredientsPlus: ["one", "two", "three"],
				chosenIngredientsMinus: ["one", "two", "three"],

				chosenCuisines: [],
				chosenDiets: [],
				chosenLifestyles: [],
				chosenHealths: [],
				chosenTimes: 0,
				chosenMeals: [],
				chosenDish: [],
				chosenCalories: 0,
				cuisines: [
					{
						label: "American",
						value: "American",
						selected: false,
					},
					{
						label: "Asian",
						value: "Asian",
						select: false,
					},
					{
						label: "British",
						value: "British",
						selected: false,
					},
					{
						label: "Caribbean",
						value: "Caribbean",
						selected: false,
					},
					{
						label: "Central-European",
						value: "Central-European",
						selected: false,
					},
					{
						label: "Chinese",
						value: "Chinese",
						selected: false,
					},
					{
						label: "Eastern-European",
						value: "Eastern-European",
						selected: false,
					},
					{
						label: "French",
						value: "French",
						selected: false,
					},
					{
						label: "Indian",
						value: "Indian",
						selected: false,
					},
					{
						label: "Italian",
						value: "Italian",
						selected: false,
					},
					{
						label: "Japanese",
						value: "Japanese",
						selected: false,
					},
					{
						label: "Kosher",
						value: "Kosher",
						selected: false,
					},
					{
						label: "Mediterranean",
						value: "Mediterranean",
						selected: false,
					},
					{
						label: "Mexican",
						value: "Mexican",
						selected: false,
					},
					{
						label: "Middle-Eastern",
						value: "Middle-Eastern",
						selected: false,
					},
					{
						label: "Nordic",
						value: "Nordic",
						selected: false,
					},
					{
						label: "South-American",
						value: "South-American",
						selected: false,
					},
					{
						label: "Vietnamese",
						value: "Vietnamese",
						selected: false,
					},
				],
				diets: [
					{
						label: "Balanced",
						value: "balanced",
						selected: false,
					},
					{
						label: "High-fiber",
						value: "high-fiber",
						selected: false,
					},
					{
						label: "High-protein",
						value: "high-protein",
						selected: false,
					},
					{
						label: "Low-carbs",
						value: "low-carb",
						selected: false,
					},
					{
						label: "Low-fat",
						value: "low-fat",
						selected: false,
					},
					{
						label: "Low-sodium",
						value: "low-sodium",
						selected: false,
					},
				],
				lifestyles: [
					{
						label: "Vegetarian",
						value: "vegetarian",
						selected: false,
					},
					{
						label: "Vegan",
						value: "vegan",
						selected: false,
					},
					{
						label: "Alcohol-free",
						value: "alcohol-free",
						selected: false,
					},
					{
						label: "Immune-supportive",
						value: "immuno-supportive",
						selected: false,
					},
					{
						label: "Gluten-free",
						value: "gluten-free",
						selected: false,
					},
					{
						label: "Kosher",
						value: "kosher",
						selected: false,
					},
					{
						label: "Pescatarian",
						value: "pecatarian",
						selected: false,
					},
					{
						label: "Keto",
						value: "keto-friendly",
						selected: false,
					},
					{
						label: "Paleo",
						value: "paleo",
						selected: false,
					},
				],
				healths: [
					{
						label: "Peanut-free",
						value: "peanut-free",
						selected: false,
					},
					{
						label: "Tree nuts free",
						value: "tree-nut-free",
						selected: false,
					},
					{
						label: "Crustacean-free",
						value: "crustacean-free",
						selected: false,
					},
					{
						label: "Shellfish-free",
						value: "shellfish-free",
						selected: false,
					},
					{
						label: "Gluten-free",
						value: "gluten-free",
						selected: false,
					},
					{
						label: "Dairy-free",
						value: "dairy-free",
						selected: false,
					},
					{
						label: "Egg-free",
						value: "egg-free",
						selected: false,
					},
					{
						label: "Fish-free",
						value: "fish-free",
						selected: false,
					},
					{
						label: "FODMAP free",
						value: "fodmap-free",
						selected: false,
					},
					{
						label: "Pork free",
						value: "pork-free",
						selected: false,
					},
					{
						label: "Red meat free",
						value: "red-meat-free",
						selected: false,
					},
					{
						label: "Wheat free",
						value: "wheat-free",
						selected: false,
					},
					{
						label: "Sesame free",
						value: "sesame-free",
						selected: false,
					},
					{
						label: "Celery free",
						value: "celery-free",
						selected: false,
					},
					{
						label: "Lupine free",
						value: "lupine-free",
						selected: false,
					},
					{
						label: "Mustard free",
						value: "mustard-free",
						selected: false,
					},
					{
						label: "Soy free",
						value: "soy-free",
						selected: false,
					},
					{
						label: "No oil added",
						value: "No-oil-added",
						selected: false,
					},
					{
						label: "Extreme low fat",
						value: "low-fat-abs",
						selected: false,
					},
					{
						label: "No sugar",
						value: "low-sugar",
						selected: false,
					},
					{
						label: "Sugar conscious",
						value: "sugar-conscious",
						selected: false,
					},
					{
						label: "Low potassium",
						value: "low-potassium",
						selected: false,
					},
					{
						label: "Kidney friendly",
						value: "kidney-friendly",
						selected: false,
					},
				],
				times: [
					{
						label: "10min",
						value: 10,
						selected: false,
					},
					{
						label: "15min",
						value: 15,
						selected: false,
					},
					{
						label: "20min",
						value: 20,
						selected: false,
					},
					{
						label: "30min",
						value: 30,
						selected: false,
					},
					{
						label: "45min",
						value: 45,
						selected: false,
					},
					{
						label: "1hr",
						value: 60,
						selected: false,
					},
					{
						label: "2hr",
						value: 120,
						selected: false,
					},
				],
				meal: [
					{
						label: "Lunch",
						value: "Lunch",
						selected: false,
					},
					{
						label: "Dinner",
						value: "Dinner",
						selected: false,
					},
					{
						label: "Snack",
						value: "Snack",
						selected: false,
					},
					{
						label: "Teatime",
						value: "Teatime",
						selected: false,
					},
					{
						label: "Breakfast",
						value: "Breakfast",
						selected: false,
					},
				],
				dish: [
					{
						value: "Starter",
						label: "Starter",
						selected: false,
					},
					{
						label: "Soup",
						value: "Soup",
						selected: false,
					},
					{
						label: "Sandwiches",
						value: "Sandwiches",
						selected: false,
					},
					{
						label: "Salad",
						value: "Salad",
						selected: false,
					},
					{
						label: "Preserve",
						value: "Preserve",
						selected: false,
					},
					{
						label: "Preps",
						value: "Preps",
						selected: false,
					},
					{
						label: "Pancake",
						value: "Pancake",
						selected: false,
					},
					{
						label: "Omelet",
						value: "Omelet",
						selected: false,
					},
					{
						label: "Main Course",
						value: "Main course",
						selected: false,
					},
					{
						label: "Egg",
						value: "Egg",
						selected: false,
					},
					{
						label: "Desserts",
						value: "Desserts",
						selected: false,
					},
					{
						label: "Drinks",
						value: "Drinks",
						selected: false,
					},
					{
						label: "Condiments and sauces",
						value: "Condiments and sauces",
						selected: false,
					},
					{
						label: "Cereals",
						value: "Cereals",
						selected: false,
					},
					{
						label: "Bread",
						value: "Bread",
						selected: false,
					},
					{
						label: "Biscuits and cookies",
						value: "Biscuits and cookies",
						selected: false,
					},
					{
						label: "Alcohol-cocktail",
						value: "Alcohol-cocktail",
						selected: false,
					},
				],
				energy: [
					{
						label: "100kcal",
						value: 100,
						selected: false,
					},
					{
						label: "150kcal",
						value: 150,
						selected: false,
					},
					{
						label: "200kcal",
						value: 200,
						selected: false,
					},
					{
						label: "250kcal",
						value: 250,
						selected: false,
					},
					{
						label: "350kcal",
						value: 350,
						selected: false,
					},
					{
						label: "500kcal",
						value: 500,
						selected: false,
					},
					{
						label: "750kcal",
						value: 750,
						selected: false,
					},
					{
						label: "1000kcal",
						value: 1000,
						selected: false,
					},
					{
						label: "1500kcal",
						value: 1500,
						selected: false,
					},
				],
			};
		},
		methods: {
			search() {
				console.log(this.recipeName);
			},

			removeMin(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenIngredientsMinus = this.chosenIngredientsMinus.filter(
					(ele) => ele !== item
				);
			},

			removePlus(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenIngredientsPlus = this.chosenIngredientsPlus.filter(
					(ele) => ele !== item
				);
			},
			addPlusIngredient(val) {
				if (this.plusIngredient) {
					this.chosenIngredientsPlus.push(this.plusIngredient);
					this.plusIngredient = "";
					return;
				} else {
					this.notify("negative");
					this.$q.notify("The field must have value");
				}
			},
			addMinusIngredient(val) {
				if (this.minusIngredient) {
					this.chosenIngredientsMinus.push(this.minusIngredient);
					this.minusIngredient = "";
					return;
				} else {
					this.notify("negative");
					this.$q.notify("The field must have value");
				}
			},
			notify(type) {
				this.$q.notify.setDefaults({
					position: "center",
					type: type,
					timeout: 1500,
					message: "The field must have value",
					textColor: "white",
					actions: [{ icon: "close", color: "white" }],
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep div.flex-center {
		justify-content: flex-start;
	}
</style>