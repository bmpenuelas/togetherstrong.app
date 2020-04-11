<template>
  <div class="home">
    <div class="fist-screen" :style="{ height: innerHeight }">
      <div class="alert-top">
        <vs-alert
          class="alert-top limited-width"
          :active="true"
          color="rgb(111, 38, 224)"
          icon="assignment_turned_in"
        >
          <span class="animated fadeIn slow">
            <b>{{ $t('Free Psychological Support') }}</b> {{ $t('from') }}
            <b>{{ $t('certified proffessionals') }}</b>
            {{ $t('during the') }} <b>COVID-19</b> {{ $t('crisis') }}.
          </span>
        </vs-alert>
      </div>
      <div class="spacer limited-width" />
      <TitleBanner />
      <div class="spacer limited-width" />
      <div class="help-or-get-help limited-width">
        <vs-tabs alignment="fixed" v-model="selectedTabIndex">
          <vs-tab :label="$t('Get help')" />
          <vs-tab :label="$t('I want to help others')" />
        </vs-tabs>
        <div class="tabs-container">
          <div class="get-help" :class="{ opacity0: selectedTabIndex != 0 }">
            <span class="tab-description animated fadeIn delay-1s slow">
              {{ $t('We will check on you') }} <b>{{ $t('every day') }}</b
              >, {{ $t('and') }}
              <b>{{ $t('get in touch if you are feeling down') }}</b
              >. {{ $t('You just have to answer with one tap:') }}
            </span>
            <Chat
              class="animated slideInUp delay-2s slow"
              :class="{ opacity0: !delay2s }"
              :messages="landingChat"
            />
            <EmojiSurvey
              class="animated slideInUp delay-3s slow"
              :class="{ opacity0: !delay3s }"
              v-model="selectedEmojiIndex"
              :emojis="emojis"
              @input="selectedEmoji = true"
            />
          </div>
          <div class="help-others" :class="{ opacity0: selectedTabIndex != 1 }">
            <span class="tab-description">
              I want to help
            </span>
          </div>
        </div>
      </div>
    </div>
    <TitleBanner v-show="showPastFirst" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
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
  public selectedEmojiIndex = -1;
  public selectedTabIndex = 0;
  public selectedEmoji = false;
  public innerHeight = '0px';
  public delay2s = false;
  public delay3s = false;
  public showPastFirstSticky = false;

  public handleWindowResize(): void {
    this.innerHeight = window.innerHeight + 'px';
  }

  get landingChat(): chatMessages {
    return [
      {
        sender: true,
        text: this.$t('How are you feeling these days?') as string,
      },
    ];
  }

  get showPastFirst(): boolean {
    return this.selectedEmojiIndex != -1 || this.selectedTabIndex != 0;
  }

  @Watch('showPastFirst')
  watcherShowPastFirst() {
    if (this.showPastFirst) {
      this.showPastFirstSticky = true;
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  mounted() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
    setTimeout(() => {
      this.delay2s = true;
    }, 2000);
    setTimeout(() => {
      this.delay3s = true;
    }, 3000);
  }
}
</script>

<style scoped lang="scss">
.fist-screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.alert-top {
  flex: 0 0;
}

.spacer {
  flex: 0.5 1;
}

.TitleBanner {
  flex: 0.5 0.5;
}

.help-or-get-help {
  flex: 1 0;
}

.help-or-get-help {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.limited-width {
  max-width: 700px;
  margin: 0 auto 0 auto;
}

.tabs-container {
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.tabs-container div {
  grid-row-start: 1;
  grid-column-start: 1;
}

.get-help {
  display: flex;
  z-index: 1;
  flex-direction: column;
  justify-content: flex-end;

  .Chat {
    padding: 10px;
  }
}

.tab-description {
  margin-bottom: auto;

  padding: 8px;
  font-size: 14px;
  line-height: 1rem;
  text-align: justify;

  b {
    font-weight: 600;
  }
}

.help-others {
  z-index: 1;
}

@media all and (min-width: 600px) {
  .get-help {
    span {
      font-size: 20px;
    }

    .Chat {
      font-size: 25px;
    }
  }
}

.opacity0 {
  opacity: 0;
  z-index: -99;
}
</style>

<style lang="scss">
.help-or-get-help .vs-tabs--content {
  padding: 0 !important;
}
</style>
