<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<the-header v-on:open="openRight"></the-header>
			<q-drawer absolute v-model="right" side="right">
				<the-user-panel v-on:open="openRight"></the-user-panel>
			</q-drawer>

			<q-page-container>
				<router-view />
			</q-page-container>

			<q-footer class="bg-black text-white text-center">
				<q-toolbar class="row column justify-center align-center">
					<q-toolbar-title class="q-my-md">
						<a
							class="petrona footer-link"
							href="mailto:contactwerecipe@gmail.com"
						>
							contactwerecipe@gmail.com</a
						>
					</q-toolbar-title>
					<div>
						<img src="../assets/edamam.png" alt="edamam attribution logo" />
					</div>
				</q-toolbar>
			</q-footer>
		</q-layout>
	</div>
</template>

<script>
	export default {
		name: "MainLayout",
		components: {
			TheHeader: () => import("../components/TheHeader"),
			TheUserPanel: () => import("../components/TheUser"),
		},

		data() {
			return {
				right: false,
			};
		},
		methods: {
			openRight() {
				this.right = !this.right;
			},
		},
	};
</script>
<style  lang="scss" scoped>
	.footer-link:link,
	.footer-link:visited {
		color: white;
		text-decoration: none;
		font-size: 14px;
		transition: 0.3s;
		border-bottom: 1px solid;
		border-color: $primary;
	}
	.footer-link:hover {
		border-color: transparent;
	}
</style>