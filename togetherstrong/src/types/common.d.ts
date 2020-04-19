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
type Callback = (...args: any[]) => void;

type AvailableEmojis = 'bad' | 'neutral' | 'sad' | 'sick' | 'smile';

type EmojiList = AvailableEmojis[];

interface chatMessage {
  sender: boolean;
  text: string;
}

type chatMessages = chatMessage[];

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
