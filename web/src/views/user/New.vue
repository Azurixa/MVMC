<template>
	<div class="user-categories">
		<div class="row">
			<div class="col-lg-3 ml-auto">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">New product</h2>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="category">Category</label>
							<select class="form-control" id="category">
								<option
									:value="category"
									v-for="(category, index) in editInfo.categories"
									:key="'newItemCategory_' + index"
								>{{category}}</option>
							</select>
						</div>
                        <div class="form-group">
							<label for="brand">Brand</label>
							<select class="form-control" id="brand">
								<option
									:value="brand"
									v-for="(brand, index) in editInfo.brands"
									:key="'newItemBrand_' + index"
								>{{brand}}</option>
							</select>
						</div>
                        <div class="form-group">
							<label for="name">Name</label>
							<input type="text" class="form-control" id="name">
						</div>
					</div>
                    <button class="btn btn-primary">Add item</button>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">New category</h2>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="category-name">Category name</label>
							<input class="form-control" id="category-name" v-model="newCategory.name">
						</div>
					</div>
					<button class="btn btn-primary" @click="addCategory">Add category</button>
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
								<i class="bx bx-x" @click="removeCategory(index)"></i>
								{{category}}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-lg-3 mr-auto">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">New brand</h2>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="brand-name">Brand name</label>
							<input class="form-control" id="brand-name" v-model="newBrand.name">
						</div>
					</div>
					<button class="btn btn-primary" @click="addBrand">Add brand</button>
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
								<i class="bx bx-x" @click="removeBrand(index)"></i>
								{{brand}}
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

		// Category
		addCategory() {
			this.editInfo.categories.push(this.newCategory.name);
			this.editInfo.categories.sort();
            this.newCategory.name = "";
            this.update();
		},
		removeCategory(index) {
			this.editInfo.categories.splice(index, 1);
            this.editInfo.categories.sort();
            this.update();
		},

		// Brand
		addBrand() {
			this.editInfo.brands.push(this.newBrand.name);
			this.editInfo.brands.sort();
            this.newBrand.name = "";
            this.update();
		},
		removeBrand(index) {
			this.editInfo.brands.splice(index, 1);
            this.editInfo.brands.sort();
            this.update();
		},

		update() {
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

		.col-lg-3 {
			scroll-snap-align: start;
			margin: 0;
		}
	}
}

.list-box {
	height: 45vh;
	overflow-y: scroll;
	scroll-snap-type: y proximity;
}
</style>
