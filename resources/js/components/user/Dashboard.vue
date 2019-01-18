<template>
    <div id="projectpan">

        <div class="toolbox-show" onClick="$('.toolbox-what').toggle()">
            <i class="bx bx-plus m-0"></i>
        </div>
        <div class="toolbox-what">
            <p>New category</p>
            <p>New brand</p>
            <p>New product</p>
        </div>
        <div class="toolbox">
            <div class="inside">
                <div class="card p-2 m-auto">

                    <div class="card p-2 mb-2">
                        <p>
                            Create new category:
                        </p>
                        <div class="d-flex">
                            <input v-model="formData.newCategory.name" class="form-control"
                                   placeholder="Name"
                                   @keyup.enter="createCategory()">
                            <button class="btn btn-primary" @click="createCategory()">Add</button>
                        </div>
                    </div>

                    <div class="card p-2 mb-2">
                        <p>
                            Create new brand:
                        </p>
                        <div class="d-flex">
                            <input v-model="formData.newBrand.name" class="form-control"
                                   placeholder="Name"
                                   @keyup.enter="createBrand()">
                            <button class="btn btn-primary" @click="createBrand()">Add</button>
                        </div>
                    </div>

                    <div class="card p-2">
                        <p>
                            Create new product:
                        </p>
                        <div>
                            <div class="form-group">
                                <label for="category">Category</label>
                                <select v-model="formData.newProduct.categoryId" class="form-control" id="category">
                                    <option v-for="category in categories" :value=category.id>{{category.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="brand">Brand</label>
                                <select v-model="formData.newProduct.brandId" class="form-control" id="brand">
                                    <option v-for="brand in brands" :value=brand.id>{{brand.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input v-model="formData.newProduct.name" class="form-control"
                                       placeholder="Name of new product"
                                       @keyup.enter="createProduct()">
                            </div>
                            <div class="form-group">
                        <textarea v-model="formData.newProduct.description" class="form-control"
                                  placeholder="Product description"></textarea>
                            </div>
                            <button class="btn btn-primary" @click="createProduct()">Add new product</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="row m-0">

            <div class="col-lg-3">
                <div class="card p-2 my-1">
                    <p class="mb-0">Your collection:</p>
                    <ul>
                        <li v-for="item in allProducts">
                            <span onClick="$(this).next().toggle()" class="category">{{item.category.name}}</span>
                            <ul>
                                <li v-for="product in item.products">
                                    <span class="badge badge-info">{{product.brand}}</span> : {{product.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-9">
                <p>
                    Welcome!
                </p>

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'userDashboard',
        created() {

            // Getting categories
            this.getCategoriesAndProducts();
            setInterval(() => {
                this.getCategoriesAndProducts();
            }, 10000);
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                allProducts: {},
                categories: {},
                brands: {},
                formData: {
                    newCategory: {
                        name: '',
                    },
                    newBrand: {
                        name: '',
                    },
                    newProduct: {
                        categoryId: '',
                        brandId: '',
                        name: '',
                        description: '',
                    },
                }
            }
        },
        methods: {

            // Categories

            createCategory() {
                const formData = new FormData();
                formData.append('name', this.formData.newCategory.name);
                fetch('/api/user/create/category', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.formData.newCategory.name = '';
                    this.getCategoriesAndProducts();
                });
            },

            deleteCategory(categoryId) {
                const formData = new FormData();
                formData.append('id', categoryId);
                fetch('/api/user/delete/category', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.getCategoriesAndProducts();
                });
            },

            getCategories() {
                fetch('/api/user/categories', {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => this.categories = data);
            },

            // Brands

            createBrand() {
                const formData = new FormData();
                formData.append('name', this.formData.newBrand.name);
                fetch('/api/user/create/brand', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.formData.newBrand.name = '';
                    this.getCategoriesAndProducts();
                });
            },

            deleteBrand(brandId) {
                const formData = new FormData();
                formData.append('id', brandId);
                fetch('/api/user/delete/brand', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.getCategoriesAndProducts();
                });
            },

            getBrands() {
                fetch('/api/user/brands', {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => this.brands = data);
            },

            // Products

            createProduct() {
                const formData = new FormData();
                formData.append('name', this.formData.newProduct.name);
                formData.append('description', this.formData.newProduct.description);
                formData.append('categoryId', this.formData.newProduct.categoryId);
                formData.append('brandId', this.formData.newProduct.brandId);
                formData.append('photo', 'TODO');
                fetch('/api/user/create/product', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.formData.newProduct.name = '';
                    this.formData.newProduct.categoryId = '';
                    this.formData.newProduct.brandId = '';
                    this.formData.newProduct.description = '';
                    this.getCategoriesAndProducts();
                });
            },

            deleteProduct(productId) {
                const formData = new FormData();
                formData.append('id', productId);
                fetch('/api/user/delete/product', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.getCategoriesAndProducts();
                });
            },

            // WOHA
            getCategoriesAndProducts() {
                this.getBrands();
                this.getCategories();
                fetch('/api/user/products', {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => this.allProducts = data);
            },
        }
    }
</script>