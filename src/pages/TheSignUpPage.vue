<template>
	<div
		class="q-px-xl q-py-md flex flex-center column login-style rounded-borders bg-white text-primary"
	>
		<h1 class="text-h3 self-start q-px-lg">Sign Up</h1>
		<div class="column wrap full-width q-pa-lg">
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="full-width row wrap justify-start items-start content-center"
				autocomplete="off"
			>
				<div class="col-xs-12 col-md-3 q-gutter-y-sm overflow-auto">
					<q-input
						outlined
						v-model="email"
						label="email"
						type="email"
						placeholder="email"
						standout="dark bg-white"
						label-color="info"
						dense
						require
						lazy-rules
						hide-bottom-space
						:rules="[
							(val) =>
								(val && val.length > 0) || 'Please enter a valid email address',
						]"
					/>
					<q-input
						outlined
						v-model="username"
						label="username"
						type="text"
						standout="dark bg-white"
						label-color="info"
						placeholder="username"
						dense
						lazy-rules
						hide-bottom-space
						:rules="[
							(val) =>
								(val && val.length > 0) ||
								'please don\'t lease this field empty',
						]"
					/>
					<q-input
						v-model="password"
						dense
						outlined
						require
						hide-bottom-space
						placeholder="password"
						label-color="info"
						:type="isPwd ? 'password' : 'text'"
						:rules="[
							(val) =>
								val.length > 7 || 'password must be at last 8 characters long',
						]"
						hint="minimum 8 characters"
					>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>
					<q-input
						v-model="passwordTwo"
						dense
						outlined
						require
						hide-bottom-space
						label-color="info"
						placeholder="repeat password"
						:type="isPwdTwo ? 'password' : 'text'"
						hint="Repeat password"
						:rules="[(val) => val === password || 'Enter a matching password']"
					>
						<template v-slot:append>
							<q-icon
								:name="isPwdTwo ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwdTwo = !isPwdTwo"
							/>
						</template>
					</q-input>

					<q-input
						outlined
						v-model="name"
						label="name"
						type="text"
						standout="dark bg-white"
						label-color="info"
						dense
						hide-bottom-space
						placeholder="name"
					/>
					<q-input
						outlined
						v-model="surname"
						label="surname"
						type="text"
						standout="dark bg-white"
						label-color="info"
						dense
						hide-bottom-space
						placeholder="surname"
					/>
					<q-input
						outlined
						v-model="age"
						label="age"
						type="number"
						standout="dark bg-white"
						label-color="info"
						dense
						hide-bottom-space
						placeholder="age"
					/>
					<q-select
						outlined
						dense
						hide-bottom-space
						label-color="info"
						v-model="gender"
						:options="optionsGender"
						label="Gender"
					/>
				</div>
				<div class="col-sm-12 col-md-7 offset-md-1 q-gutter-sm">
					<div class="col-sm-12">
						<p class="georgeBold">Cuisine interests:</p>
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
					</div>
					<div class="col-sm-12">
						<p class="georgeBold">Diet interests:</p>
						<div>
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
						</div>
					</div>
					<div class="col-sm-12">
						<p class="georgeBold">Lifestyle:</p>
						<div>
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
						</div>
					</div>
					<div class="col-sm-12">
						<p class="georgeBold">Health and allergy:</p>
						<div>
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
						</div>
					</div>
					<div class="col-sm-12">
						<p class="georgeBold">Preferred maximum cook time:</p>
						<div>
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
								type="toggle"
							/>
						</div>
					</div>
				</div>
				<div class="q-my-lg">
					<q-btn label="Submit" type="submit" color="secondary" />
					<q-btn
						label="Reset"
						type="reset"
						color="warning"
						flat
						class="q-ml-sm"
					/>
				</div>
			</q-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SignUp",
		data() {
			return {
				email: "",
				username: "",
				password: "",
				passwordTwo: "",
				name: "",
				surname: "",
				gender: "",
				age: "",
				isPwd: true,
				isPwdTwo: true,
				chosenCuisines: [],
				chosenDiets: [],
				chosenLifestyles: [],
				chosenHealths: [],
				chosenTimes: [],

				optionsGender: ["Female", "Male", "Other"],
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
			};
		},
		computed: {
			// selection() {
			// 	return Object.keys(this.cuisines)
			// 		.filter((type) => this.cuisines.selected[type] === true)
			// 		.join(", ");
			// },
			// cuisineArray() {
			// 	return Object.keys(this.cuisines);
			// },
		},

		methods: {
			// chipColor(key) {
			// 	if (this.cuisines.key) {
			// 		return "white";
			// 	} else {
			// 		return "secondary";
			// 	}
			// },

			addToArray(item) {
				console.log(item);
				this.chosenCuisines.push(item);
			},

			onSubmit() {
				this.$q.notify({
					color: "negative",
					textColor: "white",
					icon: "error",
					message: "Wrong email or password, please try again",
				});
			},

			onReset() {
				this.email = "";
				this.username = "";
				this.password = "";
				this.passwordTwo = "";
				this.name = "";
				this.surname = "";
				this.gender = "";
				this.age = "";
			},
		},
	};
</script>

<style>
</style>