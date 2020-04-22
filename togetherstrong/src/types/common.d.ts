// Third party
type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

interface Navigator {
  share?: (data?: ShareData) => Promise<void>;
}

// Custom
/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback = (...args: any[]) => void;

type AvailableEmojis = 'bad' | 'neutral' | 'sad' | 'sick' | 'smile';

type EmojiList = AvailableEmojis[];

interface ChatMessage {
  sender: boolean;
  text: string;
}

type ChatMessages = ChatMessage[];

type AvailableSocialIcons =
  | 'email'
  | 'facebook'
  | 'line'
  | 'linkedin'
  | 'reddit'
  | 'telegram'
  | 'twitter'
  | 'vk'
  | 'weibo'
  | 'whatsapp';
type SocialIconsList = AvailableSocialIcons[];
