<template>
	<q-header class="bg-white q-py-lx q-px-md">
		<q-toolbar class="bg-white text-secondary q-my-md" :brakepoint="1024">
			<!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

			<router-link to="/"
				><img src="../assets/werecipe-logo.png" alt="" width="100px"
			/></router-link>

			<q-space />
			<q-tabs
				v-if="!userDetails.userId"
				align="right"
				dense
				shrink
				inline-label
				size="xs"
				class="georgeBold q-mr-xs"
				:brakepoint="1024"
			>
				<!-- <q-route-tab
					v-if="$route.path !== '/'"
					icon="home"
					to="/"
					label="Main"
				/> -->
				<q-route-tab
					v-if="$route.path == '/sign-up'"
					icon="login"
					to="/login"
					label="Log in"
				/>
				<q-route-tab
					v-if="$route.path == '/login'"
					icon="person_add"
					to="/sign-up"
					label="Sign Up"
				/>
			</q-tabs>
			<q-tabs
				v-else
				dense
				shrink
				inline-label
				size="xs"
				class="georgeBold q-mr-xs"
			>
				<q-route-tab icon="search" to="/recipeSearch" label="Search" />
				<!-- <q-btn flat icon="logout" @click="logout" label="Logout" /> -->
			</q-tabs>

			<q-btn
				v-if="userDetails.userId"
				dense
				flat
				round
				color="info"
				icon="person"
				@click="open"
			/>
		</q-toolbar>
	</q-header>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		components: {},
		data() {
			return {
				model: "one",
			};
		},
		computed: {
			...mapState("auth", ["userDetails"]),

			// routerPath() {
			// 	let routePath = this.$route.fullPath;
			// 	console.log(routePath);
			// 	return routePath;
			// },
		},
		methods: {
			open() {
				this.$emit("open");
			},
			logout() {
				this.$router.replace("/");
			},
		},
	};
</script>

<style lang="scss" scoped>
	// ::v-deep .q-tab__label {
	// 	font-size: 1.2rem;
	// }
</style>