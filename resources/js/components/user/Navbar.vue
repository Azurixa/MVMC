<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="/collection">
            {{user.name}}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        User
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/collection">My Collection</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/user">Dashboard</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/logout">Logout</a>
                    </div>
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