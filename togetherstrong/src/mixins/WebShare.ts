import { Component, Vue } from 'vue-property-decorator';

@Component
class WebShare extends Vue {
  public async shareWith(
    url = '',
    text = '',
    title = '',
    shareErrorHandler = (error: Error) => error,
    notSupportedHandler = () => null
  ): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          url: url || location.href,
          text: text,
          title: title || document.title,
        });
      } catch (error) {
        shareErrorHandler(error);
      }
    } else {
      notSupportedHandler();
    }
  }
}

export default WebShare;
