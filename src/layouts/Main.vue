<template>
	<div>
		<q-layout view="hHh lpR fFf">
			<the-header></the-header>

			<q-page-container>
				<router-view />
			</q-page-container>

			<q-footer class="bg-black text-white text-center">
				<q-toolbar>
					<q-toolbar-title>
						<a
							class="petrona footer-link"
							href="mailto:contactwerecipe@gmail.com"
						>
							contactwerecipe@gmail.com</a
						>
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

<style lang="scss">
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
