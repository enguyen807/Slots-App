<template>
  <transition
    name="mainSlide"
    class="Reel"
    v-on:enter="enter"
    v-on:leave="leave"
    v-on:css="false"
  >
    <div
      v-show="spin"
      name="slide"
      ref="reelWrapper"
      class="Reel-wrapper d-flex flex-column mb-6"
      :class="randomIndex() === 0 ? 'Reel-wrapper' : 'Reel-wrapper-offset'"
    >
      <img
        v-for="(item, index) in shuffledReelTileData"
        :key="item.name + index"
        class="Reel-image mb-3"
        :data-index="index"
        :src="`${item.image}`"
      />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
    },
  },
  data: () => ({
    spin: false,
    reelTileData: [],
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
    reelDuration: 0,
  }),
  watch: {},
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
  mounted() {
    // Animation is set to half the speed of 1 sec therefore time spent spinning will be halved
    this.reelDuration = this.duration;
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
      this.spinRoulette();
    },
    spinRoulette() {
      this.spin = true;
      this.reelTileData = this.shuffleArray(this.reelTileData);
    },
    animateEnd() {
      // console.log(this.reelDuration);
      if (this.reelDuration === 0) {
        this.spin = false;
        console.log("Finished");
        return true;
      }

      setTimeout(() => {
        this.reelDuration -= 1;
        this.animateEnd();
      }, 1000);

      // if (this.reelDuration > 0) {
      //   this.animateEnd();
      // } else {
      //   const topBar = this.shuffledReelTileData[0];
      //   const middleBar = this.shuffledReelTileData[1];
      //   const bottomBar = this.shuffledReelTileData[2];
      //   this.$emit("stopped", middleBar);
      // }
    },
    randomIndex() {
      return Math.floor(Math.random() * 2);
    },
    spinAnimation(el) {
      let vm = this;
      let spinAnimation = gsap.timeline();
      spinAnimation.add();
      spinAnimation.to(el, {
        duration: 0.5,
        ease: "none",
        repeat: this.reelDuration * 2,
        y: -1000,
        onStart() {
          vm.animateEnd();
        },
      });
      return spinAnimation;
    },
    enter(el, done) {
      this.spinAnimation(el);
      done;
      // console.log("enter");
    },
    leave(el, done) {
      this.spinAnimation(el);
      done;
      // console.log("leave");
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

.Reel-wrapper {
  bottom: 55px;
  position: relative;
}

.Reel-wrapper-offset {
  bottom: 125px;
  position: relative;
}
</style>>
