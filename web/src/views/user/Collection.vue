<template>
	<div class="my-collection">
		<h1 class="text-center mb-4 mt-5">
			My Collection
		</h1>
		<div class="row">
			<div class="col-lg-12">
				<div class="row">
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
									<div class="thumbnail"></div>
									<div class="info">
										<p class="name">{{ product.name }}</p>
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
export default {
	data() {
		return {
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
            &:first-child{
                margin-top: 1rem;
            }
			&:last-child {
				margin-bottom: 0;
			}

			.thumbnail {
				width: 35%;
				//height: 100%;
				display: inline-block;
				background-color: red;
				border-radius: 1rem 0 0 1rem;
			}
			.info {
				width: 65%;
				overflow: hidden;

				.name {
					font-weight: 800;
					height: 1.2rem;
					overflow: hidden;
					word-wrap: break-word;
					font-size: 1.1rem;
				}
			}
		}
	}
}
</style>
