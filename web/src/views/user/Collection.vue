<template>
    <div class="my-collection">
        <p>
            Collection
        </p>
        <div class="card">
            <div class="card-body">
                {{collection}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collection: []
        }
    },
    created() {
        this.getCollection();
    },
    methods: {
        getCollection() {
            fetch('http://localhost:3001/products/my', {
                headers: {
                    Authorization: this.$store.getters.token
                }
            }).then(res => res.json()).then(data => {
                this.collection = data;
            });
        }
    }
}
</script>
