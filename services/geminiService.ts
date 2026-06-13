
/**
 * AI 服務已依使用者要求移除，以避免消耗 API 額度。
 */
export const summarizeText = async (_text: string): Promise<string> => {
  return "AI 功能已停用。";
};

export const generateImage = async (_prompt: string): Promise<string | null> => {
  return null;
};
