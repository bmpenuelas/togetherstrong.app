<template>
  <div class="home">
    <!-- First full window -->
    <div class="fist-screen" :style="{ 'min-height': innerHeight }">
      <!-- Top alert -->
      <div class="alert-top">
        <vs-alert
          class="alert-top limited-width"
          :active="true"
          color="rgb(111, 38, 224)"
          icon="assignment_turned_in"
        >
          <span class="animated fadeIn slow">
            <b>{{ $t('Free Psychological Support') }}</b> {{ $t('from') }}
            <b>{{ $t('certified professionals') }}</b>
            {{ $t('during the') }} <b>COVID-19</b> {{ $t('crisis') }}
          </span>
        </vs-alert>
      </div>
      <div class="spacer limited-width" ref="spacer1" />

      <!-- Title illustrations -->
      <TitleBanner />
      <div v-if="!showCall" ref="spacer2" class="spacer" />

      <!-- Optional alert call to join -->
      <div v-else class="alert-container limited-width">
        <div class="alert-call">
          <div class="alert">
            <b>{{
              spaceRemaining
                ? $t('Are you a mental health professional?')
                : $t('Professional?')
            }}</b>
            {{ $t('You can make a crucial difference for many') }}
            {{ spaceRemaining ? $t('from your smartphone') : '' }}
          </div>
        </div>
        <div class="triangle">
          <div class="arrow-down"></div>
        </div>
      </div>

      <!-- Choose get / give help -->
      <div class="help-or-get-help limited-width">
        <!-- Selector -->
        <vs-tabs alignment="fixed" v-model="selectedTabIndex">
          <vs-tab :label="$t('Get help')" />
          <vs-tab :label="$t('I want to help others')" />
        </vs-tabs>

        <!-- Selection -->
        <div class="tabs-container">
          <!-- Selection 0 -->
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

          <!-- Selection 1 -->
          <div class="help-others" :class="{ opacity0: selectedTabIndex != 1 }">
            <span class="tab-description">
              I want to help
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content dependant on selection -->
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
  public showCall = false;
  public spaceRemaining = false;

  public handleWindowResize(): void {
    this.innerHeight = window.innerHeight + 'px';
    this.spaceRemaining = (this.$refs.spacer1 as HTMLElement).clientHeight > 0;
    this.showCall = (this.$refs.spacer2 as HTMLElement).clientHeight > 40;
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
      this.handleWindowResize();
    }, 100);
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
.limited-width {
  max-width: 700px;
  margin: 0 auto 0 auto;
}

.fist-screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.alert-top {
  flex: 0 0;
}

.spacer {
  flex: 0.5 10;
}

.side-description {
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  opacity: 1;
  text-align: justify;

  .join-alert {
    width: 50%;
    margin-left: auto;
  }
}

.TitleBanner {
  flex: 0.5 0.5;
}

.help-call {
  width: 50%;
}

.help-or-get-help {
  flex: 0 0;

  width: 100%;
  display: flex;
  flex-direction: column;
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
  line-height: 1.2rem;

  b {
    font-weight: 600;
  }
}

.help-others {
  z-index: 1;
}

.alert-call {
  margin-left: auto;
  padding: 10px 5px 0px 5px;
  max-width: 50%;
}

.alert {
  border-radius: 7px;
  padding: 5px 10px 5px 10px;
  background-color: #dff6de;
  color: #49cb3e;

  font-size: 0.8rem;
  line-height: 1.1rem;
}

.triangle {
  max-width: 50%;
  margin-top: -1px;
  margin-left: auto;
  height: 5px;

  .arrow-down {
    margin-left: auto;
    margin-right: auto;
  }
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #e4f7e3;
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
