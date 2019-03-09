<template>
    <div>

        <nav class="navbar navbar-expand-lg navbar-light" v-if="level == 0">
            <a class="navbar-brand" href="/">
                Make-up
            </a>
            <button class="navbar-toggler" type="button" onclick="document.getElementById('navbarSupportedContent').toggleAttribute('show')">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse guest" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                </ul>
            </div>
        </nav>

        <nav class="navbar navbar-expand-lg navbar-light" v-if="level > 0">

            <button class="navbar-toggler" type="button" onclick="document.getElementById('navbarSupportedContent').toggleAttribute('show')">
                <span class="navbar-toggler-icon"></span>
            </button>

            <a class="navbar-brand d-lg-none">
                {{user.name}} <span class="badge badge-info current-level" data-toggle="tooltip"
                                    data-placement="bottom" title="Current makeup level">{{user.level}}</span>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="level > 1">
                        <a class="nav-link text-danger" href="/admin/dashboard">ADMIN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/my/collection">My collection</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <a class="navbar-brand ml-auto d-none d-lg-block">
                        <span class="badge badge-info current-level" data-toggle="tooltip"
                      data-placement="bottom" title="Current makeup level">{{user.level}}</span> {{user.name}}
                    </a>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="level-progress" v-if="level > 0">
            <div class="progress" data-toggle="tooltip"
                 data-placement="bottom" title="Current experience / next level">
                <div class="progress-bar" :style="{'width': user.exp/user.exp_next * 100 + '%'}" role="progressbar"
                     :aria-valuenow="user.exp" aria-valuemin="0" :aria-valuemax="user.exp_next">
                    {{user.exp}} / {{user.exp_next}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'navbar',
        props: ['level'],
        data() {
            return {
                token: localStorage.getItem('token'),
                user: {},
            }
        },
        created() {
            if (this.level > 0) {
                this.getUserData();
                setInterval(() => {
                    this.getUserData();
                }, 2000);
            }
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