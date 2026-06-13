
import { useMemo } from 'react';
import { VOCAB_DATA, GRAMMAR_DATA, VocabCategory } from '../data/languageData';

export const useVocabulary = (searchQuery: string = '') => {
  const vocab = useMemo(() => {
    if (!searchQuery.trim()) return VOCAB_DATA;
    
    const query = searchQuery.toLowerCase();
    return VOCAB_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.zh.toLowerCase().includes(query) ||
        item.en.toLowerCase().includes(query) ||
        item.ja.toLowerCase().includes(query) ||
        item.ko.toLowerCase().includes(query) ||
        item.note.toLowerCase().includes(query)
      )
    })).filter(cat => cat.items.length > 0) as VocabCategory[];
  }, [searchQuery]);

  return vocab;
};

export const useGrammar = () => {
  return useMemo(() => GRAMMAR_DATA, []);
};
