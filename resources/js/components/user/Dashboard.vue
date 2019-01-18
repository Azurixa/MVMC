<template>
    <div class="container">


        <p>
            Welcome!
        </p>


        <div class="card p-2 my-1">
            <p class="mb-0">Your categories:</p>
            <ul>
                <li v-for="category in categories">
                    {{category.category.name}}
                    <ul>
                        <li v-for="product in category.products">{{product.name}}</li>
                    </ul>
                </li>
            </ul>
            <div class="d-flex">
                <input v-model="formData.newCategory.name" class="form-control" placeholder="Name of new category"
                       @keyup.enter="createCategory()">
                <button class="btn btn-primary" @click="createCategory()">Add</button>
            </div>
        </div>


        <div class="card p-2">
            <p>
                Create new product:
            </p>
            <div>
                <div class="form-group">
                    <select v-model="formData.newProduct.categoryId" class="form-control">
                        <option v-for="category in categories" :value=category.category.id>{{category.category.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input v-model="formData.newProduct.name" class="form-control" placeholder="Name of new product"
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
</template>

<script>
    export default {
        name: 'userDashboard',
        created() {

            // Getting categories
            this.getCategoriesAndProducts();
            setInterval(() => {
                this.getCategoriesAndProducts();
            }, 5000);
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                categories: {},
                formData: {
                    newCategory: {
                        name: '',
                    },
                    newProduct: {
                        categoryId: '',
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
                    this.formData.newCategoryName = '';
                    this.getCategoriesAndProducts();
                });
            },

            // Products

            createProduct() {
                const formData = new FormData();
                formData.append('name', this.formData.newProduct.name);
                formData.append('description', this.formData.newProduct.description);
                formData.append('categoryId', this.formData.newProduct.categoryId);
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
                    this.getCategoriesAndProducts();
                });
            },

            // WOHA
            getCategoriesAndProducts() {
                fetch('/api/user/products', {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => this.categories = data);
            },
        }
    }
</script>