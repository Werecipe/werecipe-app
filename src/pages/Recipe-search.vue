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
				@keydown.enter.prevent="search"
			>
				<template v-slot:append>
					<q-icon name="search" clickable @click="search" />
				</template>
			</q-input>
			<p class="petrona text-primary">
				Use the filter options bellow to narrow down your search
			</p>
		</div>
		<div class="row justify-start items-center border-bottom">
			<q-btn
				flat
				icon="manage_search"
				@click="filter = !filter"
				label="filter"
				color="primary"
				no-caps
				size="md"
			/>
			<div class="">
				<q-btn flat color="negative" label="reset" no-caps @click="reset()" />
			</div>

			<p class="q-mb-none q-pb-none petrona text-primary">
				Your filter parameters:

				<span v-show="chosenIngredientsMinus">
					<span
						v-for="item in chosenIngredientsMinus"
						:key="item"
						@click="removeMin(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeMin(item)"
							color="transparent"
							text-color="primary"
						>
							<q-icon name="remove"></q-icon>{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenMeals">
					<span
						v-for="item in chosenMeals"
						:key="item"
						@click="removeMeal(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeMeal(item)"
							color="transparent"
							text-color="primary"
						>
							{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenDish">
					<span
						v-for="item in chosenDish"
						:key="item"
						@click="removeDish(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeDish(item)"
							color="transparent"
							text-color="primary"
						>
							{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenCuisines">
					<span
						v-for="item in chosenCuisines"
						:key="item"
						@click="removeCuisine(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeCuisine(item)"
							color="transparent"
							text-color="primary"
						>
							{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenTimes">
					<span @click="removeTime()" class="cursor-pointer">
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeTime()"
							color="transparent"
							text-color="primary"
						>
							{{ chosenTimes }}min
						</q-chip>
					</span>
				</span>
				<span v-show="chosenDiets">
					<span
						v-for="item in chosenDiets"
						:key="item"
						@click="removeDiet(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeDiet(item)"
							color="transparent"
							text-color="primary"
						>
							{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenHealths">
					<span
						v-for="item in chosenHealths"
						:key="item"
						@click="removeHealth(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeHealth(item)"
							color="transparent"
							text-color="primary"
						>
							{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenLifestyles">
					<span
						v-for="item in chosenLifestyles"
						:key="item"
						@click="removeLifestyle(item)"
						class="cursor-pointer"
					>
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeLifestyle(item)"
							color="transparent"
							text-color="primary"
						>
							{{ item }}
						</q-chip>
					</span>
				</span>
				<span v-show="chosenCalories">
					<span @click="removeCalories()" class="cursor-pointer">
						<q-chip
							removable
							dense
							size="12px"
							@remove="removeCalories()"
							color="transparent"
							text-color="primary"
						>
							{{ chosenCalories }}kcal
						</q-chip>
					</span>
				</span>
			</p>
			<q-space />

			<!-- <p
				v-if="recipesCount"
				class="q-mb-none q-pb-none petrona text-primary text-right q-mr-md"
			>
				result: {{ recipes.count }}
			</p> -->
		</div>
		<q-slide-transition>
			<div v-show="filter">
				<q-splitter v-model="splitterModel" :limits="[100, Infinity]" unit="px">
					<template v-slot:before>
						<q-tabs
							v-model="tab"
							vertical
							dense
							content-class="text-secondary my-class flex-start content-start justify-start"
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
								label="Health"
								no-caps
							/>
							<q-tab
								name="lifestyle"
								icon="self_improvement"
								label="Lifestyle"
								no-caps
							/>

							<q-tab name="energy" icon="bolt" label="Energy" no-caps />
							<q-tab
								no-caps
								@click="
									search();
									filter = !filter;
								"
								><div class="close-btn">
									<q-icon name="close" color="white"></q-icon></div
							></q-tab>
						</q-tabs>
					</template>

					<template v-slot:after>
						<q-tab-panels
							v-model="tab"
							infinite
							animated
							swipeable
							vertical
							keep-alive
							transition-prev="jump-right"
							transition-next="jump-right"
						>
							<q-tab-panel name="ingredients">
								<div class="text-h6 q-mb-md petrona text-primary col-xs-12">
									Ingredients
								</div>
								<div class="row full-width full-height">
									<div class="col-xs-12 col-md-6">
										<p class="petrona text-primary">
											Write ingredients that you don't want in your dish
										</p>
										<div class="list">
											<div class="item multiple-lines row">
												<q-input
													v-model="minusIngredient"
													outlined
													rounded
													dense
													class="col-xs-11"
													placeholder="add ingredient name"
													@keydown.enter.prevent="addMinusIngredient()"
												>
													<template v-slot:append>
														<q-icon
															name="add"
															color="secondary"
															@click="addMinusIngredient()"
														/>
													</template>
												</q-input>
												<div
													class="item-content row column justify-start align-start col-xs-12 col-sm-8 col-md-6 col-lg-4 offset-md-1"
												>
													<q-chip
														v-for="item in chosenIngredientsMinus"
														:key="item"
														removable
														size="14px"
														@remove="removeMin(item)"
														color="transparent"
														text-color="primary"
													>
														<q-icon name="remove"></q-icon>{{ item }}
													</q-chip>
												</div>
											</div>
										</div>
									</div>
								</div>
							</q-tab-panel>

							<q-tab-panel name="meal" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Meal
								</div>

								<q-option-group
									name="meals"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
									v-model="chosenMeals"
									:options="meal"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>

							<q-tab-panel name="dish" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Dish
								</div>

								<q-option-group
									name="dish"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
									v-model="chosenDish"
									:options="dish"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="cuisine" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Worlds cuisines
								</div>

								<q-option-group
									name="cuisines"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
									v-model="chosenCuisines"
									:options="cuisines"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="time" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Max meal cooktime
								</div>

								<q-option-group
									name="time"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
									v-model="chosenTimes"
									:options="times"
									color="secondary"
									type="radio"
								/>
							</q-tab-panel>
							<q-tab-panel name="diet" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Dietary choices
								</div>

								<q-option-group
									name="diet"
									keep-color
									inline
									dense
									class="q-mr-md petrona text-1rem col-lg-6"
									v-model="chosenDiets"
									:options="diets"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="health" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Health and allergy concerns
								</div>

								<q-option-group
									name="health"
									keep-color
									inline
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
									v-model="chosenHealths"
									:options="healths"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>
							<q-tab-panel name="lifestyle" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Lifestyle choices
								</div>

								<q-option-group
									name="lifestyle"
									keep-color
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
									inline
									v-model="chosenLifestyles"
									:options="lifestyles"
									color="secondary"
									type="toggle"
								/>
							</q-tab-panel>

							<q-tab-panel name="energy" class="row">
								<div class="text-h6 q-mb-md petrona text-primary col-lg-12">
									Max number of calories
								</div>

								<q-option-group
									name="energy"
									keep-color
									dense
									size="2.2rem"
									class="q-mr-md petrona text-1rem col-lg-6"
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

		<div class="q-pa-md row items-center justify-center q-gutter-sm">
			<recipe-card
				v-for="el in recipes.hits"
				:key="el.index"
				v-bind="el"
			></recipe-card>
		</div>
	</div>
</template>

<script>
	import { API_ID, API_KEY } from "../../Edamam-key.js";
	export default {
		name: "recipeSearch",
		components: {
			recipeCard: () => import("../components/recipeCard"),
		},
		data() {
			return {
				tab: "ingredients",
				splitterModel: 15,
				filter: false,
				recipeName: "",
				// plusIngredient: "",
				minusIngredient: "",
				// chosenIngredientsPlus: [],
				chosenIngredientsMinus: [],
				chosenCuisines: [],
				chosenDiets: [],
				chosenLifestyles: [],
				chosenHealths: [],
				chosenTimes: 0,
				chosenMeals: [],
				chosenDish: [],
				chosenCalories: 0,
				// allChoises:[],
				displaychoises: [],
				to: 100,
				from: 0,
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
						label: "Central European",
						value: "Central European",
						selected: false,
					},
					{
						label: "Chinese",
						value: "Chinese",
						selected: false,
					},
					{
						label: "Eastern European",
						value: "Eastern European",
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
						label: "Middle Eastern",
						value: "Middle Eastern",
						selected: false,
					},
					{
						label: "Nordic",
						value: "Nordic",
						selected: false,
					},
					{
						label: "South American",
						value: "South American",
						selected: false,
					},
					{
						label: "South East Asian",
						value: "South East Asian",
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
				recipes: {},
			};
		},

		computed: {
			dispayNumber(num) {
				return num.ToString();
			},

			dietValue() {
				let dietVal = "";
				this.chosenDiets.forEach((element) => (dietVal += "&diet=" + element));
				return dietVal;
			},

			healthValue() {
				let healthVal = "";
				this.chosenHealths.forEach((el) => (healthVal += "&health=" + el));
				this.chosenLifestyles.forEach((el) => (healthVal += "&health=" + el));
				return healthVal;
			},

			cuisineValue() {
				let cuisineVal = "";
				this.chosenCuisines.forEach((el) => (cuisineVal += "&cuisineType=" + el));
				return cuisineVal;
			},

			mealValue() {
				let mealVal = "";
				this.chosenMeals.forEach((el) => (mealVal += "&mealType=" + el));
				return mealVal;
			},

			dishValue() {
				let dishVal = "";
				this.chosenDish.forEach((el) => (dishVal += "&dishType=" + el));
				return dishVal;
			},

			caloriesValue() {
				let caloriesVal = "";
				if (this.chosenCalories) {
					caloriesVal += "&calories=" + this.chosenCalories;
				}
				return caloriesVal;
			},

			timeValue() {
				let timeVal = "";
				if (this.chosenTimes) {
					timeVal += "&time=" + this.chosenTimes;
				}
				return timeVal;
			},

			excludedValue() {
				let excludedVal = "";
				this.chosenIngredientsMinus.forEach(
					(el) => (excludedVal += "&excluded=" + el)
				);
				return excludedVal;
			},
			recipesCount() {
				return this.recipes.count;
			},
		},

		methods: {
			async search() {
				let responseApi = await fetch(
					`https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&to=100&q=${this.recipeName}${this.dietValue}${this.healthValue}${this.cuisineValue}${this.mealValue}${this.dishValue}${this.caloriesValue}${this.timeValue}${this.excludedValue}`
				);
				let data = await responseApi.json();
				console.log(data);
				this.recipes = data;
			},

			reset() {
				this.chosenIngredientsMinus = [];
				// this.chosenIngredientsPlus = [];
				this.chosenDiets = [];
				this.chosenDish = [];
				this.chosenCuisines = [];
				this.chosenLifestyles = [];
				this.chosenLifestyles = [];
				this.chosenMeals = [];
				this.chosenHealths = [];
				this.chosenTimes = 0;
				this.chosenCalories = 0;
			},

			removeMin(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenIngredientsMinus = this.chosenIngredientsMinus.filter(
					(ele) => ele !== item
				);
			},

			// removePlus(item) {
			// 	// console.log(this.chosenIngredientsMinus + " and " + item);
			// 	this.chosenIngredientsPlus = this.chosenIngredientsPlus.filter(
			// 		(ele) => ele !== item
			// 	);
			// },

			removeMeal(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenMeals = this.chosenMeals.filter((ele) => ele !== item);
			},

			removeDish(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenDish = this.chosenDish.filter((ele) => ele !== item);
			},

			removeDiet(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenDiets = this.chosenDiets.filter((ele) => ele !== item);
			},

			removeHealth(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenHealths = this.chosenHealths.filter((ele) => ele !== item);
			},

			removeCuisine(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenCuisines = this.chosenCuisines.filter((ele) => ele !== item);
			},

			removeLifestyle(item) {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenLifestyles = this.chosenLifestyles.filter(
					(ele) => ele !== item
				);
			},

			removeTime() {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenTimes = 0;
			},

			removeCalories() {
				// console.log(this.chosenIngredientsMinus + " and " + item);
				this.chosenCalories = 0;
			},

			// addPlusIngredient(val) {
			// 	if (this.plusIngredient) {
			// 		this.chosenIngredientsPlus.push(this.plusIngredient);
			// 		this.plusIngredient = "";
			// 		return;
			// 	} else {
			// 		this.notify("negative");
			// 		this.$q.notify("The field must have value");
			// 	}
			// },

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
	// ::v-deep div.flex-center {
	// 	justify-content: flex-start;
	// }
	.close-btn {
		background: $positive;
		position: relative;
		left: -10px;
		min-width: 100px;
		width: 100%;
		height: 100%;
	}
</style>