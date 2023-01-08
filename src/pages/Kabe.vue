<template>
    <div class="konteiner">

        <div style="margin-bottom: 3em;">Algus</div>

        <OlenKomponent
                v-for="(nr, index) in numbrid"
                :key="index"
                :number="nr"
        />

        <div style="margin-top: 3em;">Lõpp</div>

    </div>
</template>

<script>
    import OlenKomponent from "../components/OlenKomponent";

    export default {
        name: "Kabe",

        components: {OlenKomponent},

        data(){
            return {
                numbrid: [1, 3, 5, 6]
            }
        }
    }
</script>

<style scoped>
.konteiner{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>