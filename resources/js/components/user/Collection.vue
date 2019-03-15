<template>
    <div id="projectpan">

        <div class="row m-0 main-box">

            <!-- Box with forms to adding new stuff -->
            <div class="toolbox" id="toolbox">
                <div class="inside">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card p-2 mb-4">

                                <p class="h4">
                                    Create new category
                                </p>
                                <div class="form-group">
                                    <input v-model="formData.newCategory.name" class="form-control" placeholder="Name"
                                           @keyup.enter="createCategory()">
                                </div>
                                <div>
                                    <button class="btn btn-primary" @click="createCategory()">Add new category</button>
                                </div>
                            </div>

                            <div class="card p-2 mb-4">
                                <p class="h4">
                                    Create new brand
                                </p>
                                <div class="form-group">
                                    <input v-model="formData.newBrand.name" class="form-control" placeholder="Name"
                                           @keyup.enter="createBrand()">
                                </div>
                                <div>
                                    <button class="btn btn-primary" @click="createBrand()">Add new brand</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="card p-2">
                                <p class="h4">
                                    Create new product
                                </p>
                                <div>
                                    <div class="form-group">
                                        <label for="category">Category of product</label>
                                        <select v-model="formData.newProduct.categoryId" class="form-control"
                                                id="category">
                                            <option v-for="category in categories" :value=category.id>{{category.name}}
                                            </option>
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

                    <i class='bx bx-x close close-adding'
                       onClick="document.getElementById('toolbox').toggleAttribute('show')"></i>

                </div>
            </div>

            <div class="collection" id="collection">
                <p class="header">My collection <small>({{allProductsCount}}/{{allProductsCountEmpty}})</small></p>
                <div class="category" v-for="item in allProducts">
                    <span onClick="this.nextSibling.nextSibling.toggleAttribute('show')" class="category">
                        <i class='bx bx-sort'></i> {{item.category.name}} <small>({{item.itemsNotEmpty}}/{{item.itemsEmpty}})</small>
                    </span>
                    <div class="row px-0 px-lg-4">
                        <div class="col-lg-3 col-12 product py-2 py-lg-3" :class="{'empty': product.empty}"
                             v-for="product in item.products"
                             @click="showItem(product.id)"
                             onClick="document.getElementById('collection').toggleAttribute('show')">
                            <div class="d-flex align-items-center">
                                <div class="thumbnail" :style="{backgroundImage: 'url(/' + product.thumbnail + ')'}">

                                </div>
                                <div class="info">
                                    <p class="text-left">
                                        <span class="brand badge badge-dark">{{product.brand}}</span>
                                        <span class="item">
                                            {{product.name}}
                                        </span><br>
                                        <i class="bx bxs-star"></i>{{product.rating}}
                                        <i class="bx bx-expand" v-show="product.pan">P</i>
                                        <i class="bx bxs-plus-circle"></i>{{product.uses_count}}
                                    </p>
                                    <div class="progress amount mr-2" v-show="!product.empty">
                                        <div class="progress-bar"
                                             :style="{width: product.remaining_amount + '%'}">
                                        </div>
                                    </div>
                                    <strong v-show="product.empty" class="text-dark text-left mb-0">This product is empty.</strong>
                                </div>
                            </div>
                            <!--<div class="thumbnail"-->
                            <!--:style="{backgroundImage: 'url(/' + product.thumbnail + ')'}"></div>-->
                        </div>
                    </div>
                </div>
            </div>

            <div class="activity-box">

                <!-- Product show container -->
                <div class="product-show-placeholder" v-show="!productShow.visible">
                    <div>
                        <h1>
                            Click product to show it
                        </h1>
                        <p>
                            Or add new products to your collection!
                        </p>
                    </div>
                    <div class="tips1">
                        <p class="m-0">
                            <i class='bx bx-chevron-down'></i> Show collection / add new items
                        </p>
                    </div>
                </div>

                <!-- Active product box -->
                <active-product v-show="productShow.visible"></active-product>

            </div>
        </div>

        <div class="footer-box">

            <!-- Collection toggle button -->
            <div onClick="document.getElementById('collection').toggleAttribute('show')" class="toggle-collection"
                 data-toggle="tooltip" data-placement="top" title="Show collection">
                <i class='bx bx-collection m-0'></i>
                <p>
                    Collection
                </p>
            </div>

            <!-- Toggle of adding new stuff (+) -->
            <div onClick="document.getElementById('toolbox').toggleAttribute('show')" class="toggle-toolbox"
                 data-toggle="tooltip"
                 data-placement="top" title="Show toolbox">
                <i class='bx bx-window'></i>
                <p>
                    Toolbox
                </p>
            </div>

        </div>


    </div>
</template>

<script>

    export default {
        name: 'collection',
        created() {
            // Getting categories
            this.getCategoriesAndProducts();
            setInterval(() => {
                this.getCategoriesAndProducts();
            }, 4000);
            // Tooltips refresh
            setTimeout(() => {
                window.reloadAll();
            }, 500);
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                allProducts: {},
                allProductsCount: 0,
                allProductsCountEmpty: 0,
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
                formData.append('photo', '');
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

            // WOHA
            getCategoriesAndProducts() {
                this.getBrands();
                this.getCategories();
                fetch('/api/user/products', {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.allProducts = data;

                    let count = 0;
                    let countEmpty = 0;
                    this.allProducts.forEach(items => {
                        items.products.forEach(item => {
                            if (!item.empty) {
                                count++;
                            } else {
                                countEmpty++;
                            }
                        });
                    });
                    this.allProductsCount = count;
                    this.allProductsCountEmpty = countEmpty;
                });
            },

            showItem(itemId) {
                this.productShow.visible = true;
                this.productShow.productId = itemId;
                this.$children[0].showItem(itemId);
            },

        }
    }
</script>