<template>
  <div class="Reel-wrapper white">
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >
      <div
        v-show="spin"
        id="reels"
        name="slide"
        class="Reel d-flex flex-column mb-6 white"
        :class="offset === 0 ? 'Reel' : 'Reel-offset'"
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
  </div>
</template>

<script>
import { gsap } from "gsap";

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
    offset: 0,
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
      this.randomIndex();
    },
    spinRoulette() {
      this.spin = true;
      this.$emit("reel-spinning", this.spin);
      this.reelTileData = this.shuffleArray(this.reelTileData);
    },
    resetReelDuration() {},
    animateEnd() {
      if (this.reelDuration > 0) {
        setTimeout(() => {
          this.reelDuration -= 1;
          this.animateEnd();
        }, 1000);
      } else {
        this.spin = false;
        this.$emit("reel-spinning", this.spin);
        // console.log("Finished");
        let results = [];
        if (this.offset === 1) {
          results.push(this.shuffledReelTileData[9]);
          results.push(this.shuffledReelTileData[10]);
          return this.$emit("stopped", results);
        }
        results.push(this.shuffledReelTileData[9]);
        return this.$emit("stopped", results);
      }
    },
    randomIndex() {
      this.offset = Math.floor(Math.random() * 2);
    },
    spinAnimation(el, done) {
      let vm = this;
      let tl = gsap.timeline();

      // Since duration of animation is set to half a second we need to double the time it spins or it will
      // end early while the timer is still counting down
      let spinAnima = gsap.to(el, {
        duration: 0.5,
        ease: "none",
        repeat: this.reelDuration,
        y: -1000,
        onStart() {
          vm.animateEnd();
        },
        onComplete() {
          done;
        },
      });
      tl.add(spinAnima);
      return tl;
    },
    beforeEnter(el) {
      let vm = this;
      console.log("beforeEnter");
      gsap.set(el, {
        y: 0,
        onComplete() {
          vm.reelDuration = vm.duration;
        },
      });
    },
    enter(el, done) {
      let vm = this;
      gsap.to(el, {
        duration: 0.5,
        ease: "none",
        repeat: this.reelDuration * 2,
        y: -1000,
        onStart() {
          vm.animateEnd();
        },
        onComplete() {
          done;
          // console.log("Enter");
        },
      });
    },
    leave(el, done) {
      let vm = this;
      gsap.to(el, {
        duration: 0.5,
        ease: "none",
        repeat: this.reelDuration * 2,
        y: -1000,
        onComplete() {
          done;
          // console.log("Leave");
          vm.reelDuration = vm.duration;
        },
      });
    },
    afterLeave(el) {
      // console.log("afterLeave");
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

.Reel-image {
  width: 100%;
  max-width: 131px;
}

.Reel {
  bottom: 15px;
  position: relative;
}

.Reel-wrapper {
  border-color: none;
  border: 5px solid #aed581 !important;
  z-index: 900;
}

.Reel-offset {
  bottom: 105px;
  position: relative;
}

@media only screen and (min-width: 540px) and (max-width: 959px) {
  .Reel {
    bottom: 45px;
    position: relative;
  }
}
</style>>
