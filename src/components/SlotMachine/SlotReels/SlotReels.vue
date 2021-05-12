<template>
  <div class="Reel">
    <div class="Reel-wrapper" v-for="n in 5" :key="n">
      <img class="Reel-image" :src="reelTileData[n].image" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    speed: null,
    reelTileData: null,
    reelIndex: 2,
    tile1Index: 0,
    tile2Index: 1,
    tile3Index: 2,
    tile4Index: 3,
    tile5Index: 4,
    reelData: [
      {
        name: "3xBAR",
        image: "@/assets/3xBAR.png",
      },
      {
        name: "2xBAR",
        image: "@/assets/2xBAR.png",
      },
      {
        name: "BAR",
        image: "@/assets/BAR.png",
      },
      {
        name: "7",
        image: "@/assets/7.png",
      },
      {
        name: "Cherry",
        image: "@/assets/Cherry.png",
      },
    ],
    payTable: [
      {
        position: "top",
        combination: ["Cherry", "Cherry", "Cherry"],
        value: 2000,
      },
      {
        position: "center",
        combination: ["Cherry", "Cherry", "Cherry"],
        value: 1000,
      },
      {
        position: "bottom",
        combination: ["Cherry", "Cherry", "Cherry"],
        value: 4000,
      },
      {
        position: null,
        combination: ["7", "7", "7"],
        value: 150,
      },
      {
        position: null,
        combination: ["7", "Cherry"],
        value: 75,
      },
      {
        position: null,
        combination: ["3xBAR", "3xBAR", "3xBAR"],
        value: 50,
      },
      {
        position: null,
        combination: ["2xBAR", "2xBAR", "2xBAR"],
        value: 20,
      },
      {
        position: null,
        combination: ["BAR", "BAR", "BAR"],
        value: 10,
      },
      {
        position: null,
        combination: ["BAR", "2xBAR", "3xBAR"],
        value: 5,
      },
    ],
  }),
  beforeMount() {
    let symbolsArray = [];
    let count = this.reelData.length * 3;

    while (count > 0) {
      const symbolIndex = Math.floor(Math.random() * this.reelData.length);
      const symbolObject = this.reelData[symbolIndex];
      symbolsArray.push(symbolObject);
      count--;
    }

    this.reelTileData = this.shuffleIndexOfReelSymbols(symbolsArray);
  },
  mounted: function () {
    this.$el.addEventListener("transitionend", this.animateEnd);
  },
  methods: {
    shuffleIndexOfReelSymbols(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    start() {
      const min = 8;
      const max = 28;
      const speed = Math.floor(Math.random() * (max - min + 1) + min);
      this.speed = speed;
      this.animate();
    },
    animate() {
      this.$el.classList.add("move");
    },
    animateEnd() {
      this.$el.classList.remove("move");
      this.reIndex();
      this.speed = this.speed - 1;
      if (this.speed > 0) {
        setTimeout(this.animate, 10);
      } else {
        const reelTileData = this.reelTileData[this.reelIndex];
        this.$emit("stopped", reelTileData);
      }
    },
    reIndex() {
      const end = this.reelTileData.length - 1; //this.reelTileCount - 1
      const index = this.reelIndex === 0 ? end : this.reelIndex - 1;
      // const index = this.index === end ? 0 : this.index + 1
      this.reelIndex = index;
      this.tile1Index = index === 1 ? end : index === 0 ? end - 1 : index - 2;
      this.tile2Index = index === 0 ? end : index - 1;
      this.tile3Index = index;
      this.tile4Index = index === end ? 0 : index + 1;
      this.tile5Index = index === end - 1 ? 0 : index === end ? 1 : index + 2;
    },
  },
};
</script>

<style>
</style>