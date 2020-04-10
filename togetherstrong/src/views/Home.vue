<template>
  <div class="home">
    <div class="first-screen">
      <TitleBanner />
    </div>
  </div>
</template>

<script>
import TitleBanner from '@/components/TitleBanner.vue';

export default {
  name: 'Home',
  components: {
    TitleBanner,
  },
};
</script>

<style scoped lang="scss">
.first-screen {
  height: 100vh;
}
</style>
