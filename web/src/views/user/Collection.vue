<template>
	<div class="my-collection">
		<loading :visible="loading" :text="'Loading collection'"></loading>
		<h1 class="text-center mb-4 mt-5">
			My Collection
		</h1>
		<div class="row">
			<div class="col-lg-12">
				<div class="row">
					<div class="empty mt-4 mx-auto" v-if="collection.length == 0">
						<p>
							Your collection is empty!
						</p>
						<router-link
							to="/me/new"
							class="btn btn-primary btn-block"
						>
							<i class="bx bx-plus-circle"></i> Add something
						</router-link>
					</div>
					<div
						class="col-lg-4 p-1"
						v-for="(category, index) in collection"
						:key="'category_' + index"
					>
						<div class="category">
							<div
								class="category-header"
								onClick="this.nextElementSibling.toggleAttribute('show')"
							>
								<div class="row">
									<div class="col-10">
										<h3 class="m-0">
											{{ category.category }}
										</h3>
									</div>
									<div class="col-2">
										<h3 class="m-0">
											<i class="bx bx-sort"></i>
										</h3>
									</div>
								</div>
							</div>
							<div class="category-body">
								<router-link
									class="product d-flex"
									v-for="product in category.products"
									:key="product._id"
									:to="'/me/p/' + product._id"
								>
									<div
										class="thumbnail"
										:style="{
											'background-image':
												'url(http://localhost:3001/images/' +
												product.thumbnail +
												')'
										}"
									></div>
									<div class="info">
										<p class="brand">{{ product.brand }}</p>
										<p class="name">{{ product.name }}</p>
										<p class="rating">
											<span>
												{{ product.rating }}
											</span>
											<span
												class="bx bxs-star"
												v-for="index in product.rating"
												:key="product.thumbnail + index"
											></span>
										</p>
										<p class="pans">
											<i class="bx bx-download"></i>
											{{ product.pans.done }} /
											{{ product.pans.all }}
										</p>
									</div>
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
			collection: []
		};
	},
	created() {
		this.getCollection();
	},
	methods: {
		getCollection() {
			fetch("http://localhost:3001/products/my", {
				headers: {
					Authorization: this.$store.getters.token
				}
			})
				.then(res => res.json())
				.then(data => {
					this.collection = data;
					this.loading = false;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.category {
	border: 1px solid rgba(#000, 0.1);
	border-radius: 1.5rem;
	padding: 1rem 0;
	background-color: #fefefe;
	position: relative;

	.category-header {
		position: sticky;
		top: 59px;
		z-index: 1000;
		background-color: #fefefe;
		width: 100%;
		margin-top: 3px;
		padding: 1rem;
		border: {
			bottom: 1px solid rgba(#000, 0.1);
		}
		border-radius: 0 0 1rem 1rem;
	}
	.category-body {
		height: 0;
		opacity: 0;
		overflow: hidden;
		transition: 0.3s all;
		&[show] {
			height: 10%;
			opacity: 1;
		}

		.product {
			position: relative;
			padding: 0;
			background-color: #fff;
			border: {
				top: 1px solid rgba(#000, 0.1);
				bottom: 1px solid rgba(#000, 0.1);
			}
			border-radius: 1rem;
			margin-bottom: 1.2rem;
			&:first-child {
				margin-top: 1rem;
			}
			&:last-child {
				margin-bottom: 0;
			}

			.thumbnail {
				width: 30%;
				//height: 100%;
				display: inline-block;
				background-color: teal;
				border-radius: 1rem 0 0 1rem;
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
			}
			.info {
				width: 70%;
				overflow: hidden;
				padding-left: 0.5rem;

				.brand {
					font-weight: 100;
					height: 1rem;
					margin: 0;
				}
				.name {
					font-weight: 1000;
					height: 1.2rem;
					overflow: hidden;
					word-wrap: break-word;
					font-size: 1.1rem;
				}
				.rating {
					margin: 0;

					span {
						margin-right: -3px;
					}
				}

				.pans {
					margin: 0;
				}
			}
		}
	}
}
</style>
