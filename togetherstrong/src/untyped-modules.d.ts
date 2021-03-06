declare module 'vuesax';
declare module 'vue-inline-svg';
declare module 'vue-social-sharing';
declare module 'vuex-shared-mutations';

interface Window {
  recaptchaVerifier: firebase.auth.ApplicationVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
}
