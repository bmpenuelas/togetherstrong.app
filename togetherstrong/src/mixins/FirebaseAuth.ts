import { Component, Vue } from 'vue-property-decorator';
import { baseUrl } from '@/utils/Constants';
import { objToUrl, UrlParameters } from '@/utils/Utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component
class FirebaseAuth extends Vue {
  public authSetPersistence(persist: boolean): void {
    const persistenceType = persist
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;
    firebase.auth().setPersistence(persistenceType);
  }

  public authWithEmailLink(email: string, parameters: UrlParameters): void {
    console.log(email);
    console.log(parameters);
    const actionCodeSettings = {
      url: baseUrl + '/' + objToUrl(parameters),
      handleCodeInApp: true,
    };
    console.log(actionCodeSettings);

    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        alert('Mail sent');
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function(error) {
        alert(error);
      });
  }

  public validateEmail(email: string): boolean {
    /* eslint-disable no-useless-escape */
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export default FirebaseAuth;
