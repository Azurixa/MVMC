<template>
	<div class="product-edit">
		<router-link
			:to="'/me/p/' + $route.params.id"
			class="btn btn-info mb-3"
		>
			Back
		</router-link>
		<div class="row">
			<div class="col-lg-8">
				<div class="card">
					<div class="card-header">
						<h1 class="m-0">
							Edit product
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
								@keydown="edditedChange"
							/>
						</div>
						<div class="form-group">
							<label for="category">Category</label>
							<select
								class="form-control"
								id="category"
								v-model="product.category"
								@change="edditedChange"
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
								@change="edditedChange"
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
						<div class="form-group">
							<label for="description">Description</label>
							<textarea
								name="description"
								id="description"
								rows="6"
								class="form-control"
								v-model="product.description"
								@keydown="edditedChange"
							></textarea>
						</div>
						<div class="form-group">
							<label for="description">First impressions</label>
							<textarea
								name="description"
								id="description"
								rows="6"
								class="form-control"
								v-model="product.first_impressions"
								@keydown="edditedChange"
							></textarea>
						</div>
						<div class="form-group">
							<label for="pans">All pans amount</label>
							<input
								type="number"
								id="pans"
								v-model="product.pans.all"
								class="form-control"
								@keydown="edditedChange"
							/>
						</div>
					</div>
					<button
						class="btn btn-primary"
						@click="updateProduct"
						:class="{ eddited: eddited }"
					>
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
			eddited: false,
			product: {
				pans: {
					all: 0
				}
			},
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
				.then(data => {
					//console.log(data);
					this.eddited = false;
				});
		},
		edditedChange() {
			this.eddited = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.eddited {
	position: sticky;
	z-index: 2000;
	bottom: 75px;
}
</style>


