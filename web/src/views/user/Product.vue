<template>
	<div class="product-show">
		<loading :visible="loading" :text="'Loading product'"></loading>
		<loading
			:visible="sendingPhoto"
			:text="'Sending photo'"
			:icon="'bx-camera'"
		></loading>
		<div class="photos mb-3">
			<div
				class="photo"
				v-for="(photo, index) in product.photos"
				:key="photo._id"
				@click="changeImage(index)"
				:style="{
					'background-image':
						'url(' +
						$store.getters.apiUrl +
						'images/' +
						photo.src +
						')'
				}"
			>
				<div
					class="set-thumbnail"
					@click="setThumbnail(index)"
					:class="{ active: photo.src == product.thumbnail }"
				>
					<i class="bx bxs-image-alt"></i>
				</div>
				<div class="remove" @click="removePhoto(index)">
					<i class="bx bxs-trash-alt"></i>
				</div>
			</div>
			<div class="photo new" @click="changeImage(product.photos.length)">
				<div class="card no-radius">
					<div class="card-header">
						<h2 class="m-0">
							<i class="bx bx-plus"></i>
						</h2>
					</div>
					<div class="card-body">
						<div class="form-group">
							<input
								type="file"
								id="newPhoto"
								class="form-control"
								@change="handleFileUpload"
								ref="newPhoto"
							/>
						</div>
						<button @click="uploadNewPhoto" class="btn btn-primary">
							Upload
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 p-0">
				<div class="product">
					<div class="header">
						<div
							class="thumbnail"
							:style="{
								'background-image':
									'url(' +
									$store.getters.apiUrl +
									'images/' +
									this.product.thumbnail +
									')'
							}"
							v-show="this.product.thumbnail != ''"
						></div>
						<div class="name">
							<p class="brand">
								{{ product.brand }}
							</p>
							<p class="name">
								{{ product.name }}
							</p>
						</div>
					</div>
					<div class="body">
						<div class="pane">
							<div class="content">
								<div class="row">
									<div class="col-8 pr-0">
										<p class="rating">
											<small>Rating</small><br />
											<span
												v-for="index in 10"
												:key="'rating_' + index"
												@click="rate(index)"
											>
												<i
													v-if="
														index <= product.rating
													"
													class="rating-mark bx bxs-star h2 text-primary"
												></i>
												<i
													v-if="
														index > product.rating
													"
													class="rating-mark bx bx-star h2 text-primary"
												></i>
											</span>
										</p>
									</div>
									<div class="col-4 pr-2 text-right">
										<p class="mb-0 mt-3">
											<span
												v-if="
													product.status == '1inuse'
												"
												class="badge badge-outline-primary status"
											>
												In use
											</span>
											<span
												v-if="
													product.status ==
														'8declutter'
												"
												class="badge badge-dark status"
											>
												Declutter
											</span>
											<span
												v-if="product.status == '7gift'"
												class="badge badge-dark status"
											>
												Gift
											</span>
											<span
												v-if="
													product.status == '9empty'
												"
												class="badge badge-dark status"
											>
												Empty
											</span>
										</p>
									</div>
								</div>

								<div class="m-0">
									<small>Pans</small><br />
									<div class="row">
										<div class="col-6">
											<span class="h3 m-0">
												<i class="bx bx-download"></i>
											</span>
											<span
												class="h3 m-0"
												v-if="
													product.type !=
														'wishlist' &&
														product.status !=
															'8declutter'
												"
											>
												{{ product.pans.done }} /
											</span>
											<span class="h3 m-0">
												{{ product.pans.all }}
											</span>
										</div>
										<div
											class="col-6 text-right"
											v-if="
												product.type != 'wishlist' &&
													product.status !=
														'8declutter' &&
													product.status != '7gift'
											"
										>
											<i
												class="bx bx-plus-circle h2 m-0 mr-2"
												@click="pan(1)"
											></i>
											<i
												@click="pan(-1)"
												class="bx bx-minus-circle h2 m-0"
											></i>
										</div>
									</div>
								</div>
								<div
									class="m-0"
									v-if="product.type != 'wishlist'"
								>
									<small>Uses</small><br />
									<div class="row">
										<div class="col-6">
											<span class="h3 m-0">
												<i class="bx bx-check"></i>
												{{ product.uses.length }}
											</span>
										</div>
										<div
											class="col-6 text-right"
											v-if="
												product.status !=
													'8declutter' &&
													product.status != '7gift'
											"
										>
											<span>
												<i
													@click="use(1)"
													class="bx bx-plus-circle h2 m-0 mr-2"
												></i>
												<i
													@click="use(-1)"
													class="bx bx-minus-circle h2 m-0"
												></i>
											</span>
										</div>
									</div>
								</div>

								<small>Price</small><br />

								<span class="h2" v-if="product.price != 0"
									>{{ product.price }}
									<small>PLN</small></span
								>
								<router-link
									:to="
										'/me/p/' +
											this.$route.params.id +
											'/edit'
									"
									class="btn btn-sm btn-outline-primary"
									v-if="
										product.price == 0 &&
											product.status != '7gift'
									"
									>Add price</router-link
								>

								<div
									v-if="fromUser.name != ''"
									class="mt-2 from"
								>
									<small>From</small>
									<div class="row">
										<div class="col-2 text-center">
											<div
												class="from-photo"
												:style="{
													'background-image':
														'url(' +
														$store.getters.apiUrl +
														'images/profile/' +
														fromUser.photo +
														')'
												}"
											></div>
										</div>
										<div class="col-10 name text-black">
											{{ fromUser.name }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="gift" v-if="product.status == '7gift'">
							<p class="text-center mt-3">
								From <strong>{{ fromUser.name }}</strong>
							</p>
							<button
								class="btn btn-success btn-block p-2 mt-3"
								@click="acceptGift"
							>
								Accept gift
							</button>
						</div>
						<div v-if="product.status != '7gift'">
							<div class="pane" v-if="product.type != 'wishlist'">
								<div class="header">
									<div
										v-if="bought_date.getFullYear() > 2000"
									>
										<p
											class="text-danger mb-2"
											v-if="expired"
										>
											<i class="bx bx-x"></i> Product
											expired
										</p>
										<p
											class="text-success mb-2"
											v-if="!expired"
										>
											<i class="bx bx-check"></i> Product
											is not expired
										</p>
									</div>
								</div>
								<div class="content">
									<div
										class="dates"
										v-if="bought_date.getFullYear() > 2000"
									>
										<div class="row">
											<div class="col-6">
												<i
													class="bx bx-calendar-plus"
												></i>
												Bought date
											</div>
											<div class="col-6">
												<strong>{{
													bought_date
														.toGMTString()
														.substr(5, 11)
												}}</strong>
											</div>
										</div>
										<div class="row">
											<div class="col-6">
												<i class="bx bx-calendar-x"></i>
												Expire date
											</div>
											<div class="col-6">
												<strong>{{
													expire_date
														.toGMTString()
														.substr(5, 11)
												}}</strong>
											</div>
										</div>
										<div class="row">
											<div class="col-6">
												<i class="bx bx-calendar"></i>
												Expire months
											</div>
											<div class="col-6">
												<strong>{{
													product.expire_months
												}}</strong>
											</div>
										</div>
									</div>
									<router-link
										:to="
											'/me/p/' +
												this.$route.params.id +
												'/edit'
										"
										v-if="bought_date.getFullYear() < 2000"
										class="btn btn-outline-primary btn-block"
									>
										Add dates
									</router-link>
								</div>
							</div>
							<div class="pane">
								<div class="header">
									<p>Description</p>
								</div>
								<p class="content">
									<router-link
										:to="
											'/me/p/' +
												this.$route.params.id +
												'/edit'
										"
										v-if="product.description == ''"
										class="btn btn-outline-primary btn-block"
										>Add description</router-link
									>
									{{ product.description }}
								</p>
							</div>
							<div class="pane" v-if="product.type != 'wishlist'">
								<div class="header">
									<p>First impressions</p>
								</div>
								<p class="content">
									<router-link
										:to="
											'/me/p/' +
												this.$route.params.id +
												'/edit'
										"
										v-if="product.first_impressions == ''"
										class="btn btn-outline-primary btn-block"
										>Add first impressions</router-link
									>
									{{ product.first_impressions }}
								</p>
							</div>
							<div class="pane">
								<div class="header">
									<p>Product settings</p>
								</div>
								<div class="body">
									<button
										class="btn btn-success btn-block"
										v-if="product.type == 'wishlist'"
										@click="addToCollection"
									>
										Add to collection
									</button>
									<router-link
										:to="
											'/me/p/' +
												this.$route.params.id +
												'/edit'
										"
										class="btn btn-block btn-primary"
									>
										Edit product
									</router-link>
									<router-link
										:to="
											'/me/p/' +
												this.$route.params.id +
												'/declutter'
										"
										class="btn btn-block btn-outline-danger"
										v-if="product.status != '8declutter'"
									>
										Declutter
									</router-link>
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
import loading from "../../components/Loading.vue";
export default {
	components: { loading },
	data() {
		return {
			loading: true,
			bought_date: new Date(),
			expire_date: new Date(),
			expired: false,
			fromUser: {
				photo: "",
				name: ""
			},
			product: {
				pans: {
					done: 0,
					all: 0
				},
				photos: [],
				uses: [],
				thumbnail: ""
			},
			expAdd: 0,
			newPhoto: null,
			sendingPhoto: false
		};
	},
	created() {
		this.getProduct();
	},
	mounted() {
		this.initScroll();
	},
	methods: {
		addToCollection() {
			this.product.type = "collection";
			this.expAdd = 120;
			this.update();
		},
		handleFileUpload() {
			this.newPhoto = this.$refs.newPhoto.files[0];
		},
		uploadNewPhoto() {
			this.sendingPhoto = true;
			const formData = new FormData();
			formData.append("_id", this.product._id);
			formData.append("photo", this.newPhoto);
			fetch(this.$store.getters.apiUrl + "products/photo", {
				method: "POST",
				headers: {
					Authorization: this.$store.getters.token
				},
				body: formData
			})
				.then(res => res.json())
				.then(data => {
					if (data.err) {
						console.log(data.err);
					} else {
						this.newPhoto = null;
						this.sendingPhoto = false;
						this.getProduct();
					}
				});
		},
		getProduct() {
			fetch(
				this.$store.getters.apiUrl +
					"products/product/" +
					this.$route.params.id,
				{
					headers: {
						Authorization: this.$store.getters.token
					}
				}
			)
				.then(res => res.json())
				.then(data => {
					if (data.err) {
						document.location.href = "/404";
					} else {
						if (data.from_user_id != null) {
							this.getFromUser(data.from_user_id);
						}
						this.product = data;
						this.loading = false;
						this.bought_date = new Date(data.bought_at);
						this.checkExpired(new Date(data.bought_at));
						setTimeout(() => {
							this.initGallery();
							this.changeImage(0);
						}, 10);
					}
				});
		},
		getFromUser(userId) {
			fetch(this.$store.getters.apiUrl + "users/findID/" + userId, {
				headers: {
					Authorization: this.$store.getters.token
				}
			})
				.then(res => res.json())
				.then(user => {
					this.fromUser = Object.assign({}, user);
				});
		},
		acceptGift() {
			this.product.status = "0inuse";
			fetch(this.$store.getters.apiUrl + "products/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ product: this.product })
			});
		},
		checkExpired(date) {
			this.expire_date = new Date(
				date.setMonth(date.getMonth() + this.product.expire_months)
			);
			if (this.expire_date < Date.now()) {
				this.expired = true;
			} else {
				this.expired = false;
			}
		},
		changeImage(index) {
			const photos = document.querySelectorAll(".photo");
			photos.forEach(photo => {
				photo.removeAttribute("show");
				photo.removeAttribute("less");
			});
			photos[index].setAttribute("show", true);
			if (photos[index + 1]) {
				photos[index + 1].setAttribute("less", true);
			} else if (photos[index - 2]) {
				photos[index - 2].setAttribute("less", true);
			}
			if (photos[index - 1]) {
				photos[index - 1].setAttribute("less", true);
			} else if (photos[index + 2]) {
				photos[index + 2].setAttribute("less", true);
			}
		},
		initGallery() {
			const photos = document.querySelectorAll(".photo");
			photos[0].setAttribute("show", true);
			if (photos.length > 1) {
				photos[1].setAttribute("less", true);
			}
			if (photos.length > 2) {
				photos[2].setAttribute("less", true);
			}
		},
		initScroll() {
			if (document.documentElement.scrollTop > window.innerHeight / 3) {
				document
					.querySelector(".product > .header .thumbnail")
					.setAttribute("show", true);
			} else {
				document
					.querySelector(".product > .header .thumbnail")
					.removeAttribute("show");
			}
		},
		rate(number) {
			if (number > 0 && number < 11) {
				this.product.rating = number;
				this.update();
			}
		},
		pan(action) {
			if (action == 1) {
				if (this.product.pans.done < this.product.pans.all) {
					this.product.pans.done++;
					this.expAdd += 30;
					this.update();
				}
			}
			if (action == -1) {
				if (this.product.pans.done > 0) {
					this.product.pans.done--;
					this.expAdd -= 30;
					this.update();
				}
			}
		},
		use(action) {
			if (action == 1) {
				this.product.uses.push(Date.now());
				this.expAdd += 10;
			} else if (action == -1) {
				if (this.product.uses.length > 0) {
					this.product.uses.splice(this.product.uses.length - 1, 1);
					this.expAdd -= 10;
				}
			}
			this.update();
		},
		setThumbnail(index) {
			this.product.thumbnail = this.product.photos[index].src;
			const tmp = this.product.photos[index];
			this.$set(this.product.photos, index, this.product.photos[0]);
			this.$set(this.product.photos, 0, tmp);
			this.changeImage(0);
			this.update();
		},
		removePhoto(index) {
			if (this.product.thumbnail === this.product.photos[index].src) {
				this.product.thumbnail = "";
			}

			fetch(this.$store.getters.apiUrl + "products/photo", {
				method: "DELETE",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					_id: this.product._id,
					photoName: this.product.photos[index].src
				})
			}).then(() => {
				this.product.photos.splice(index, 1);
				this.update();
				this.changeImage(0);
			});
		},
		update() {
			fetch(this.$store.getters.apiUrl + "products/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					product: this.product,
					expAdd: this.expAdd
				})
			}).then(() => {
				this.$parent.$refs.navbar.getUserData();
				this.$parent.$refs.footbar.getUserData();
				this.expAdd = 0;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.product {
	position: relative;
	width: 100%;

	> .header {
		width: 100%;
		position: sticky;
		top: 59px;
		display: flex;
		background-color: #fff;
		border: {
			bottom: 1px solid rgba(#000, 0.1);
		}
		z-index: 2000;
		border-radius: 0 0 1rem 1rem;

		.thumbnail {
			width: 20%;
			background: teal;
			border-radius: 0 0 0 1rem;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			width: 0%;
			transition: 0.3s all;
			&[show] {
				width: 20%;
			}
		}
		> .name {
			width: 80%;
			overflow: hidden;
			padding: 0 1rem;

			.brand {
				width: 100%;
				font-weight: 100;
				font-size: 0.8rem;
				margin: {
					bottom: 0;
					top: 0.5rem;
				}
			}
			.name {
				width: 100%;
				font-weight: 1000;
				font-size: 1.5rem;
				height: 2.8rem;
				line-height: 2.4rem;
				margin: 0;
				color: black;
			}
		}
	}
	> .body {
		.pane {
			border: {
				bottom: 1px solid rgba(#000, 0.1);
				top: 1px solid rgba(#000, 0.1);
			}
			border-radius: 1rem;
			padding: 1rem;
			margin-top: 1rem;

			.header {
				font-size: 1.1rem;
				font-weight: 800;
			}
			.content {
				margin: 0;
			}
		}
		.status {
			margin-right: 0.5rem;
			padding: 0.5rem;
			border: 1px solid rgba(#000, 0.1);
			border-radius: 1.5rem;
			font-size: 1rem;
			display: inline-block;
			//background: #000;
			//color: white;
		}
		.rating {
			margin: {
				bottom: 0;
			}

			.rating-mark {
				margin: {
					right: -4px;
					bottom: 0;
				}
			}
		}
		.from {
			.from-photo {
				width: 50px;
				height: 50px;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
			.name {
				display: flex;
				align-items: center;
				font-weight: 1000;
				font-size: 1.2rem;
				color: black;
			}
		}
	}
}

.photos {
	width: 100%;
	height: 30vh;
	display: block;
	overflow: hidden;

	.photo {
		height: 100%;
		width: 0%;
		display: inline-block;
		overflow: hidden;
		transition: 0.3s all;
		background-color: black;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;
		opacity: 0.3;
		&[show] {
			width: 70%;
			opacity: 1;

			.set-thumbnail,
			.remove {
				display: flex;
			}
		}
		&[less] {
			width: 15%;
		}
		&.new {
			word-wrap: none;
			background-color: white;
			&[show] {
				.card {
					.card-body {
						opacity: 1;
					}
				}
			}

			.card {
				height: 100%;
				&.no-radius {
					border-radius: 0;
					.card-header {
						border-radius: 0;
						padding: 15px;
					}
				}

				.card-body {
					opacity: 0;
				}
			}
		}

		.set-thumbnail,
		.remove {
			display: none;
			position: absolute;
			bottom: 5px;
			right: 5px;
			font-size: 1.2rem;
			width: 35px;
			height: 35px;
			align-items: center;
			justify-content: center;
			border: 1px solid rgba(#000, 0.1);
			border-radius: 50%;
			background-color: rgba(#fff, 0.7);
			color: black;
			transition: 0.5s all;
			&:hover {
				background-color: white;
			}
		}
		.set-thumbnail {
			&.active {
				background-color: black;
				color: white;
			}
		}
		.remove {
			bottom: 45px;
		}
	}
}
</style>
