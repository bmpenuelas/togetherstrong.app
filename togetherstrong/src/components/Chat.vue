<template>
  <div class="Chat">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="bubble"
      :class="{
        sender: message.sender,
        first: computedOrder[0],
        last: computedOrder[1],
      }"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type chatOrder = [boolean, boolean][];

@Component
export default class Chat extends Vue {
  @Prop(Array) private messages!: chatMessages;

  get computedOrder(): chatOrder {
    const newOrder: chatOrder = Array(this.messages.length).fill([
      false,
      false,
    ]);
    for (let i = 0; i < this.messages.length; i++) {
      if (i == 0) {
        newOrder[i][0] = true;
      } else if (this.messages[i].sender != this.messages[i - 1].sender) {
        newOrder[i][0] = true;
        newOrder[i - 1][1] = !newOrder[i - 1][0];
      }
    }
    return newOrder;
  }
}
</script>

<style scoped lang="scss">
.Chat {
  display: flex;
  flex-flow: column wrap;
}

.Chat > .bubble {
  border-radius: 1em;
  padding: 0.3em 1em;
  margin: 0.07em;
  max-width: 80%;
}

.Chat > .bubble.sender {
  align-self: flex-start;
  background-color: cornflowerblue;
  color: #fff;
}
.Chat > .bubble.recipient {
  align-self: flex-end;
  background-color: #efefef;
}

.Chat > .bubble.sender.first {
  border-bottom-left-radius: 0.1em;
}
.Chat > .bubble.sender.last {
  border-top-left-radius: 0.1em;
}
.Chat > .bubble.sender.middle {
  border-bottom-left-radius: 0.1em;
  border-top-left-radius: 0.1em;
}

.Chat > .bubble.recipient.first {
  border-bottom-right-radius: 0.1em;
}
.Chat > .bubble.recipient.last {
  border-top-right-radius: 0.1em;
}
.Chat > .bubble.recipient.middle {
  border-bottom-right-radius: 0.1em;
  border-top-right-radius: 0.1em;
}
</style>
