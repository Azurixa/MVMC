<template>
    <div class="product">
        <p>
            {{id}}
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: this.$route.params.id
        }
    }
}
</script>
