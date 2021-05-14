<template>
  <v-card class="d-flex justify-center mb-6" flat tile>
    <div class="d-flex flex-column">
      <div class="SlotMachine d-flex">
        <div class="SlotMachine-payline--top"></div>
        <div class="SlotMachine-payline--mid"></div>
        <div class="SlotMachine-payline--bot"></div>
        <Reels :duration="5" ref="reel1" v-on:stopped="reelStopped"></Reels>
        <Reels :duration="10" ref="reel2" v-on:stopped="reelStopped"></Reels>
        <Reels :duration="20" ref="reel3" v-on:stopped="reelStopped"></Reels>
      </div>
      <v-card-actions>
        <v-btn outlined rounded text @mousedown="spin()"> Spin </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import Reels from "@/components/SlotMachine/SlotReels/SlotReels.vue";

export default {
  components: {
    Reels,
  },
  data: () => ({
    currentBalance: 0,
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
    results: [],
  }),
  methods: {
    spin() {
      this.results = [];
      this.$refs.reel1.start();
      this.$refs.reel2.start();
      this.$refs.reel3.start();
    },
    reelStopped(resultData) {
      this.results.push(resultData);
      if (this.results.length === 3) {
        this.checkWin(this.results);
      }
    },
    checkWin(data) {
      // console.log(data);
    },
  },
};
</script>

<style lang="postcss">
.SlotMachine {
  border: 2px solid black;
  border-radius: 5px;
  overflow: hidden;
  height: 280px;
  position: relative;
}
.SlotMachine-payline--top {
  position: absolute;
  top: calc(var(--tileSize) * 0.7 * 1.1666);
  height: 1px;
  width: 100%;
  background: red;
}
.SlotMachine-payline--mid {
  position: absolute;
  top: calc(var(--tileSize) * 1.3 * 1.1666);
  height: 1px;
  width: 100%;
  background: red;
}
.SlotMachine-payline--bot {
  position: absolute;
  top: calc(var(--tileSize) * 1.9 * 1.1666);
  height: 1px;
  width: 100%;
  background: red;
}
</style>