<template>
	<div id="app">
        <navbar :auth="auth"></navbar>
		<div class="container-fluid my-5">
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
