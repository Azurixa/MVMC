<template>
	<div id="app">
		<navbar :auth="auth" ref="navbar"></navbar>
		<div class="container my-lg-5 my-3">
			<router-view />
		</div>
        <footerMobile v-if="auth" ref="footbar"></footerMobile>
	</div>
</template>

<script>
import navbar from "./components/Navbar.vue";
import footerMobile from './components/FooterMobile.vue';
export default {
	components: { navbar, footerMobile },
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
    border-radius: 1.5rem;
    padding: 0.5rem;
}
.container {
	@media (min-width: 1200px) {
		max-width: 1500px;
	}
}
.card {
    border-radius: 1.5rem;

    .card-header {
        border-radius: 1.5rem 1.5rem 0 0;
    }
}
strong {
    font-weight: 1000;
    color: black;
}
</style>
