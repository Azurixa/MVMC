<template>
	<div class="user-categories">
		<div class="row">
			<div class="col-lg-4">
				<div class="card new-form">
					<div class="card-header">
						<h2 class="m-0">New product</h2>
					</div>
					<div class="card-body">
						<div class="mb-3">
							<span
								class="type"
								:class="{
									active: newProduct.type == 'collection'
								}"
								@click="changeType('collection')"
							>
								Collection
							</span>
							<span
								class="type"
								:class="{
									active: newProduct.type == 'wishlist'
								}"
								@click="changeType('wishlist')"
							>
								Wishlist
							</span>
						</div>
						<div class="form-group">
							<label for="category">Category</label>
							<select
								class="form-control"
								id="category"
								v-model="newProduct.category"
							>
								<option
									:value="category"
									v-for="(category,
									index) in editInfo.categories"
									:key="'newItemCategory_' + index"
									>{{ category }}</option
								>
							</select>
						</div>
						<div class="form-group">
							<label for="brand">Brand</label>
							<select
								class="form-control"
								id="brand"
								v-model="newProduct.brand"
							>
								<option
									:value="brand"
									v-for="(brand, index) in editInfo.brands"
									:key="'newItemBrand_' + index"
									>{{ brand }}</option
								>
							</select>
						</div>
						<div class="form-group">
							<label for="name">Name</label>
							<input
								type="text"
								class="form-control"
								id="name"
								v-model="newProduct.name"
							/>
						</div>
                        <div class="form-group">
							<label for="price">Price (PLN)</label>
							<input
								type="number"
								class="form-control"
								id="price"
								v-model="newProduct.price"
							/>
						</div>
						<div class="form-group">
							<label for="pans">Pans amount</label>
							<input
								type="number"
								class="form-control"
								id="pans"
								v-model="newProduct.pans_all"
							/>
						</div>
						<div class="form-group" v-if="newProduct.type == 'collection'">
							<div>
								<label for="bought_at">Bought at</label>
								<input
									v-if="!bought_today"
									type="date"
									class="form-control"
									id="bought_at"
									v-model="newProduct.bought_at"
								/>
							</div>
							<div class="form-check mt-1">
								<label class="form-check-label">
									<input
										type="checkbox"
										class="form-check-input"
										id="bought_today"
										v-model="bought_today"
									/>
									Today
								</label>
							</div>
						</div>
						<div class="form-group" v-if="newProduct.type == 'collection'">
							<label for="expire_months">Expire months</label>
							<input
								type="number"
								class="form-control"
								id="expire_months"
								v-model="newProduct.expire_months"
							/>
						</div>
					</div>
					<button class="btn btn-primary" @click="addProduct()">
						Add item
					</button>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">New category</h2>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="category-name">Category name</label>
							<input
								class="form-control"
								id="category-name"
								v-model="newCategory.name"
							/>
						</div>
					</div>
					<button class="btn btn-primary" @click="addCategory">
						Add category
					</button>
				</div>
				<div class="card mt-4">
					<div class="card-header">
						<h2 class="m-0">Your categories</h2>
					</div>
					<div class="card-body list-box">
						<ul
							class="list-group list-group-flush"
							v-for="(category, index) in editInfo.categories"
							:key="'yourCat_' + index"
						>
							<li class="list-group-item">
								<i
									class="bx bx-x"
									@click="removeCategory(index)"
								></i>
								{{ category }}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">New brand</h2>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="brand-name">Brand name</label>
							<input
								class="form-control"
								id="brand-name"
								v-model="newBrand.name"
							/>
						</div>
					</div>
					<button class="btn btn-primary" @click="addBrand">
						Add brand
					</button>
				</div>
				<div class="card mt-4">
					<div class="card-header">
						<h2 class="m-0">Your brands</h2>
					</div>
					<div class="card-body list-box">
						<ul
							class="list-group list-group-flush"
							v-for="(brand, index) in editInfo.brands"
							:key="'yourBrand_' + index"
						>
							<li class="list-group-item">
								<i
									class="bx bx-x"
									@click="removeBrand(index)"
								></i>
								{{ brand }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			editInfo: {},
			bought_today: false,
			newProduct: {
				type: "collection",
				name: "",
				category: "",
				brand: "",
				pans_all: 1,
				bought_at: new Date(),
                expire_months: 0,
                price: 0
			},
			newCategory: {
				name: ""
			},
			newBrand: {
				name: ""
			}
		};
	},
	created() {
		this.getUser();
	},
	methods: {
		getUser() {
			this.$store.commit("getUser");
			this.$store.getters.user.then(user => {
				this.editInfo = Object.assign({}, user);
			});
        },

        changeType(to) {
            this.newProduct.type = to;
        },

		// Product
		addProduct() {
			if (this.bought_today) {
				this.newProduct.bought_at = new Date();
            }
            if (this.newProduct.type == 'wishlist') {
                this.newProduct.bought_at = null;
            }
			fetch(this.$store.getters.apiUrl + "products/new", {
				method: "POST",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(this.newProduct)
			})
				.then(res => res.json())
				.then(data => {
					if (data.err) {
						console.log(data.err);
					} else {
						this.$parent.$refs.navbar.getUserData();
                        this.$parent.$refs.footbar.getUserData();
                        window.location.href = '/me/p/' + data._id;
					}
				});
		},

		// Category
		addCategory() {
			this.editInfo.categories.push(this.newCategory.name);
			this.editInfo.categories.sort();
			this.newCategory.name = "";
			this.updateUser();
		},
		removeCategory(index) {
			this.editInfo.categories.splice(index, 1);
			this.editInfo.categories.sort();
			this.updateUser();
		},

		// Brand
		addBrand() {
			this.editInfo.brands.push(this.newBrand.name);
			this.editInfo.brands.sort();
			this.newBrand.name = "";
			this.updateUser();
		},
		removeBrand(index) {
			this.editInfo.brands.splice(index, 1);
			this.editInfo.brands.sort();
			this.updateUser();
		},

		updateUser() {
			fetch(this.$store.getters.apiUrl + "users/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify(this.editInfo)
			})
				.then(res => res.json())
				.then(() => {
					this.getUser();
					this.newCategory.created = [];
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.type {
	padding: 0.5rem;
	background-color: #f7f7f7;
	border: 1px solid rgba($color: #000000, $alpha: 0.1);
	margin-right: 0.5rem;
	display: inline-block;
	border-radius: 1.5rem;
	font-weight: 1000;
	&.active {
		background-color: black;
		color: white;
	}
}
.row {
	@media screen and(max-width: 800px) {
		display: grid;
		grid-template-columns: repeat(3, 100%);
		transition: 2s all;
		scroll-snap-type: x mandatory;
		overflow-x: scroll;

		.new-form {
			max-height: 76vh;
			overflow-y: scroll;
			padding-bottom: 0.2rem;

			.card-header {
				position: sticky;
				top: 0;
				z-index: 2000;
				background-color: #f7f7f7;
			}
		}
		.col-lg-4 {
			scroll-snap-align: start;
			margin: 0;
		}
	}
}

.list-box {
	height: 40vh;
	overflow-y: scroll;
	scroll-snap-type: y proximity;
}
</style>
