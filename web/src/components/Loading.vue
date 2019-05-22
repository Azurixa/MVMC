<template>
	<div class="loading" v-if="visible">
		<div>
			<i class="bx bx-loader-alt bx-spin" v-if="!icon"></i>
			<i v-if="icon" class="bx bx-spin" :class="icon"></i>
			<p v-if="text != ''">{{ text }}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: { visible: Boolean, text: String, icon: String }
};
</script>


<style lang="scss" scoped>
.loading {
	height: 100vh;
	z-index: 2500;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	background-color: #fcfcfc;
	display: flex;
	align-items: center;
	justify-content: center;

	div {
		text-align: center;
	}
	p {
		margin: {
			top: 1rem;
			bottom: 0;
		}
	}
	i {
		font-size: 5rem;
	}
}
</style>
