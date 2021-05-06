<template>
	<q-header class="bg-white q-py-lx q-px-md">
		<q-toolbar class="bg-white text-secondary q-my-md" :brakepoint="1024">
			<!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

			<img src="../assets/werecipe-logo.png" alt="" width="140px" />

			<q-space />
			<q-tabs
				align="right"
				dense
				shrink
				inline-label
				size="xs"
				class="georgeBold q-mr-xs"
				:brakepoint="1024"
			>
				<q-route-tab icon="home" to="/" label="Main" />
				<q-route-tab icon="login" to="/login" label="Log in" />
				<q-route-tab icon="person_add" to="/sign-up" label="Sign Up" />
			</q-tabs>
			<q-tabs dense shrink inline-label size="xs" class="georgeBold q-mr-xs">
				<q-route-tab icon="search" to="/recipeSearch" label="Search" />
				<q-btn flat icon="logout" @click="logout" label="Logout" />
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
	// ::v-deep .q-tab__label {
	// 	font-size: 1.2rem;
	// }
</style>