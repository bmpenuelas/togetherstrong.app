import _Vue from 'vue'; // <-- notice the changed import
import { Vue } from 'vue-property-decorator';

// Types
declare module 'vue/types/vue' {
  interface Vue {
    $webnotifications: WebNotifications;
    granted: boolean;
  }
}

// Class
class WebNotifications {
  constructor(data = { granted: Notification.permission == 'granted' }) {
    this.storeVM = new Vue({ data });
  }

  private storeVM: Vue;

  private serviceWorker!: ServiceWorkerRegistration;

  get granted() {
    return this.storeVM.granted;
  }

  public async registerServiceWorker(): Promise<void> {
    this.serviceWorker = await navigator.serviceWorker.register(
      'WebNotificationsSW.js'
    );
  }

  public async requestPermission(): Promise<boolean> {
    if (!this.storeVM.granted) {
      this.storeVM.granted =
        (await window.Notification.requestPermission()) == 'granted';
    }
    return this.storeVM.granted;
  }

  public async showNotification(
    title: string,
    options?: NotificationOptions | undefined
  ): Promise<void> {
    return this.serviceWorker
      ? this.serviceWorker.showNotification(title, options)
      : undefined;
  }
}

export default function webnotifications(Vue: typeof _Vue): void {
  Vue.prototype.$webnotifications = new WebNotifications();
}
