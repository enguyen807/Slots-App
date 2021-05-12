<template>
  <div class="Reel" :class="animate ? 'move' : ''">
    <div class="Reel-wrapper d-flex flex-column mb-6">
      <img
        v-for="(item, index) in shuffledReelTileData"
        :key="index"
        class="Reel-image mb-3 pa-3"
        :id="index"
        :src="`${item.image}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    animate: false,
    speed: null,
    reelTileData: [],
    reelIndex: 1,
    reelData: [
      {
        name: "3xBAR",
        image: "/assets/3xBAR.png",
      },
      {
        name: "2xBAR",
        image: "/assets/2xBAR.png",
      },
      {
        name: "BAR",
        image: "/assets/BAR.png",
      },
      {
        name: "7",
        image: "/assets/7.png",
      },
      {
        name: "Cherry",
        image: "/assets/Cherry.png",
      },
    ],
  }),
  beforeMount() {
    let symbolsArray = [];
    let count = this.reelData.length * 3;

    // Create bigger pool of symbols for reels
    while (count > 0) {
      const symbolIndex = Math.floor(Math.random() * this.reelData.length);
      const symbolObject = this.reelData[symbolIndex];
      symbolsArray.push(symbolObject);
      count--;
    }
    // Set reelTileData array to the bigger pool
    this.reelTileData = symbolsArray;
  },
  mounted: function () {
    // Once transition timing ends the animateEnd method is called to handle the passing
    // of data to the parent component
    this.$el.addEventListener("transitionend", this.animateEnd);
  },
  methods: {
    shuffleArray(array) {
      // Fisher Yates Shuffle method pretty much unbias shuffling of array
      const a = array.slice();

      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    start() {
      const min = 8;
      const max = 28;
      const speed = Math.floor(Math.random() * (max - min + 1) + min);
      this.speed = speed;
      this.toggleAnimate();
    },
    toggleAnimate() {
      this.animate = true;
      this.reelTileData = this.shuffleArray(this.reelTileData);
    },
    animateEnd() {
      this.animate = false;
      this.speed = this.speed - 1;
      if (this.speed > 0) {
        setTimeout(this.toggleAnimate, 10);
      } else {
        const topBar = this.shuffledReelTileData[0];
        const middleBar = this.shuffledReelTileData[1];
        const bottomBar = this.shuffledReelTileData[2];

        this.$emit("stopped", middleBar);
      }
    },
    randomIndex() {
      return Math.floor(Math.random() * (15 - 0) + 0);
    },
  },
  computed: {
    shuffledReelTileData() {
      return this.shuffleArray(this.reelTileData);
    },
  },
};
</script>

<style lang="postcss">
:root {
  --tileSize: 90px;
}

.Reel.move .Reel-wrapper {
  transition: margin-top 0.04s linear;
  margin-top: var(--tileSize);
}
</style>>
