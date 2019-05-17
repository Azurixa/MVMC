<template>
	<div>
        <div class="fix"></div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
			<router-link class="navbar-brand" to="/">Make-up Collection</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarColor01"
				aria-controls="navbarColor01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarColor01">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link to="/" class="nav-link">Home</router-link>
					</li>
					<li class="nav-item dropdown" v-if="!auth">
						<router-link class="nav-link" to="/auth">
							<i class="bx bx-user"></i> Login / Register
						</router-link>
					</li>
					<li class="nav-item dropdown" v-if="auth">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>{{user.name}}</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/me/collection">
								<i class="bx bx-list"></i> Collection
							</router-link>
							<router-link class="dropdown-item" to="/me/new">
								<i class="bx bx-list-plus"></i> New
							</router-link>
							<div class="dropdown-divider"></div>
							<router-link class="dropdown-item" to="/me">
								<i class="bx bx-user"></i> Dashboard
							</router-link>
							<div class="dropdown-divider"></div>
							<router-link class="dropdown-item" to="/me/edit">
								<i class="bx bx-user-plus"></i> Profile edit
							</router-link>
							<router-link class="dropdown-item" to="/logout">
								<i class="bx bx-user-x"></i> Logout
							</router-link>
						</div>
					</li>
				</ul>
				<navSearch v-if="auth"></navSearch>
			</div>
            </div>
		</nav>
	</div>
</template>

<script>
import navSearch from "./NavSearch.vue";
export default {
	props: ["auth"],
	components: { navSearch },
	data() {
		return {
			user: {}
		};
	},
	created() {
		if (this.$store.getters.loggedIn) {
			this.getUserData();
		}
	},
	methods: {
		getUserData() {
			this.$store.commit("getUser");
			this.$store.getters.user.then(user => {
				this.user = user;
			});
		}
	}
};
</script>


<style lang="scss" scoped>
.navbar {
	padding: 0.7rem;
	position: fixed;
	top: 0;
    width: 100%;
	z-index: 100000;
}
.fix {
	height: 60px;
}
.navbar-brand {
	text-transform: none;
}
.nav-item {
	padding: 0;
	margin-right: 0.5rem;
	@media screen and(max-width: 800px) {
		margin-right: 0 !important;
	}
}
.nav-link {
	text-transform: none;
}
</style>


