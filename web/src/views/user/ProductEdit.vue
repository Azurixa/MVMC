<template>
	<div class="product-edit">
		<router-link :to="'/me/p/' + $route.params.id">
			Back to product
		</router-link>
		<p>
			EDIT PRODUCT
		</p>
		<p>
			{{ product }}
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			product: {}
		};
	},
	created() {
		this.getProduct();
	},
	methods: {
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
					}
				});
		},
		updateProduct() {
			console.log("OK");
		}
	}
};
</script>

