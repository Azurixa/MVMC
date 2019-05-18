<template>
	<div class="product-show">
        <loading :visible="loading" :text="'Loading product'"></loading>
		<div class="photos mb-3">
			<div
				class="photo"
				v-for="(photo, index) in product.photos"
				:key="photo._id"
				@click="changeImage(index)"
			>
				{{ photo.src }}
			</div>
			<div class="photo new" @click="changeImage(product.photos.length)">
				<div class="card">
					<div class="card-header">
						<h2 class="m-0">
							NEW
						</h2>
					</div>
					<div class="card-body">
						<p>
							Add new photo
						</p>
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
						<div class="thumbnail"></div>
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
								<p>
									<small>Rating</small><br />
									<span
										v-for="index in 10"
										:key="'rating_' + index"
										@click="rate(index)"
									>
										<i
											v-if="index <= product.rating"
											class="bx bxs-star h2 text-primary m-0"
										></i>
										<i
											v-if="index > product.rating"
											class="bx bx-star h2 text-primary m-0"
										></i>
									</span>
								</p>
								<div class="m-0">
									<small>Pans</small><br />
									<div class="row">
										<div class="col-6">
											<span class="h1 m-0">
												{{ product.pans.done }}
											</span>
											<span class="h1 m-0">
												/ {{ product.pans.all }}
											</span>
										</div>
										<div class="col-6 text-right">
											<i
												class="bx bx-plus-circle h1 m-0 mr-2"
												@click="pan(1)"
											></i>
											<i
												@click="pan(-1)"
												class="bx bx-minus-circle h1 m-0"
											></i>
										</div>
									</div>
								</div>
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
									>Add description...</router-link
								>
								{{ product.description }}
							</p>
						</div>
						<div class="pane">
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
									>Add first impressions...</router-link
								>
								{{ product.first_impressions }}
							</p>
						</div>
						<div class="pane">
							<div class="header">
								<p>Product settings</p>
							</div>
							<div class="body">
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
			product: {
				pans: {
					done: 0,
					all: 0
				}
			},
			newPhoto: null
		};
	},
	created() {
		this.getProduct();
	},
	methods: {
		handleFileUpload() {
			this.newPhoto = this.$refs.newPhoto.files[0];
		},
		uploadNewPhoto() {
			const formData = new FormData();
			formData.append("_id", this.product._id);
			formData.append("photo", this.newPhoto);
			fetch("http://localhost:3001/products/photo", {
				method: "POST",
				headers: {
					Authorization: this.$store.getters.token
				},
				body: formData
			})
				.then(res => res.json())
				.then(data => {
					if (data.err) {
					} else {
						this.getProduct();
					}
				});
		},
		getProduct() {
			fetch(
				"http://localhost:3001/products/product/" +
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
                        this.product = data;
                        this.loading = false;
						setTimeout(() => {
							this.initGallery();
							this.changeImage(0);
						}, 10);
					}
				});
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
					this.update();
				}
			}
			if (action == -1) {
				if (this.product.pans.done > 0) {
					this.product.pans.done--;
					this.update();
				}
			}
		},
		update() {
			fetch("http://localhost:3001/products/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ product: this.product })
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
				font-size: 1.2rem;
				height: 2.4rem;
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
	}
}

.photos {
	width: 100%;
	height: 30vh;
	display: block;

	.photo {
		height: 100%;
		width: 0%;
		display: inline-block;
		overflow: hidden;
		transition: 0.3s all;
		transition-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
		background-color: black;
		&[show] {
			width: 70%;
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

				.card-body {
					opacity: 0;
				}
			}
		}
	}
}
</style>
