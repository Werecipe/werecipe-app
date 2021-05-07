<template>
	<div
		class="q-pa-xl flex flex-center column login-style rounded-borders bg-white text-primary shadow-5"
	>
		<h1 class="text-h3 georgeItalic">Log in</h1>
		<div class="q-gutter-y-xs flex column justify-center">
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-xs q-pa-lg text-primary"
			>
				<q-input
					outlined
					v-model="email"
					label="email"
					type="email"
					standout="dark bg-white"
					dense
					:rules="[
						(val) =>
							(val && val.length > 0) || 'Please enter a valid email address',
					]"
				/>
				<q-input
					v-model="password"
					dense
					outlined
					lazy-rules
					:type="isPwd ? 'password' : 'text'"
					hint="Click on the eye icon to display the password"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>

				<div class="q-my-lg">
					<q-btn label="Log in" type="submit" color="secondary" />
					<q-btn
						label="Reset"
						type="reset"
						color="warning"
						flat
						class="q-ml-sm"
					/>
				</div>
			</q-form>
			<p class="text-center text-h5">
				Or
				<router-link to="./sign-up" class="underline cursor-pointer"
					>Sign-up</router-link
				>
			</p>
		</div>
	</div>
</template>


<script>
	import { mapActions } from "vuex";
	export default {
		name: "Login",
		data() {
			return {
				email: "",
				password: "",
				isPwd: true,
			};
		},
		methods: {
			...mapActions("auth", ["loginUser"]),

			onSubmit() {
				this.loginUser({ email: this.email, pass: this.password });
				// this.$router.push("/recipeSearch");
			},

			onReset() {
				this.email = "";
				this.password = "";
			},
		},
	};
</script>

<style lang="scss">
	.login-style {
		width: fit-content;
		margin: 0 auto;
	}
</style>