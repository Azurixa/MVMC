<template>
	<div class="row">
		<div class="col-lg-4"></div>
		<div class="col-lg-4">
			<div class="card">
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
                <button class="btn btn-primary">LOGIN</button>
			</div>
		</div>
		<div class="col-lg-4"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: ""
		};
	}
};
</script>
