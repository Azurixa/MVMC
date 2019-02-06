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
                <p class="header">Collection</p>
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

                <div class="edit-box" v-show="productShow.editForm.visible">

                    <div class="form card p-4">

                        <i class='bx bx-x close' @click="showEdit('')"></i>

                        <h2 class="mb-4">
                            Edit product
                        </h2>

                        <div v-show="productShow.editForm.nameVisible">
                            <div class="form-group">
                                <input type="text" class="form-control mb-2" v-model="productShow.editForm.value"
                                       @keyup.enter="editConfirm()">
                                <button class="btn btn-primary" @click="editConfirm()">Edit name</button>
                            </div>
                        </div>

                        <div v-show="productShow.editForm.descriptionVisible">
                            <div class="form-group">
                                <textarea class="description form-control mb-2" v-model="productShow.editForm.value"
                                          @keydown.enter="editConfirm()"></textarea>
                                <button class="btn btn-primary" @click="editConfirm()">Edit description</button>
                            </div>
                        </div>

                        <div v-show="productShow.editForm.firstImpressionsVisible">
                            <textarea class="description form-control mb-2" v-model="productShow.editForm.value"
                                      @keydown.enter="editConfirm()"></textarea>
                            <button class="btn btn-primary" @click="editConfirm()">Edit first impressions</button>
                        </div>

                        <div v-show="productShow.editForm.remainingAmountVisible">
                            <div class="form-group">
                                <input class="form-control mb-2" type="number" min="0" max="100"
                                       v-model="productShow.editForm.value"
                                       @keydown.enter="editConfirm()">
                                <button class="btn btn-primary" @click="editConfirm()">Edit remaining amount</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="product-show" v-show="productShow.visible">

                    <div class="gallery">

                        <div v-for="(photo, index) in productShow.productData.photos" onclick="gallery(this)"
                             :style="{ 'background-image': 'url(' + photo + ')' }" class="gallery-image">
                            <div class="delete close" @click="removePhoto(index)">
                                <i class='bx bxs-trash'></i>
                            </div>
                        </div>

                    </div>

                    <div class="body">
                        <div class="row p-0 m-0">

                            <div class="col-12 p-0">
                                <div class="progress mt-1" @click="showEdit('remaining_amount')">
                                    <div class="progress-bar" role="progressbar"
                                         :style="{width: productShow.productData.remaining_amount + '%'}">
                                        {{productShow.productData.remaining_amount}} %
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-10 p-0">
                                <h1 class="mb-4">
                                    {{productShow.productData.brand.name}} {{productShow.productData.name}}
                                    <span @click="showEdit('name')"><i class='bx bx-highlight'></i></span>
                                </h1>
                                <div>
                                    <h4>
                                        Description
                                        <span @click="showEdit('description')"><i class='bx bx-highlight'></i></span>
                                    </h4>
                                    <p>
                                        <span v-if="productShow.productData.description === null">
                                            Add description...
                                        </span>
                                        {{productShow.productData.description}}
                                    </p>
                                </div>
                                <div>
                                    <h4>
                                        First impressions
                                        <span @click="showEdit('first_impressions')"><i
                                                class='bx bx-highlight'></i></span>
                                    </h4>
                                    <p>
                                        <span v-if="productShow.productData.first_impressions === null">
                                            Add first impressions...
                                        </span>
                                        {{productShow.productData.first_impressions}}
                                    </p>
                                </div>
                                <div>
                                    <h4>
                                        Add image
                                    </h4>
                                    <input type="file" id="file" ref="file" @change="handleFileUpload()">
                                    <button @click="addPhoto()">Send Photo</button>
                                </div>

                            </div>
                            <div class="col-lg-2"></div>

                            <div class="stats">
                                <div class="uses_count mx-auto">
                                    <div class="m-0 text-center">
                                        <p class="mb-0 h4">{{productShow.productData.uses_count}}</p>
                                        <small>uses</small>
                                    </div>
                                </div>
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
        name: 'collection',
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
                        photos: {},
                    },
                    editForm: {
                        visible: false,
                        nameVisible: false,
                        descriptionVisible: false,
                        firstImpressionsVisible: false,
                        ratingVisible: false,
                        updatesVisible: false,
                        remainingAmountVisible: false,
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
                    setTimeout(() => {
                        this.refreshGallery();
                    }, 100);
                });
            },

            // FRONT END

            showEdit(what) {

                if (this.productShow.editForm.whatEditing !== '') {
                    this.productShow.editForm.visible = false;
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

            // Gallery handling

            refreshGallery() {

                const photos = document.querySelectorAll('.gallery-image');

                photos.forEach((photo) => {
                    photo.classList.add('hide');
                });

                if (photos.length > 2) {
                    photos[0].classList.add('prev');
                    photos[0].classList.remove('hide');
                    photos[1].classList.add('present');
                    photos[1].classList.remove('hide');
                    photos[2].classList.add('next');
                    photos[2].classList.remove('hide');
                } else if (photos.length === 2) {
                    photos[0].classList.add('present');
                    photos[0].classList.remove('hide');
                    photos[1].classList.add('next');
                    photos[1].classList.remove('hide');
                } else if (photos.length === 1) {
                    photos[0].classList.add('present');
                    photos[0].classList.remove('hide');
                }

                console.log('Gallery refreshed!');

            },

            // Photos

            handleFileUpload() {
                this.productShow.editForm.file = this.$refs.file.files[0];
            },
            addPhoto() {
                const formData = new FormData();
                formData.append('photo', this.productShow.editForm.file);
                fetch('/api/user/update/product/' + this.productShow.productData.id + '/addPhoto', {
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

        }
    }
</script>