<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<the-header></the-header>

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
		name: "Main",
		components: {
			TheHeader: () => import("../components/TheHeader"),
		},

		data() {
			return {};
		},
		methods: {
			openRight() {
				this.right = !this.right;
			},
		},
	};
</script>
