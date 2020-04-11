<template>
  <div class="EmojiSurvey">
    <div class="icons">
      <svgicon
        v-for="(icon, index) in emojis"
        :key="index"
        :icon="icon"
        class="icon"
        :class="{ zoom: hoverIndex == index || selectedIndex == index }"
        @click="
          selectedIndex = index;
          $emit('input', index);
        "
        original
      />
    </div>
  </div>
</template>

<script lang="ts">
import TitleBanner from '@/components/TitleBanner.vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    TitleBanner,
  },
})
export default class EmojiSurvey extends Vue {
  @Prop({ type: Array as () => EmojiList }) readonly emojis!: EmojiList;
  @Prop() public value!: number;

  private selectedIndex = this.value;
  private hoverIndex = -1;

  created() {
    for (const icon of this.emojis) {
      require('@/components/icons/' + icon);
    }
  }
}
</script>

<style scoped lang="scss">
.EmojiSurvey {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  border: 3px solid #d7cee0;
  border-radius: 500px;
}

.icons {
  width: 80%;
  padding: 12px;

  display: flex;
  justify-content: space-between;
}

.icon {
  width: 23%;

  &:hover {
    transform: scale(1.2);
  }
}

.zoom {
  transform: scale(1.2);
}
</style>
