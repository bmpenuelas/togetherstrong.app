<template>
  <div id="app">
    <vs-alert :active="readyToInstall">
      Ready to install!
    </vs-alert>

    <router-view />
  </div>
</template>

<script lang="ts">
// Imports
import { Vue, Component } from 'vue-property-decorator';

// Vue component
@Component
export default class App extends Vue {
  public readyToInstall = false;

  created() {
    this.$root.deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.$root.deferredPrompt = e;
      this.readyToInstall = true;
    });
  }
}
</script>

<style lang="css">
/* Font: Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

#app {
  width: 100%;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;

  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;

  font-family: 'Poppins', sans-serif;

  /* Uncomment to debug divs */
  /* border: 1px solid #f00 !important; */
}
</style>

<style lang="css">
/* recommended css code for vue-svgicon */
.svg-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}

.svg-up {
  /* default */
  transform: rotate(0deg);
}

.svg-right {
  transform: rotate(90deg);
}

.svg-down {
  transform: rotate(180deg);
}

.svg-left {
  transform: rotate(-90deg);
}
</style>
