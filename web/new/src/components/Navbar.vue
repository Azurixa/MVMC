<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
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
				<li class="nav-item active">
					<router-link to="/" class="nav-link">Home</router-link>
				</li>
				<li class="nav-item dropdown" v-if="!auth">
					<a
						class="nav-link dropdown-toggle"
						href="#"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>User</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<router-link class="dropdown-item" to="/login">Login</router-link>
						<router-link class="dropdown-item" to="/register">Register</router-link>
					</div>
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
					>User</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<router-link class="dropdown-item" to="/logout">Logout</router-link>
					</div>
				</li>
			</ul>
			<form class="form-inline my-2 my-lg-0">
				<input class="form-control mr-sm-2" type="text" placeholder="Search">
				<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
			</form>
		</div>
	</nav>
</template>

<script>
export default {
	props: [ 'auth' ]
};
</script>


<style lang="scss" scoped>
.navbar {
	padding: 0.7rem;
}
.navbar-brand {
	text-transform: none;
}
.nav-item {
	padding: 0;
	margin-right: 0.5rem;

	&:last-child {
		margin-right: 2rem;
	}
}
.nav-link {
	text-transform: none;
}
</style>


