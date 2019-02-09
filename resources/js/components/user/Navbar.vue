<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand text-white">
            {{user.name}}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/my/dashboard">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/my/collection">Collection</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'navbar',
        data () {
            return {
                token: localStorage.getItem('token'),
                user: {},
            }
        },
        created() {
            this.getUserData();
        },
        methods: {
            getUserData() {
                fetch('/api/user', {
                    headers: {
                        'Authorization': this.token,
                    }
                }).then(res => res.json()).then(data => this.user = data);
            }
        },
    }
</script>