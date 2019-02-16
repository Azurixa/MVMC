<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-mail</label>
                            <div class="col-md-6">
                                <input v-model="formData.username" id="email" type="email" class="form-control" name="email" rquired autofocus>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input v-model="formData.password" id="password" type="password" class="form-control" name="password" required>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary" @click="login($event)">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userLogin',
        data () {
            return {
                formData: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            login(element) {
                const form = new FormData();
                form.append('username', this.formData.username);
                form.append('password', this.formData.password);

                window.buttonState(element.target, 'btn-primary', 'btn-success', '<i class=\'bx bx-loader-alt bx-spin\' ></i> Login in progress');

                fetch('/api/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: form
                }).then(res => res.json()).then(data => {
                    // User logged in
                    if (data.message === undefined) {
                        // Get and save token for API use
                        localStorage.setItem('token', data.token_type + ' ' + data.access_token);
                        // Redirect user
                        document.location = '/my/collection';
                    } else {
                        window.buttonState(element.target, 'btn-success', 'btn-danger', '<i class=\'bx bx-error-circle\' ></i> Bad credentials!', 2000, 'btn-primary', 'Login');
                    }
                });
            }
        }
    }
</script>