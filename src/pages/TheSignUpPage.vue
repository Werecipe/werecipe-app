<template>
	<div
		class="q-px-md q-py-sm flex flex-center column rounded-borders bg-white text-primary"
	>
		<h1 class="text-h3 q-px-lg georgeItalic">Sign Up</h1>
		<div class="column wrap full-width q-pa-lg">
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="full-width row wrap justify-center items-center content-center"
				autocomplete="off"
			>
				<div
					class="col-xs-12 col-sm-6 col-md-3 q-gutter-y-sm overflow-auto q-mb-md"
				>
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
					<div>
						<q-toggle
							v-model="accept"
							label="I accept the license and terms"
							color="positive"
							size="2.2rem"
						/>
					</div>
					<q-btn
						label="sign up"
						type="submit"
						color="secondary"
						:disable="!accept"
					/>
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
	import { mapActions } from "vuex";
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
				accept: false,

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
			};
		},
		computed: {
			userPayload() {
				let user = {
					email: this.email,
					username: this.username,
					name: this.name,
					surname: this.surname,
					gender: this.gender,
					age: this.age,
					chosenCuisines: this.chosenCuisines,
					chosenDiets: this.chosenDiets,
					chosenLifestyles: this.chosenLifestyles,
					chosenHealths: this.chosenHealths,
					chosenTimes: this.chosenTimes,
				};
				return user;
			},
		},

		methods: {
			...mapActions("auth", ["registerUser"]),

			addToArray(item) {
				console.log(item);
				this.chosenCuisines.push(item);
			},

			onSubmit() {
				this.registerUser({ data: this.userPayload, pass: this.password });
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