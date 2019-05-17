<template>
	<div class="product">
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
	created() {},
	methods: {
		getProduct() {
			fetch("http://localhost:3001/products/" + this.$route.params.id, {
				headers: {
					Authorization: this.$store.getters.token
				}
			})
				.then(res => res.json())
				.then(data => (this.product = data));
		}
	}
};
</script>
