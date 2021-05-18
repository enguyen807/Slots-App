<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header> {{ name }} </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ["name"],
  data: () => ({}),
};
</script>

<style>
</style>