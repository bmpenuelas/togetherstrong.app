<template>
  <!-- Title with pictures left and right -->
  <div class="TitleBanner">
    <!-- Container -->
    <div class="container">
      <!-- Title text -->
      <div class="title-container">
        <div class="title-part-0 animated slideInDown slow">
          <svg viewBox="0 0 75 18">
            <text x="50%" y="12" text-anchor="middle">together</text>
          </svg>
        </div>
        <div class="title-part-1 animated slideInDown slow">
          <svg viewBox="0 0 56 19">
            <text x="50%" y="13" text-anchor="middle">strong</text>
          </svg>
        </div>
        <div class="title-part-2 animated slideInDown slow">
          <svg viewBox="0 0 95 18">
            <text x="50%" y="12" text-anchor="middle">.app</text>
          </svg>
        </div>
      </div>
      <!-- Sides pictures -->
      <div class="images-x-container">
        <inline-svg
          :src="leftSvg"
          class="side-image leftSvg animated slideInLeft slow"
        />
        <inline-svg
          :src="rightSvg"
          class="side-image rightSvg animated slideInRight slow"
        />
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
  width: 100%;
  max-width: 800px;
  margin: 0 auto 0 auto;
}

.container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.container div {
  grid-row-start: 1;
  grid-column-start: 1;
}

.title-container {
  width: 30%;
  margin-left: 35%;
  margin-bottom: 20%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  font-family: 'Poppins', sans-serif;
  font-weight: 900;

  .title-part {
    font-weight: 600;

    &-1 {
      margin-top: -14px;
      margin-bottom: -25;
    }

    &-2 {
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

.images-x-container {
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

.leftSvg {
  margin-left: -$img-negative-margin;
}

.rightSvg {
  margin-right: -$img-negative-margin;
}

@media all and (min-width: 600px) {
  .title-container {
    margin-bottom: 10%;
  }

  .side-image {
    max-width: 300px;
  }
}
</style>

<style lang="css">
#personLeft {
  animation: float-x-pos 10s linear infinite;
}

#personRight {
  animation: float-x-neg 10s linear infinite;
}

@keyframes float-x-pos {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-4px, 0);
  }
  75% {
    transform: translate(4px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes float-x-neg {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(4px, 0);
  }
  75% {
    transform: translate(-4px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
