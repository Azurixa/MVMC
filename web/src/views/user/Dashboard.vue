<template>
	<div class="user-dashboard">
		<div class="pane text-center">
			<div
				class="profile-image mx-auto"
				v-if="user.photo != ''"
				:style="{
					'background-image':
						'url(http://localhost:3001/images/profile/' +
						user.photo +
						')'
				}"
			></div>
			<div class="user-name">
				{{ user.name }}
				<span class="badge badge-primary">
					{{ user.level }}
				</span>
			</div>
		</div>
        <div class="pane">
            <router-link to="/me/edit" class="btn btn-primary btn-block">
                Edit profile
            </router-link>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
                photo: ''
            }
		};
	},
	created() {
		this.$store.getters.user.then(user => {
			this.user = Object.assign({}, user);
		});
	}
};
</script>


<style lang="scss" scoped>
.user-name {
	font-weight: 900;
	font-size: 1.4rem;
	color: black;
}
.profile-image {
	width: 180px;
	height: 180px;
	border-radius: 50%;
	margin-bottom: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.badge {
	position: relative;
	top: -2px;
    border-radius: 12px;
    font-size: 1.2rem;
}
.pane {
	border: {
		bottom: 1px solid rgba(#000, 0.1);
		top: 1px solid rgba(#000, 0.1);
	}
	border-radius: 1rem;
	padding: 1rem;
	margin-top: 1rem;

	.header {
		font-size: 1.1rem;
		font-weight: 800;
	}
	.content {
		margin: 0;
	}
}
</style>
