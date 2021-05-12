<template>
  <v-app
    id="main"
    :style="{ background: this.$vuetify.theme.themes[theme].background }"
  >
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Slot Machine Test</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-layout row wrap>
          <v-col class="fill-height">
            <v-sheet min-height="70vh" rounded="lg" elevation="12">
              <slot></slot>
            </v-sheet>
          </v-col>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  components: {},
  methods: {},
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style>
</style>