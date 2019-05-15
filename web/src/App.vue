<template>
	<div id="app">
		<navbar :auth="auth" ref="navbar"></navbar>
		<div class="container-fluid my-lg-5 my-3">
			<router-view/>
		</div>
	</div>
</template>

<script>
import navbar from "./components/Navbar.vue";
export default {
	components: { navbar },
	data() {
		return {
			auth: this.$store.getters.loggedIn
		};
	},
	created() {
		if (this.$store.getters.loggedIn) {
			this.$store.commit("getUser");
		}
	}
};
</script>


<style lang="scss">
.btn {
	text-transform: none;
	cursor: pointer;
}
</style>
