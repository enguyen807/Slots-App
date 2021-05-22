<template>
  <v-container fluid class="d-flex flex-column justify-center mb-6" flat tile>
    <v-form ref="slotBalanceForm" v-model="formIsValid">
      <v-card flat class="d-flex flex-column flex-grow-1 flex-md-row pa-3">
        <v-col cols="12" md="6" class="justify-center">
          <div
            class="SlotMachine d-flex justify-space-between black ma-auto width-380"
          >
            <div
              ref="payline1"
              class="SlotMachine-payline--top"
              :class="handlePaylineClass('top')"
            ></div>
            <div
              ref="payline2"
              class="SlotMachine-payline--mid"
              :class="handlePaylineClass('center')"
            ></div>
            <div
              ref="payline3"
              class="SlotMachine-payline--bot"
              :class="handlePaylineClass('bottom')"
            ></div>
            <Reels
              name="reel1"
              ref="reel1"
              :duration="2"
              :reel-data="this.reelData"
              :debug-enabled="debugArea.enableDebug"
              :debug-reel="debugArea.leftReel"
              @stopped="reelStopped"
            ></Reels>
            <Reels
              class="mx-4"
              name="reel2"
              ref="reel2"
              :duration="4"
              :reel-data="this.reelData"
              :debug-enabled="debugArea.enableDebug"
              :debug-reel="debugArea.centerReel"
              @stopped="reelStopped"
            ></Reels>
            <Reels
              name="reel3"
              ref="reel3"
              :duration="6"
              :reel-data="this.reelData"
              :debug-enabled="debugArea.enableDebug"
              :debug-reel="debugArea.rightReel"
              @reel-spinning="handleSpinStatus"
              @stopped="reelStopped"
            ></Reels>
            <div class="gradient-overlay"></div>
          </div>
          <div class="d-flex">
            <v-text-field
              label="Credits"
              class="credits--input mt-6 ma-auto width-380"
              outlined
              dense
              :rules="rules"
              type="text"
              :value="currentBalance"
              @keyup="handleBalanceInput"
            ></v-text-field>
            <v-text-field
              label="Wins"
              class="credits--input mt-6 ma-auto width-380"
              outlined
              dense
              min="0"
              max="5000"
              disabled
              type="text"
              :value="currentWins"
            ></v-text-field>
          </div>
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
                    :src="require(`@/assets/${symbol}.png`)"
                    width="25"
                    height="22"
                  />
                </v-col>
                <v-col class="paytable--textColumn col-4 col-md-5">
                  on {{ item.position ? item.position : "any" }} line
                </v-col>
                <transition
                  @before-enter="beforeEnter"
                  @leave="leave"
                  @css="false"
                >
                  <v-col
                    class="paytable--valueColumn text-right"
                    v-if="!item.win"
                    >{{ item.value }}</v-col
                  >
                </transition>
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
                    :src="require(`@/assets/${symbol}.png`)"
                    width="25"
                    height="22"
                  />

                  on any line
                </v-col>
                <transition
                  @before-enter="beforeEnter"
                  @leave="leave"
                  @css="false"
                >
                  <v-col
                    class="paytable--valueColumn text-right"
                    v-if="!item.win"
                    >{{ item.value }}</v-col
                  >
                </transition>
              </v-row>
            </div>
          </div>
          <div class="width-400 mt-3 ma-auto">
            <v-btn
              :disabled="this.spinning || !formIsValid"
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
    </v-form>
    <div class="px-6 mb-6">
      <ExpansionPanel name="Debug Area">
        <v-row>
          <v-col>
            <div class="text-subtitle-2 mb-3">Enable Debug Mode?</div>
            <v-switch
              v-model="debugArea.enableDebug"
              color="accent"
              :label="`${
                debugArea.enableDebug ? 'Debug Enabled' : 'Debug Disabled'
              }`"
              @change="resetWinState"
            ></v-switch>
          </v-col>
          <v-col>
            <div class="text-subtitle-2 mb-3">Left Reel</div>
            <v-select
              label="Symbol Position"
              outlined
              dense
              :items="debugArea.positions"
              item-text="name"
              item-value="name"
              return-object
              v-model="debugArea.leftReel.position"
              :disabled="!debugArea.enableDebug"
              @change="resetWinState"
            ></v-select>
            <v-select
              label="Symbol"
              outlined
              dense
              :items="debugArea.symbols"
              v-model="debugArea.leftReel.symbol"
              :disabled="!debugArea.enableDebug"
              @change="resetWinState"
            ></v-select>
          </v-col>
          <v-col>
            <div class="text-subtitle-2 mb-3">Center Reel</div>
            <v-select
              label="Symbol Position"
              outlined
              dense
              item-text="name"
              item-value="name"
              return-object
              :items="debugArea.positions"
              v-model="debugArea.centerReel.position"
              :disabled="!debugArea.enableDebug"
              @change="resetWinState"
            ></v-select>
            <v-select
              label="Symbol"
              outlined
              dense
              :items="debugArea.symbols"
              v-model="debugArea.centerReel.symbol"
              :disabled="!debugArea.enableDebug"
              @change="resetWinState"
            ></v-select>
          </v-col>
          <v-col>
            <div class="text-subtitle-2 mb-3">Right Reel</div>
            <v-select
              label="Symbol Position"
              outlined
              dense
              item-text="name"
              item-value="name"
              return-object
              :items="debugArea.positions"
              v-model="debugArea.rightReel.position"
              :disabled="!debugArea.enableDebug"
              @change="resetWinState"
            ></v-select>
            <v-select
              label="Symbol"
              outlined
              dense
              :items="debugArea.symbols"
              v-model="debugArea.rightReel.symbol"
              :disabled="!debugArea.enableDebug"
              @change="resetWinState"
            ></v-select>
          </v-col>
        </v-row>
      </ExpansionPanel>
    </div>
  </v-container>
</template>

<script>
import Reels from "@/components/SlotMachine/SlotReels/SlotReels.vue";
import ExpansionPanel from "@/components/ExpansionPanel/ExpansionPane.vue";

import { gsap } from "gsap";
const confetti = require("canvas-confetti");

export default {
  name: "SlotMachine",
  components: {
    Reels,
    ExpansionPanel,
  },
  mounted() {},
  data: () => ({
    currentBalance: 10,
    currentWins: 0,
    payTable: [
      {
        position: "top",
        combination: ["Cherry", "Cherry", "Cherry"],
        value: 2000,
        win: false,
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
    formIsValid: true,
    spinning: false,
    results: [],
    winningLine1: null,
    winningLine2: null,
    debugArea: {
      enableDebug: false,
      positions: [
        { name: "top", value: 1 },
        { name: "center", value: 0 },
        { name: "bottom", value: 1 },
      ],
      symbols: ["BAR", "2xBAR", "3xBAR", "7", "Cherry"],
      leftReel: {
        position: { name: "top", value: 1 },
        symbol: "BAR",
      },
      centerReel: {
        position: { name: "top", value: 1 },
        symbol: "BAR",
      },
      rightReel: {
        position: { name: "top", value: 1 },
        symbol: "BAR",
      },
    },
    rules: [
      (v) => !!v || "Required",
      (v) => v > 0 || "Credits are too low",
      (v) => v <= 5000 || "Credits should not be above 5000",
    ],
  }),
  methods: {
    handleSpinStatus(e) {
      if (this.$refs.reel3.spin === e) {
        this.spinning = e;
      }
    },
    handlePaylineClass(position) {
      let payline = null;
      return (payline =
        this.winningLine2 === position || this.winningLine1 === position
          ? `payline-win`
          : "");
    },
    handleBalanceInput(event) {
      // Value equals input value or default 0
      let value = parseInt(event.target.value) || 0;
      // Prevent user keyboard input if value is equal to 5000
      // However allow user to delete input value using backspace
      if (value <= 5000 || event.key === "Backspace") {
        this.currentBalance = value;
        return;
      }
      event.preventDefault();
    },
    spin() {
      this.resetWinState();
      this.calculateBalance();
      this.results = [];
      this.$refs.reel1.start();
      this.$refs.reel2.start();
      this.$refs.reel3.start();
    },
    reelStopped(resultData) {
      this.results.push(resultData);
      if (this.results.length === 3 && !this.spinning) {
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
      // Returns true if all array items match paytable combination array items
      return arr.toString() == ptArr.toString();
    },
    handleLooseArrayComparison(arr, ptArr) {
      return arr.every((v) => ptArr.includes(v));
    },
    resetWinState() {
      this.winningLine1 = null;
      this.winningLine2 = null;

      let index = this.payTable.findIndex((v) => v.win === true);
      if (index !== -1) this.payTable[index].win = false;
    },
    checkArrayLength(arr) {
      return arr.length > 0 && arr.length === 3;
    },
    calculateBalance(value = null) {
      if (!value) {
        this.currentBalance -= 1;
      }
      this.currentWins += value;
    },
    checkWin(array, position) {
      // Check if array has items
      if (!this.checkArrayLength(array)) return;
      const paytable = this.payTable;

      // For loop through paytable to get objects for comparison
      for (let i = 0; i < paytable.length; i++) {
        const combinationArray = paytable[i].combination;

        if (this.handleArrayComparison(array, combinationArray)) {
          const obj = !array.includes("Cherry") //Checks for no cherries in array
            ? paytable[i] //Sets obj variable to obj that has no cherries
            : paytable.filter((item) => item.position === position)[0]; // Filter paytable by position parameter

          obj["position"] = position; //Sets position of object
          obj["win"] = true;
          // If win equals bottom and array items all equal Cherry
          if (
            position === "bottom" &&
            obj["combination"].every((val, i, arr) => val === "Cherry")
          ) {
            this.createBigConfetti();
          }
          this.createConfetti();
          this.winningLine1 = position;
          this.calculateBalance(obj["value"]);
          continue;
        } else if (this.handleLooseArrayComparison(array, combinationArray)) {
          let obj = paytable[i];
          obj["position"] = position;
          obj["win"] = true;
          this.createConfetti();
          if (this.winningLine1) {
            this.winningLine2 = position;
          } else {
            this.winningLine1 = position;
          }
          this.calculateBalance(obj["value"]);
          continue;
        }
      }
    },
    processWin(data) {
      if (!this.checkArrayEqualLength(data)) {
        return;
      }
      let topArrayObj = [];
      let centerArrayObj = [];
      let bottomArrayObj = [];
      if (data[0].length === 2) {
        topArrayObj.push([...data[0]].shift());
        topArrayObj.push([...data[1]].shift());
        topArrayObj.push([...data[2]].shift());

        bottomArrayObj.push([...data[0]].pop());
        bottomArrayObj.push([...data[1]].pop());
        bottomArrayObj.push([...data[2]].pop());
      } else {
        centerArrayObj.push(...data[0], ...data[1], ...data[2]);
      }

      const topArray = topArrayObj.map((v) => v.name);
      const centerArray = centerArrayObj.map((v) => v.name);
      const bottomArray = bottomArrayObj.map((v) => v.name);

      this.checkWin(topArray, "top");
      this.checkWin(centerArray, "center");
      this.checkWin(bottomArray, "bottom");
    },
    // Confetti Methods
    createConfetti() {
      let myCanvas = this.$refs.slotBalanceForm.outerHTML;

      let winExplosion = confetti.create(myCanvas, {
        resize: true,
      });

      let count = 200;
      let defaults = {
        origin: { y: 0.7 },
      };

      function fire(particleRatio, opts) {
        winExplosion(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
          })
        );
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    },
    createBigConfetti() {
      let myCanvas = this.$refs.slotBalanceForm.outerHTML;

      let winExplosion = confetti.create(myCanvas, {
        resize: true,
      });

      let duration = 5 * 1000;
      let end = Date.now() + duration;

      (function frame() {
        // launch a few confetti from the left edge
        winExplosion({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        // and launch a few from the right edge
        winExplosion({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        // keep going until we are out of time
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    },
    // Handle blinking animation
    beforeEnter(el) {
      gsap.set(el, {
        color: "#000",
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.7,
        repeat: -1,
        color: "#fb8c00",
        onComplete() {
          done;
        },
      });
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
  z-index: 1;
}

.SlotMachine-payline--mid {
  position: absolute;
  top: calc(var(--tileSize) * 1.3 * 1.1666);
  height: 5px;
  width: 100%;
  background: grey;
  z-index: 1;
}

.SlotMachine-payline--bot {
  position: absolute;
  top: calc(var(--tileSize) * 1.9 * 1.1666);
  height: 5px;
  width: 100%;
  background: grey;
  z-index: 1;
}

.payline-win {
  background: #7cb342;
  z-index: 4;
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
  z-index: 3;
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

width-400 {
  max-width: 400px;
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