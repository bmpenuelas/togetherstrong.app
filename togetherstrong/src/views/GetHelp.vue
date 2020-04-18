<template>
  <div class="GetHelp">
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
      :disabled="false"
    >
      Email
    </vs-button>
    <i class="vs-icon notranslate icon-scale material-icons null"></i>
  </div>
</template>

<script lang="ts">
// Imports
import { Component, Mixins, Ref } from 'vue-property-decorator';
import EmojiSurvey from '@/components/EmojiSurvey.vue';
import FirebaseAuth from '@/mixins/FirebaseAuth';

// Vue component
@Component({
  components: {
    EmojiSurvey,
  },
})
export default class Home extends Mixins(FirebaseAuth) {
  @Ref('emailInput') readonly emailInput!: HTMLInputElement;

  public userMail = '';

  get validEmail(): boolean {
    return this.validateEmail(this.userMail);
  }

  private continueWithEmail() {
    this.authWithEmailLink(this.userMail, { sa: 1, b: 2 });
  }
}
</script>

<style scoped lang="scss"></style>
