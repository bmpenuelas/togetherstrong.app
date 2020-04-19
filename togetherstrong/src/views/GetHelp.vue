<template>
  <div class="GetHelp">
    <h1>
      Login methods (WIP)
    </h1>

    <vs-divider position="center">
      Register/Log-in with one-time-email
    </vs-divider>
    <div v-if="!loggedIn" class="margin-10">
      <vs-input
        class="text-input"
        label-placeholder="email"
        v-model="userInputEmail"
        type="email"
        autocomplete="email"
        :success="validEmail"
      />
      <vs-button
        ref="emailInput"
        @click="continueWithEmail()"
        type="relief"
        :disabled="!validEmail"
      >
        Login with email
      </vs-button>
    </div>

    <vs-divider position="center">
      Register/Log-in with Google
    </vs-divider>
    <div v-if="!loggedIn" class="margin-10">
      <vs-button @click="continueWithGoogle()" type="relief">
        Login with Google
      </vs-button>
    </div>

    <vs-divider position="center">
      Register/Log-in with Phone no.
    </vs-divider>
    <div v-show="!loggedIn" class="margin-10">
      <vs-input
        class="text-input"
        label-placeholder="phone"
        v-model="userInputPhone"
        type="phone"
        autocomplete="phone"
        :success="validPhone"
      />
      <vs-button
        @click="continueWithPhone()"
        type="relief"
        :disabled="!validPhone"
        id="button-continue-phone"
      >
        Login with Phone
      </vs-button>

      <vs-input
        label-placeholder="code"
        v-model="smsCode"
        type="number"
        class="text-input"
      />
      <vs-button
        @click="completeWithPhone()"
        type="relief"
        :disabled="!validCode"
      >
        Validate code
      </vs-button>
    </div>

    <div v-if="loggedIn">
      <div class="margin-10">
        <vs-button @click="signOut()" type="relief">
          Log Out
        </vs-button>
      </div>
    </div>

    <div class="margin-10">
      <h3>loggedIn</h3>
      {{ loggedIn }}
    </div>
    <div class="margin-10">
      <h3>firebaseUser</h3>
      {{ firebaseUser }}
    </div>
    <div class="margin-10">
      <h3>user</h3>
      {{ user }}
    </div>
  </div>
</template>

<script lang="ts">
// Imports
import { Vue, Component } from 'vue-property-decorator';
import EmojiSurvey from '@/components/EmojiSurvey.vue';
import {
  initReCaptcha,
  validateEmail,
  authWithEmailLink,
  authWithGoogle,
  signOut,
  authWithPhone,
  completeAuthWithPhone,
} from '@/utils/FirebaseAuth';
import { mapState } from 'vuex';

// Vue component
@Component({
  components: {
    EmojiSurvey,
  },
  computed: {
    ...mapState(['loggedIn', 'firebaseUser', 'user']),
  },
  methods: {
    signOut,
  },
})
export default class GetHelp extends Vue {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  $vs: any;
  public smsCode = '';

  public appVerifier!: firebase.auth.ApplicationVerifier;

  get userInputEmail() {
    return this.$store.state.userInputEmail;
  }
  set userInputEmail(value) {
    this.$store.commit('userInputEmailMutation', value);
  }

  get userInputPhone() {
    return this.$store.state.userInputPhone;
  }
  set userInputPhone(value) {
    this.$store.commit('userInputPhoneMutation', value);
  }

  get validEmail(): boolean {
    return validateEmail(this.userInputEmail);
  }

  get validPhone(): boolean {
    return Boolean(this.userInputPhone);
  }

  get validCode(): boolean {
    return Boolean(this.smsCode);
  }

  private continueWithEmail() {
    authWithEmailLink(this.userInputEmail, 'get-help');
    this.$vs.notify({
      title: 'Check your email',
      text:
        'Just click the link you will receive at ' +
        this.userInputEmail +
        ' and you will be automatically logged-in',
      color: 'warning',
      fixed: true,
    });
  }

  private continueWithGoogle() {
    authWithGoogle();
  }

  private continueWithPhone() {
    authWithPhone(this.userInputPhone, this.appVerifier);
  }

  private completeWithPhone() {
    completeAuthWithPhone(this.smsCode);
  }

  private createCaptcha() {
    setTimeout(() => {
      this.appVerifier = initReCaptcha('button-continue-phone');
    }, 1000);
  }

  created() {
    this.$store.watch(
      () => this.$store.state.loggedIn,
      (newValue, oldValue) => {
        if (newValue && !oldValue) {
          this.$vs.notify({
            text: 'Successfully logged in',
            color: 'success',
          });
        }
        if (!newValue && oldValue) {
          this.$vs.notify({ text: 'Logged out', color: 'danger' });
        }
      }
    );
  }

  mounted() {
    this.createCaptcha();
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
