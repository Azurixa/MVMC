<template>
	<div id="app">
        <navbar></navbar>
		<div class="container-fluid my-5">
			<router-view/>
		</div>
	</div>
</template>

<script>
import navbar from "./components/Navbar.vue";
export default {
	components: { navbar }
};
</script>


<style lang="scss">
.btn {
	text-transform: none;
    cursor: pointer;
}
</style>
