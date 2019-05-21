<template>
	<div class="user-edit">
		<div class="row">
			<div class="col-lg-8">
				<div class="card">
					<div class="card-header">
						<h2>Profile edit</h2>
						<p class="m-0">Edit profile details</p>
					</div>
					<div class="card-body">
						<div class="form-group">
							<label for="name">Name</label>
							<input
								id="name"
								type="text"
								class="form-control"
								v-model="editInfo.name"
							/>
						</div>
						<div class="form-group">
							<label for="photo">Profile photo</label>
							<input
								id="photo"
								type="file"
								class="form-control"
								ref="photo"
								@change="handleFileUpload"
							/>
						</div>
					</div>
					<button class="btn btn-primary" @click="update">
						Update
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
			editInfo: {},
			photo: null
		};
	},
	created() {
		this.$store.getters.user.then(user => {
			this.editInfo = Object.assign({}, user);
		});
	},
	methods: {
		handleFileUpload() {
			this.photo = this.$refs.photo.files[0];
		},
		uploadProfilePhoto() {
			const bodyData = new FormData();
			bodyData.append("photo", this.photo);
			fetch("http://localhost:3001/users/photo", {
				method: "POST",
				headers: {
					Authorization: this.$store.getters.token
				},
				body: bodyData
			})
				.then(res => res.json())
				.then(data => {
					if (data.err) {
						console.log(data.err);
                    }
                    window.location.href = "/me";
				});
		},
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
				.then(() => {
					if (this.photo != null) {
						this.uploadProfilePhoto();
					} else {
                        window.location.href = "/me";
                    }
					this.$parent.$refs.navbar.getUserData();
					this.$parent.$refs.footbar.getUserData();
				});
		}
	}
};
</script>
