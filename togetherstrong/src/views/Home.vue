<template>
  <div class="home">
    <div class="fist-screen" :style="{ height: innerHeight }">
      <div class="top-intro"></div>
      <TitleBanner />
      <div class="landing-survey">
        <span>
          <b>{{ $t('Anonymous') }}</b> {{ $t('if you want it, via') }}
          <b>WhatsApp</b>, <b>{{ $t('phone') }}</b> or <b>email</b>. No
          complicated setup, just one tap:
        </span>
        <Chat :messages="landingChat" />
        <EmojiSurvey
          v-model="selectedIndex"
          :emojis="emojis"
          @input="selectedEmoji = true"
        />
      </div>
    </div>
    <TitleBanner v-show="selectedEmoji" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitleBanner from '@/components/TitleBanner.vue';
import Chat from '@/components/Chat.vue';
import EmojiSurvey from '@/components/EmojiSurvey.vue';

@Component({
  components: {
    TitleBanner,
    Chat,
    EmojiSurvey,
  },
})
export default class Home extends Vue {
  private emojis: EmojiList = ['bad', 'sad', 'neutral', 'smile'];
  public selectedIndex = -1;
  public selectedEmoji = false;
  public innerHeight = '0px';

  public handleWindowResize(): void {
    this.innerHeight = window.innerHeight + 'px';
  }

  get landingChat(): chatMessages {
    return [{ sender: true, text: this.$t('landing-survey') as string }];
  }

  beforeDestroy() {
    window.removeEventListener('resize', this. handleWindowResize);
  }

  mounted() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  }
}
</script>

<style scoped lang="scss">
.home {
}

.fist-screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top-intro {
  height: 15%;
}

.TitleBanner {
  height: 275px;
}

.landing-survey {
  max-width: 700px;
  height: calc(100% - 15% - 275px - 5px);
  margin: 0 auto 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  span {
    padding: 10px 10px 25px 10px;
    line-height: 1em;
    font-family: 'Roboto Condensed', sans-serif;

    b {
      font-weight: 600;
    }
  }

  .Chat {
    padding: 10px;
  }
}

@media all and (min-width: 400px) {
  .landing-survey {
    span {
      font-size: 20px;
    }

    .Chat {
      font-size: 25px;
    }
  }
}
</style>
