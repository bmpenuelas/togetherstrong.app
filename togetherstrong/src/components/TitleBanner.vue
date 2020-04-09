<template>
  <div class="Welcome">
    <!-- Title with pictures left and right -->
    <div class="title-container">
      <inline-svg :src="leftSvg" id="leftSvg" />
      <div class="title">
        <div class="title-part0">
          <svg viewBox="0 0 57 15">
            <text x="0" y="11">Together</text>
          </svg>
        </div>
        <div class="title-part1">
          <svg viewBox="0 0 43 15">
            <text x="0" y="11">Strong</text>
          </svg>
        </div>
        <div class="title-part2">
          <svg viewBox="0 0 56 18">
            <text x="0" y="11">.chat</text>
          </svg>
        </div>
      </div>
      <inline-svg :src="rightSvg" id="rightSvg" />
    </div>
  </div>
</template>

<script lang="ts">
import InlineSvg from 'vue-inline-svg';
import { Component, Vue } from 'vue-property-decorator';

/* eslint-disable @typescript-eslint/no-var-requires*/
const leftSvg = require('@/assets/img/smartphone_person_left-min.svg');
const rightSvg = require('@/assets/img/smartphone_person_right-min.svg');
/* eslint-enable */

@Component({
  components: {
    InlineSvg,
  },
})
export default class TitleBanner extends Vue {
  private leftSvg = leftSvg;
  private rightSvg = rightSvg;
}
</script>

<style scoped lang="scss">
.title-container {
  display: flex;
  justify-content: space-between;
}
#leftSvg {
  width: 45%;
}
#rightSvg {
  width: 45%;
}
</style>
