<template>
  <div class="konteiner">

    <div
        style="text-align: center; font-size: 1.15em"
    >
      Seis
      <br>
      {{ `${valgeVõite} : ${mustaVõite}` }}
    </div>


    <div class="field">

      <div
          v-for="(ruut, index) in gameSquares"
          :key="index"
          :class="[getSquareColorClass(index), ruut !== null && ruut.tüüp === 'sihtkoht' ? 'sihtkoht' : '' ]"
          :style="index > 55 ? 'border-bottom: solid' : ''"
          @click="handleRuuduKlikk(ruut)"
      >

        <kabe-nupp
            v-if="ruut !== null && ruut.tüüp === 'nupp'"
            :player="ruut.player"
            :powerful="ruut.powerful"
            :position="ruut.cords"
            :klikitav="ruut.player === aktiivneMängija && (aktiivneMängija === 'valge' && player1Algo === 3 || aktiivneMängija === 'must' && player2Algo === 3)"
            :class="ruut.indikaator ? 'käija' : ''"
            @nupuKlikk="handleNupuKlikk(ruut)"
        />

      </div>
    </div>

  </div>
</template>

<script>
import {sooritaKäik, kasToimusSöömine} from "@/scripts/sooritaKäik";
import {annaRuuduKäigud, annaSöömised} from "@/scripts/annaRuuduKäigud"
import KabeNupp from "@/components/KabeNupp";
import "@/scripts/data";
import ErinevadLauaSeisud from "../../tests/unit/erinevadLauaSeisud";
import rumalAi from "@/AI/rumalAI";
import getInitialGameField from "@/scripts/data";
import annaAiKäik from "@/AI/targemAI";
import kasLõpp from "@/scripts/kasMängLäbi";
import LauaKontrollid from "@/components/LauaKontrollid";
import annaKõikKäigud from "@/scripts/annaKõikKäigud";
import miniMax from "@/AI/miniMax";


export default {

  name: "kabe-laud",
  components: {LauaKontrollid, KabeNupp},
  data() {
    return {
      gameField: [[]],
      valitudNupp: null,
      player1: "valge",
      aktiivneMängija: "valge",
      player1Algo: 0,
      player2Algo: 0,
      valgeVõite: 0,
      mustaVõite: 0,

      gameActive: false
    }
  },

  methods: {

    setDifficultyPlayer1(player1) {
      this.player1Algo = player1;
    },

    setDifficultyPlayer2(player2) {
      this.player2Algo = player2;
    },

    startGame() {
      this.algSeadistaLaud();
      this.gameActive = true;
      if (this.player1Algo === 3 && this.player2Algo === 3) {
        return;
      }
      if (this.player1Algo !== 3)
        this.sooritaAiKäik(this.player1Algo);
    },

    endGame() {
      this.algSeadistaLaud();
      this.valitudNupp = null;
      this.aktiivneMängija = "valge";
      this.player1 = "valge";
      this.gameActive = false;
    },

    algSeadistaLaud() {
      this.gameField = [[]]
      const uusLaud = getInitialGameField();
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (uusLaud[i][j]) {
            uusLaud[i][j].powerful = false
            uusLaud[i][j]["tüüp"] = "nupp"
          }
        }
      }
      this.gameField = uusLaud;
      this.gameField = JSON.parse(JSON.stringify(this.gameField));
    },

    isEvenRow(index) {
      if (index < 8)
        return true;
      if (index < 16)
        return false;
      if (index < 24)
        return true;
      if (index < 32)
        return false;
      if (index < 40)
        return true;
      if (index < 48)
        return false;
      return index < 56;
    },

    eemaldaSihtkohad() {
      if (this.gameField.length !== 1) {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (this.gameField[i][j] !== null && this.gameField[i][j].tüüp === "sihtkoht")
              this.gameField[i][j] = null;
          }
        }
      }
    },

    getSquareColorClass(index) {
      const isEvenRow = this.isEvenRow(index);
      const isEvenCol = index % 2 === 0;

      if (isEvenRow && isEvenCol)
        return "ruutValge"
      if (!isEvenRow && isEvenCol)
        return "ruutMust"
      if (isEvenRow && !isEvenCol)
        return "ruutMust"
      if (!isEvenRow && !isEvenCol)
        return "ruutValge"
    },

    handleNupuKlikk(ruut) {
      if (!ruut || ruut.tüüp === "sihtkoht") return;

      this.valitudNupp = ruut.cords;
      this.eemaldaSihtkohad();
      if (ruut.indikaator) {
        const käigud = annaRuuduKäigud(ruut.cords, this.gameField);
        for (let i = 0; i < käigud.length; i++) {
          const ruuduke = käigud[i][0];
          this.gameField[ruuduke[0]][ruuduke[1]] = {tüüp: "sihtkoht", cords: [ruuduke[0], ruuduke[1]]};
        }
      }
      this.gameField = JSON.parse(JSON.stringify(this.gameField));

    },

    handleRuuduKlikk(ruut) {
      if (!ruut || ruut.tüüp === "nupp") return;

      this.eemaldaSihtkohad();
      const uusLaud = sooritaKäik([this.valitudNupp, ruut.cords], this.gameField);
      this.gameField = uusLaud;

      if (kasToimusSöömine([this.valitudNupp, ruut.cords])) {
        const eating = annaSöömised(ruut.cords, this.gameField);
        if (eating.length !== 0) {
          this.aktiivneMängija = this.aktiivneMängija === "valge" ? "valge" : "must";
        } else
          this.aktiivneMängija = this.aktiivneMängija === "valge" ? "must" : "valge";
      } else {
        this.aktiivneMängija = this.aktiivneMängija === "valge" ? "must" : "valge";
      }
      const winner = kasLõpp(this.aktiivneMängija, this.gameField);

      if (winner) {
        const winningPlayer = this.aktiivneMängija === "must" ? "valge" : "must";
        if (winningPlayer === "must")
          this.mustaVõite++;
        else
          this.valgeVõite++;
        this.algSeadistaLaud();
      }

    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async sooritaAiKäik(algo) {

      const kiirus = 200;
      const winner = kasLõpp(this.aktiivneMängija, this.gameField);

      if (winner) {
        const winningPlayer = this.aktiivneMängija === "must" ? "valge" : "must";
        if (winningPlayer === "must")
          this.mustaVõite++;
        else
          this.valgeVõite++;
        this.algSeadistaLaud();
        return
      }

      let käik;
      if (algo === 0) {
        console.log("Rumal")
        käik = rumalAi(this.aktiivneMängija, this.gameField);
      }
      else if (algo === 1) {
        console.log("Mid")
        käik = annaAiKäik(this.aktiivneMängija, this.gameField, 4, [], this.aktiivneMängija).tee[0];
      }
      else if (algo === 2) {
        console.log("miniMax")
        käik = miniMax(this.aktiivneMängija, this.gameField, 5, [], this.aktiivneMängija).tee[0];
      }
      else
        return;


      let asukoht = käik[0];
      for (let i = 0; i < käik[1].length; i++) {
        await this.sleep(kiirus)
        if (!this.gameActive) return;
        const uusLaud = sooritaKäik([asukoht, käik[1][i]], this.gameField);
        asukoht = käik[1][i];
        this.gameField = uusLaud;

      }
      await this.sleep(kiirus)
      this.aktiivneMängija = this.aktiivneMängija === "valge" ? "must" : "valge";
    }
  },

  watch: {
    aktiivneMängija() {
      if (this.gameActive) {
        if (this.aktiivneMängija === "must" && this.player2Algo !== 3)
          this.sooritaAiKäik(this.player2Algo);
        else if (this.aktiivneMängija === "valge" && this.player2Algo !== 3)
          this.sooritaAiKäik(this.player1Algo);
      }
    }
  },

  computed: {
    gameSquares() {
      const squares = [];
      const moves = annaKõikKäigud(this.aktiivneMängija, this.gameField).map(it => JSON.stringify(it[0]));

      for (let i = 0; i < this.gameField.length; i++) {
        for (let j = 0; j < this.gameField[0].length; j++) {
          const ruut = this.gameField[i][j];

          if (ruut !== null && ruut.tüüp === "nupp") {
            if (moves.includes(JSON.stringify([i, j]))) {
              this.gameField[i][j]["indikaator"] = true;
            } else
              this.gameField[i][j]["indikaator"] = false;
          }

          if (ruut !== null && ruut.tüüp === "nupp") {
            ruut["cords"] = [i, j];
          }
          squares.push(ruut);
        }
      }
      return squares;
    }
  },

  mounted() {
    this.algSeadistaLaud();
  },

}

</script>

<style scoped>

.käija:hover {
  background-color: lime;
}


.konteiner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.field {
  display: grid;
  grid-template-columns: repeat(8, 6em);
  justify-content: center;

}

.ruutValge {
  border: solid;
  border-bottom: none;
  background-color: beige;
  display: flex;
  width: 6em;
  height: 6em;
  justify-content: center;
  align-items: center;
}

.ruutMust {
  border: solid;
  border-bottom: none;
  background-color: darkslategrey;
  display: flex;
  width: 6em;
  height: 6em;
  justify-content: center;
  align-items: center;
}

.sihtkoht {
  background-color: lightgreen;
}

</style>