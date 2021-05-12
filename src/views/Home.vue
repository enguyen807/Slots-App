<template>
  <div class="home">
    <SlotMachine />
  </div>
</template>

<script>
// @ is an alias to /src
import SlotMachine from "@/components/SlotMachine/SlotMachine.vue";

export default {
  name: "Home",
  components: {
    SlotMachine,
  },
};
</script>
