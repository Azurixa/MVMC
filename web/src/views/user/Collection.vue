<template>
	<div class="my-collection">
		<h1 class="text-center mb-4">
			My Collection
		</h1>
		<div class="row">
			<div class="col-lg-1"></div>
			<div class="col-lg-10">
				<div class="row">
					<div
						class="col-lg-4"
						v-for="(category, index) in collection"
						:key="'category_' + index"
					>
						<div class="card">
							<div class="card-header">
								<h3 class="m-0">{{ category.category }}</h3>
							</div>
							<div class="card-body">
								<router-link
									class="product d-block"
									v-for="product in category.products"
									:key="product._id"
									:to="'/me/p/' + product._id"
								>
									{{ product.name }}
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-1"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			collection: []
		};
	},
	created() {
		this.getCollection();
	},
	methods: {
		getCollection() {
			fetch("http://localhost:3001/products/my", {
				headers: {
					Authorization: this.$store.getters.token
				}
			})
				.then(res => res.json())
				.then(data => {
					this.collection = data;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.product {
	font-size: 1.1rem;
	padding: 0.5rem;
	border: 1px solid rgba($color: #000000, $alpha: 0.07);
	margin-top: 1rem;
	&:first-child {
		margin-top: 0;
	}
}
</style>
