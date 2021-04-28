<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<the-header v-on:open="openRight"></the-header>
			<q-drawer absolute v-model="right" side="right">
				<the-user-panel></the-user-panel>
			</q-drawer>

			<q-page-container>
				<router-view />
			</q-page-container>

			<q-footer class="bg-black text-white">
				<q-toolbar>
					<q-toolbar-title>
						<q-avatar>
							<img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
						</q-avatar>
						Title
					</q-toolbar-title>
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