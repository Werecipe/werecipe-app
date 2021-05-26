<template>
	<div :width="200" :breakpoint="767" @click="open()">
		<q-img
			class=""
			src="https://cdn.quasar.dev/img/material.png"
			style="height: 150px"
		>
			<div class="absolute-bottom bg-transparent">
				<q-avatar size="56px" class="q-mb-sm">
					<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
				</q-avatar>
				<div class="text-weight-bold">
					<span>{{ userDetails.username }}</span>
				</div>
				<div>
					<span>{{ userDetails.email }}</span>
				</div>
			</div>
		</q-img>
		<q-scroll-area style="height: 250px">
			<q-list padding>
				<q-item active clickable v-ripple to="/userAccount">
					<q-item-section avatar>
						<q-icon name="person" />
					</q-item-section>

					<q-item-section> Account </q-item-section>
				</q-item>
				<q-item clickable v-ripple to="/myRecipes">
					<q-item-section avatar>
						<q-icon name="menu_book" />
					</q-item-section>

					<q-item-section> Recipes </q-item-section>
				</q-item>

				<!-- <q-item clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="send" />
					</q-item-section>

					<q-item-section> Send </q-item-section>
				</q-item> -->

				<q-item clickable v-ripple @click="logout()">
					<q-item-section avatar>
						<q-icon name="logout" />
					</q-item-section>

					<q-item-section> Log-out </q-item-section>
				</q-item>
			</q-list>
		</q-scroll-area>
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	export default {
		name: "userPanel",

		computed: {
			...mapState("auth", ["userDetails"]),
		},

		methods: {
			...mapActions("auth", ["logoutUser"]),

			logout() {
				this.logoutUser();
			},

			open() {
				this.$emit("open");
			},
		},
	};
</script>

<style>
</style>