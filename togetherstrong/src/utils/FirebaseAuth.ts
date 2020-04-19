import { baseUrl } from '@/utils/Constants';
import { objToUrl, UrlParameters } from '@/utils/Utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store';

export function authSetPersistence(persist: boolean): void {
  const persistenceType = persist
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;
  firebase.auth().setPersistence(persistenceType);
}

export function authWithEmailLink(
  email: string,
  url: string,
  parameters: UrlParameters = {}
): void {
  parameters['loginlink'] = true;
  const actionCodeSettings = {
    url:
      baseUrl +
      (url.startsWith('/') ? url : '/' + url) +
      '?' +
      objToUrl(parameters),
    handleCodeInApp: true,
  };

  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function() {
      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('completeAuthWithEmailLink', 'true');
    })
    .catch(function(error) {
      alert(error);
    });
}

export function completeAuthWithEmailLink(): void {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    let email: string = window.localStorage.getItem('emailForSignIn') || '';
    if (!email) {
      email = window.prompt('Please provide your email for confirmation') || '';
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(result => {
        console.log(result);
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('completeAuthWithEmailLink');
        store.commit('firebaseUserMutation', result.user);
        store.commit('loggedInMutation', true);
      })
      .catch(() => {
        alert('Invalid login link');
        store.commit('loggedInMutation', false);
      });
  } else {
    store.commit('loggedInMutation', false);
  }
}

export function authWithGoogle(): void {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  firebase.auth().useDeviceLanguage();
  window.localStorage.setItem('completeAuthWithGoogle', 'true');
  firebase.auth().signInWithRedirect(provider);
}

export function completeAuthWithGoogle(errorCallback?: Callback): void {
  window.localStorage.removeItem('completeAuthWithGoogle');
  firebase
    .auth()
    .getRedirectResult()
    .then(function(result) {
      if (result.credential) {
        store.commit(
          'tokenGoogleMutation',
          (result.credential as firebase.auth.OAuthCredential).accessToken
        );
      }
      store.commit('firebaseUserMutation', result.user);
      store.commit('loggedInMutation', true);
    })
    .catch(function(error) {
      if (errorCallback) errorCallback(error);
    });
}

export function authWithPhone(
  phoneNumber: string,
  appVerifier: firebase.auth.ApplicationVerifier,
  callback?: Callback,
  errorCallback?: Callback
): void {
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(confirmationResult => {
      if (callback) callback();
      window.confirmationResult = confirmationResult;
    })
    .catch(error => {
      if (errorCallback) errorCallback(error);
    });
}

export function completeAuthWithPhone(
  code: string,
  callback?: Callback,
  errorCallback?: Callback
): void {
  window.confirmationResult
    .confirm(code)
    .then(result => {
      store.commit('firebaseUserMutation', result.user);
      store.commit('loggedInMutation', true);
      if (callback) callback(result);
    })
    .catch(error => {
      if (errorCallback) errorCallback(error);
    });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      store.commit('loggedInMutation', false);
    })
    .catch();
}

export function validateEmail(email: string): boolean {
  /* eslint-disable no-useless-escape */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const initReCaptcha = (
  buttonId: string,
  callback?: Callback,
  errorCallback?: Callback
) => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
    size: 'invisible',
    callback: callback,
    'expired-callback': errorCallback,
  });
  return window.recaptchaVerifier;
};
