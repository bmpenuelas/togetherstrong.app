// Third party
type ShareData = {
    title? : string;
    text? : string;
    url? : string;
};

interface Navigator
{
    share? : (data? : ShareData) => Promise<void>;
}

// Custom
type AvailableEmojis = 'bad' | 'neutral' | 'sad' | 'sick' | 'smile';

type EmojiList = AvailableEmojis[];

interface chatMessage {
  sender: boolean,
  text: string,
}

type chatMessages = chatMessage[];
