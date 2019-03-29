<template>
    <div id="projectpan">

        <div class="row m-0 main-box">

            <!-- Box with forms to adding new stuff -->
            <div class="toolbox" id="toolbox">
                <div class="inside">
                    <div class="row">
                        <div class="col-lg-12 header-box">
                            <div class="text-center">
                                <i class="bx bx-list-plus display-1"></i>
                                <p v-if="formData.visible.newCategory">
                                    Category
                                </p>
                                <p v-if="formData.visible.newBrand">
                                    Brand
                                </p>
                                <p v-if="formData.visible.newProduct">
                                    Product
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-12" v-if="formData.visible.newCategory">
                            <div class="p-2 mb-4">
                                <p class="h4">
                                    Create new category
                                </p>
                                <div class="form-group">
                                    <input v-model="formData.newCategory.name" class="form-control" placeholder="Name"
                                           @keyup.enter="createCategory()">
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-primary" @click="createCategory()">
                                        Create new category
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12" v-if="formData.visible.newBrand">
                            <div class="p-2 mb-4">
                                <p class="h4">
                                    Create new brand
                                </p>
                                <div class="form-group">
                                    <input v-model="formData.newBrand.name" class="form-control" placeholder="Name"
                                           @keyup.enter="createBrand()">
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-primary" @click="createBrand()">
                                        Create new brand
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12" v-if="formData.visible.newProduct">
                            <div class="p-2">
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
                                               @keyup.enter="createProduct()">
                                    </div>
                                    <div class="form-group">
                                        <textarea v-model="formData.newProduct.description" class="form-control"
                                                  placeholder="Product description"></textarea>
                                    </div>
                                    <div class="text-right">
                                        <button class="btn btn-primary" @click="createProduct()">
                                            Create new product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="close-adding card p-2"
                         onClick="document.getElementById('toolbox').toggleAttribute('show')"
                         @click="showForm()">
                        <i class="bx bx-x close"></i>
                    </div>


                </div>
            </div>

            <div class="collection" id="collection">
                <div class="header-box">
                    <div class="text-center">
                        <i class="bx bx-box display-1"></i>
                        <p class="m-0 pt-3">
                            My collection
                        </p>
                        <small class="text-muted">{{allProductsCount}}/{{allProductsCountEmpty}}</small>
                    </div>
                </div>
                <div class="sorting mb-3 px-3" show>
                    <div class="d-inline-block text-center">
                        <div class="sort card p-2" @click="sortBy('panOnly')"
                             v-bind:class="{'active': sorting.panOnly}">
                            <p class="m-0"><i class='bx bxs-sort-alt'></i> Pan</p>
                        </div>
                    </div>
                    <div class="d-inline-block text-center">
                        <div class="sort card p-2" @click="sortBy('emptyOnly')"
                             v-bind:class="{'active': sorting.emptyOnly}">
                            <p class="m-0"><i class='bx bxs-sort-alt'></i> Empty</p>
                        </div>
                    </div>
                </div>
                <div class="category" v-for="item in allProducts">
                    <span onClick="this.nextSibling.nextSibling.toggleAttribute('show'); this.nextElementSibling.querySelectorAll('.thumbnail').forEach( element => element.setAttribute('style', 'background-image:' + element.style.backgroundImage + ' !important'))"
                          class="category">
                        <i class='bx bx-sort'></i> {{item.category.name}} <small>({{item.itemsNotEmpty}}/{{item.itemsEmpty}})</small>
                    </span>
                    <div class="row px-3">
                        <div class="col-lg-4 col-12 my-1 px-0 px-lg-2" v-for="product in item.products"
                             @click="showItem(product.id)"
                             onClick="document.getElementById('collection').toggleAttribute('show')">
                            <div class="product" :class="{'empty': product.empty}">
                                <div class="d-flex align-items-center">
                                    <div class="thumbnail"
                                         :style="{backgroundImage: 'url(/api/products/photo/' + product.thumbnail + '?size=300)'}">

                                    </div>
                                    <div class="info">
                                        <p class="text-left">
                                            <span class="brand badge badge-dark">{{product.brand}}</span>
                                            <span class="item">
                                            {{product.name}}
                                        </span><br>
                                            <i class="bx bxs-star small-rating" v-for="index in product.rating"></i> |
                                            {{product.rating}}<br>
                                            <i class="bx bxs-plus-circle"></i>{{product.uses_count}}
                                            <i class="bx bx-expand" v-show="product.pan">P</i>
                                        </p>
                                        <div class="progress amount mr-2" v-show="!product.empty">
                                            <div class="progress-bar"
                                                 :style="{width: product.remaining_amount + '%'}">
                                            </div>
                                        </div>
                                        <strong v-show="product.empty" class="text-dark text-left mb-0">This product is
                                            empty.</strong>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="thumbnail"-->
                            <!--:style="{backgroundImage: 'url(/' + product.thumbnail + ')'}"></div>-->
                        </div>
                    </div>
                </div>
                <div class="row mt-3 mb-4" show>

                    <!-- Toggle of adding new stuff (+) -->
                    <div onClick="document.getElementById('collection').toggleAttribute('show'); document.getElementById('toolbox').toggleAttribute('show')"
                         @click="showForm('newCategory')"
                         class="text-center col-4 px-2"
                         data-toggle="tooltip"
                         data-placement="top" title="Show toolbox">
                        <div class="card py-2">
                            <i class='bx bx-list-plus h3 m-0'></i>
                            <p class="m-0">
                                Category
                            </p>
                        </div>
                    </div>
                    <!-- Toggle of adding new stuff (+) -->
                    <div onClick="document.getElementById('collection').toggleAttribute('show'); document.getElementById('toolbox').toggleAttribute('show')"
                         @click="showForm('newBrand')"
                         class="text-center col-4 px-2"
                         data-toggle="tooltip"
                         data-placement="top" title="Show toolbox">
                        <div class="card py-2">
                            <i class='bx bx-list-plus h3 m-0'></i>
                            <p class="m-0">
                                Brand
                            </p>
                        </div>
                    </div>
                    <!-- Toggle of adding new stuff (+) -->
                    <div onClick="document.getElementById('collection').toggleAttribute('show'); document.getElementById('toolbox').toggleAttribute('show')"
                         @click="showForm('newProduct')"
                         class="text-center col-4 px-2"
                         data-toggle="tooltip"
                         data-placement="top" title="Show toolbox">
                        <div class="card py-2">
                            <i class='bx bx-list-plus h3 m-0'></i>
                            <p class="m-0">
                                Product
                            </p>
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
                </div>

                <!-- Active product box -->
                <active-product v-show="productShow.visible"></active-product>

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
                sorting: {
                    panOnly: false,
                    emptyOnly: false,
                    value: '',
                },
                formData: {
                    visible: {
                        newCategory: false,
                        newBrand: false,
                        newProduct: false,
                    },
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

            // Show toolbox / form
            showForm(name) {
                this.formData.visible.newCategory = false;
                this.formData.visible.newBrand = false;
                this.formData.visible.newProduct = false;

                if (name === 'newCategory') {
                    this.formData.visible.newCategory = true;
                }
                if (name === 'newBrand') {
                    this.formData.visible.newBrand = true;
                }
                if (name === 'newProduct') {
                    this.formData.visible.newProduct = true;
                }
            },

            // Sorting
            sortBy(name) {

                this.sorting.value = '';

                if (name === 'panOnly' && this.sorting.panOnly) {
                    this.sorting.panOnly = false;
                } else if (name === 'panOnly') {
                    this.sorting.panOnly = true;
                }

                if (name === 'emptyOnly' && this.sorting.emptyOnly) {
                    this.sorting.emptyOnly = false;
                } else if (name === 'emptyOnly') {
                    this.sorting.emptyOnly = true;
                }

                if (this.sorting.emptyOnly) {
                    this.sorting.value += 'emptyOnly,';
                }
                if (this.sorting.panOnly) {
                    this.sorting.value += 'panOnly,';
                }

                this.getCategoriesAndProducts();
            },

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

                fetch('/api/user/products?sort=' + this.sorting.value, {
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