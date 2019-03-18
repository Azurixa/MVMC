<template>
    <div class="active-product">
        <div class="edit-box" v-show="editForm.visible">

            <div class="form card p-4">

                <i class='bx bx-x close' @click="showEdit('')"></i>

                <h2 class="mb-4">
                    Edit product
                </h2>

                <div v-show="editForm.nameVisible">
                    <div class="form-group">
                        <input type="text" class="form-control mb-2" v-model="editForm.value"
                               @keyup.enter="editConfirm()" autofocus>
                        <button class="btn btn-primary" @click="editConfirm()">Edit name</button>
                    </div>
                </div>

                <div v-show="editForm.descriptionVisible">
                    <div class="form-group">
                                <textarea class="description form-control mb-2" v-model="editForm.value"
                                          @keydown.enter="editConfirm()" autofocus></textarea>
                        <button class="btn btn-primary" @click="editConfirm()">Edit description</button>
                    </div>
                </div>

                <div v-show="editForm.firstImpressionsVisible">
                            <textarea class="description form-control mb-2" v-model="editForm.value"
                                      @keydown.enter="editConfirm()" autofocus></textarea>
                    <button class="btn btn-primary" @click="editConfirm()">Edit first impressions</button>
                </div>

                <div v-show="editForm.remainingAmountVisible">
                    <div class="form-group">
                        <input class="form-control mb-2" type="number" min="0" max="100"
                               v-model="editForm.value"
                               @keydown.enter="editConfirm()" autofocus>
                        <button class="btn btn-primary" @click="editConfirm()">Edit remaining amount</button>
                    </div>
                </div>

                <div v-show="editForm.boughtAtVisible">
                    <div class="form-group">
                        <input class="form-control mb-2" type="date" v-model="editForm.value"
                               @keydown.enter="editConfirm()" autofocus>
                        <button class="btn btn-primary" @click="editConfirm()">Edit bought date</button>
                    </div>
                </div>

                <div v-show="editForm.expireMonthsVisible">
                    <div class="form-group">
                        <input class="form-control mb-2" type="number" min="0"
                               v-model="editForm.value"
                               @keydown.enter="editConfirm()" autofocus>
                        <button class="btn btn-primary" @click="editConfirm()">Edit expire months</button>
                    </div>
                </div>

                <div v-show="editForm.categoryChangeVisible">
                    <div>
                        <div class="form-group">
                            <select v-model="editForm.value" class="form-control"
                                    id="category">
                                <option v-for="category in $parent.categories" :value=category.id>
                                    {{category.name}}
                                </option>
                            </select>
                        </div>
                        <button class="btn btn-primary" @click="editConfirm()">Change category</button>
                    </div>
                </div>

                <div v-show="editForm.brandChangeVisible">
                    <div>
                        <div class="form-group">
                            <select v-model="editForm.value" class="form-control" id="brand">
                                <option v-for="brand in $parent.brands" :value=brand.id>
                                    {{brand.name}}
                                </option>
                            </select>
                        </div>
                        <button class="btn btn-primary" @click="editConfirm()">Change brand</button>
                    </div>
                </div>

            </div>
        </div>

        <div class="product-show">

            <!-- Body of product show box -->
            <div class="body">
                <div class="row p-0 m-0">

                    <!-- Main box of product information -->
                    <div class="col-lg-8 p-0">

                        <!-- Gallery of product photos -->
                        <div class="gallery m-2">

                            <div v-for="(photo, index) in productData.photos"
                                 onclick="gallery(this)"
                                 :style="{ 'background-image': 'url(/' + photo.image + ')' }"
                                 class="gallery-image">
                                <div class="date">
                                    <p class="m-0">{{photo.date}}</p>
                                </div>
                                <div class="delete close"
                                     @click="removePhoto(productData.photos.length - index - 1)">
                                    <i class='bx bxs-trash'></i>
                                </div>
                                <div class="first close"
                                     @click="setFirstPhoto(productData.photos.length - index - 1)">
                                    <i class='bx bx-first-page'></i>
                                </div>
                            </div>

                            <!-- New photo input box -->
                            <div class="gallery-image new" onclick="gallery(this)">
                                <div v-show="!editForm.photoSending">
                                    <h2>Add new photo</h2>
                                    <div class="">
                                        <input class="mb-3" type="file" id="file" ref="file"
                                               @change="handleFileUpload()">
                                    </div>
                                    <button @click="addPhoto()"><i class="bx bx-plus"></i> Add photo</button>
                                </div>
                                <div v-show="editForm.photoSending" class="m-0">
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
                                     :style="{width: productData.remaining_amount + '%'}">
                                    {{productData.remaining_amount}} %
                                </div>
                            </div>
                        </div>

                        <div class="mx-2 mt-2 mb-0 mb-lg-2 card p-3">
                            <h1>
                                {{productData.brand.name}}
                                <strong>{{productData.name}}</strong>
                                <span @click="showEdit('name')" data-toggle="tooltip" data-placement="bottom"
                                      title="Change product name"><i class='bx bx-highlight'></i></span>
                            </h1>
                            <div class="row">
                                <div class="col-lg-6">

                                    <div class="rating mb-1">
                                    <span @click="rateProduct(1)"
                                          class="bx"
                                          :class="{'bxs-star animated tada': productData.rating > 0, 'bx-star': productData.rating < 1}"
                                          data-toggle="tooltip" data-placement="top" title="1">
                                    </span>
                                        <span @click="rateProduct(2)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 1, 'bx-star': productData.rating < 2}"
                                              data-toggle="tooltip" data-placement="top" title="2">
                                    </span>
                                        <span @click="rateProduct(3)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 2, 'bx-star': productData.rating < 3}"
                                              data-toggle="tooltip" data-placement="top" title="3">
                                    </span>
                                        <span @click="rateProduct(4)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 3, 'bx-star': productData.rating < 4}"
                                              data-toggle="tooltip" data-placement="top" title="4">
                                    </span>
                                        <span @click="rateProduct(5)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 4, 'bx-star': productData.rating < 5}"
                                              data-toggle="tooltip" data-placement="top" title="5">
                                    </span>
                                        <span @click="rateProduct(6)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 5, 'bx-star': productData.rating < 6}"
                                              data-toggle="tooltip" data-placement="top" title="6">
                                    </span>
                                        <span @click="rateProduct(7)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 6, 'bx-star': productData.rating < 7}"
                                              data-toggle="tooltip" data-placement="top" title="7">
                                    </span>
                                        <span @click="rateProduct(8)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 7, 'bx-star': productData.rating < 8}"
                                              data-toggle="tooltip" data-placement="top" title="8">
                                    </span>
                                        <span @click="rateProduct(9)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 8, 'bx-star': productData.rating < 9}"
                                              data-toggle="tooltip" data-placement="top" title="9">
                                    </span>
                                        <span @click="rateProduct(10)"
                                              class="bx"
                                              :class="{'bxs-star animated tada': productData.rating > 9, 'bx-star': productData.rating < 10}"
                                              data-toggle="tooltip" data-placement="top" title="10">
                                    </span>
                                    </div>

                                    <p class="dates"
                                       v-show="productData.bought_at === '01.01.1970'">
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
                                       v-show="productData.bought_at !== '01.01.1970'">
                                        Bought <strong>{{productData.bought_at}}</strong>
                                        <span @click="showEdit('bought_at')" data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Change bought date">
                                        <i class='bx bx-highlight'></i>
                                    </span>

                                        <span :class="{'text-danger': productData.expired}">
                                        Expires <strong>{{productData.expire_date}}</strong>
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
                                             v-show="!productData.pan"
                                             @click="panProduct(1)">
                                            <div class="m-0 text-center">
                                                <p class="m-0">Pan</p>
                                            </div>
                                        </div>
                                        <div class="if-pan true ml-auto" data-toggle="tooltip"
                                             data-placement="top" title="Tag as not panned [-3xp]"
                                             v-show="productData.pan"
                                             @click="panProduct(0)">
                                            <div class="m-0 text-center">
                                                <p class="m-0">Pan</p>
                                            </div>
                                        </div>
                                        <div class="uses_count" @click="addProductUse()" data-toggle="tooltip"
                                             data-placement="top" title="Add use [1xp]">
                                            <div class="m-0 text-center">
                                                <p class="mb-0 h5" id="active-uses-count">
                                                    {{productData.uses_count}}</p>
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
                            <h4 class="mb-3">
                                Description
                                <span @click="showEdit('description')" data-toggle="tooltip"
                                      data-placement="bottom" title="Change description"><i
                                        class='bx bx-highlight'></i></span>
                            </h4>
                            <p class="text-justify">
                                        <span v-if="productData.description === null">
                                            Add description...
                                        </span>
                                {{productData.description}}
                            </p>
                        </div>

                        <div class="m-2 card p-3">
                            <h4 class="mb-3">
                                First impressions
                                <span @click="showEdit('first_impressions')" data-toggle="tooltip"
                                      data-placement="bottom" title="Change first impressions"><i
                                        class='bx bx-highlight'></i></span>
                            </h4>
                            <p class="text-justify">
                                        <span v-if="productData.first_impressions === null">
                                            Add first impressions...
                                        </span>
                                {{productData.first_impressions}}
                            </p>
                        </div>

                        <div class="m-2 card p-3">
                            <h4 class="mb-3">
                                Product options
                            </h4>
                            <button @click="showEdit('brand_id')" class="btn btn-info btn-block">Change brand</button>
                            <button @click="showEdit('category_id')" class="btn btn-info btn-block">Change category</button>
                            <button @click="deleteProduct()" class="btn btn-danger btn-block">Delete product</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'ActiveProduct',
        data() {
            return {
                token: localStorage.getItem('token'),
                productData: {
                    expired: false,
                    rating: 0,
                    id: 0,
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
                    categoryChangeVisible: false,
                    brandChangeVisible: false,
                    photoSending: false,
                    whatEditing: '',
                    file: '',
                    value: '',
                },
            }
        },
        methods: {

            showItem(itemId) {
                fetch('/api/user/product/' + itemId, {
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.productData = data;
                    this.checkExpired();
                    setTimeout(() => {
                        window.refreshGallery();
                        window.reloadAll();
                    }, 50);
                });
            },

            checkExpired() {

                const date = new Date();
                const exDate = this.productData.expire_date;

                const exDay = exDate.substring(0, 2);
                const exMonth = exDate.substring(3, 5);
                const exYear = exDate.substring(6, 10);
                const nowDay = date.getDate();
                const nowMonth = date.getMonth() + 1;
                const nowYear = date.getFullYear();

                if (nowYear > exYear) {
                    this.productData.expired = true;
                    return 1;
                } else if (nowYear === exYear) {
                    if (nowMonth > exMonth) {
                        this.productData.expired = true;
                        return 1;
                    } else if (nowMonth === exMonth) {
                        if (nowDay >= exDay) {
                            this.productData.expired = true;
                            return 1;
                        }
                    }
                }
                this.productData.expired = false;
            },

            // FRONT END

            showEdit(what) {

                if (this.editForm.whatEditing !== '') {
                    this.editForm.visible = false;
                    this.editForm.nameVisible = false;
                    this.editForm.descriptionVisible = false;
                    this.editForm.firstImpressionsVisible = false;
                    this.editForm.remainingAmountVisible = false;
                    this.editForm.boughtAtVisible = false;
                    this.editForm.expireMonthsVisible = false;
                    this.editForm.categoryChangeVisible = false;
                    this.editForm.brandChangeVisible = false;
                    this.editForm.value = '';
                    this.editForm.whatEditing = '';
                } else {
                    this.editForm.visible = true;
                    if (what === 'name') {
                        this.editForm.nameVisible = true;
                        this.editForm.value = this.productData.name;
                    }
                    if (what === 'description') {
                        this.editForm.descriptionVisible = true;
                        this.editForm.value = this.productData.description;
                    }
                    if (what === 'first_impressions') {
                        this.editForm.firstImpressionsVisible = true;
                        this.editForm.value = this.productData.first_impressions;
                    }
                    if (what === 'remaining_amount') {
                        this.editForm.remainingAmountVisible = true;
                        this.editForm.value = this.productData.remaining_amount;
                    }
                    if (what === 'bought_at') {
                        this.editForm.boughtAtVisible = true;
                        this.editForm.value = this.productData.bought_at;
                    }
                    if (what === 'expire_months') {
                        this.editForm.expireMonthsVisible = true;
                        this.editForm.value = this.productData.expire_months;
                    }
                    if (what === 'category_id') {
                        this.editForm.categoryChangeVisible = true;
                        this.editForm.value = '';
                    }
                    if (what === 'brand_id') {
                        this.editForm.brandChangeVisible = true;
                        this.editForm.value = '';
                    }
                    this.editForm.whatEditing = what;
                }
            },

            editConfirm() {
                const formData = new FormData();
                formData.append('value', this.editForm.value);
                fetch('/api/user/update/product/' + this.productData.id + '/' + this.editForm.whatEditing, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.showEdit();
                    this.showItem(this.productData.id);
                });
            },

            addProductUse() {
                fetch('/api/user/update/product/' + this.productData.id + '/useAdd', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productData.id);

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
                fetch('/api/user/update/product/' + this.productData.id + '/pan', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productData.id);

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
                fetch('/api/user/update/product/' + this.productData.id + '/rating', {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                    body: formData,
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productData.id);
                });
            },

            // Photos

            handleFileUpload() {
                this.editForm.file = this.$refs.file.files[0];
            },
            addPhoto() {
                if (this.editForm.file !== '') {
                    this.editForm.photoSending = true;
                    const formData = new FormData();
                    formData.append('photo', this.editForm.file);
                    fetch('/api/user/update/product/' + this.productData.id + '/addPhoto', {
                        method: 'POST',
                        headers: {
                            'Authorization': this.token,
                        },
                        body: formData,
                    }).then(res => res.json()).then(data => {
                        document.getElementById('file').value = '';
                        this.editForm.file = '';
                        this.showItem(this.productData.id);
                        this.editForm.photoSending = false;
                    });
                }
            },
            removePhoto(photoIndex) {
                fetch('/api/user/delete/product/' + this.productData.id + '/photo/' + photoIndex, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productData.id);
                });
            },
            setFirstPhoto(photoIndex) {
                fetch('/api/user/update/product/' + this.productData.id + '/setFirstPhoto/' + photoIndex, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.token,
                    },
                }).then(res => res.json()).then(data => {
                    this.showItem(this.productData.id);
                });
            },
            deleteProduct() {
                if (window.confirm("Are you sure?")){
                    const formData = new FormData();
                    formData.append('id', this.productData.id);
                    fetch('/api/user/delete/product', {
                        method: 'POST',
                        headers: {
                            'Authorization': this.token,
                        },
                        body: formData,
                    }).then(res => res.json()).then(() => {
                        this.$parent.productShow.visible = false;
                        this.$parent.getCategoriesAndProducts();
                    });
                }
            },
        }
    }
</script>