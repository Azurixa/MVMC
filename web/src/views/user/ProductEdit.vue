<template>
	<div class="product-edit">
		<router-link :to="'/me/p/' + $route.params.id">
			Back to product
		</router-link>
		<div class="row">
			<div class="col-lg-8">
				<div class="card">
					<div class="card-header">
						<h1 class="m-0">
							Product edit
						</h1>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								class="form-control"
								v-model="product.name"
							/>
						</div>
						<div class="form-group">
							<label for="category">Category</label>
							<select
								class="form-control"
								id="category"
								v-model="product.category"
							>
								<option
									v-for="(category, index) in user.categories"
									:value="category"
									:key="'category_' + index"
								>
									{{ category }}
								</option>
							</select>
						</div>
						<div class="form-group">
							<label for="brand">Brand</label>
							<select
								class="form-control"
								id="brand"
								v-model="product.brand"
							>
								<option
									v-for="(brand, index) in user.brands"
									:value="brand"
									:key="'brand' + index"
								>
									{{ brand }}
								</option>
							</select>
						</div>
					</div>
					<button class="btn btn-primary" @click="updateProduct">
						Save product
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			product: {},
			user: {}
		};
	},
	created() {
		this.getProduct();
		this.$store.getters.user.then(user => {
			this.user = user;
		});
	},
	methods: {
		getProduct() {
			fetch(
				"http://localhost:3001/products/product/" +
					this.$route.params.id,
				{
					headers: {
						Authorization: this.$store.getters.token
					}
				}
			)
				.then(res => res.json())
				.then(data => {
					if (data.err) {
						document.location.href = "/404";
					} else {
						this.product = Object.assign({}, data);
					}
				});
		},
		updateProduct() {
			fetch("http://localhost:3001/products/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ product: this.product })
			})
				.then(res => res.json())
				.then(data => console.log(data));
		}
	}
};
</script>

