<template>
	<div class="user-dashboard">
		<div class="pane text-center">
            <div class="profile-image mx-auto"></div>
			<div class="user-name">
                {{ user.name }}
                <span class="badge badge-primary">
                    {{ user.level }}
                </span>
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
    background-color: teal;
    margin-bottom: 1rem;
}
.badge {
    position: relative;
    top: -2px;
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
