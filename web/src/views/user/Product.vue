<template>
	<div class="product">
		<router-link :to="'/me/p/' + this.$route.params.id + '/edit'">
			Edit product
		</router-link>
		<div class="photos">
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
						<h2>
							NEW
						</h2>
					</div>
					<div class="card-body">
						<p>
							Add new photo
						</p>
						<div class="form-group">
							<label for="newPhoto">Photo</label>
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
		<p>
			{{ product }}
		</p>
	</div>
</template>

<script>
import { setTimeout } from "timers";
export default {
	data() {
		return {
			product: {},
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
			console.log(photos);
			photos[0].setAttribute("show", true);
			if (photos.length >= 1) {
				photos[1].setAttribute("less", true);
			}
			if (photos.length >= 2) {
				photos[2].setAttribute("less", true);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
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
			background-color: white;

			.card {
				height: 100%;
			}
		}
	}
}
</style>
