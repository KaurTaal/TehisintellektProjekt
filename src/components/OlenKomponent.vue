<template>
    <div class="info">Kompoent {{number}}</div>
</template>

<script>
    export default {
        name: "OlenKomponent",
        props: ['number']
    }
</script>

<style scoped>
.info{
    font-size: 2em;
}
</style>