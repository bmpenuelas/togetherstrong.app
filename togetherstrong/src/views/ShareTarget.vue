<template>
  <div class="ShareTarget">
    <div class="margin-10">
      <h3>title</h3>
      {{ title }}
    </div>
    <div class="margin-10">
      <h3>text</h3>
      {{ text }}
    </div>
    <div class="margin-10">
      <h3>url</h3>
      {{ url }}
    </div>
    <vs-button type="relief">
      Send this to TogetherStrong
    </vs-button>
  </div>
</template>

<script lang="ts">
// Imports
import { Vue, Component } from 'vue-property-decorator';

// Vue component
@Component
export default class ShareTarget extends Vue {
  public title = '';
  public text = '';
  public url = '';

  mounted() {
    this.title = this.$route.query.title as string;
    this.text = this.$route.query.text as string;
    this.url = this.$route.query.url as string;
  }
}
</script>

<style scoped lang="scss">
.margin-10 {
  margin: 10px;
}
.text-input {
  padding-top: 10px;
}
</style>
