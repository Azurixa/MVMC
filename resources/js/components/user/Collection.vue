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
                <p class="header">My collection ({{allProductsCount}})</p>
                <div class="category" v-for="item in allProducts">
                    <span onClick="this.nextSibling.nextSibling.toggleAttribute('show')" class="category">
                        <i class='bx bx-sort'></i> {{item.category.name}} ({{item.products.length}})
                    </span>
                    <div class="row">
                        <div class="col-lg-3 col-12 product py-3 py-lg-4" v-for="product in item.products"
                             @click="showItem(product.id)"
                             onClick="document.getElementById('collection').toggleAttribute('show')">
                            <div class="d-flex align-items-center">
                                <div class="thumbnail" :style="{backgroundImage: 'url(/' + product.thumbnail + ')'}">

                                </div>
                                <div class="info">
                                    <p class="text-left">
                                        <i class="bx bxs-star"></i>{{product.rating}}
                                        <span class="brand badge badge-info">{{product.brand}}</span>
                                        <span class="item">
                                            {{product.name}} |
                                         </span>
                                        <small>
                                            <i class="bx bx-expand" v-show="product.pan">P</i>
                                            <i class="bx bxs-plus-circle"></i>{{product.uses_count}}
                                        </small>
                                    </p>
                                    <div class="progress amount">
                                        <div class="progress-bar"
                                             :style="{width: product.remaining_amount + '%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="thumbnail"-->
                            <!--:style="{backgroundImage: 'url(/' + product.thumbnail + ')'}"></div>-->
                        </div>
                    </div>
                </div>
            </div>

            <div class="activity-box">

                <div class="edit-box" v-show="productShow.editForm.visible">

                    <div class="form card p-4">

                        <i class='bx bx-x close' @click="showEdit('')"></i>

                        <h2 class="mb-4">
                            Edit product
                        </h2>

                        <div v-show="productShow.editForm.nameVisible">
                            <div class="form-group">
                                <input type="text" class="form-control mb-2" v-model="productShow.editForm.value"
                                       @keyup.enter="editConfirm()" autofocus>
                                <button class="btn btn-primary" @click="editConfirm()">Edit name</button>
                            </div>
                        </div>

                        <div v-show="productShow.editForm.descriptionVisible">
                            <div class="form-group">
                                <textarea class="description form-control mb-2" v-model="productShow.editForm.value"
                                          @keydown.enter="editConfirm()" autofocus></textarea>
                                <button class="btn btn-primary" @click="editConfirm()">Edit description</button>
                            </div>
                        </div>

                        <div v-show="productShow.editForm.firstImpressionsVisible">
                            <textarea class="description form-control mb-2" v-model="productShow.editForm.value"
                                      @keydown.enter="editConfirm()" autofocus></textarea>
                            <button class="btn btn-primary" @click="editConfirm()">Edit first impressions</button>
                        </div>

                        <div v-show="productShow.editForm.remainingAmountVisible">
                            <div class="form-group">
                                <input class="form-control mb-2" type="number" min="0" max="100"
                                       v-model="productShow.editForm.value"
                                       @keydown.enter="editConfirm()" autofocus>
                                <button class="btn btn-primary" @click="editConfirm()">Edit remaining amount</button>
                            </div>
                        </div>

                        <div v-show="productShow.editForm.boughtAtVisible">
                            <div class="form-group">
                                <input class="form-control mb-2" type="date" v-model="productShow.editForm.value"
                                       @keydown.enter="editConfirm()" autofocus>
                                <button class="btn btn-primary" @click="editConfirm()">Edit bought date</button>
                            </div>
                        </div>

                        <div v-show="productShow.editForm.expireMonthsVisible">
                            <div class="form-group">
                                <input class="form-control mb-2" type="number" min="0"
                                       v-model="productShow.editForm.value"
                                       @keydown.enter="editConfirm()" autofocus>
                                <button class="btn btn-primary" @click="editConfirm()">Edit expire months</button>
                            </div>
                        </div>

                    </div>
                </div>

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

                <div class="product-show" v-show="productShow.visible">

                    <!-- Body of product show box -->
                    <div class="body">
                        <div class="row p-0 m-0">

                            <!-- Main box of product information -->
                            <div class="col-lg-8 p-0">

                                <!-- Gallery of product photos -->
                                <div class="gallery m-2">

                                    <div v-for="(photo, index) in productShow.productData.photos"
                                         onclick="gallery(this)"
                                         :style="{ 'background-image': 'url(/' + photo.image + ')' }"
                                         class="gallery-image">
                                        <div class="date">
                                            <p class="m-0">{{photo.date}}</p>
                                        </div>
                                        <div class="delete close"
                                             @click="removePhoto(productShow.productData.photos.length - index - 1)">
                                            <i class='bx bxs-trash'></i>
                                        </div>
                                        <div class="first close"
                                             @click="setFirstPhoto(productShow.productData.photos.length - index - 1)">
                                            <i class='bx bx-first-page'></i>
                                        </div>
                                    </div>

                                    <!-- New photo input box -->
                                    <div class="gallery-image new" onclick="gallery(this)">
                                        <div v-show="!productShow.editForm.photoSending">
                                            <h2>Add new photo</h2>
                                            <div class="">
                                                <input class="mb-3" type="file" id="file" ref="file"
                                                       @change="handleFileUpload()">
                                            </div>
                                            <button @click="addPhoto()"><i class="bx bx-plus"></i> Add photo</button>
                                        </div>
                                        <div v-show="productShow.editForm.photoSending" class="m-0">
                                            <h2 class="m-0"><i class='bx bx-loader-alt bx-spin'></i> Sending photo</h2>
                                        </div>
                                    </div>

                                </div>

                                <!-- Progress bar of remaining amount -->
                                <div class="p-0 m-2">
                                    <div class="progress mt-1" @click="showEdit('remaining_amount')"
                                         data-toggle="tooltip"
                                         data-placement="bottom" title="Change remaining amount">
                                        <div class="progress-bar amount" role="progressbar"
                                             :style="{width: productShow.productData.remaining_amount + '%'}">
                                            {{productShow.productData.remaining_amount}} %
                                        </div>
                                    </div>
                                </div>

                                <div class="mx-2 mt-2 mb-0 mb-lg-2 card p-3">
                                    <h1>
                                        {{productShow.productData.brand.name}}
                                        <strong>{{productShow.productData.name}}</strong>
                                        <span @click="showEdit('name')" data-toggle="tooltip" data-placement="bottom"
                                              title="Change product name"><i class='bx bx-highlight'></i></span>
                                    </h1>
                                    <div class="row">
                                        <div class="col-lg-6">

                                            <div class="rating mb-1">
                                    <span @click="rateProduct(1)"
                                          class="bx"
                                          :class="{'bxs-star animated tada': productShow.productData.rating > 0, 'bx-star': productShow.productData.rating < 1}"
                                          data-toggle="tooltip" data-placement="top" title="1">
                                    </span>
                                                <span @click="rateProduct(2)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 1, 'bx-star': productShow.productData.rating < 2}"
                                                      data-toggle="tooltip" data-placement="top" title="2">
                                    </span>
                                                <span @click="rateProduct(3)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 2, 'bx-star': productShow.productData.rating < 3}"
                                                      data-toggle="tooltip" data-placement="top" title="3">
                                    </span>
                                                <span @click="rateProduct(4)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 3, 'bx-star': productShow.productData.rating < 4}"
                                                      data-toggle="tooltip" data-placement="top" title="4">
                                    </span>
                                                <span @click="rateProduct(5)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 4, 'bx-star': productShow.productData.rating < 5}"
                                                      data-toggle="tooltip" data-placement="top" title="5">
                                    </span>
                                                <span @click="rateProduct(6)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 5, 'bx-star': productShow.productData.rating < 6}"
                                                      data-toggle="tooltip" data-placement="top" title="6">
                                    </span>
                                                <span @click="rateProduct(7)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 6, 'bx-star': productShow.productData.rating < 7}"
                                                      data-toggle="tooltip" data-placement="top" title="7">
                                    </span>
                                                <span @click="rateProduct(8)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 7, 'bx-star': productShow.productData.rating < 8}"
                                                      data-toggle="tooltip" data-placement="top" title="8">
                                    </span>
                                                <span @click="rateProduct(9)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 8, 'bx-star': productShow.productData.rating < 9}"
                                                      data-toggle="tooltip" data-placement="top" title="9">
                                    </span>
                                                <span @click="rateProduct(10)"
                                                      class="bx"
                                                      :class="{'bxs-star animated tada': productShow.productData.rating > 9, 'bx-star': productShow.productData.rating < 10}"
                                                      data-toggle="tooltip" data-placement="top" title="10">
                                    </span>
                                            </div>

                                            <p class="dates"
                                               v-show="productShow.productData.bought_at === '01.01.1970'">
                                                Add bought date
                                                <span @click="showEdit('bought_at')" data-toggle="tooltip"
                                                      data-placement="bottom"
                                                      title="Change bought date">
                                        <i class='bx bx-highlight'></i>
                                    </span>
                                                Add expire months
                                                <span @click="showEdit('expire_months')" data-toggle="tooltip"
                                                      data-placement="bottom"
                                                      title="Change expire months">
                                        <i class='bx bx-highlight'></i>
                                    </span>
                                            </p>
                                            <p class="dates"
                                               v-show="productShow.productData.bought_at !== '01.01.1970'">
                                                Bought <strong>{{productShow.productData.bought_at}}</strong>
                                                <span @click="showEdit('bought_at')" data-toggle="tooltip"
                                                      data-placement="bottom"
                                                      title="Change bought date">
                                        <i class='bx bx-highlight'></i>
                                    </span>

                                                <span :class="{'text-danger': productShow.productData.expired}">
                                        Expires <strong>{{productShow.productData.expire_date}}</strong>
                                        <span @click="showEdit('expire_months')" data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Change expire months">
                                            <i class='bx bx-highlight'></i>
                                        </span>
                                    </span>
                                            </p>
                                        </div>

                                        <div class="col-lg-6">

                                            <!-- Container for product uses count -->
                                            <div class="stats">
                                                <div class="if-pan ml-auto" data-toggle="tooltip"
                                                     data-placement="top" title="Tag as panned [3xp]"
                                                     v-show="!productShow.productData.pan"
                                                     @click="panProduct(1)">
                                                    <div class="m-0 text-center">
                                                        <p class="m-0">Pan</p>
                                                    </div>
                                                </div>
                                                <div class="if-pan true ml-auto" data-toggle="tooltip"
                                                     data-placement="top" title="Tag as not panned [-3xp]"
                                                     v-show="productShow.productData.pan"
                                                     @click="panProduct(0)">
                                                    <div class="m-0 text-center">
                                                        <p class="m-0">Pan</p>
                                                    </div>
                                                </div>
                                                <div class="uses_count" @click="addProductUse()" data-toggle="tooltip"
                                                     data-placement="top" title="Add use [1xp]">
                                                    <div class="m-0 text-center">
                                                        <p class="mb-0 h5" id="active-uses-count">
                                                            {{productShow.productData.uses_count}}</p>
                                                        <small>uses</small>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>


                            </div>

                            <div class="col-lg-4 p-0">
                                <div class="m-2 card p-3">
                                    <h4>
                                        Description
                                        <span @click="showEdit('description')" data-toggle="tooltip"
                                              data-placement="bottom" title="Change description"><i
                                                class='bx bx-highlight'></i></span>
                                    </h4>
                                    <p class="text-justify">
                                        <span v-if="productShow.productData.description === null">
                                            Add description...
                                        </span>
                                        {{productShow.productData.description}}
                                    </p>
                                </div>

                                <div class="m-2 card p-3">
                                    <h4>
                                        First impressions
                                        <span @click="showEdit('first_impressions')" data-toggle="tooltip"
                                              data-placement="bottom" title="Change first impressions"><i
                                                class='bx bx-highlight'></i></span>
                                    </h4>
                                    <p class="text-justify">
                                        <span v-if="productShow.productData.first_impressions === null">
                                            Add first impressions...
                                        </span>
                                        {{productShow.productData.first_impressions}}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

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
            }, 10000);
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
                        expired: false,
                        rating: 0,
                        brand: {},
                        photos: {},
                    },
                    editForm: {
                        visible: false,
                        nameVisible: false,
                        descriptionVisible: false,
                        firstImpressionsVisible: false,
                        remainingAmountVisible: false,
                        boughtAtVisible: false,
                        expireMonthsVisible: false,
                        photoSending: false,
                        whatEditing: '',
                        file: '',
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
                }).then(res => res.json()).then(data => {
                    this.allProducts = data;

                    let count = 0;
                    this.allProducts.forEach(item => {
                        count += item.products.length;
                    });
                    this.allProductsCount = count;
                });
            },

            showItem(itemId) {
                fetch('/api/user/product/' + itemId, {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.productShow.productData = data;
                    this.productShow.visible = true;
                    this.checkExpired();
                    setTimeout(() => {
                        window.refreshGallery();
                        window.reloadAll();
                    }, 50);
                });
            },

            checkExpired() {

                const date = new Date();
                const exDate = this.productShow.productData.expire_date;

                const exDay = exDate.substring(0, 2);
                const exMonth = exDate.substring(3, 5);
                const exYear = exDate.substring(6, 10);
                const nowDay = date.getDate();
                const nowMonth = date.getMonth() + 1;
                const nowYear = date.getFullYear();

                if (nowYear > exYear) {
                    this.productShow.productData.expired = true;
                    return 1;
                } else if (nowYear === exYear) {
                    if (nowMonth > exMonth) {
                        this.productShow.productData.expired = true;
                        return 1;
                    } else if (nowMonth === exMonth) {
                        if (nowDay >= exDay) {
                            this.productShow.productData.expired = true;
                            return 1;
                        }
                    }
                }
                this.productShow.productData.expired = false;
            },

            // FRONT END

            showEdit(what) {

                if (this.productShow.editForm.whatEditing !== '') {
                    this.productShow.editForm.visible = false;
                    this.productShow.editForm.nameVisible = false;
                    this.productShow.editForm.descriptionVisible = false;
                    this.productShow.editForm.firstImpressionsVisible = false;
                    this.productShow.editForm.remainingAmountVisible = false;
                    this.productShow.editForm.boughtAtVisible = false;
                    this.productShow.editForm.expireMonthsVisible = false;
                    this.productShow.editForm.value = '';
                    this.productShow.editForm.whatEditing = '';
                } else {
                    this.productShow.editForm.visible = true;
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
                    if (what === 'remaining_amount') {
                        this.productShow.editForm.remainingAmountVisible = true;
                        this.productShow.editForm.value = this.productShow.productData.remaining_amount;
                    }
                    if (what === 'bought_at') {
                        this.productShow.editForm.boughtAtVisible = true;
                        this.productShow.editForm.value = this.productShow.productData.bought_at;
                    }
                    if (what === 'expire_months') {
                        this.productShow.editForm.expireMonthsVisible = true;
                        this.productShow.editForm.value = this.productShow.productData.expire_months;
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

            addProductUse() {
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/useAdd', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productShow.productData.id);
                    this.getCategoriesAndProducts();

                    // Animate uses counter
                    document.getElementById('active-uses-count').classList.add('animated', 'flipInY');
                    setTimeout(() => {
                        document.getElementById('active-uses-count').classList.remove('animated', 'flipInY');
                    }, 1000);
                });
            },

            // Pan

            panProduct(value) {
                const formData = new FormData();
                formData.append('value', value);
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/pan', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productShow.productData.id);
                    this.getCategoriesAndProducts();

                    // Animate button
                    if (value === 1) {
                        document.querySelector('.if-pan.true').classList.add('animated', 'tada');
                    }
                });
            },

            // Rating

            rateProduct(rating) {
                const formData = new FormData();
                formData.append('value', rating);
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/rating', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productShow.productData.id);
                    this.getCategoriesAndProducts();
                });
            },

            // Photos

            handleFileUpload() {
                this.productShow.editForm.file = this.$refs.file.files[0];
            },
            addPhoto() {
                this.productShow.editForm.photoSending = true;
                const formData = new FormData();
                formData.append('photo', this.productShow.editForm.file);
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/addPhoto', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    document.getElementById('file').value = '';
                    this.productShow.editForm.file = '';
                    this.showItem(this.productShow.productData.id);
                    this.getCategoriesAndProducts();
                    this.productShow.editForm.photoSending = false;
                });
            },
            removePhoto(photoIndex) {
                fetch('/api/user/delete/product/' + this.productShow.productData.id + '/photo/' + photoIndex, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productShow.productData.id);
                });
            },
            setFirstPhoto(photoIndex) {
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/setFirstPhoto/' + photoIndex, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productShow.productData.id);
                });
            },

        }
    }
</script>