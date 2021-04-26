<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<TheHeader></TheHeader>
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
			// TheLoginPage: () => import("../pages/TheLogInPage"),
		},

		data() {
			return {};
		},
	};
</script>
