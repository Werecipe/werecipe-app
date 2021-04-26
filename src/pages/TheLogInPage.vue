<template>
	<div
		class="q-pa-xl flex flex-center column q-gutter-y-xl login-style rounded-borders bg-white text-primary shadow-5"
	>
		<h1 class="text-h3">Log in</h1>
		<div class="q-gutter-y-md column">
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-lg q-pa-lg text-primary"
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

				<div>
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
		name: "Login",
		data() {
			return {
				email: "",
				password: "",
				isPwd: true,
			};
		},
		methods: {
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
				this.password = "";
			},
		},
	};
</script>

<style lang="scss">
	.login-style {
		width: fit-content;
		margin: 3rem auto;
	}
</style>