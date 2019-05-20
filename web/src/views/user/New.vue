<template>
	<div class="user-categories">
		<div class="row">
			<div class="col-lg-4">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">New product</h2>
					</div>
					<div class="card-body">
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
							<label for="name">Pans amount</label>
							<input
								type="number"
								class="form-control"
								id="name"
								v-model="newProduct.pans_all"
							/>
						</div>
					</div>
					<button class="btn btn-primary" @click="addProduct()">Add item</button>
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
			newProduct: {
				name: "",
				category: "",
                brand: "",
                type: "collection",
                pans_all: 1
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

		// Product
		addProduct() {
			fetch("http://localhost:3001/products/new", {
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
						this.newProduct.name = "";
						this.newProduct.category = "";
						this.newProduct.brand = "";
						this.newProduct.pans_all = 1;
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
			fetch("http://localhost:3001/users/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify(this.editInfo)
			})
				.then(res => res.json())
				.then(data => {
					this.getUser();
					this.newCategory.created = [];
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.row {
	@media screen and(max-width: 800px) {
		display: grid;
		grid-template-columns: repeat(3, 100%);
		transition: 2s all;
		scroll-snap-type: x mandatory;
		overflow-x: scroll;

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
