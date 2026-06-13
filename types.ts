
export type Category = 'All' | 'Popular' | 'Developer' | 'Text' | 'Math' | 'Social' | 'Daily' | 'Language';

export type Language = 'zh' | 'en' | 'ja' | 'ko';

export interface Tool {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  category: Category;
  icon: string;
  path: string;
  isPopular?: boolean;
}

export interface HistoryItem {
  id: string;
  toolId: string;
  timestamp: number;
  input: string;
  output: string;
}
