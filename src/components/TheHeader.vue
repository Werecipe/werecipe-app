<template>
	<q-header class="bg-white q-py-lx q-px-md">
		<q-toolbar class="bg-white text-secondary q-my-md">
			<!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

			<img src="../assets/werecipe-logo.png" alt="" width="140px" />

			<q-space />
			<q-tabs
				align="right"
				dense
				shrink
				class="georgeBold q-mr-xs"
				active-color="white"
				active-bg-color="secondary"
				indicator-color="secondary"
			>
				<q-route-tab to="/" label="Main" />
				<q-route-tab
					v-if="$route.path !== '/login'"
					to="/login"
					label="Log in"
				/>
				<q-route-tab
					v-if="$route.path !== '/sign-up' "
					to="/sign-up"
					label="Sign Up"
				/>
				<q-route-tab to="/dashboard" label="Home" />
				<q-route-tab to="recipeSearch" label="Recipe search" />
			</q-tabs>

			<q-btn dense flat round icon="person" @click="open" />
		</q-toolbar>
	</q-header>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				model: "one",
			};
		},
		methods: {
			open() {
				this.$emit("open");
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .q-tab__label {
		font-size: 1.2rem;
	}
</style>