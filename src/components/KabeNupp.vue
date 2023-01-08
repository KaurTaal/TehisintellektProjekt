<template>
    <div
        class="nupp"
        :class="[player, powerful]"
        @click="handleKabenupuKlikk"
    >
      <i
          class="fas fa-skull tammi-ikoon"
          :class="player === 'must' ? 'tammi-ikoon-must' : 'tammi-ikoon-valge'"
          v-show="powerful"
      ></i>

    </div>
</template>

<script>

export default {
  name: "kabe-nupp",
  props: {
    player: {
      default: 'must',
      type: String
    },
    powerful: {
      default: false,
      type: Boolean
    },
    position: {
      default: null,
      type: Array
    },
    klikitav: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    handleKabenupuKlikk() {
      if (this.klikitav)
        this.$emit("nupuKlikk", this.position)
    }
  }
}

</script>

<style scoped>

.nupp {
  height: 70%;
  width: 70%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.valge {
  background-color: white;
}

.must {
  background-color: black;
}

.tammi-ikoon-must{
 font-size: 2em;
  color: white;
}

.tammi-ikoon-valge{
  font-size: 2em;
  color: black;
}


.valge:hover {
  cursor: pointer;
  opacity: 0.5;
}

.must:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>