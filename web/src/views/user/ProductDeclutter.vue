<template>
	<div class="product-edit">
		<router-link
			:to="'/me/p/' + $route.params.id"
			class="btn btn-info mb-3"
		>
			Back
		</router-link>
		<div class="declutter-confirm" v-if="showConfirm">
			<div class="confirm card w-75">
				<div class="card-header">
					<p v-if="what == 'remove'" class="m-0 h2">
						Confirm declutter
					</p>
					<div v-if="what == 'give'" class="my-2 text-center">
						<h2>Give to</h2>
						<div
							class="photo"
							:style="{
								'background-image':
									'url(' +
									$store.getters.apiUrl +
									'images/profile/' +
									userGive.photo +
									')'
							}"
						></div>
						<div class="name">
							<p class="h4 m-0">
								{{ userGive.name }}
							</p>
						</div>
					</div>
				</div>
				<div class="card-body">
					<button
						class="btn btn-outline-info mb-3"
						@click="showConfirm = false"
					>
						Back
					</button>
					<p>
						Product name: <br />
						<strong>
							{{ product.name }}
						</strong>
					</p>
					<div class="form-group">
						<label for="confirm">Type product name</label>
						<input
							type="text"
							id="confirm"
							class="form-control"
							v-model="confirmName"
						/>
					</div>
					<button
						class="btn btn-danger btn-block"
						@click="declutterConfirm"
					>
						Declutter
					</button>
					<small>This action cannot be undone.</small>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-8">
				<div class="card">
					<div class="card-header">
						<h1 class="m-0">
							Declutter
						</h1>
					</div>
					<div class="card-body">
						<div class="form-group">
							<div class="form-check">
								<input
									class="form-check-input"
									type="radio"
									name="exampleRadios"
									id="exampleRadios1"
									value="remove"
									v-model="what"
								/>
								<label
									class="form-check-label"
									for="exampleRadios1"
								>
									Declutter
								</label>
							</div>
							<div class="form-check">
								<input
									class="form-check-input"
									type="radio"
									name="exampleRadios"
									id="exampleRadios2"
									value="give"
									v-model="what"
								/>
								<label
									class="form-check-label"
									for="exampleRadios2"
								>
									Give to someone
								</label>
							</div>
						</div>
						<div v-if="what == 'give'">
							<div class="form-group">
								<label for="username">Give to</label>
								<input
									type="email"
									id="username"
									class="form-control"
									placeholder="e-mail"
									v-model="userGiveEmail"
								/>
							</div>
							<button
								class="btn btn-outline-primary btn-sm"
								@click="checkUser"
							>
								Find user
							</button>
						</div>
						<div class="userGive text-center" v-if="userGive.name">
							<hr />
							<h2>Give to</h2>
							<div
								class="photo"
								:style="{
									'background-image':
										'url(' +
										$store.getters.apiUrl +
										'images/profile/' +
										userGive.photo +
										')'
								}"
							></div>
							<div class="name">
								<p class="h4 m-0">
									{{ userGive.name }}
								</p>
							</div>
						</div>
					</div>
					<button
						class="btn btn-primary"
						@click="declutter"
						:class="{ eddited: eddited }"
					>
						Declutter
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showConfirm: false,
			validUser: false,
			eddited: false,
			userGive: {
				_id: ""
            },
			userGiveEmail: "",
			what: "remove",
			confirmName: "",
			product: {
				pans: {
					all: 0
				}
			},
			user: {}
		};
	},
	created() {
		this.getProduct();
		this.$store.getters.user.then(user => {
			this.user = user;
		});
	},
	methods: {
		declutter() {
			console.log("OK");
			if (this.what == "remove") {
				this.showConfirm = true;
			} else if (this.what == "give") {
				if (this.userGive._id != "") {
					this.showConfirm = true;
				}
			}
		},
		declutterConfirm() {
			if (this.confirmName == this.product.name) {
				if (this.what == "remove") {
					this.product.status = "8declutter";
					this.updateProduct();
				} else if (this.what == "give") {
					this.product.from_user_id = this.user._id;
					this.product.user_id = this.userGive._id;
					this.product.status = "7gift";
					this.updateProduct();
				}
			}
		},
		checkUser() {
			fetch(
				this.$store.getters.apiUrl + "users/find/" + this.userGiveEmail,
				{
					headers: {
						Authorization: this.$store.getters.token
					}
				}
			)
				.then(res => res.json())
				.then(user => {
					this.userGive = Object.assign({}, user);
				});
		},
		getProduct() {
			fetch(
				this.$store.getters.apiUrl +
					"products/product/" +
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
						this.product = Object.assign({}, data);
					}
				});
		},
		updateProduct() {
			fetch(this.$store.getters.apiUrl + "products/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify({ product: this.product })
			})
				.then(res => res.json())
				.then(() => {
					//console.log(data);
					this.eddited = false;
					if (this.what == "give") {
						window.location.href = "/me/collection";
					} else {
						window.location.href = "/me/p/" + this.$route.params.id;
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.declutter-confirm {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fcfcfc;
	z-index: 500;
}
.photo {
	width: 128px;
	height: 128px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	margin: 0 auto;
}
</style>


