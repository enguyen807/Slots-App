<template>
  <div class="Reel-wrapper white">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      @css="false"
    >
      <div
        v-show="spin"
        id="reels"
        name="slide"
        class="d-flex flex-column mb-6 white"
        :class="this.handleReelClass()"
      >
        <img
          v-for="(item, index) in shuffledReelTileData"
          :key="item.name + index"
          class="Reel-image my-3"
          :data-index="index"
          :src="require(`@/assets/${item.name}.png`)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "SlotReel",
  emits: ["reel-spinning", "stopped"],
  props: {
    duration: {
      type: Number,
    },
    debugEnabled: {
      type: Boolean,
    },
    debugReel: {
      type: Object,
    },
    reelData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    spin: false,
    reelTileData: [],

    reelDuration: 0,
    offset: 0,
  }),
  watch: {
    // Countdown timer for reels
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
    setDebugSymbols() {
      if (!this.debugEnabled) return;
      const symbol = this.debugReel.symbol;
      // Since position of where the reel is stopped always land on index 9 and 10
      // we can replace the object in the array with our debug props

      if (this.debugReel.position.name === "center") {
        this.reelTileData[9] = {
          image: `/assets/${symbol}.png`,
          name: `${symbol}`,
        };
      }

      if (this.debugReel.position.name === "top") {
        this.reelTileData[9] = {
          image: `/assets/${symbol}.png`,
          name: `${symbol}`,
        };
      }

      if (this.debugReel.position.name === "bottom") {
        this.reelTileData[10] = {
          image: `/assets/${symbol}.png`,
          name: `${symbol}`,
        };
      }
    },
    start() {
      // Set debug props
      this.setDebugSymbols();
      // Start spinning of roulette
      this.randomIndex();
      this.spinRoulette();
    },
    spinRoulette() {
      // Changing state of spin will trigger animation
      this.spin = true;
      // reel-spinning emits a boolean that will disable spin button
      this.$emit("reel-spinning", this.spin);
      this.reelTileData = this.debugEnabled
        ? this.reelTileData
        : this.shuffleArray(this.reelTileData);
    },
    animateEnd() {
      if (this.reelDuration > 0) {
        // Randomize reel offset every second of timer duration
      } else {
        this.spin = false;
        this.$emit("reel-spinning", this.spin);

        let results = [];
        if (this.offset === 1) {
          // Reels will always stop on index 9 or 10 of array
          results.push(this.shuffledReelTileData[9]);
          results.push(this.shuffledReelTileData[10]);
          return this.$emit("stopped", results);
        }

        results.push(this.shuffledReelTileData[9]);
        return this.$emit("stopped", results);
      }
    },
    randomIndex() {
      if (this.debugEnabled) {
        this.offset = this.debugReel.position.value;
        return true;
      }
      this.offset = Math.floor(Math.random() * 2);
      return false;
    },
    handleReelClass() {
      // Reel = Center [1]
      // Offset = Top & Bottom [0]
      let reelClass = null;
      if (this.debugEnabled) {
        return (reelClass =
          this.debugReel.position.value === 0 ? "Reel" : "Reel-offset");
      }
      return (reelClass = this.offset === 0 ? "Reel" : "Reel-offset");
    },
    // Reel spinning animation
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
      if (!this.debugEnabled) {
        return this.shuffleArray(this.reelTileData);
      }

      return this.reelTileData;
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

.Reel-wrapper {
  z-index: 2;
}

@media only screen and (min-width: 540px) and (max-width: 959px) {
  .Reel {
    bottom: 45px;
    position: relative;
  }
}
</style>>
