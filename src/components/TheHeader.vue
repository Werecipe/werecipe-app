<template>
	<q-header class="bg-white q-py-lx q-px-md">
		<q-toolbar class="bg-white text-secondary q-my-md">
			<!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
			<img src="../assets/werecipe-logo.png" alt="" width="140px" />

			<q-space />

			<q-tabs
				align="right"
				dense
				class="georgeBold"
				active-color="white"
				active-bg-color="secondary"
				indicator-color="secondary"
			>
				<q-route-tab to="/" label="Home" />
				<q-route-tab to="/login" label="Log in" />

				<q-route-tab to="/sign-up" label="Sign Up" />
			</q-tabs> </q-toolbar
	></q-header>
</template>

<script>
	export default {
		data() {
			return {
				model: "one",
			};
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .q-tab__label {
		font-size: 1.2rem;
	}
</style>