<template>
  <v-card class="d-flex justify-center mb-6" flat tile>
    <div class="d-flex flex-column">
      <div class="SlotMachine d-flex">
        <Reels
          :animate="animate"
          ref="reel1"
          v-on:stopped="reelStopped"
        ></Reels>
        <Reels
          :animate="animate"
          ref="reel2"
          v-on:stopped="reelStopped"
        ></Reels>
        <Reels
          :animate="animate"
          ref="reel3"
          v-on:stopped="reelStopped"
        ></Reels>
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
    animate: false,
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
      this.animate = true;
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

<style>
.SlotMachine {
  border: 2px solid black;
  border-radius: 5px;
  overflow: hidden;
  height: 455px;
}
</style>