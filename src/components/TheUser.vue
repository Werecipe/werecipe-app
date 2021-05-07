<template>
	<div :width="200" :breakpoint="767" @click="open">
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
					<span>{{ userDetail.username }}</span>
				</div>
				<div>
					<span>{{ userDetail.email }}</span>
				</div>
			</div>
		</q-img>
		<q-scroll-area style="height: 250px">
			<q-list padding>
				<q-item clickable v-ripple to="/myRecipes">
					<q-item-section avatar>
						<q-icon name="menu_book" />
					</q-item-section>

					<q-item-section> recipes </q-item-section>
				</q-item>

				<q-item active clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="star" />
					</q-item-section>

					<q-item-section> Star </q-item-section>
				</q-item>

				<q-item clickable v-ripple>
					<q-item-section avatar>
						<q-icon name="send" />
					</q-item-section>

					<q-item-section> Send </q-item-section>
				</q-item>

				<q-item clickable v-ripple to="/" @click="logout">
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
			...mapState("auth", ["userDetail"]),
		},

		methods: {
			...mapActions("auth", ["logoutUser"]),

			logout() {
				this.logoutUser();
			},

			open() {
				console.log("opened");
				this.$emit("open");
			},
		},
	};
</script>

<style>
</style>