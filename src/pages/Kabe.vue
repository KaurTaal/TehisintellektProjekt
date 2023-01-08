<template>
  <div class="konteiner">
    <Header></Header>
    <div class="laud">
      <LauaKontrollid
          @start="handleStart"
          @end="handleEnd"
          @player1="handleDifficultyPlayer1"
          @player2="handleDifficultyPlayer2"
      ></LauaKontrollid>
      <kabe-laud ref="kabelaud"/>
    </div>
    <Footer></Footer>

  </div>
</template>

<script>
import KabeLaud from "@/components/KabeLaud";
import KabeNupp from "@/components/KabeNupp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Valikud from "@/components/LauaKontrollid";
import LauaKontrollid from "@/components/LauaKontrollid";

export default {
  name: "kabe",
  components: {LauaKontrollid, Valikud, Header, KabeNupp, KabeLaud, Footer},

  methods: {
    handleStart() {
      this.$refs.kabelaud.startGame()
    },
    handleEnd(){
      this.$refs.kabelaud.endGame()
    },
    handleDifficultyPlayer1(player1){
      this.$refs.kabelaud.setDifficultyPlayer1(player1)
    },
    handleDifficultyPlayer2(player2){
      this.$refs.kabelaud.setDifficultyPlayer2(player2)
    }
  }
}


</script>

<style scoped>
.konteiner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.laud{
}
</style>