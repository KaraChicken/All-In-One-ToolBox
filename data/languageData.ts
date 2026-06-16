import { Language } from '../types';

export interface VocabItem {
  zh: string;
  zh_p: string; // 拼音
  en: string;
  en_p: string; // IPA or pronunciation hint
  ja: string;
  ja_p: string; // 羅馬字
  ko: string;
  ko_p: string; // 羅馬拼音
  note: string;
}

export interface VocabCategory {
  category: string;
  items: VocabItem[];
}

export interface GrammarPoint {
  title: string;
  desc: string;
  languages: Record<Language, {
    name: string;
    pattern: string;
    example: string;
    color: string;
  }>;
}

export const VOCAB_DATA: VocabCategory[] = [
  {
    category: '日常問候與社交 (Greetings)',
    items: [
      { zh: '你好', zh_p: 'nǐ hǎo', en: 'Hello', en_p: '/həˈloʊ/', ja: 'こんにちは', ja_p: 'kon-nichi-wa', ko: '안녕하세요', ko_p: 'an-nyeong-ha-se-yo', note: '日常最通用問候語' },
      { zh: '謝謝', zh_p: 'xiè xie', en: 'Thank you', en_p: '/θæŋk juː/', ja: 'ありがとう', ja_p: 'arigatō', ko: '감사합니다', ko_p: 'gam-sa-ham-ni-da', note: '表達心意感謝' },
      { zh: '對不起', zh_p: 'duì bù qǐ', en: 'I am sorry', en_p: '/ˈsɑːri/', ja: 'ごめんなさい', ja_p: 'gomen-nasai', ko: '죄송합니다', ko_p: 'joe-song-ham-ni-da', note: '誠懇致歉' },
      { zh: '再見', zh_p: 'zài jiàn', en: 'Goodbye', en_p: '/ˌɡʊdˈbaɪ/', ja: 'さようなら', ja_p: 'sayōnara', ko: '안녕히 가세요', ko_p: 'an-nyeong-hi ga-se-yo', note: '告別、再會' },
      { zh: '沒關係', zh_p: 'méi guān xi', en: 'No problem / It is okay', en_p: '/noʊ ˈprɑːbləm/', ja: '大丈夫です', ja_p: 'daijōbu desu', ko: '괜찮아요', ko_p: 'gwaen-cha-na-yo', note: '包容、沒事沒事' },
      { zh: '不客氣', zh_p: 'bú kè qi', en: 'You are welcome', en_p: '/juː ɑːr ˈwelkəm/', ja: 'どういたしまして', ja_p: 'dō-itashimashite', ko: '천만에요', ko_p: 'cheon-man-e-yo', note: '回應他人感謝' },
      { zh: '早安', zh_p: 'zǎo ān', en: 'Good morning', en_p: '/ɡʊd ˈmɔːrnɪŋ/', ja: 'おはようございます', ja_p: 'ohayō gozaimasu', ko: '좋은 아침입니다', ko_p: 'jo-eun a-chim-im-ni-da', note: '上午見面招呼' },
      { zh: '晚安', zh_p: 'wǎn ān', en: 'Good night', en_p: '/ɡʊd naɪt/', ja: 'おやすみなさい', ja_p: 'oyasuminasai', ko: '안녕히 주무세요', ko_p: 'an-nyeong-hi ju-mu-se-yo', note: '睡前防護溫馨問候' },
      { zh: '好久不見', zh_p: 'hǎo jiǔ bú jiàn', en: 'Long time no see', en_p: '/lɔːŋ taɪm noʊ siː/', ja: 'お久しぶりです', ja_p: 'ohasashiburi-desu', ko: '오랜만이에요', ko_p: 'o-raen-man-i-e-yo', note: '久別重逢親切打招呼' },
      { zh: '很高興認識你', zh_p: 'hěn gāo xìng rèn shi nǐ', en: 'Nice to meet you', en_p: '/naɪs tuː miːt juː/', ja: 'はじめまして', ja_p: 'hajimemashite', ko: '만나서 반갑습니다', ko_p: 'man-na-seo ban-gap-seum-ni-da', note: '自我介紹通用結尾' },
      { zh: '祝你好運', zh_p: 'zhù nǐ hǎo yùn', en: 'Good luck', en_p: '/ɡʊd lʌk/', ja: 'がんばって / 幸運を祈ります', ja_p: 'ganbatte / kōun o inorimasu', ko: '행운을 빕니다', ko_p: 'haeng-un-eul bim-ni-da', note: '給予出發前朋友的鼓勵' },
      { zh: '保持聯絡', zh_p: 'bǎo chí lián luò', en: 'Keep in touch', en_p: '/kiːp ɪn tʌtʃ/', ja: 'また連絡しましょう', ja_p: 'mata renraku shimashō', ko: '연락해요', ko_p: 'yeol-lak-hae-yo', note: '散會或道別時的客套交際' },
      { zh: '你是哪裡人', zh_p: 'nǐ shì nǎ lǐ rén', en: 'Where are you from', en_p: '/wer ɑːr juː frʌm/', ja: 'どちらのご出身ですか', ja_p: 'dochira no goshusshin desu ka', ko: '어디에서 왔어요', ko_p: 'eo-di-e-seo wa-sseo-yo', note: '旅行中結交異國朋友開端' },
      { zh: '我叫...', zh_p: 'wǒ jiào', en: 'My name is...', en_p: '/maɪ neɪm ɪz/', ja: '私の名前は...です', ja_p: 'watashi no namae wa...desu', ko: '제 이름은 ...입니다', ko_p: 'je i-reum-eun...im-ni-da', note: '自我介紹首要語' },
      { zh: '你呢？ / 你怎麼樣？', zh_p: 'nǐ ne', en: 'And you?', en_p: '/ænd juː/', ja: 'あなたは？', ja_p: 'anata wa?', ko: '당신은요?', ko_p: 'dang-sin-eun-yo?', note: '回問對方看法' },
      { zh: '我也一樣', zh_p: 'wǒ yě yī yàng', en: 'Me too', en_p: '/miː tuː/', ja: '私も同じです', ja_p: 'watashi mo onaji desu', ko: '저도요', ko_p: 'jeo-do-yo', note: '表達共鳴認同' },
      { zh: '恭喜！', zh_p: 'gōng xǐ', en: 'Congratulations!', en_p: '/kənˌɡrætʃuˈleɪʃnz/', ja: 'おめでとうございます', ja_p: 'omedetō gozaimasu', ko: '축하해요', ko_p: 'chuk-ha-hae-yo', note: '祝賀成功或好事' },
      { zh: '辛苦了', zh_p: 'xīn kǔ le', en: 'Thank you for your hard work', en_p: '/hɑːrd wɜːrk/', ja: 'お疲れ様でした', ja_p: 'otsukaresama deshita', ko: '수고하셨습니다', ko_p: 'su-go-ha-syeot-seum-ni-da', note: '體貼工作與協力的夥伴' },
      { zh: '請多保重', zh_p: 'qǐng duō bǎo zhòng', en: 'Take care', en_p: '/teɪk ker/', ja: 'お体にお気をつけて', ja_p: 'okada ni oki o tsukete', ko: '몸 조심하세요', ko_p: 'mom jo-sim-ha-se-yo', note: '寒暄道別的貼心叮嚀' },
      { zh: '當然', zh_p: 'dāng rán', en: 'Of course', en_p: '/əv kɔːrs/', ja: 'もちろんです', ja_p: 'mochiron desu', ko: '물론이지요', ko_p: 'mul-lon-i-ji-yo', note: '爽快應答、給予承諾' },
      { zh: '好吧', zh_p: 'hǎo ba', en: 'Okay / Alright', en_p: '/oʊˈkeɪ/', ja: 'わかりました', ja_p: 'wakarimashita', ko: '좋아요', ko_p: 'jo-a-yo', note: '表示同意或妥協' },
      { zh: '拜託你 / 請', zh_p: 'bài tuō', en: 'Please', en_p: '/pliːz/', ja: 'おねがいします', ja_p: 'onegai shimasu', ko: '부탁드립니다', ko_p: 'bu-tak-deu-rim-ni-da', note: '委婉請求對方協助' },
      { zh: '真的嗎？', zh_p: 'zhēn de ma', en: 'Really?', en_p: '/ˈriːəli/', ja: '本当ですか', ja_p: 'hontō desu ka', ko: '정말요?', ko_p: 'jeong-mal-yo?', note: '表露出驚訝的追問' },
      { zh: '再說一次', zh_p: 'zài shuō yī cì', en: 'Pardon? / Once again', en_p: '/pɑːrdn/', ja: 'もう一度言ってください', ja_p: 'mō ichido itte kudasai', ko: '다시 말씀해 주세요', ko_p: 'da-si mal-sseum-hae ju-se-yo', note: '請求重申含糊字眼' },
      { zh: '我不懂 / 不明白', zh_p: 'wǒ bù dǒng', en: 'I do not understand', en_p: '/ʌndərˈstænd/', ja: 'よくわかりません', ja_p: 'yoku wakarimasen', ko: '잘 모르겠어요', ko_p: 'jal mo-reu-ge-sseo-yo', note: '坦承不解並求助' },
      { zh: '可以說慢一點嗎', zh_p: 'kě yǐ shuō màn yī diǎn ma', en: 'Speak slowly, please', en_p: '/spiːk ˈsloʊli/', ja: 'ゆっくり話してください', ja_p: 'yukkuri hanashite kudasai', ko: '천천히 말씀해 주세요', ko_p: 'cheon-cheon-hi mal-sseum-hae ju-se-yo', note: '外語溝通節奏減緩' },
      { zh: '請等一下', zh_p: 'qǐng děng yī xià', en: 'Just a moment, please', en_p: '/ˈmoʊmənt/', ja: 'ちょっと待ってください', ja_p: 'chotto matte kudasai', ko: '잠시만 기다려 주세요', ko_p: 'jam-si-man gi-da-ryeo ju-se-yo', note: '稍安勿躁爭取幾秒鐘' },
      { zh: '是的', zh_p: 'shì de', en: 'Yes', en_p: '/jes/', ja: 'はい', ja_p: 'hai', ko: '네', ko_p: 'ne', note: '肯定語意、承諾' },
      { zh: '不是', zh_p: 'bú shì', en: 'No', en_p: '/noʊ/', ja: 'いいえ', ja_p: 'iie', ko: '아니요', ko_p: 'a-ni-yo', note: '否定答辯' },
      { zh: '祝你今天愉快', zh_p: 'zhù nǐ jīn tiān yú kuài', en: 'Have a nice day', en_p: '/hæv ə naɪs deɪ/', ja: 'よい一日を', ja_p: 'yoi ichinichi o', ko: '좋은 하루 되세요', ko_p: 'jo-eun ha-ru doe-se-yo', note: '清爽商務社交百搭敬語' }
    ]
  },
  {
    category: '餐飲美食與點餐 (Dining & Food)',
    items: [
      { zh: '水', zh_p: 'shuǐ', en: 'Water', en_p: '/ˈwɔːtər/', ja: '水 (お水)', ja_p: 'mizu', ko: '물', ko_p: 'mul', note: '生命之源飲用水' },
      { zh: '好吃 / 美味', zh_p: 'hǎo chī', en: 'Delicious', en_p: '/dɪˈlɪʃəs/', ja: '美味しい', ja_p: 'oishii', ko: '맛있어요', ko_p: 'ma-si-sseo-yo', note: '讚美料理美味' },
      { zh: '買單結帳', zh_p: 'mǎi dān', en: 'Check please', en_p: '/tʃek pliːz/', ja: 'お会計おねがいします', ja_p: 'okaikei onegai shimasu', ko: '계산해 주세요', ko_p: 'gye-san-hae ju-se-yo', note: '請款結帳' },
      { zh: '菜單 / 點單', zh_p: 'cài dān', en: 'Menu', en_p: '/ˈmenjuː/', ja: 'メニュー', ja_p: 'menyū', ko: '메뉴', ko_p: 'me-nyu', note: '挑選菜餚必備工具書' },
      { zh: '素食 / 蔬食', zh_p: 'sù shí', en: 'Vegetarian', en_p: '/ˌvedʒəˈteriən/', ja: 'ベジタリアン', ja_p: 'bejitarian', ko: '채식', ko_p: 'chae-sik', note: '不含任何肉類與肉湯的料理' },
      { zh: '外帶', zh_p: 'wài dài', en: 'Take-out', en_p: '/ˈteɪk aʊt/', ja: '持ち帰り (テイクアウト)', ja_p: 'mochikaeri', ko: '포장 (테이크아웃)', ko_p: 'po-jang', note: '攜出店外享用' },
      { zh: '內用', zh_p: 'nèi yòng', en: 'For here', en_p: '/fɔːr hɪr/', ja: '店内で食べる', ja_p: 'tennai de taberu', ko: '여기서 먹을게요', ko_p: 'yeo-gi-seo meog-eul-ge-yo', note: '在店家內設座位享用' },
      { zh: '餐具 (叉勺筷)', zh_p: 'cān jù', en: 'Cutlery', en_p: '/ˈkʌtləri/', ja: 'フォーク・スプーン・箸', ja_p: 'fōku / supūn / hashi', ko: '수저', ko_p: 'su-jeo', note: '筷子湯匙分工用具' },
      { zh: '咖啡', zh_p: 'kā fēi', en: 'Coffee', en_p: '/ˈkɔːfi/', ja: 'コーヒー', ja_p: 'kōhī', ko: '커피', ko_p: 'keo-pi', note: '晨間提神醒腦必備' },
      { zh: '啤酒', zh_p: 'pí jiǔ', en: 'Beer', en_p: '/bɪr/', ja: 'ビール', ja_p: 'bīru', ko: '맥주', ko_p: 'maek-ju', note: '深夜小酌放鬆極限' },
      { zh: '茶 / 綠茶', zh_p: 'chá', en: 'Tea', en_p: '/tiː/', ja: 'お茶 / 緑茶', ja_p: 'ocha / ryokucha', ko: '차', ko_p: 'cha', note: '東方悠閒傳統飲品' },
      { zh: '服務生點餐', zh_p: 'fú wù shēng', en: 'Excuse me', en_p: '/ɪkˈskjuːz miː/', ja: 'すみません', ja_p: 'sumimasen', ko: '저기요 / 여기요', ko_p: 'jeo-gi-yo', note: '大聲招手示意點餐' },
      { zh: '辣的', zh_p: 'là de', en: 'Spicy', en_p: '/ˈspaɪsi/', ja: '辛い', ja_p: 'karai', ko: '매워요', ko_p: 'mae-wo-yo', note: '確認麻辣與安格斯辛辣係數' },
      { zh: '甜點 / 快餐', zh_p: 'tián diǎn', en: 'Dessert', en_p: '/dɪˈzɜːrt/', ja: 'デザート', ja_p: 'dezāto', ko: '디저트', ko_p: 'di-jeo-teu', note: '填補第二個胃的甜食' },
      { zh: '有推薦的菜嗎', zh_p: 'yǒu tuī jiàn de cài ma', en: 'Any recommendations', en_p: '/ˈen i ˌrekəmenˈdeɪʃnz/', ja: 'おすすめはありますか', ja_p: 'osushume wa arimasu ka', ko: '추천 메뉴가 있어요', ko_p: 'chu-cheon me-nyu-ga i-sseo-yo', note: '讓當地人推薦人氣第一名' },
      { zh: '我不吃肉', zh_p: 'wǒ bù chī ròu', en: 'I do not eat meat', en_p: '/miːt/', ja: '私は肉を食べません', ja_p: 'watashi wa niku o tabemasen', ko: '저는 고기를 안 먹어요', ko_p: 'jeo-neun go-gi-reul an meo-geo-yo', note: '闡述餐食限制' },
      { zh: '冰水', zh_p: 'bīng shuǐ', en: 'Ice water', en_p: '/aɪs ˈwɔːtər/', ja: '冷たい水 (お冷)', ja_p: 'ohiye', ko: '찬물 (얼음물)', ko_p: 'chan-mul', note: '夏日大排檔降溫極限' },
      { zh: '熱茶', zh_p: 'rè chá', en: 'Hot tea', en_p: '/hɑːt tiː/', ja: '熱いお茶', ja_p: 'atsui ocha', ko: '뜨거운 차', ko_p: 'tteu-geo-un cha', note: '冬日祛寒熱茶' },
      { zh: '果汁', zh_p: 'guǒ zhī', en: 'Juice', en_p: '/dʒuːs/', ja: 'ジュース', ja_p: 'jūsu', ko: '주스', ko_p: 'ju-seu', note: '鮮橙或蘋果等果肉榨汁' },
      { zh: '牛奶 / 乳品', zh_p: 'niú nǎi', en: 'Milk', en_p: '/mɪlk/', ja: '牛乳 / ミルク', ja_p: 'gyūnyū', ko: '우유', ko_p: 'u-yu', note: '元氣乳製品來源' },
      { zh: '米飯', zh_p: 'mǐ fàn', en: 'Rice', en_p: '/raɪs/', ja: 'ご飯', ja_p: 'gohan', ko: '밥', ko_p: 'bap', note: '亞洲最重要澱粉主食' },
      { zh: '麵條', zh_p: 'miàn tiáo', en: 'Noodles', en_p: '/ˈnuːdlz/', ja: '麺類 (ラーメン・うどん)', ja_p: 'men-rui', ko: '국수 / 라면', ko_p: 'guk-su', note: '湯麵或炒麵總稱' },
      { zh: '牛肉', zh_p: 'niú ròu', en: 'Beef', en_p: '/biːf/', ja: '牛肉', ja_p: 'gyūniku', ko: '소고기', ko_p: 'so-go-gi', note: '製作牛排或壽喜燒主食材' },
      { zh: '豬肉', zh_p: 'zhū ròu', en: 'Pork', en_p: '/pɔːrk/', ja: '豚肉', ja_p: 'butaniku', ko: '돼지고기', ko_p: 'dwae-ji-go-gi', note: '經典廣式或燉菜用肉' },
      { zh: '雞肉', zh_p: 'jī ròu', en: 'Chicken', en_p: '/ˈtʃɪkɪn/', ja: '鶏肉', ja_p: 'toriniku', ko: '닭고기', ko_p: 'dak-go-gi', note: '炸雞或參雞湯主料' },
      { zh: '海鮮', zh_p: 'hǎi xiān', en: 'Seafood', en_p: '/ˈsiːfuːd/', ja: '海鮮 / シーフード', ja_p: 'kaisen', ko: '해산물', ko_p: 'hae-san-mul', note: '魚蝦貝類之海中滋味' },
      { zh: '麵包', zh_p: 'miàn bāo', en: 'Bread', en_p: '/bred/', ja: 'パン', ja_p: 'pan', ko: '빵', ko_p: 'ppang', note: '歐美傳統烘焙小麥主食' },
      { zh: '湯', zh_p: 'tāng', en: 'Soup', en_p: '/suːp/', ja: 'スープ / お吸い物', ja_p: 'sūpu', ko: '국 / 스프', ko_p: 'guk', note: '熱氣騰騰之佐膳湯汁' },
      { zh: '鹽', zh_p: 'yán', en: 'Salt', en_p: '/sɔːlt/', ja: '塩', ja_p: 'shio', ko: '소금', ko_p: 'so-geum', note: '調味底蘊食鹽' },
      { zh: '糖', zh_p: 'táng', en: 'Sugar', en_p: '/ˈʃʊɡər/', ja: '砂糖', ja_p: 'satō', ko: '설탕', ko_p: 'seol-tang', note: '增加餐食糖度風味' }
    ]
  },
  {
    category: '購物、金流與退稅 (Shopping & Currency)',
    items: [
      { zh: '這個多少錢', zh_p: 'zhè ge duō shǎo qián', en: 'How much is this', en_p: '/haʊ mʌtʃ ɪz ðɪs/', ja: 'これはいくらですか', ja_p: 'kore wa ikura desu ka', ko: '이거 얼마예요', ko_p: 'i-geo eol-ma-yeo-yo', note: '詢問物品價格' },
      { zh: '可以便宜點嗎', zh_p: 'néng pián yi diǎn ma', en: 'Can I get a discount', en_p: '/kæn aɪ ɡet ə ˈdɪskaʊnt/', ja: '安くできますか', ja_p: 'yasuku dekimasu ka', ko: '깎아 주세요', ko_p: 'kka-kka ju-se-yo', note: '傳統小市集協商折扣' },
      { zh: '信用卡支付', zh_p: 'xìn yòng kǎ', en: 'Credit Card', en_p: '/ˈkredɪt kɑːrd/', ja: 'クレジットカード', ja_p: 'kurejitto kādo', ko: '신용카드', ko_p: 'sin-yong-ka-deu', note: '塑膠刷卡無現金交易' },
      { zh: '辦理退稅', zh_p: 'tuì shuì', en: 'Tax refund', en_p: '/tæks ˈriːfʌnd/', ja: '免税手続き', ja_p: 'menzei tetsuzuki', ko: '택스 리펀드', ko_p: 'taek-seu ri-peon-deu', note: '免稅店或出海關退還消費稅' },
      { zh: '試穿看看', zh_p: 'shì chuān', en: 'Try on', en_p: '/traɪ ɑːn/', ja: '試着する', ja_p: 'shichaku suru', ko: '입어 보다', ko_p: 'ibeo bo-da', note: '百貨試衣間試衣服' },
      { zh: '發票 / 收據', zh_p: 'shōu jù / fā piào', en: 'Receipt', en_p: '/rɪˈsiːt/', ja: '領収書 / レシート', ja_p: 'ryōshūsho / reshīto', ko: '영수증', ko_p: 'yeong-su-jeung', note: '保障售後退換服務之單據' },
      { zh: '提款機', zh_p: 'tí kuǎn jī', en: 'ATM', en_p: '/ATM/', ja: 'ATM (現金自動預払機)', ja_p: 'ē-tī-emu', ko: '현금 자동 입출금기', ko_p: 'hyeon-geum-in-chul-gi', note: '提取境外當地現鈔' },
      { zh: '太貴了', zh_p: 'tài guì le', en: 'Too expensive', en_p: '/tuː ɪkˈspensɪv/', ja: '高すぎます', ja_p: 'takasugimasu', ko: '너무 비싸요', ko_p: 'neo-mu bi-ssa-yo', note: '表示不划算' },
      { zh: '用現金付款', zh_p: 'xiàn jīn', en: 'Cash', en_p: '/kæʃ/', ja: '現金で払います', ja_p: 'genkin', ko: '현금으로 계산할게요', ko_p: 'hyeon-geum', note: '使用實體鈔票硬幣支付' },
      { zh: '塑膠袋 / 紙袋', zh_p: 'dài zi', en: 'Bag please', en_p: '/bæɡ pliːz/', ja: '袋をおねがいします', ja_p: 'fukuro', ko: '봉투에 넣어 주세요', ko_p: 'bong-tu', note: '要求多買提袋封裝商品' },
      { zh: '我想買這個', zh_p: 'wǒ xiǎng mǎi zhè ge', en: 'I want to buy this', en_p: '/aɪ wɑːnt tuː baɪ ðɪs/', ja: 'これを買いたいです', ja_p: 'kore o kaitai desu', ko: '이거 사고 싶어요', ko_p: 'i-geo sa-go si-peo-yo', note: '決定買下商品語氣' },
      { zh: '營業時間是幾點', zh_p: 'yíng yè shí jiān', en: 'Opening hours', en_p: '/ˈoʊpnɪŋ ˈaʊərz/', ja: '営業時間は何時までですか', ja_p: 'eigyō jikan', ko: '영업 시간은 어떻게 돼요', ko_p: 'yeong-eob si-gan', note: '確認店面開張時間' },
      { zh: '尺寸 / 號碼', zh_p: 'chǐ cùn', en: 'Size', en_p: '/saɪz/', ja: 'サイズ', ja_p: 'saizu', ko: '사이즈', ko_p: 'sa-i-jeu', note: '服飾鞋帽之量度單位' },
      { zh: '可以幫我包裝嗎', zh_p: 'bāo zhuāng', en: 'Gift wrap', en_p: '/ɡɪft ræp/', ja: 'ラッピングをお願いします', ja_p: 'rappingu', ko: '포장해 주세요', ko_p: 'po-jang-hae ju-se-yo', note: '要求禮品包裝服務' },
      { zh: '退換貨服務', zh_p: 'tuì huàn huò', en: 'Exchange / Return', en_p: '/ɪksˈtʃeɪndʒ/', ja: '返品・交換', ja_p: 'henpin / kōkan', ko: '교환 / 환불', ko_p: 'gyo-hwan', note: '持發票至櫃檯退換款項' },
      { zh: '我想看一下這個', zh_p: 'wǒ xiǎng kàn yī xià zhè ge', en: 'I want to look at this', en_p: '/lʊkæt/', ja: 'これを見せてください', ja_p: 'kore o misete kudasai', ko: '이것 좀 보여주세요', ko_p: 'i-geot jom bo-yeo-ju-se-yo', note: '請求店員拿出行列中展品' },
      { zh: '有別的顏色嗎', zh_p: 'yǒu bié de yán sè ma', en: 'Other colors?', en_p: '/ˈʌðər ˈkʌlərz/', ja: '他の色はありますか', ja_p: 'hoka no iro wa arimasu ka', ko: '다른 색상도 있어요?', ko_p: 'da-reun saek-sang-do i-sseo-yo?', note: '確認其餘色系庫存' },
      { zh: '有大一點的嗎', zh_p: 'yǒu dà yī diǎn de ma', en: 'Larger size?', en_p: '/lɑːrdʒər/', ja: 'もう少し大きいのはありますか', ja_p: 'mō sukoshi ōkii no', ko: '더 큰 것 있어요?', ko_p: 'deo keun geot i-sseo-yo?', note: '請求更大尺碼' },
      { zh: '有小一點的嗎', zh_p: 'yǒu xiǎo yī diǎn de ma', en: 'Smaller size?', en_p: '/smɔːlər/', ja: 'もう少し小さいのはありますか', ja_p: 'mō sukoshi chiisai no', ko: '더 작은 것 있어요?', ko_p: 'deo ja-geun geot i-sseo-yo?', note: '要求更貼身的小碼' },
      { zh: '錢包', zh_p: 'qián bāo', en: 'Wallet', en_p: '/ˈwɑːlɪt/', ja: '財布 (お財布)', ja_p: 'saifu', ko: '지갑', ko_p: 'ji-gap', note: '妥存現鈔皮夾' },
      { zh: '零錢 / 硬幣', zh_p: 'líng qián', en: 'Coins / Change', en_p: '/tʃeɪndʒ/', ja: '小銭 / お釣り', ja_p: 'kozeni / otsuri', ko: '동전 / 잔돈', ko_p: 'dong-jeon', note: '金屬零散幣分次交遞' },
      { zh: '化妝品', zh_p: 'huà zhuāng pǐn', en: 'Cosmetics', en_p: '/kɑːzˈmetɪks/', ja: '化粧品', ja_p: 'keshōhin', ko: '화장품', ko_p: 'hwa-jang-pum', note: '藥妝店美妝熱銷款' },
      { zh: '伴手禮 / 土產', zh_p: 'bàn shǒu lǐ', en: 'Souvenir', en_p: '/ˌsuːvəˈnɪr/', ja: 'お土産', ja_p: 'omiyage', ko: '기념품 / 선물', ko_p: 'gi-nyeom-pum', note: '贈送親朋好友特定紀念特產' },
      { zh: '暢銷商品 / 熱賣', zh_p: 'chàng xiāo de', en: 'Best seller', en_p: '/best ˈselər/', ja: '売れ筋 / 人気商品', ja_p: 'uresuji', ko: '인기 상품', ko_p: 'in-gi sang-pum', note: '指點最暢銷招牌人氣款' },
      { zh: '新商品 / 新品', zh_p: 'xīn shāng pǐn', en: 'New arrivals', en_p: '/njuː əˈraɪvlz/', ja: '新商品 / 新作', ja_p: 'shinshōhin', ko: '신상품', ko_p: 'sin-sang-pum', note: '店內主打現發流行季度新品' },
      { zh: '免稅店', zh_p: 'miǎn shuì diàn', en: 'Duty-free shop', en_p: '/ˈduːti friː/', ja: '免税店', ja_p: 'menzeitene', ko: '면세점', ko_p: 'myeon-se-jeom', note: '免徵收部分國家關稅之店鋪' },
      { zh: '折扣特賣', zh_p: 'zhé kòu', en: 'On sale', en_p: '/ɑːn seɪl/', ja: 'セール中 / 割引', ja_p: 'sēru', ko: '할인 / 세일', ko_p: 'hal-in', note: '換季或狂歡季折扣宣傳標識' },
      { zh: '特價', zh_p: 'tè jià', en: 'Special price', en_p: '/ˈspeʃl praɪs/', ja: '特別価格 / 特価', ja_p: 'tokka', ko: '특가', ko_p: 'teuk-ga', note: '限期絕好康特賣價位' },
      { zh: '保固期', zh_p: 'bǎo gù qi', en: 'Warranty', en_p: '/ˈwɔːrənti/', ja: '保証 / 保証期間', ja_p: 'hoshō', ko: '보증 기간', ko_p: 'bo-jeung', note: '電子硬體售後維修質保保障' },
      { zh: '二手 / 古著', zh_p: 'èr shǒu', en: 'Second-hand / Thrifted', en_p: '/ˈsekənd hænd/', ja: '中古 / 古着 (ヴィンテージ)', ja_p: 'chūko / furugi', ko: '중고', ko_p: 'jung-go', note: '復古愛好者淘金街舊貨' }
    ]
  },
  {
    category: '交通出行與問路 (Transportation & Navigation)',
    items: [
      { zh: '機場', zh_p: 'jī chǎng', en: 'Airport', en_p: '/ˈerpɔːrt/', ja: '空港', ja_p: 'kūkō', ko: '공항', ko_p: 'gong-hang', note: '出入境空中客運與貨運網點' },
      { zh: '地鐵站 / 車站', zh_p: 'dì tiě zhàn', en: 'Subway station', en_p: '/ˈsʌbweɪ ˈsteɪʃn/', ja: '駅 (地下鉄の駅)', ja_p: 'eki', ko: '역 (지하철역)', ko_p: 'yeok', note: '地下鐵路城市軌道節點' },
      { zh: '公車 / 巴士', zh_p: 'gōng chē', en: 'Bus', en_p: '/bʌs/', ja: 'バス', ja_p: 'basu', ko: '버스', ko_p: 'beo-seu', note: '地面聯營市區短駁大巴' },
      { zh: '計程車', zh_p: 'jì chéng chē', en: 'Taxi', en_p: '/ˈtæksi/', ja: 'タクシー', ja_p: 'takushī', ko: '택시', ko_p: 'taek-si', note: '打錶計程載客小客車' },
      { zh: '車票 / 門票', zh_p: 'piào', en: 'Ticket', en_p: '/ˈtɪkɪt/', ja: '切符 / チケット', ja_p: 'kippu / chiketto', ko: '표 / 티켓', ko_p: 'pyo / ti-ket', note: '准予搭乘或進入觀光區之實體驗證券' },
      { zh: '在哪裡', zh_p: 'zài nǎ lǐ', en: 'Where is...', en_p: '/wer ɪz/', ja: '〜はどこですか', ja_p: 'doko desu ka', ko: '어디에 있어요', ko_p: 'eo-di-e i-sseo-yo', note: '迷失方向時開口尋求方位' },
      { zh: '直走 / 向前走', zh_p: 'zhí zǒu', en: 'Go straight', en_p: '/ɡoʊ streɪt/', ja: 'まっすぐ進む', ja_p: 'massugu susumu', ko: '똑바로 가세요', ko_p: 'ttok-ba-ro ga-se-yo', note: '朝著眼神正前方直行' },
      { zh: '火車 / 鐵路', zh_p: 'huǒ chē', en: 'Train', en_p: '/treɪn/', ja: '電車 / 列車', ja_p: 'densha / ressha', ko: '기차', ko_p: 'gi-cha', note: '城市洲際高鐵或大容量火車' },
      { zh: '售票處', zh_p: 'shòu piào chù', en: 'Ticket office', en_p: '/ˈtɪkɪt ˈɔːfɪs/', ja: 'きっぷ売り場', ja_p: 'kippu uriba', ko: '매표소', ko_p: 'mae-pyo-so', note: '購買車票或轉票之窗口' },
      { zh: '右轉', zh_p: 'yòu zhuǎn', en: 'Turn right', en_p: '/tɜːrn raɪt/', ja: '右に曲がります', ja_p: 'migi ni magaru', ko: '우회전 하세요', ko_p: 'u-hoe-jeon', note: '指示朝向右方' },
      { zh: '左轉', zh_p: 'zuǒ zhuǎn', en: 'Turn left', en_p: '/tɜːrn left/', ja: '左に曲がります', ja_p: 'hidari ni magaru', ko: '좌회전 하세요', ko_p: 'jwa-hoe-jeon', note: '指示朝向左方' },
      { zh: '入口位置', zh_p: 'rù kǒu', en: 'Entrance', en_p: '/ˈentrəns/', ja: '入り口', ja_p: 'iriguchi', ko: '입구', ko_p: 'ip-gu', note: '通往建築內部通路' },
      { zh: '出口位置', zh_p: 'chū kǒu', en: 'Exit', en_p: '/ˈeɡzɪt/', ja: '出口', ja_p: 'deguchi', ko: '출구', ko_p: 'chul-gu', note: '通往室外大路通道' },
      { zh: '地圖指南', zh_p: 'dì tú', en: 'Map', en_p: '/mæp/', ja: '地図', ja_p: 'chizu', ko: '지도', ko_p: 'ji-do', note: '引路與定位之參考書' },
      { zh: '高鐵 / 動車', zh_p: 'gāo tiě', en: 'High-speed rail', en_p: '/reɪl/', ja: '新幹線', ja_p: 'shinkansen', ko: '고속열차 (KTX)', ko_p: 'go-sok-yeol-cha', note: '高流速中長途鐵道大動脈' },
      { zh: '登機門 / 登機口', zh_p: 'dēng jī kǒu', en: 'Gate', en_p: '/ɡeɪt/', ja: '搭乗口 / ゲート', ja_p: 'tōjōguchi', ko: '탑승구 / 게이트', ko_p: 'tap-seung-gu', note: '候機大廳通往飛機口' },
      { zh: '行李託運', zh_p: 'xíng li tuō yùn', en: 'Baggage check-in', en_p: '/ˈbæɡɪdʒ/', ja: '手荷物預け入れ', ja_p: 'tenimotsu azuke', ko: '수하물 위탁', ko_p: 'su-ha-mul wi-tak', note: '值機櫃檯稱重託運重箱' },
      { zh: '登機證 / 機票', zh_p: 'dēng jī pái', en: 'Boarding pass', en_p: '/ˈbɔːrdɪŋ/', ja: '搭乗券', ja_p: 'tōjōken', ko: '탑승권', ko_p: 'tap-seung-gwon', note: '手持過安檢通往登機口憑證' },
      { zh: '火車站 / 列車站', zh_p: 'huǒ chē zhàn', en: 'Train station', en_p: '/steɪʃn/', ja: '駅 / 鉄道駅', ja_p: 'eki', ko: '기차역', ko_p: 'gi-cha-yeok', note: '城際軌道站點大堂' },
      { zh: '巴士站牌 / 候車亭', zh_p: 'gōng chē zhàn', en: 'Bus stop', en_p: '/bʌs stɑːp/', ja: 'バス停', ja_p: 'basutei', ko: '버스 정류장', ko_p: 'beo-seu jeong-ryu-jang', note: '市內公車等候指定地標' },
      { zh: '月台 / 站台', zh_p: 'yuè tái', en: 'Platform', en_p: '/ˈplætfɔːrm/', ja: 'プラットホーム / のりば', ja_p: 'purattohōmu', ko: '플랫폼 / 승강장', ko_p: 'peul-raet-pom', note: '等候列車安全跨越線上' },
      { zh: '時間表 / 時刻表', zh_p: 'shí kè biǎo', en: 'Timetable', en_p: '/ˈtaɪmteɪbl/', ja: '時刻表', ja_p: 'jikokuhyo', ko: '시간표', ko_p: 'si-gan-pyo', note: '掌握發車與班次到達清單' },
      { zh: '班機延誤', zh_p: 'yán wù', en: 'Delayed', en_p: '/dɪˈleɪd/', ja: '遅延 / 遅れ', ja_p: 'chien', ko: '지연 / 연착', ko_p: 'ji-yeon', note: '天氣異常導致車輛班機延遲' },
      { zh: '準時 / 正常發車', zh_p: 'zhǔn shí', en: 'On time', en_p: '/ɑːn taɪm/', ja: '定刻 / オンタイム', ja_p: 'teikoku', ko: '제시간 / 정시', ko_p: 'jeong-si', note: '按正常時間運作出發' },
      { zh: '悠遊卡 / 交通卡', zh_p: 'jiāo tōng kǎ', en: 'Transit card', en_p: '/ˈtrænzɪt kɑːrd/', ja: '交通系ICカード', ja_p: 'kōtsūkei IC kādo', ko: '교통카드', ko_p: 'gyo-tong-ka-deu', note: '感應扣款乘車小卡' },
      { zh: '加值 / 充值', zh_p: 'chōng zhí', en: 'Top up / Charge', en_p: '/tɑːp ʌp/', ja: 'チャージする', ja_p: 'chāji', ko: '충전', ko_p: 'chung-jeon', note: '給交通IC卡充入資金餘額' },
      { zh: '單程票', zh_p: 'dān chéng piào', en: 'One-way ticket', en_p: '/wʌn weɪ/', ja: '片道切符', ja_p: 'katamichi kippu', ko: '편도 티켓', ko_p: 'pyeon-do', note: '單次進站出站乘車單據' },
      { zh: '往返票 / 來回票', zh_p: 'wǎng fǎn piào', en: 'Round-trip ticket', en_p: '/raʊnd trɪp/', ja: '往復切符', ja_p: 'ōfuku kippu', ko: '왕복 티켓', ko_p: 'wang-bok', note: '包含回程全包大程車票' },
      { zh: '司機 / 駕駛員', zh_p: 'sī jī', en: 'Driver', en_p: '/ˈdraɪvər/', ja: '運転手 / ドライバー', ja_p: 'untenshu', ko: '운전기사', ko_p: 'un-jeon-gi-sa', note: '掌控行進方向盤靈魂人物' },
      { zh: '在哪買票', zh_p: 'nǎ lǐ mǎi piào', en: 'Where to buy tickets?', en_p: '/wer tuː baɪ/', ja: '切符はどこで買えますか', ja_p: 'kippu wa doko de kaemasu ka', ko: '표는 어디서 사요?', ko_p: 'pyo-neun eo-di-seo sa-yo?', note: '尋找合規買票通路問詢' }
    ]
  },
  {
    category: '住宿與客房服務 (Accommodation)',
    items: [
      { zh: '飯店 / 酒店', zh_p: 'fàn diàn', en: 'Hotel', en_p: '/hoʊˈtɛl/', ja: 'ホテル', ja_p: 'hoteru', ko: '호텔', ko_p: 'ho-tel', note: '供客旅有償住宿之地' },
      { zh: '辦理入住登記', zh_p: 'bàn lǐ rù zhù', en: 'Check-in', en_p: '/ˈtʃek ɪn/', ja: 'チェックインお願いします', ja_p: 'chekkuin', ko: '체크인할게요', ko_p: 'che-keu-in', note: '向櫃檯登記分配卡片與出示證件' },
      { zh: '辦理退房手續', zh_p: 'tuì fáng', en: 'Check-out', en_p: '/ˈtʃek aʊt/', ja: 'チェックアウトします', ja_p: 'chekkuauto', ko: '체크아웃할게요', ko_p: 'che-keu-a-ut', note: '返還門卡、結清雜項費用' },
      { zh: '房間鑰匙 / 房卡', zh_p: 'fáng kǎ', en: 'Room Key', en_p: '/ruːm kiː/', ja: '鍵 (カードキー)', ja_p: 'kagi', ko: '방 열쇠 (카드키)', ko_p: 'bang yeol-soe', note: '感應開鎖或插卡供電' },
      { zh: '免費無線網路', zh_p: 'wú xiàn wǎng lù', en: 'Wi-Fi', en_p: '/ˈwaɪ faɪ/', ja: 'Wi-Fi (ワイファイ)', ja_p: 'waifai', ko: '와이파이', ko_p: 'wa-i-pa-i', note: '高速上網通訊服務' },
      { zh: '乾淨毛巾', zh_p: 'máo jīn', en: 'Towel', en_p: '/ˈtaʊəl/', ja: 'タオル', ja_p: 'taoru', ko: '수건', ko_p: 'su-geon', note: '擦乾身體吸水毛料織物' },
      { zh: '寄存行李', zh_p: 'jì fàng xíng li', en: 'Luggage storage', en_p: '/ˈlʌɡɪdʒ ˈstɔːrɪdʒ/', ja: '手荷物預かり', ja_p: 'nimotsu azukari', ko: '짐 보관 서비스', ko_p: 'jim bo-gwan', note: '出發前將重型箱子放櫃檯託管' },
      { zh: '吹風機', zh_p: 'chuī fēng jī', en: 'Hair dryer', en_p: '/her ˈdraɪər/', ja: 'ドライヤー', ja_p: 'doraiyā', ko: '헤어드라이어', ko_p: 'he-eo-deu-ra-i-eo', note: '出風乾髮電器設備' },
      { zh: '熱水供應', zh_p: 'rè shuǐ', en: 'Hot water', en_p: '/hɑːt ˈwɔːtər/', ja: 'お湯', ja_p: 'oyu', ko: '온수 / 뜨거운 물', ko_p: 'on-su', note: '深夜沐浴防著涼熱水' },
      { zh: '冷氣 / 空調控制器', zh_p: 'lěng qì', en: 'Air conditioning', en_p: '/ˈer kəndɪʃənɪŋ/', ja: 'エアコン', ja_p: 'eakon', ko: '에어컨', ko_p: 'e-eo-keon', note: '調節酷暑嚴冬氣溫' },
      { zh: '含早餐嗎', zh_p: 'zǎo cān', en: 'Breakfast included', en_p: '/ˈbrekfəst/', ja: '朝食付きですか', ja_p: 'chōshoku', ko: '아침 식사 포함인가요', ko_p: 'a-chim-sik-sa', note: '詢問房費是否涵蓋晨膳' },
      { zh: '打掃清理客房', zh_p: 'dǎ sǎo kè fáng', en: 'Please clean my room', en_p: '/ruːm ˈkliːnɪŋ/', ja: '部屋のお掃除をおねがいします', ja_p: 'heya no sōji', ko: '방 청소 부탁드려요', ko_p: 'bang cheong-so', note: '在門口掛上請即清理指示牌' },
      { zh: '有空房間嗎', zh_p: 'yǒu kòng fáng ma', en: 'Do you have vacant rooms?', en_p: '/ˈveɪkənt/', ja: '空いている部屋はありますか', ja_p: 'aiteiru heya', ko: '빈 방이 있어요?', ko_p: 'bin bang-i', note: '無預約直接現場詢問空宿' },
      { zh: '櫃檯接待處', zh_p: 'guì tái', en: 'Reception / Front desk', en_p: '/rɪˈsepʃn/', ja: 'フロント', ja_p: 'furonto', ko: '프런트 데스크', ko_p: 'peu-reon-teu', note: '解答萬難之第一站大堂前台' },
      { zh: '大廳 / 休息區', zh_p: 'dà tīng', en: 'Lobby', en_p: '/ˈlɑːbi/', ja: 'ロビー', ja_p: 'robī', ko: '로비', ko_p: 'ro-bi', note: '集合或等候朋友大堂空地' },
      { zh: '電梯', zh_p: 'diàn tī', en: 'Elevator', en_p: '/ˈelɪveɪtər/', ja: 'エレベーター', ja_p: 'erebētā', ko: '엘리베이터', ko_p: 'el-ri-be-i-teo', note: '高樓層直上垂直升降艙' },
      { zh: '健身房', zh_p: 'jiàn shēn fáng', en: 'Gym / Fitness center', en_p: '/dʒɪm/', ja: 'フィットネスジム', ja_p: 'fittonesu jimu', ko: '피트니스 센터 (헬스장)', ko_p: 'pil-reul', note: '維持旅程體魄必備跑台' },
      { zh: '游泳池', zh_p: 'yóu yǒng chí', en: 'Swimming pool', en_p: '/puːl/', ja: 'プール', ja_p: 'pūru', ko: '수영장', ko_p: 'su-yeong-jang', note: '夏日飯店水療設施' },
      { zh: '單人床房', zh_p: 'dān rén fáng', en: 'Single room', en_p: '/ˈsɪŋɡl/', ja: 'シングルルーム', ja_p: 'shinguru rūmu', ko: '싱글룸 (1인실)', ko_p: 'sing-geul-rum', note: '個人獨旅標準單鋪客宿' },
      { zh: '雙人床房', zh_p: 'shuāng rén fáng', en: 'Double room / Twin room', en_p: '/ˈdʌbl/', ja: 'ダブルルーム / ツインルーム', ja_p: 'daburu', ko: '더블룸 (2인실)', ko_p: 'deo-beul-rum', note: '情侶或家屬雙鋪型套間' },
      { zh: '客房服務', zh_p: 'kè fáng fú wù', en: 'Room service', en_p: '/ruːm ˈsɜːrvɪs/', ja: 'ルームサービス', ja_p: 'rūmu sābisu', ko: '룸서비스', ko_p: 'rum-seo-bi-seu', note: '在房內打電話叫餐點上樓' },
      { zh: '預約確認', zh_p: 'yù yuē', en: 'Reservation', en_p: '/ˌrezərˈveɪʃn/', ja: '予約 / ご予約確認', ja_p: 'yoyaku', ko: '예약 확인', ko_p: 'ye-yak', note: '出示條碼或姓名找回預訂單' },
      { zh: '枕頭', zh_p: 'zhěn tou', en: 'Pillow', en_p: '/ˈpɪloʊ/', ja: '枕', ja_p: 'makura', ko: '베개', ko_p: 'be-gae', note: '調整睡眠高度軟墊枕' },
      { zh: '被子 / 毛毯', zh_p: 'bèi zi', en: 'Blanket / Duvet', en_p: '/ˈblæŋkɪt/', ja: '毛布 / かけ布団', ja_p: 'mōfu', ko: '이불 / 담요', ko_p: 'i-bul', note: '睡眠防寒覆蓋被毯' },
      { zh: '衣架', zh_p: 'yī jià', en: 'Hanger', en_p: '/ˈhæŋər/', ja: 'ハンガー', ja_p: 'hangā', ko: '옷걸이', ko_p: 'ot-geol-i', note: '高檔風衣晾掛架' },
      { zh: '拖鞋', zh_p: 'tuō xié', en: 'Slippers', en_p: '/ˈslɪpərz/', ja: 'スリッパ', ja_p: 'surippa', ko: '슬리퍼', ko_p: 'seul-ri-peo', note: '解除腳部疲勞紙質或塑料拖鞋' },
      { zh: '牙刷牙膏', zh_p: 'yá shuā', en: 'Toothbrush and toothpaste', en_p: '/ˈtuːθbrʌʃ/', ja: '歯ブラシと歯磨き粉', ja_p: 'haburashi', ko: '칫솔과 치약', ko_p: 'chit-sol', note: '洗漱美白齒齦潔用工具' },
      { zh: '保險箱', zh_p: 'bǎo xiǎn xiāng', en: 'Safe box', en_p: '/seɪf/', ja: '金庫 / セーフティボックス', ja_p: 'kinko', ko: '금고', ko_p: 'geum-go', note: '保存貴重鑽戒或現鈔密碼箱' },
      { zh: '喚醒服務', zh_p: 'jiào xǐng fú wù', en: 'Wake-up call', en_p: '/weɪk ʌp/', ja: 'モーニングコール', ja_p: 'mōningu kōru', ko: '모닝콜', ko_p: 'mo-ning-kol', note: '預定櫃檯明晨來電振鈴防睡過頭' },
      { zh: '插座 / 電壓轉換器', zh_p: 'chā zuò', en: 'Socket / Adapter', en_p: '/əˈdæptər/', ja: 'コンセント / アダプター', ja_p: 'konsento', ko: '콘센트 / 어댑터', ko_p: 'kon-sen-teu', note: '轉換各國電器插孔媒介' }
    ]
  },
  {
    category: '緊急求助與救護 (Emergency & Health)',
    items: [
      { zh: '請幫幫我', zh_p: 'qǐng bāng bāng wǒ', en: 'Help me please', en_p: '/help miː pliːz/', ja: '助けてください', ja_p: 'tasukete kudasai', ko: '도와주세요', ko_p: 'do-wa-ju-se-yo', note: '身處大危難危險關頭高呼求生' },
      { zh: '警察局 / 警署', zh_p: 'jǐng chá jú', en: 'Police station', en_p: '/pəˈliːs ˈsteɪʃn/', ja: '警察署 (交番)', ja_p: 'keisatsusho', ko: '경찰서', ko_p: 'gyeong-chal-seo', note: '治安維護報案與求助中心' },
      { zh: '醫院 / 門診', zh_p: 'yī yuàn', en: 'Hospital', en_p: '/ˈhɑːspɪtl/', ja: '病院', ja_p: 'byōin', ko: '병원', ko_p: 'byeong-won', note: '緊急病痛急救與門診指定點' },
      { zh: '藥局 / 藥店', zh_p: 'yào jú', en: 'Pharmacy', en_p: '/ˈfɑːrməsi/', ja: '薬局 (ドラッグストア)', ja_p: 'yakkyoku', ko: '약국', ko_p: 'yak-guk', note: '採購備用止瀉退燒止痛成藥' },
      { zh: '我弄丟了護照', zh_p: 'wǒ nòng diū le hù zhào', en: 'I lost my passport', en_p: '/aɪ lɔːst maɪ ˈpæspɔːrt/', ja: 'パスポートを無くしました', ja_p: 'pasupōto o nakushimashita', ko: '여권을 잃어버렸어요', ko_p: 'yeo-gwon-eul ireobeoryeosseoyo', note: '至境外派出所及辦事處報失重補' },
      { zh: '不舒服 / 肚子痛', zh_p: 'dù zi tòng', en: 'I am not feeling well', en_p: '/aɪ æm nɑːt ˈfiːlɪŋ wel/', ja: 'お腹が痛いです (体調が悪いです)', ja_p: 'onaka ga itai', ko: '배가 아파요 (몸이 아파요)', ko_p: 'bae-ga a-pa-yo', note: '明確指認痛楚以獲取對等藥劑' },
      { zh: '著火了 / 火災', zh_p: 'zháo huǒ le', en: 'Fire', en_p: '/ˈfaɪər/', ja: '火事です', ja_p: 'kaji desu', ko: '불이야', ko_p: 'bul-i-ya', note: '見到大火煙霧尖叫拉響防火閥' },
      { zh: '救護車請求', zh_p: 'jiù hù chē', en: 'Ambulance please', en_p: '/ˈæmbjələns/', ja: '救急車を呼んでください', ja_p: 'kyūkyūsha', ko: '구급차를 불러 주세요', ko_p: 'gu-geup-cha', note: '對急難昏厥病患呼叫醫用專車' },
      { zh: '醫藥 / 止痛藥', zh_p: 'yào', en: 'Medicine', en_p: '/ˈmedsn/', ja: 'お薬', ja_p: 'kusuri', ko: '약', ko_p: 'yak', note: '泛指用於醫療疾病的製劑' },
      { zh: '看醫生 / 醫師', zh_p: 'yī shēng', en: 'Doctor', en_p: '/ˈdɑːktər/', ja: 'お医者さん', ja_p: 'isha', ko: '의사', ko_p: 'ui-sa', note: '經核准之醫學專業診斷人士' },
      { zh: '非常危險', zh_p: 'wēi xiǎn', en: 'Danger', en_p: '/ˈdeɪndʒər/', ja: '危険 (あぶない)', ja_p: 'kiken', ko: '위험', ko_p: 'wi-heom', note: '警告即將有落石或坍塌風險' },
      { zh: '有小偷 / 搶劫', zh_p: 'tōu dōng xi', en: 'Thief / Robber', en_p: '/θiːf/', ja: '泥棒 / ひったくり', ja_p: 'dorobō', ko: '도둑 / 강도', ko_p: 'do-duk', note: '高呼阻止宵小賊盜侵吞財物' },
      { zh: '這裡有人暈倒了', zh_p: 'yūn dǎo', en: 'Someone passed out here', en_p: '/pæstd aʊt/', ja: '誰かが倒れました', ja_p: 'dareka ga taoremashita', ko: '여기 사람이 쓰러졌어요', ko_p: 'yeo-gisa-ra-mi sseu-reo-jyeo-sseo-yo', note: '有人突然昏厥提示救援' },
      { zh: '我迷路了', zh_p: 'wǒ mí lù le', en: 'I am lost', en_p: '/aɪ æm lɔːst/', ja: '道に迷いました', ja_p: 'michi ni mayoimashita', ko: '길을 잃었어요', ko_p: 'gi-reul i-reo-beo-ryeo-sseo-yo', note: '喪失坐標求助指明正道' },
      { zh: '我的包包不見了', zh_p: 'wǒ de bāo bāo bù jiàn le', en: 'My bag is missing', en_p: '/mɪsɪŋ/', ja: 'バッグを無くしました (盗まれました)', ja_p: 'baggu o nakushimashita', ko: '가방을 분실했어요', ko_p: 'ga-bang-eul bun-sil-ha-sseo-yo', note: '貴重錢包攜帶包丟失' },
      { zh: '緊急出口軌道', zh_p: 'jǐn jí chū kǒu', en: 'Emergency exit', en_p: '/ɪˈmɜːrdʒənsi/', ja: '非常口', ja_p: 'hijōguchi', ko: '비상구', ko_p: 'bi-sang-gu', note: '火警突發時疏散專用防煙門' },
      { zh: '感冒 / 著涼', zh_p: 'gǎn mào', en: 'I have a cold', en_p: '/koʊld/', ja: '風邪をひきました', ja_p: 'kaze o hikimashita', ko: '감기에 걸렸어요', ko_p: 'gam-gi-e geol-lyeo-sseo-yo', note: '冷氣太吹導致流涕咳喘' },
      { zh: '發燒 / 體溫升', zh_p: 'fā shāo', en: 'I have a fever', en_p: '/ˈfiːvər/', ja: '熱があります', ja_p: 'netsu ga arimasu', ko: '열이 나요', ko_p: 'yeol-i na-yo', note: '排查體溫指認發熱指數' },
      { zh: '頭痛欲裂', zh_p: 'tóu tòng', en: 'Headache', en_p: '/ˈhedeɪk/', ja: '頭痛がします', ja_p: 'zutsuu', ko: '두통이 있어요', ko_p: 'du-tong', note: '腦部神經疼痛訴苦' },
      { zh: '過敏反應 / 奇癢', zh_p: 'guò mǐn', en: 'Allergy', en_p: '/ˈælərdʒi/', ja: 'アレルギー反応', ja_p: 'arerugī', ko: '알레르기', ko_p: 'al-re-reu-gi', note: '攝入花生海鮮導致紅疹' },
      { zh: '繃帶 / 創可貼', zh_p: 'chuàng kǒu tiē', en: 'Bandage / Band-aid', en_p: '/ˈbændɪdʒ/', ja: '絆創膏 (バンドエイド)', ja_p: 'bansōkō', ko: '대역 / 대일밴드', ko_p: 'dae-il-baen-deu', note: '手指破皮止血貼紙' },
      { zh: '消毒酒精', zh_p: 'jiǔ jīng', en: 'Rubbing alcohol', en_p: '/ˈælkəhɔːl/', ja: '消毒用アルコール', ja_p: 'shōdoku', ko: '소독용 알코올', ko_p: 'so-dok-yong', note: '傷口清理防菌擦抹用品' },
      { zh: '大使館 / 領事館', zh_p: 'dà shǐ guǎn', en: 'Embassy', en_p: '/ˈembəsi/', ja: '大使館', ja_p: 'taishikan', ko: '대사관', ko_p: 'dae-sa-gwan', note: '海外公民遇到大難求救庇護地' },
      { zh: '我的手機不見了', zh_p: 'shǒu jī bú jiàn le', en: 'I lost my phone', en_p: '/foʊn/', ja: '携帯電話を無くしました', ja_p: 'keitai o nakushimashita', ko: '휴대폰을 잃어버렸어요', ko_p: 'hyu-dae-pon-eul', note: '通訊行動工具丟失尋起' },
      { zh: '不要碰我！', zh_p: 'bú yào pèng wǒ', en: 'Do not touch me!', en_p: '/tʌtʃ/', ja: '触らないでください！', ja_p: 'sawaranaide', ko: '만지지 마세요!', ko_p: 'man-ji-ji ma-se-yo!', note: '防備不軌侵犯強勢警告' },
      { zh: '走開 / 閃一邊去', zh_p: 'zǒu kāi', en: 'Go away!', en_p: '/əˈweɪ/', ja: 'あっちへ行ってください！', ja_p: 'acchi e itte', ko: '저리 가세요!', ko_p: 'jeo-ri ga-se-yo!', note: '喝退騷擾糾纏滋事分子' },
      { zh: '失火求救信號', zh_p: 'shī huǒ', en: 'SOS', en_p: '/es oʊ es/', ja: 'SOS / 救急信号', ja_p: 'esu-ō-esu', ko: '구조요청 (SOS)', ko_p: 'e-seu-o-e-seu', note: '極限求生國際通用摩斯訊號' },
      { zh: '安全避難所', zh_p: 'shū sàn shāi', en: 'Safe zone / Evacuation site', en_p: '/zoun/', ja: '避難所 (避難エリア)', ja_p: 'hinanjō', ko: '대피소', ko_p: 'dae-pi-so', note: '自然地震爆發時體育場避災點' }
    ]
  },
  {
    category: '實用時間與數字 (Time & Numbers)',
    items: [
      { zh: '今天', zh_p: 'jīn tiān', en: 'Today', en_p: '/təˈdeɪ/', ja: '今日', ja_p: 'kyō', ko: '오늘', ko_p: 'o-neul', note: '說話聲音當下的同一個白天' },
      { zh: '明天', zh_p: 'míng tiān', en: 'Tomorrow', en_p: '/təˈmɑːroʊ/', ja: '明日', ja_p: 'ashita', ko: '내일', ko_p: 'nae-il', note: '即將來到的下一天' },
      { zh: '現在幾點鐘', zh_p: 'xiàn zài jǐ diǎn', en: 'What time is it now', en_p: '/wɑːt taɪm ɪz ɪt naʊ/', ja: '今、何時ですか', ja_p: 'ima nanji desu ka', ko: '지금 몇 시예요', ko_p: 'ji-geum myeot si-ye-yo', note: '對時與查看行程進度' },
      { zh: '一個 / 數字一', zh_p: 'yī', en: 'One', en_p: '/wʌn/', ja: '一 (ひとつ)', ja_p: 'ichi / hitotsu', ko: '일 / 하나', ko_p: 'il / hana', note: '自然數基數單位起始' },
      { zh: '一百', zh_p: 'yī bǎi', en: 'One hundred', en_p: '/wʌn ˈhʌndrəd/', ja: '百', ja_p: 'hyaku', ko: '백', ko_p: 'baek', note: '三位數計量標定' },
      { zh: '一千', zh_p: 'yī qiān', en: 'One thousand', en_p: '/wʌn ˈθaʊznd/', ja: '千', ja_p: 'sen', ko: '천', ko_p: 'cheon', note: '四位數計量標定' },
      { zh: '一萬', zh_p: 'yī wàn', en: 'Ten thousand', en_p: '/ten ˈθaʊznd/', ja: '一万', ja_p: 'ichiman', ko: '만', ko_p: 'man', note: '東亞最常用萬元計數結構' },
      { zh: '昨天', zh_p: 'zuó tiān', en: 'Yesterday', en_p: '/ˈjestərdeɪ/', ja: '昨日', ja_p: 'kinō', ko: '어제', ko_p: 'eo-je', note: '剛逝去的前一天' },
      { zh: '小時 / 鐘頭時間', zh_p: 'xiǎo shí', en: 'Hour', en_p: '/ˈaʊər/', ja: '時間 (一時間)', ja_p: 'jikan', ko: '시간', ko_p: 'si-gan', note: '六十分鐘的標準時段' },
      { zh: '分鐘長度', zh_p: 'fēn zhōng', en: 'Minute', en_p: '/ˈmɪnɪt/', ja: '分', ja_p: 'fun', ko: '분', ko_p: 'bun', note: '六十秒的短段落結構' },
      { zh: '天 / 二十四小時日', zh_p: 'tiān', en: 'Day', en_p: '/deɪ/', ja: '日', ja_p: 'nichi', ko: '일 (날)', ko_p: 'il', note: '單日二十四小時流轉記錄' },
      { zh: '星期 / 一週週期', zh_p: 'xīng qī', en: 'Week', en_p: '/wiːk/', ja: '週 (曜日)', ja_p: 'shū', ko: '주 (주일)', ko_p: 'ju', note: '七日循環一次的考勤與生活規律' },
      { zh: '月份名稱', zh_p: 'yuè fèn', en: 'Month', en_p: '/mʌnθ/', ja: '月', ja_p: 'tsuki / gatsu', ko: '월 (달)', ko_p: 'wol', note: '四季季度遞移標籤月' },
      { zh: '前天', zh_p: 'qián tiān', en: 'The day before yesterday', en_p: '/ˌdeɪ bɪˈfɔːr/', ja: '一昨日', ja_p: 'ototoi', ko: '그저께', ko_p: 'geu-jeo-kke', note: '昨天之前的再前一天' },
      { zh: '後天', zh_p: 'hòu tiān', en: 'The day after tomorrow', en_p: '/ˈæftər/', ja: '明後日', ja_p: 'asatte', ko: '모레', ko_p: 'mo-re', note: '明天之後的再後一天' },
      { zh: '早上 / 晨間', zh_p: 'zǎo shang', en: 'Morning', en_p: '/ˈmɔːrnɪŋ/', ja: '朝', ja_p: 'asa', ko: '아침', ko_p: 'a-chim', note: '一日之計曙光乍現段' },
      { zh: '中午 / 正午時間', zh_p: 'zhōng wǔ', en: 'Noon', en_p: '/nuːn/', ja: '昼 (お昼)', ja_p: 'hiru', ko: '점심 (정오)', ko_p: 'jeom-sim', note: '烈日當空十二點前後' },
      { zh: '下午 / 晚半天', zh_p: 'xià wǔ', en: 'Afternoon', en_p: '/ˌæftərˈnuːn/', ja: '午後', ja_p: 'gogo', ko: '오후', ko_p: 'o-hu', note: '正午过后至黃昏交界段' },
      { zh: '晚上 / 夜晚', zh_p: 'wǎn shang', en: 'Evening / Night', en_p: '/ˈiːvnɪŋ/', ja: '夜 (晩)', ja_p: 'yoru', ko: '저녁 (밤)', ko_p: 'jeo-nyeok', note: '繁星密佈安息歇枕之夜' },
      { zh: '半夜 / 子夜', zh_p: 'bàn yè', en: 'Midnight', en_p: '/ˈmɪdnaɪt/', ja: '真夜中', ja_p: 'mayonaka', ko: '한밤중 (자정)', ko_p: 'han-bam-jung', note: '深夜零點幽暗之夜' },
      { zh: '秒鐘', zh_p: 'miǎo', en: 'Second', en_p: '/ˈsekənd/', ja: '秒', ja_p: 'byō', ko: '초', ko_p: 'cho', note: '轉瞬即逝計量基底秒' },
      { zh: '今年', zh_p: 'jīn nián', en: 'This year', en_p: '/jɪr/', ja: '今年', ja_p: 'kotoshi', ko: '올해', ko_p: 'ol-hae', note: '在此流年中' },
      { zh: '明年', zh_p: 'míng nián', en: 'Next year', en_p: '/nekst jɪr/', ja: '来年', ja_p: 'rainen', ko: '내년', ko_p: 'nae-nyeon', note: '下一次地球公轉流年' },
      { zh: '去年', zh_p: 'qù nián', en: 'Last year', en_p: '/læst jɪr/', ja: '去年', ja_p: 'kyonen', ko: '작년', ko_p: 'jang-nyeon', note: '已經翻過去的往年' },
      { zh: '數字二 / 兩個', zh_p: 'èr / liǎng', en: 'Two', en_p: '/tuː/', ja: '二 (ふたつ)', ja_p: 'ni / futatsu', ko: '이 / 둘', ko_p: 'i / dul', note: '自然數第二個基數' },
      { zh: '數字三', zh_p: 'sān', en: 'Three', en_p: '/θriː/', ja: '三 (みっつ)', ja_p: 'san / mittsu', ko: '삼 / 셋', ko_p: 'sam / set', note: '自然數第三個基數' },
      { zh: '數字五', zh_p: 'wǔ', en: 'Five', en_p: '/faɪv/', ja: '五 (いつつ)', ja_p: 'go / itsutsu', ko: '오 / 다섯', ko_p: 'o / da-seot', note: '自然數第五個基數' },
      { zh: '數字十', zh_p: 'shí', en: 'Ten', en_p: '/ten/', ja: '十 (とお)', ja_p: 'jū / tō', ko: '십 / 열', ko_p: 'sip / yeol', note: '雙位數計量整十基數' }
    ]
  }
];

export const GRAMMAR_DATA: GrammarPoint[] = [
  {
    title: '基礎句型結構',
    desc: '觀察主詞、動詞與受詞在不同語系句子中的排列順序。',
    languages: {
      zh: { name: '繁體中文', pattern: '主詞 [S] + 動詞 [V] + 受詞 [O]', example: '我 [S] 吃 [V] 蘋果 [O]', color: 'text-indigo-600' },
      en: { name: '英語', pattern: '主詞 [S] + 動詞 [V] + 受詞 [O]', example: 'I [S] eat [V] an apple [O]', color: 'text-blue-600' },
      ja: { name: '日本語', pattern: '主詞 [S] + 受詞 [O] + 動詞 [V]', example: '私 [S] は 🍎 [O] を 食べます [V]', color: 'text-rose-600' },
      ko: { name: '韓語', pattern: '主詞 [S] + 受詞 [O] + 動詞 [V]', example: '나 [S] 는 🍎 [O] 를 먹어요 [V]', color: 'text-emerald-600' }
    }
  },
  {
    title: '敬語與禮貌體系',
    desc: '不同語言表達對聽眾或他人的敬意或禮貌程度的形式變化。',
    languages: {
      zh: { name: '繁體中文', pattern: '簡明詞彙 (如以「您 / 你」區分)', example: '您好 vs 你好', color: 'text-indigo-605' },
      en: { name: '英語', pattern: '情境式助動詞 (如 Could you vs Can you)', example: 'Could you help me vs Can you help me', color: 'text-blue-600' },
      ja: { name: '日本語', pattern: '高度複雜敬語 (敬體 です/ます 與 常體 だ)', example: 'です/ます vs だ', color: 'text-rose-600' },
      ko: { name: '韓語', pattern: '系統化敬語 (敬稱尊言 해요 與 半語 해)', example: '해요 vs 해', color: 'text-emerald-600' }
    }
  },
  {
    title: '複數表達形式',
    desc: '表示複數或多個事物時，名詞與其修飾詞的結構對置關係。',
    languages: {
      zh: { name: '繁體中文', pattern: '名詞本體固定不變 (加修飾詞)', example: '很多蘋果 (名詞不隨數量變形)', color: 'text-indigo-600' },
      en: { name: '英語', pattern: '名詞字尾增加規則/非規則變化 (如加 "-s")', example: 'Apples (單數為 apple)', color: 'text-blue-600' },
      ja: { name: '日本語', pattern: '名詞本體固定不變規則', example: 'たくさんの林檎 (名詞字尾不隨之變形)', color: 'text-rose-600' },
      ko: { name: '韓語', pattern: '名詞字尾增加複數詞尾 "-deul (들)"', example: '사과들 (單數為 사과)', color: 'text-emerald-600' }
    }
  }
];
