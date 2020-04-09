<template>
  <div class="home">
    <TitleBanner />
  </div>
</template>

<script>
// @ is an alias to /src
import TitleBanner from '@/components/TitleBanner.vue';

export default {
  name: 'Home',
  components: {
    TitleBanner,
  },
};
</script>
