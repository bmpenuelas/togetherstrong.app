<template>
  <!-- Title with pictures left and right -->
  <div class="TitleBanner">
    <!-- Container -->
    <div class="title-container">
      <!-- Title text -->
      <div class="title">
        <div class="title-part0">
          <svg viewBox="0 0 75 18">
            <text x="50%" y="12" text-anchor="middle">together</text>
          </svg>
        </div>
        <div class="title-part1">
          <svg viewBox="0 0 56 19">
            <text x="50%" y="13" text-anchor="middle">strong</text>
          </svg>
        </div>
        <div class="title-part2">
          <svg viewBox="0 0 95 18">
            <text x="50%" y="12" text-anchor="middle">.app</text>
          </svg>
        </div>
      </div>
      <!-- Sides pictures -->
      <div class="images-container">
        <inline-svg :src="leftSvg" class="side-image" id="leftSvg" />
        <inline-svg :src="rightSvg" class="side-image" id="rightSvg" />
      </div>
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
.TitleBanner {
  margin: 0 auto 0 auto;
  width: 100%;
  max-width: 700px;
}

.title-container {
  position: relative;
  width: 100%;
  height: 275px;
}

.title {
  position: absolute;
  top: 45%;
  left: 35%;
  width: 30%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  font-family: 'Poppins', sans-serif;
  font-weight: 900;

  .title-part {
    font-weight: 600;

    &1 {
      margin-top: -14px;
      margin-bottom: -25;
    }

    &2 {
      margin-top: -20px;
      fill: red;
    }
  }

  svg {
    text-align: center;
    text {
      margin: 0 auto 0 auto;
    }
  }
}

.images-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  z-index: 1;
  display: flex;
  justify-content: space-between;
}

$img-negative-margin: 50px;

.side-image {
  width: 60%;
  max-width: 250px;
}

#leftSvg {
  margin-left: -$img-negative-margin;
}

#rightSvg {
  margin-right: -$img-negative-margin;
}
</style>
