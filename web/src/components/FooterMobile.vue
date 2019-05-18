<template>
	<div class="mobile-footer d-flex d-lg-none">
		<div class="fix"></div>
		<div class="footer">
			<div class="row">
                <router-link to="/me/new" class="col-4 item">
					<i class="bx bx-list-plus icon"></i>
					<p class="name">
						Add
					</p>
				</router-link>
                <router-link to="/me/collection" class="col-4 item">
					<i class="bx bx-box icon"></i>
					<p class="name">
						Collection
					</p>
				</router-link>
                <router-link to="/me" class="col-4 item">
					<i class="bx bx-user icon"></i>
					<p class="name">
						Profile
					</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.mobile-footer {
	.fix {
		height: 70px;
	}
	.footer {
		position: fixed;
        z-index: 3000;
		bottom: 0;
		width: 100%;
		background-color: #fcfcfc;
		border-top: 1px solid rgba($color: #000, $alpha: 0.1);
		padding: 0.3rem 0;

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

