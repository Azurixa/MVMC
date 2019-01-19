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

        <div class="row m-0 main-box">

            <div class="collection">
                <p class="h2">Collection</p>
                <ul>
                    <li v-for="item in allProducts">
                        <span onClick="this.nextSibling.nextSibling.toggleAttribute('shown')" class="category">{{item.category.name}}</span>
                        <ul shown>
                            <li v-for="product in item.products">
                                <span class="brand badge badge-info">{{product.brand}}</span> <span
                                    @click="showItem(product.id)"
                                    class="item">{{product.name}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="activity-box">

                <div class="product-show" v-show="productShow.visible">

                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-75 mx-auto" src="http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg" alt="First slide">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-75 mx-auto" src="http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg" alt="Second slide">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-75 mx-auto" src="http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg" alt="Third slide">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>

                    <div class="body">
                        <div class="row">

                            <div class="col-lg-9">

                                <h1 class="mb-4">
                                    {{productShow.productData.brand.name}}
                                    <span @click="showEdit('name')" v-show="!productShow.editForm.nameVisible">
                                {{productShow.productData.name}}
                            </span>
                                    <div class="edit-form" v-show="productShow.editForm.nameVisible">
                                        <input type="text" class="edit-form name" v-model="productShow.editForm.value"
                                               @keyup.enter="editConfirm()">
                                        <button class="btn btn-primary" @click="editConfirm()">Edit</button>
                                    </div>
                                </h1>
                                <div>
                                    <h4>
                                        Description
                                    </h4>
                                    <p @click="showEdit('description')"
                                       v-show="!productShow.editForm.descriptionVisible">
                                        <span v-if="productShow.productData.description === null">
                                            Add description...
                                        </span>
                                        {{productShow.productData.description}}
                                    </p>
                                    <div class="edit-form pb-3" v-show="productShow.editForm.descriptionVisible">
                                        <textarea class="description" v-model="productShow.editForm.value"></textarea>
                                        <button class="btn btn-primary" @click="editConfirm()">Edit</button>
                                    </div>
                                </div>
                                <div>
                                    <h4>
                                        First impressions
                                    </h4>
                                    <p @click="showEdit('first_impressions')"
                                       v-show="!productShow.editForm.firstImpressionsVisible">
                                <span v-if="productShow.productData.first_impressions === null">
                                    Add first impressions...
                                </span>
                                        {{productShow.productData.first_impressions}}
                                    </p>
                                    <div class="edit-form pb-3" v-show="productShow.editForm.firstImpressionsVisible">
                                        <textarea class="description" v-model="productShow.editForm.value"></textarea>
                                        <button class="btn btn-primary" @click="editConfirm()">Edit</button>
                                    </div>
                                </div>

                            </div>

                            <div class="col-lg-3 stats text-right">
                                <div class="uses_count ml-auto">{{productShow.productData.uses_count}}</div>
                            </div>

                        </div>
                    </div>
                </div>
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
                },
                productShow: {
                    visible: false,
                    productData: {
                        brand: {},
                    },
                    editForm: {
                        nameVisible: false,
                        descriptionVisible: false,
                        firstImpressionsVisible: false,
                        ratingVisible: false,
                        updatesVisible: false,
                        remainingAmountVisible: false,
                        whatEditing: '',
                        value: '',
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

            showItem(itemId) {
                fetch('/api/user/product/' + itemId, {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.productShow.productData = data;
                    this.productShow.visible = true;
                });
            },

            // FRONT END

            showEdit(what) {

                if (this.productShow.editForm.whatEditing !== '') {
                    this.productShow.editForm.nameVisible = false;
                    this.productShow.editForm.descriptionVisible = false;
                    this.productShow.editForm.firstImpressionsVisible = false;
                    this.productShow.editForm.ratingVisible = false;
                    this.productShow.editForm.updatesVisible = false;
                    this.productShow.editForm.photosVisible = false;
                    this.productShow.editForm.remainingAmountVisible = false;
                    this.productShow.editForm.value = '';
                    this.productShow.editForm.whatEditing = '';
                } else {
                    if (what === 'name') {
                        this.productShow.editForm.nameVisible = true;
                        this.productShow.editForm.value = this.productShow.productData.name;
                    }
                    if (what === 'description') {
                        this.productShow.editForm.descriptionVisible = true;
                        this.productShow.editForm.value = this.productShow.productData.description;
                    }
                    if (what === 'first_impressions') {
                        this.productShow.editForm.firstImpressionsVisible = true;
                        this.productShow.editForm.value = this.productShow.productData.first_impressions;
                    }
                    this.productShow.editForm.whatEditing = what;
                }
            },

            editConfirm() {
                const formData = new FormData();
                formData.append('value', this.productShow.editForm.value);
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/' + this.productShow.editForm.whatEditing, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.showEdit();
                    this.showItem(this.productShow.productData.id);
                    this.getCategoriesAndProducts();
                });
            },
        }
    }
</script>