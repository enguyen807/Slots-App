<template>
  <v-container fluid class="d-flex justify-center mb-6" flat tile>
    <v-card flat class="d-flex flex-column flex-md-row pa-3">
      <div class="col-md-6">
        <div class="SlotMachine d-flex black">
          <div ref="payline1" class="SlotMachine-payline--top"></div>
          <div ref="payline2" class="SlotMachine-payline--mid"></div>
          <div ref="payline3" class="SlotMachine-payline--bot"></div>
          <Reels
            :duration="2"
            name="reel1"
            ref="reel1"
            v-on:stopped="reelStopped"
          ></Reels>
          <Reels
            :duration="4"
            name="reel2"
            ref="reel2"
            v-on:stopped="reelStopped"
            class="mx-4"
          ></Reels>
          <Reels
            :duration="6"
            name="reel3"
            ref="reel3"
            @reel-spinning="handleSpinStatus"
            v-on:stopped="reelStopped"
          ></Reels>
        </div>
        <v-text-field
          label="Credits"
          class="mt-6"
          outlined
          dense
          v-model="currentBalance"
        ></v-text-field>
      </div>
      <div class="flex-column col-md-6">
        <div class="paytable">
          <div
            class="paytable--wrapper"
            v-for="(item, index) in payTable"
            :key="index"
          >
            <v-row class="paytable--row" v-if="item.combination.length > 2">
              <v-col class="paytable--imgColumn pr-0">
                <img
                  class="paytable--img"
                  v-for="(symbol, index) in item.combination"
                  :key="symbol + index"
                  :src="`/assets/${symbol}.png`"
                  width="25"
                  height="22"
                />
              </v-col>
              <v-col class="paytable--textColumn col-3 col-md-4">
                on {{ item.position ? item.position : "any" }} line
              </v-col>
              <v-col class="paytable--valueColumn text-right">{{
                item.value
              }}</v-col>
            </v-row>
            <v-row class="paytable--row" v-else>
              <v-col
                class="paytable--imgColumn paytable--imgColumn-single col-10"
              >
                Any combination of

                <img
                  class="paytable--img"
                  v-for="(symbol, index) in item.combination"
                  :key="symbol + index"
                  :src="`/assets/${symbol}.png`"
                  width="25"
                  height="22"
                />

                on any line
              </v-col>
              <v-col class="paytable--valueColumn text-right">{{
                item.value
              }}</v-col>
            </v-row>
          </div>
        </div>

        <v-btn
          :disabled="this.spinning"
          block
          elevation="2"
          raised
          class="accent mt-3"
          @mousedown="spin()"
        >
          Spin
        </v-btn>
      </div>
    </v-card>
  </v-container>
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
        combination: ["BAR"],
        value: 5,
      },
    ],
    spinning: false,
    results: [],
  }),
  methods: {
    handleSpinStatus(e) {
      this.spinning = e;
    },
    spin() {
      this.results = [];
      this.$refs.reel1.start();
      this.$refs.reel2.start();
      this.$refs.reel3.start();
    },
    reelStopped(resultData) {
      console.log("Payline1: ", this.$refs.payline1.getBoundingClientRect());
      console.log("Payline2: ", this.$refs.payline2.getBoundingClientRect());
      console.log("Payline3: ", this.$refs.payline3.getBoundingClientRect());

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
  height: 5px;
  width: 100%;
  background: #aed581;
}
.SlotMachine-payline--mid {
  position: absolute;
  top: calc(var(--tileSize) * 1.3 * 1.1666);
  height: 5px;
  width: 100%;
  background: #aed581;
}
.SlotMachine-payline--bot {
  position: absolute;
  top: calc(var(--tileSize) * 1.9 * 1.1666);
  height: 5px;
  width: 100%;
  background: #aed581;
}

.paytable {
  width: 100%;
}

.v-card__actions {
  /* border: 2px solid black;
  border-radius: 5px; */
}

.paytable--img {
  vertical-align: bottom;
}

.paytable--imgColumn,
.paytable--textColumn,
.paytable--valueColumn {
  padding: 11px;
}
</style>