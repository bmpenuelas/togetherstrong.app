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
    })
    .catch(function(error) {
      alert(error);
    });
}

export function completeAuthWithEmailLink(): void {
  // Confirm the link is a sign-in with email link.
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    let email: string = window.localStorage.getItem('emailForSignIn') || '';
    if (!email) {
      email = window.prompt('Please provide your email for confirmation') || '';
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('emailForSignIn');
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
