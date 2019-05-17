<template>
	<div class="row">
		<div class="col-lg-2"></div>
		<div class="col-lg-4">
			<div class="card">
				<div class="card-header">
					<h2>Login</h2>
					<p class="m-0">Login to existing account</p>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="email">E-mail</label>
						<input
							class="form-control"
							type="email"
							id="email"
							v-model="email"
							placeholder="makeup@example.com"
						>
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input
							class="form-control"
							type="password"
							id="password"
							v-model="password"
							placeholder="**********"
						>
					</div>
				</div>
				<button class="btn btn-primary" @click="login">LOGIN</button>
			</div>
			<p class="swipe-tooltip text-center m-0">Swipe to right for REGISTER</p>
		</div>
		<div class="col-lg-4">
			<div class="card">
				<div class="card-header">
					<h2>Register</h2>
					<p class="m-0">Create new account</p>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="email">Name</label>
						<input class="form-control" type="text" id="name" v-model="name" placeholder="Makeup Artist">
					</div>
					<div class="form-group">
						<label for="email">E-mail</label>
						<input
							class="form-control"
							type="email"
							id="email"
							v-model="email"
							placeholder="makeup@example.com"
						>
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input
							class="form-control"
							type="password"
							id="password"
							v-model="password"
							placeholder="**********"
						>
					</div>
					<div class="form-group">
						<label for="password2">Repeat assword</label>
						<input
							class="form-control"
							type="password"
							id="password2"
							v-model="password2"
							placeholder="**********"
						>
					</div>
				</div>
				<button class="btn btn-primary" @click="register">REGISTER</button>
			</div>
			<p class="swipe-tooltip text-center m-0">Swipe to left for LOGIN</p>
		</div>
		<div class="col-lg-2"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			email: "",
			password: "",
			password2: ""
		};
	},
	methods: {
		register() {
			if (this.name && this.email && this.password) {
				const registerData = {
					name: this.name,
					email: this.email,
					password: this.password
				};

				fetch("http://localhost:3001/users/register", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(registerData)
				})
					.then(res => res.json())
					.then(() => {
						this.login();
					});
			}
		},
		login() {
			const formData = {
				email: this.email,
				password: this.password
			};

			fetch("http://localhost:3001/auth/token", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(formData)
			})
				.then(res => res.json())
				.then(data => {
					if (typeof data.err === "undefined") {
						const token = data.token_type + " " + data.token;
						console.log(token);
						this.$store.commit("setToken", token);
						document.location.href = "/me";
					} else {
						console.log(data.err);
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.swipe-tooltip {
	display: none;
}

.row {
	@media screen and(max-width: 800px) {
		overflow-x: scroll;
		display: grid;
		grid-template-columns: repeat(2, 100%);
		scroll-snap-type: x mandatory;
		height: calc(100vh - 60px - 2rem);

		.col-lg-4 {
			scroll-snap-align: start;
			height: 100%;

			.swipe-tooltip {
				display: block;
				position: absolute;
				bottom: 15px;
				width: 100%;
			}
		}
		.col-lg-2 {
			display: none;
		}
	}
}
</style>
