<template>
  <v-container fluid class="d-flex justify-center mb-6" flat tile>
    <v-card flat class="d-flex flex-column flex-grow-1 flex-md-row pa-3">
      <v-col cols="12" md="6" class="justify-center">
        <div
          class="SlotMachine d-flex justify-space-between black ma-auto width-380"
        >
          <div
            ref="payline1"
            class="SlotMachine-payline--top"
            :class="winningLine === 'top' ? 'payline-win' : ''"
          ></div>
          <div
            ref="payline2"
            class="SlotMachine-payline--mid"
            :class="winningLine === 'center' ? 'payline-win' : ''"
          ></div>
          <div
            ref="payline3"
            class="SlotMachine-payline--bot"
            :class="winningLine === 'bottom' ? 'payline-win' : ''"
          ></div>
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
          <div class="gradient-overlay"></div>
        </div>
        <v-text-field
          label="Credits"
          class="credits--input mt-6 ma-auto width-380"
          outlined
          dense
          v-model="currentBalance"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="flex-column">
        <div class="width-380 paytable ma-auto">
          <div
            class="paytable--wrapper"
            v-for="(item, index) in payTable"
            :key="index"
          >
            <v-row
              class="paytable--row"
              v-if="
                !handleArrayComparison(['7', 'Cherry'], item.combination) &&
                !handleArrayComparison(
                  ['BAR', '2xBAR', '3xBAR'],
                  item.combination
                )
              "
            >
              <v-col class="paytable--imgColumn pr-0 col-4">
                <img
                  class="paytable--img"
                  v-for="(symbol, index) in item.combination"
                  :key="symbol + index"
                  :src="`/assets/${symbol}.png`"
                  width="25"
                  height="22"
                />
              </v-col>
              <v-col class="paytable--textColumn col-4 col-md-5">
                on {{ item.position ? item.position : "any" }} line
              </v-col>
              <v-col
                class="paytable--valueColumn text-right"
                v-if="!item.win"
                >{{ item.value }}</v-col
              >
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
              <v-col
                class="paytable--valueColumn text-right"
                v-if="!item.win"
                >{{ item.value }}</v-col
              >
            </v-row>
          </div>
        </div>
        <div class="width-380 mt-3 ma-auto">
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
      </v-col>
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
    currentBalance: 100,
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
        win: false,
      },
      {
        position: "bottom",
        combination: ["Cherry", "Cherry", "Cherry"],
        value: 4000,
        win: false,
      },
      {
        position: null,
        combination: ["7", "7", "7"],
        value: 150,
        win: false,
      },
      {
        position: null,
        combination: ["7", "Cherry"],
        value: 75,
        win: false,
      },
      {
        position: null,
        combination: ["3xBAR", "3xBAR", "3xBAR"],
        value: 50,
        win: false,
      },
      {
        position: null,
        combination: ["2xBAR", "2xBAR", "2xBAR"],
        value: 20,
        win: false,
      },
      {
        position: null,
        combination: ["BAR", "BAR", "BAR"],
        value: 10,
        win: false,
      },
      {
        position: null,
        combination: ["BAR", "2xBAR", "3xBAR"],
        value: 5,
        win: false,
      },
    ],
    spinning: false,
    results: [],
    winningLine: null,
  }),
  methods: {
    handleSpinStatus(e) {
      if (this.$refs.reel3.spin === e) {
        this.spinning = e;
      }
    },
    spin() {
      this.calculateBalance();
      this.results = [];
      this.$refs.reel1.start();
      this.$refs.reel2.start();
      this.$refs.reel3.start();
    },
    reelStopped(resultData) {
      // console.log("Payline1: ", this.$refs.payline1.getBoundingClientRect());
      // console.log("Payline2: ", this.$refs.payline2.getBoundingClientRect());
      // console.log("Payline3: ", this.$refs.payline3.getBoundingClientRect());

      this.results.push(resultData);
      if (this.results.length === 3) {
        this.processWin(this.results);
      }
    },
    checkArrayEqualLength(array) {
      // Check if arrays are the same length
      for (let i = 0; i < array.length; i++) {
        if (array[i].length !== array[1].length) return false;
      }

      // Otherwise, return true
      return true;
    },
    handleArrayComparison(arr, ptArr) {
      console.log(arr);
      // Returns true if all array items match paytable combination array items
      return arr.toString() == ptArr.toString();
    },
    handleLooseArrayComparison(arr, ptArr) {
      return arr.every((v) => ptArr.includes(v));
    },
    checkArrayLength(arr) {
      return arr.length > 0;
    },
    calculateBalance(value = null) {
      let { currentBalance } = this;
      if (!value) {
        currentBalance -= 1;
      }
      currentBalance += value;
    },
    checkWin(array, position) {
      // Check if array has items
      if (!this.checkArrayLength(array)) return;
      const paytable = this.payTable;

      // For loop through paytable to get objects for comparison
      for (let i = 0; i < paytable.length; i++) {
        const combinationArray = paytable[i].combination;

        if (handleArrayComparison(array, combinationArray)) {
          const obj = !array.includes("Cherry") //Checks for no cherries in array
            ? paytable[i] //Sets obj variable to obj that has no cherries
            : paytable.filter((item) => item.position === position); // Filter paytable by position parameter
          obj["position"] = position; //Sets position of object
          handleBalanceCalculate(obj["value"]);
          break;
        }
        if (handleLooseArrayComparison(array, combinationArray)) {
          let obj = paytable[i];
          obj["position"] = position;

          handleBalanceCalculate(obj["value"]);
          break;
        }
      }
    },
    processWin(data) {
      if (!this.checkArrayEqualLength(data)) {
        return;
      }
      let topArray = [];
      let centerArray = [];
      let bottomArray = [];
      if (data[0].length === 2) {
        topArray.push([...data[0]].shift());
        topArray.push([...data[1]].shift());
        topArray.push([...data[2]].shift());

        bottomArray.push([...data[0]].pop());
        bottomArray.push([...data[1]].pop());
        bottomArray.push([...data[2]].pop());
      } else {
        centerArray.push(...data[0], ...data[1], ...data[2]);
      }

      console.log(topArray);
      console.log(centerArray);
      console.log(bottomArray);

      this.checkWin(topArray);
      this.checkWin(centerArray);
      this.checkWin(bottomArray);
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
  background: grey;
}

.SlotMachine-payline--mid {
  position: absolute;
  top: calc(var(--tileSize) * 1.3 * 1.1666);
  height: 5px;
  width: 100%;
  background: grey;
}

.SlotMachine-payline--bot {
  position: absolute;
  top: calc(var(--tileSize) * 1.9 * 1.1666);
  height: 5px;
  width: 100%;
  background: grey;
}

.payline-win {
  background: #7cb342;
  z-index: 1;
}

.gradient-overlay {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: linear-gradient(
    to bottom,
    rgba(64, 64, 64, 1) 0%,
    rgba(64, 64, 64, 0) 7%,
    rgba(64, 64, 64, 0) 93%,
    rgba(64, 64, 64, 1) 100%
  );
}

.paytable {
  width: 100%;
}

.v-card__actions {
  /* border: 2px solid black;
  border-radius: 5px; */
}

.width-380 {
  max-width: 380px;
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