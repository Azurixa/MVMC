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
							<label for="status">Status</label><br>
							<div
								class="status"
								:class="{ active: product.status == '1inuse' }"
								@click="changeStatus('1inuse')"
							>
								In use
							</div>
							<div
								class="status"
								:class="{ active: product.status == '9empty' }"
								@click="changeStatus('9empty')"
							>
								Empty
							</div>
						</div>
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
							<label for="price">Price (PLN)</label>
							<input
								type="number"
								id="price"
								v-model="product.price"
								class="form-control"
								@keydown="edditedChange"
							/>
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
						<div class="form-group">
							<label for="bought_at">Bought date</label>
							<input
								type="date"
								id="bought_at"
								v-model="product.bought_at"
								class="form-control"
								@change="edditedChange"
							/>
						</div>
						<div class="form-group">
							<label for="expire_months">Expire months</label>
							<input
								type="number"
								id="expire_months"
								v-model="product.expire_months"
								class="form-control"
								@keydown="edditedChange"
							/>
						</div>
					</div>
					<div class="danger-zone card m-2">
						<div
							class="card-header"
							onClick="this.nextElementSibling.toggleAttribute('show')"
						>
							<div class="row">
								<div class="col-6">
									<span>Danger zone</span>
								</div>
								<div class="col-6 text-right">
									<i class="bx bx-sort"></i>
								</div>
							</div>
						</div>

						<div class="card-body content">
							<button
								class="btn btn-danger btn-block"
								@click="removeProduct"
							>
								Remove product
							</button>
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
				this.$store.getters.apiUrl + "products/product/" +
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
		removeProduct() {
			fetch(this.$store.getters.apiUrl + "products/remove", {
				method: "DELETE",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ _id: this.product._id })
			})
				.then(res => res.json())
				.then(() => {
					window.location.href = "/me/collection";
				});
		},
		updateProduct() {
			fetch(this.$store.getters.apiUrl + "products/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ product: this.product })
			})
				.then(res => res.json())
				.then(() => {
					//console.log(data);
					this.eddited = false;
					window.location.href = "/me/p/" + this.$route.params.id;
				});
		},
		edditedChange() {
			this.eddited = true;
		},
		changeStatus(status) {
			this.product.status = status;
			this.eddited = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.status {
	margin-right: 0.5rem;
	padding: 0.5rem;
	border: 1px solid rgba(#000, 0.1);
	border-radius: 1.5rem;
    display: inline-block;
	&.active {
		background: #000;
		color: white;
	}
}
.eddited {
	position: sticky;
	z-index: 2000;
	bottom: 75px;
}
.danger-zone {
	.content {
		height: 0px;
		overflow: hidden;
		.btn {
			display: none;
		}
		&[show] {
			height: unset;
			.btn {
				display: block;
			}
		}
	}
}
</style>


