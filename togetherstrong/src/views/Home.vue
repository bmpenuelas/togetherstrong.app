<template>
  <div class="home">
    <!-- First full window -->
    <div class="fist-screen" :style="{ 'min-height': innerHeight }">
      <!-- Top alert -->
      <div class="alert-top animated slideInDown delay-1s">
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

      <!-- Share button -->
      <div class="share-container">
        <div class="share animated fadeIn">
          <span
            @click="
              shareWith(
                $t('during-covid-19'),
                $t('Free psychological support in your smartphone'),
                $t('This can make a difference for you and many others'),
                webShareError,
                webShareUnsupported
              )
            "
          >
            {{ $t('Share this') }}
            <vs-icon icon="send" bg="#dff6de" size="18px" round />
          </span>
        </div>
      </div>
      <vs-popup title="" :active.sync="shareFallbackActive">
        <social-sharing
          url="https://togetherstrong.app/during-covid-19"
          :title="$t('Free psychological support in your smartphone')"
          :description="
            $t(
              'Free psychological support in your smartphone during the COVID-19 crisis from certified professionals.'
            )
          "
          hashtags="togetherstrong,coronavirus"
          inline-template
        >
          <div class="social-icons-container">
            <network network="facebook">
              <svgicon icon="facebook" class="icon" original />
            </network>
            <network network="twitter">
              <svgicon icon="twitter" class="icon" original />
            </network>
            <network network="whatsapp">
              <svgicon icon="whatsapp" class="icon" original />
            </network>
            <network network="linkedin">
              <svgicon icon="linkedin" class="icon" original />
            </network>
            <network network="vk">
              <svgicon icon="vk" class="icon" original />
            </network>
            <network network="telegram">
              <svgicon icon="telegram" class="icon" original />
            </network>
            <network network="line">
              <svgicon icon="line" class="icon" original />
            </network>
            <network network="reddit">
              <svgicon icon="reddit" class="icon" original />
            </network>
            <network network="email">
              <svgicon icon="email" class="icon" original />
            </network>
          </div>
        </social-sharing>
      </vs-popup>

      <!-- Title illustrations -->
      <TitleBanner />
      <div v-if="!showCall" ref="spacer2" class="spacer" />

      <!-- Optional alert call to join -->
      <div v-else class="alert-container limited-width animated fadeInUp">
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
        <vs-tabs
          class="animated fadeIn delay-1s"
          alignment="fixed"
          v-model="selectedTabIndex"
        >
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
              ref="chat0"
              class="animated slideInUp slow"
              :messages="landingChat"
            />
            <EmojiSurvey
              ref="emojiSurvey0"
              class="animated slideInUp fadeIn slow"
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
  </div>
</template>

<script lang="ts">
// Imports
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import WebShare from '@/mixins/WebShare';
import TitleBanner from '@/components/TitleBanner.vue';
import Chat from '@/components/Chat.vue';
import EmojiSurvey from '@/components/EmojiSurvey.vue';

// TS types
type delaySetting = [string, number];
type delaySettings = delaySetting[];

// Vue component
@Component({
  components: {
    TitleBanner,
    Chat,
    EmojiSurvey,
  },
})
export default class Home extends Mixins(WebShare) {
  public selectedEmojiIndex = -1;
  public selectedTabIndex = 0;
  public selectedEmoji = false;
  public innerHeight = '0px';
  public showCall = false;
  public spaceRemaining = false;
  public shareFallbackActive = false;
  public shareNetworks: SocialIconsList = [
    'email',
    'facebook',
    'line',
    'linkedin',
    'reddit',
    'telegram',
    'twitter',
    'vk',
    'weibo',
    'whatsapp',
  ];

  private emojis: EmojiList = ['bad', 'sad', 'neutral', 'smile'];

  public handleWindowResize(): void {
    this.innerHeight = window.innerHeight + 'px';
    if (this.$refs.spacer1) {
      this.spaceRemaining =
        (this.$refs.spacer1 as HTMLElement).clientHeight > 0;
    }
    if (this.$refs.spacer2) {
      this.showCall = (this.$refs.spacer2 as HTMLElement).clientHeight > 40;
    }
  }

  public webShareError(error: Error): void {
    error ? {} : {};
  }

  public webShareUnsupported(): void {
    this.shareFallbackActive = true;
  }

  public showRef(item: Vue, show = true): void {
    (item.$el as HTMLElement).style.opacity = show ? '1' : '0';
  }

  public delayShowElements(delaySettings: delaySettings) {
    for (const delaySetting of delaySettings) {
      const element = this.$refs[delaySetting[0]] as Vue;
      this.showRef(element, false);
      (element.$el as HTMLElement).style.animationDelay =
        (delaySetting[1] - 100).toString() + 'ms';
      setTimeout(() => {
        this.showRef(element);
      }, delaySetting[1]);
    }
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

  @Watch('selectedEmojiIndex')
  selectedEmojiIndexWatcher(newVal: number) {
    if (newVal != -1) {
      setTimeout(() => {
        this.$router.push({ name: 'GetHelp' });
      }, 750);
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  created() {
    for (const icon of this.shareNetworks) {
      require('@/components/icons/' + icon);
    }
  }

  mounted() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
    setTimeout(() => {
      this.handleWindowResize();
    }, 100);

    const delayToShow: delaySettings = [
      ['chat0', 3000],
      ['emojiSurvey0', 5000],
    ];
    this.delayShowElements(delayToShow);
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

.share {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 3;
  animation-delay: 8s;

  display: flex;
  justify-content: center;

  span {
    background-color: white;
    cursor: pointer;
    font-size: 12px;
    text-justify: center;
    padding: 0 5px 5px 8px;
    border: 1px solid #d7cee0;
    border-radius: 500px;

    .vs-icon {
      position: relative;
      top: 5px;
    }
  }
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

  overflow: hidden;
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

.alert-container {
  animation-delay: 8s;
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

.social-icons-container {
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;

  span {
    margin: 6px 0 6px 0;
    width: 26%;
    cursor: pointer;
  }
}
</style>
