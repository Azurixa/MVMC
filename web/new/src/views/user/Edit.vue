<template>
	<div class="user-edit">
		<div class="row">
			<div class="col-lg-4"></div>
			<div class="col-lg-4">
				<div class="form-group">
					<label for="name">Name</label>
					<input id="name" class="form-control" v-model="editInfo.name">
				</div>
				<button class="btn btn-primary" @click="update">Update</button>
			</div>
			<div class="col-lg-4"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			editInfo: {}
		};
	},
	created() {
		this.$store.getters.user.then(user => {
			this.editInfo = Object.assign({}, user);
		});
	},
	methods: {
		update() {
			fetch("http://localhost:3001/users/edit", {
				method: "PUT",
				headers: {
					Authorization: this.$store.getters.token,
					"Content-type": "application/json"
				},
				body: JSON.stringify(this.editInfo)
			})
				.then(res => res.json())
				.then(data => {
					this.$parent.$refs.navbar.getUserData();
				});
		}
	}
};
</script>
