<template>
  <div class="GetHelp">
    <div v-if="!loggedIn">
      <vs-input
        label-placeholder="email"
        v-model="userMail"
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
    <div v-else>
      <vs-button @click="signOut()" type="relief">
        Log Out
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
// Imports
import { Vue, Component } from 'vue-property-decorator';
import EmojiSurvey from '@/components/EmojiSurvey.vue';
import {
  validateEmail,
  authWithEmailLink,
  signOut,
} from '@/utils/FirebaseAuth';
import { mapState } from 'vuex';

// Vue component
@Component({
  components: {
    EmojiSurvey,
  },
  computed: {
    ...mapState(['loggedIn']),
  },
  methods: {
    signOut,
  },
})
export default class GetHelp extends Vue {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  $vs: any;

  get userMail() {
    return this.$store.state.userInputEmail;
  }

  set userMail(value) {
    this.$store.commit('userInputEmailMutation', value);
  }

  get validEmail(): boolean {
    return validateEmail(this.userMail);
  }

  private continueWithEmail() {
    authWithEmailLink(this.userMail, 'get-help');
    this.$vs.notify({
      title: 'Check your email',
      text:
        'Just click the link you will receive at ' +
        this.userMail +
        ' and you will be automatically logged-in',
      color: 'warning',
      fixed: true,
    });
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
}
</script>

<style scoped lang="scss"></style>
