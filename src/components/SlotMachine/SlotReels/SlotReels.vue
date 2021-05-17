<template>
  <div class="Reel-wrapper white">
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-on:css="false"
    >
      <div
        v-show="spin"
        id="reels"
        name="slide"
        class="d-flex flex-column mb-6 white"
        :class="offset === 0 ? 'Reel' : 'Reel-offset'"
      >
        <img
          v-for="(item, index) in shuffledReelTileData"
          :key="item.name + index"
          class="Reel-image my-3"
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
  watch: {
    spin(value) {
      if (value) {
        setTimeout(() => {
          this.reelDuration--;
        }, 1000);
      }
    },
    reelDuration: {
      handler(value) {
        if (value > 0 && this.spin) {
          setTimeout(() => {
            this.reelDuration--;
          }, 1000);
        } else {
          this.animateEnd();
        }
      },
    },
  },
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
    //Sets local duration with duration prop as we can mutate a prop
    this.reelDuration = this.duration;
    //Sets initial position of reels
    this.randomIndex();
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
      // Start spinning of roulette
      this.randomIndex();
      this.spinRoulette();
    },
    spinRoulette() {
      // Changing state of spin will trigger animation
      this.spin = true;
      // reel-spinning emits a boolean that will disable spin button
      this.$emit("reel-spinning", this.spin);
      this.reelTileData = this.shuffleArray(this.reelTileData);
    },
    animateEnd() {
      if (this.reelDuration > 0) {
        // Randomize reel offset every second of timer duration
      } else {
        this.spin = false;
        this.$emit("reel-spinning", this.spin);

        let results = [];
        if (this.offset === 1) {
          console.log("offset1", this.offset);

          results.push(this.shuffledReelTileData[9]);
          results.push(this.shuffledReelTileData[10]);
          return this.$emit("stopped", results);
        }
        console.log("offset0", this.offset);

        results.push(this.shuffledReelTileData[9]);
        return this.$emit("stopped", results);
      }
    },
    randomIndex() {
      this.offset = Math.floor(Math.random() * 2);
    },
    beforeEnter(el) {
      let vm = this;
      // console.log("beforeEnter");
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
        lazy: true,
        repeat: this.reelDuration * 2,
        y: -1000,
        onStart() {
          vm.animateEnd();
        },
        onComplete() {
          done;
        },
      });
    },
    leave(el, done) {
      let vm = this;
      gsap.to(el, {
        duration: 0.5,
        ease: "none",
        stagger: 0.5,
        lazy: true,
        repeat: this.reelDuration * 2,
        y: -1000,
        onComplete() {
          done;
          vm.reelDuration = vm.duration;
        },
      });
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
  bottom: 41px;
  position: relative;
}

.Reel.v-leave-active {
  bottom: 26px;
}

.Reel-offset {
  bottom: 102px;
  position: relative;
}

.Reel-offset.v-leave-active {
  bottom: 85px;
}

@media only screen and (min-width: 540px) and (max-width: 959px) {
  .Reel {
    bottom: 45px;
    position: relative;
  }
}
</style>>
