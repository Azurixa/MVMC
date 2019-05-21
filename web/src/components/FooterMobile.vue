<template>
	<div class="mobile-footer d-flex d-lg-none">
		<div class="fix"></div>
		<div class="footer">
			<div class="row">
				<router-link to="/me/new" class="col-3 item">
					<i class="bx bx-list-plus icon"></i>
					<p class="name">
						Add
					</p>
				</router-link>
				<router-link to="/me/wishlist" class="col-3 item">
					<i class="bx bx-list-check icon"></i>
					<p class="name">
						Wishlist
					</p>
				</router-link>
				<router-link to="/me/collection" class="col-3 item">
					<i class="bx bx-box icon"></i>
					<p class="name">
						Collection
					</p>
				</router-link>
				<router-link to="/me" class="col-3 item">
					<i class="bx bx-user icon"></i>
					<p class="name">
						Profile
					</p>
				</router-link>
			</div>
			<div class="level">
				<div
					class="progress"
					:style="{
						width: ((this.user.exp % 350) / 350) * 100 + '%'
					}"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {}
		};
	},
	mounted() {
		this.getUserData();
	},
	methods: {
		getUserData() {
			this.$store.getters.user.then(user => {
				this.user = Object.assign({}, user);
			});
		}
	}
};
</script>


<style lang="scss" scoped>
.mobile-footer {
	.fix {
		height: 75px;
	}
	.footer {
		position: fixed;
		z-index: 3000;
		bottom: 0;
		width: 100%;
		background-color: #fcfcfc;
		border-top: 1px solid rgba($color: #000, $alpha: 0.1);
		padding: 0.3rem 0 0 0;

		.level {
			height: 5px;
			width: 100%;
			border-top: 1px solid rgba($color: #000, $alpha: 0.1);
			margin-top: 0.25rem;

			.progress {
				transition: 0.5s all;
				background-color: black;
				height: 5px;
			}
		}
		.item {
			text-align: center;
			text-decoration: none !important;

			.icon {
				font-size: 2rem;
			}
			.name {
				font-size: 0.7rem;
				font-weight: 100;
				margin: {
					bottom: 0;
				}
			}
		}
	}
}
</style>

