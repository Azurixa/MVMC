<template>
    <div>

        <nav class="navbar navbar-expand-lg navbar-light" v-if="level == 0">
            <a class="navbar-brand" href="/">
                Make-up
            </a>

            <a class="navbar-brand d-lg-none"
               onclick="document.getElementById('navbarSupportedContent').toggleAttribute('show')">
                Guest <p class="bx bxs-user-circle m-0"></p>
            </a>

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

            <button class="navbar-toggler d-lg-block mr-lg-2 mr-0" type="button" v-if="collection"
                    onClick="document.getElementById('collection').toggleAttribute('show')">
                <i class="bx bx-box h3 m-0"></i>
            </button>

            <a class="navbar-brand d-lg-none ml-auto"
               onclick="document.getElementById('navbarSupportedContent').toggleAttribute('show')">
                {{user.name}}
                <span class="badge badge-info current-level" data-toggle="tooltip"
                      data-placement="bottom" title="Current makeup level">
                    {{user.level}}
                </span>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="level > 1">
                        <a class="nav-link text-danger" href="/admin/dashboard">ADMIN</a>
                    </li>
                    <li class="nav-item">
                        <div class="d-block d-lg-none py-5 text-center">
                            <div class="avatar">
                                <span>{{user.name | firstLetter}}</span>
                            </div>
                            <p class="mb-0 mt-3">{{user.name}} <span class="badge badge-info">{{user.level}}</span></p>
                            <small>{{user.exp}} / {{user.exp_next}} ({{user.exp_next - user.exp}})</small>
                            <br>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="row">
                            <div class="col-6 col-lg-12">
                                <a class="nav-link" href="/">Home</a>
                            </div>
                            <div class="col-6 d-flex align-items-center justify-content-end d-lg-none">
                                <i class="bx bx-home"></i>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item mt-5 mt-lg-0">
                        <div class="row">
                            <div class="col-6 col-lg-12">
                                <a class="nav-link" href="/my/collection">My collection</a>
                            </div>
                            <div class="col-6 d-flex align-items-center justify-content-end d-lg-none">
                                <i class="bx bx-box"></i>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <a class="navbar-brand ml-auto d-none d-lg-block">
                        <span class="badge badge-info current-level" data-toggle="tooltip"
                              data-placement="bottom" title="Current makeup level">{{user.level}}</span> {{user.name}}
                    </a>
                    <li class="nav-item">
                        <div class="row">
                            <div class="col-6 col-lg-12">
                                <a class="nav-link" href="/logout">Logout</a>
                            </div>
                            <div class="col-6 d-flex align-items-center justify-content-end d-lg-none">
                                <i class="bx bx-log-out"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="level-progress" v-if="level > 0">
            <div class="progress" data-toggle="tooltip"
                 data-placement="bottom" title="Current experience / next level">
                <div class="progress-bar" :style="{'width': ((((user.exp % 150))/150) * 100) + '%'}" role="progressbar"
                     :aria-valuenow="user.exp" aria-valuemin="0" :aria-valuemax="user.exp_next">
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
                collection: false,
            }
        },
        created() {
            if (this.level > 0) {
                this.getUserData();
                setInterval(() => {
                    this.getUserData();
                }, 2000);
            }

            if (document.location.pathname === '/my/collection') {
                this.collection = true;
            }
        },
        filters: {
            firstLetter(value = '?') {
                return value.charAt(0);
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

<style lang="scss" scoped>
    .avatar {
        width: 160px;
        height: 160px;
        margin: 0 auto;
        border-radius: 50%;
        background: #0f6674;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 50px;
    }
</style>