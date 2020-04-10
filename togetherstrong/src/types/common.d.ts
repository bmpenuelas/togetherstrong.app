type AvailableEmojis = 'bad' | 'neutral' | 'sad' | 'sick' | 'smile';

type EmojiList = AvailableEmojis[];

interface chatMessage {
  sender: boolean,
  text: string,
}

type chatMessages = chatMessage[];
