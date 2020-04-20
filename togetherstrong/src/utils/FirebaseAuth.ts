import { baseUrl } from '@/utils/Constants';
import { objToUrl, UrlParameters } from '@/utils/Utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store';

export async function initFirebase() {
  if (process.env.NODE_ENV == 'development') {
    const firebaseJsonConfig = {
      apiKey: 'AIzaSyCI6caZbmT4KGNAk_hvzmVr6LdyygZ0BWI',
      authDomain: 'togetherstrongapp-dev.firebaseapp.com',
      databaseURL: 'https://togetherstrongapp-dev.firebaseio.com',
      projectId: 'togetherstrongapp-dev',
      storageBucket: 'togetherstrongapp-dev.appspot.com',
      messagingSenderId: '465635438291',
      appId: '1:465635438291:web:f7a1a34b8fd7f44b342e26',
      measurementId: 'G-DSC0ES34VB',
    };
    firebase.initializeApp(firebaseJsonConfig);
  } else {
    await fetch('/__/firebase/init.json').then(async response => {
      firebase.initializeApp(await response.json());
    });
  }

  firebase.auth().onAuthStateChanged(user => {
    store.dispatch('setUserAction', user);
  });
}

export function authSetPersistence(persist: boolean): void {
  const persistenceType = persist
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;
  firebase.auth().setPersistence(persistenceType);
}

export function authWithEmailLink(
  email: string,
  url: string,
  parameters: UrlParameters = {},
  errorCallback?: Callback
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
      if (errorCallback) errorCallback(error);
    });
}

export function completeAuthWithEmailLink(
  callback?: Callback,
  errorCallback?: Callback
): void {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    let email: string = window.localStorage.getItem('emailForSignIn') || '';
    if (!email) {
      email = window.prompt('Please provide your email for confirmation') || '';
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(result => {
        if (callback) callback(result);
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('completeAuthWithEmailLink');
      })
      .catch(error => {
        if (errorCallback) errorCallback(error);
      });
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
      if (callback) callback(result);
    })
    .catch(error => {
      if (errorCallback) errorCallback(error);
    });
}

export function signOut(callback?: Callback, errorCallback?: Callback) {
  firebase
    .auth()
    .signOut()
    .then(result => {
      if (callback) callback(result);
    })
    .catch(error => {
      if (errorCallback) errorCallback(error);
    });
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
