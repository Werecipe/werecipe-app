<template>
	<q-card class="my-card" flat bordered>
		<q-img :src="recipe.image" />

		<q-card-section class="row">
			<div class="text-overline text-secondary col-12">
				Source: {{ recipe.source }}
			</div>

			<div class="text-overline text-secondary col-4 offset-9">
				<q-icon name="restaurant" />: {{ recipe.yield }}
			</div>
			<div class="text-overline text-secondary col-4 offset-9">
				<q-icon name="access_time" />: {{ recipe.totalTime }}min
			</div>

			<div class="text-h6 q-mt-sm q-mb-xs text-primary">{{ recipe.label }}</div>
		</q-card-section>

		<q-card-actions>
			<a :href="recipe.url" target="blank"
				><q-btn flat color="info" label="Go to recipe"
			/></a>
			<q-space />
			<q-btn flat color="primary" label="Ingredients" />

			<q-btn
				color="primary"
				round
				flat
				dense
				:icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
				@click="expanded = !expanded"
			/>
		</q-card-actions>

		<q-slide-transition>
			<div v-show="expanded">
				<q-separator />
				<q-card-section class="text-subitle2">
					<q-list bordered class="rounded-borders" style="max-width: 300px">
						<q-item-label header>Ingredients</q-item-label>

						<q-item
							clickable
							v-ripple
							v-for="item in recipe.ingredients"
							:key="item.index"
						>
							<q-item-section avatar>
								<q-avatar>
									<img :src="item.image" />
								</q-avatar>
							</q-item-section>

							<q-item-section>
								<q-item-label caption lines="2">
									<span class="text-weight-bold">{{ item.text }}</span>
									{{ item.weight.toFixed(2) }}gr
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
			</div>
		</q-slide-transition>
	</q-card>
</template>

<script>
	export default {
		name: "Card",
		props: {
			recipe: {
				type: Object,
			},
		},
		data() {
			return {
				expanded: false,
			};
		},
	};
</script>

<style>
	a {
		text-decoration: none;
	}
</style>