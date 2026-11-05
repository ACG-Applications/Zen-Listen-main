// ==================== N5 SENTENCE DATA ====================
const sentencesData = [
  // ========== SPRINT 01: Time, Daily Routine (1-30) ==========
  {
    jp: "毎朝（まいあさ） 六時（ろくじ） に 起（お）きます",
    reading: "まいあさ ろくじ に おきます",
    translation: "Every morning I wake up at 6 o'clock.",
    grammarHint: "🎯 に = specific time"
  },
  {
    jp: "夜（よる） 十時（じゅうじ） に 寝（ね）ます",
    reading: "よる じゅうじ に ねます",
    translation: "I go to bed at 10 PM.",
    grammarHint: "🎯 に = time target"
  },
  {
    jp: "朝（あさ）ごはん を 食（た）べて から 歯（は） を 磨（みが）きます",
    reading: "あさごはん を たべて から は を みがきます",
    translation: "After eating breakfast, I brush my teeth.",
    grammarHint: "📘 〜てから = after doing"
  },
  {
    jp: "会社（かいしゃ） へ 八時（はちじ） に 行（い）きます",
    reading: "かいしゃ へ はちじ に いきます",
    translation: "I go to the office at 8 o'clock.",
    grammarHint: "🎯 へ = direction"
  },
  {
    jp: "友達（ともだち） と 図書館（としょかん） で 勉強（べんきょう）します",
    reading: "ともだち と としょかん で べんきょうします",
    translation: "I study at the library with my friend.",
    grammarHint: "📘 と = with | で = location"
  },
  {
    jp: "昨日（きのう） は 十時間（じゅうじかん） 働（はたら）きました",
    reading: "きのう は じゅうじかん はたらきました",
    translation: "Yesterday I worked for 10 hours.",
    grammarHint: "🎯 duration + past"
  },
  {
    jp: "今週（こんしゅう） の 日曜日（にちようび） に 映画（えいが） を 見（み）ます",
    reading: "こんしゅう の にちようび に えいが を みます",
    translation: "I'll watch a movie this Sunday.",
    grammarHint: "📘 の = link"
  },
  {
    jp: "私（わたし） の 家族（かぞく） は 両親（りょうしん） と 妹（いもうと） です",
    reading: "わたし の かぞく は りょうしん と いもうと です",
    translation: "My family is my parents and my younger sister.",
    grammarHint: "🎯 AとB = A and B"
  },
  {
    jp: "母（はは） は 野菜（やさい） を 切（き）り ながら 料理（りょうり）します",
    reading: "はは は やさい を きり ながら りょうりします",
    translation: "My mother cooks while cutting vegetables.",
    grammarHint: "📘 〜ながら = while"
  },
  {
    jp: "公園（こうえん） で 小（ちい）さい 犬（いぬ） を 見（み）ました",
    reading: "こうえん で ちいさい いぬ を みました",
    translation: "I saw a small dog in the park.",
    grammarHint: "🎯 で = location"
  },
  {
    jp: "この 町（まち） には 大（おお）きな 図書館（としょかん） が あります",
    reading: "この まち には おおきな としょかん が あります",
    translation: "There is a big library in this town.",
    grammarHint: "📘 には = existence location"
  },
  {
    jp: "新幹線（しんかんせん） は 速（はや）い です が 少（すこ）し 高（たか）い です",
    reading: "しんかんせん は はやい です が すこし たかい です",
    translation: "The Shinkansen is fast but a little expensive.",
    grammarHint: "🎯 いadj + が = but"
  },
  {
    jp: "駅（えき） で 切符（きっぷ） を 買（か）って 電車（でんしゃ） に 乗（の）ります",
    reading: "えき で きっぷ を かって でんしゃ に のります",
    translation: "I buy a ticket at the station and board the train.",
    grammarHint: "📘 〜て form = sequence"
  },
  {
    jp: "昨日（きのう） 雨（あめ） が 降（ふ）った ので 家（いえ） で 本（ほん） を 読（よ）みました",
    reading: "きのう あめ が ふった ので いえ で ほん を よみました",
    translation: "Because it rained yesterday, I read a book at home.",
    grammarHint: "🎯 〜ので = because"
  },
  {
    jp: "週末（しゅうまつ） は 何（なに） を します か",
    reading: "しゅうまつ は なに を します か",
    translation: "What do you do on weekends?",
    grammarHint: "📘 か = question"
  },
  {
    jp: "よく 音楽（おんがく） を 聞（き）き ながら 散歩（さんぽ）します",
    reading: "よく おんがく を きき ながら さんぽします",
    translation: "I often take a walk while listening to music.",
    grammarHint: "🎯 〜ながら = simultaneous"
  },
  {
    jp: "夏（なつ） は 冷（つめ）たい アイスクリーム が 一番（いちばん） 好（す）き です",
    reading: "なつ は つめたい あいすくりーむ が いちばん すき です",
    translation: "In summer, I like cold ice cream the most.",
    grammarHint: "📘 が marks like"
  },
  {
    jp: "毎日（まいにち） コーヒー を 二杯（にはい） 飲（の）みます",
    reading: "まいにち こーひー を にはい のみます",
    translation: "I drink two cups of coffee every day.",
    grammarHint: "🎯 counter 二杯"
  },
  {
    jp: "鍵（かぎ） を 忘（わす）れた ので 部屋（へや） に 入（はい）れません",
    reading: "かぎ を わすれた ので へや に はいれません",
    translation: "I forgot my key, so I can't enter the room.",
    grammarHint: "📘 〜ので reason"
  },
  {
    jp: "この 料理（りょうり） は 少（すこ）し 辛（から）い です が 美味（おい）しい です",
    reading: "この りょうり は すこし からい です が おいしい です",
    translation: "This dish is a little spicy but delicious.",
    grammarHint: "🎯 contrast が"
  },
  {
    jp: "先週（せんしゅう） 友達（ともだち） に 誕生日（たんじょうび）プレゼント を もらいました",
    reading: "せんしゅう ともだち に たんじょうび ぷれぜんと を もらいました",
    translation: "Last week I got a birthday present from my friend.",
    grammarHint: "📘 〜に + もらう = receive from"
  },
  {
    jp: "図書館（としょかん） の 前（まえ） に 郵便局（ゆうびんきょく） が あります",
    reading: "としょかん の まえ に ゆうびんきょく が あります",
    translation: "In front of the library, there is a post office.",
    grammarHint: "🎯 の + 前 = in front of"
  },
  {
    jp: "日本語（にほんご） の 授業（じゅぎょう） は 楽（たの）しい です",
    reading: "にほんご の じゅぎょう は たのしい です",
    translation: "Japanese class is fun.",
    grammarHint: "📘 の = noun linker"
  },
  {
    jp: "銀行（ぎんこう） まで 歩（ある）いて 十分（じゅっぷん） です",
    reading: "ぎんこう まで あるいて じゅっぷん です",
    translation: "It's a 10-minute walk to the bank.",
    grammarHint: "🎯 まで = up to"
  },
  {
    jp: "明日（あした） 試験（しけん） が ある ので 今晩（こんばん） 勉強（べんきょう）します",
    reading: "あした しけん が ある ので こんばん べんきょうします",
    translation: "I have an exam tomorrow, so I'll study tonight.",
    grammarHint: "📘 〜ので = because"
  },
  {
    jp: "スーパー で 肉（にく） と 魚（さかな） を 買（か）いました",
    reading: "すーぱー で にく と さかな を かいました",
    translation: "I bought meat and fish at the supermarket.",
    grammarHint: "🎯 で = place"
  },
  {
    jp: "子供（こども） の 頃（ころ） よく 川（かわ） で 泳（およ）ぎました",
    reading: "こども の ころ よく かわ で およぎました",
    translation: "When I was a child, I often swam in the river.",
    grammarHint: "📘 の頃 = around the time"
  },
  {
    jp: "彼女（かのじょ） は 赤（あか）い 車（くるま） を 持（も）っています",
    reading: "かのじょ は あかい くるま を もっています",
    translation: "She has a red car.",
    grammarHint: "🎯 持っています = has"
  },
  {
    jp: "飲（の）み物（もの） を 買（か）い に コンビニ へ 行（い）きます",
    reading: "のみもの を かい に こんびに へ いきます",
    translation: "I go to the convenience store to buy a drink.",
    grammarHint: "📘 〜に + 行く = go to do"
  },
  {
    jp: "この レストラン は 値段（ねだん） が 高（たか）い です が とても 人気（にんき） です",
    reading: "この れすとらん は ねだん が たかい です が とても にんき です",
    translation: "This restaurant is expensive but very popular.",
    grammarHint: "🎯 が + adjective"
  },

  // ========== SPRINT 02: Family & People (31-55) ==========
  {
    jp: "私（わたし） の 父（ちち） は 医者（いしゃ） です",
    reading: "わたし の ちち は いしゃ です",
    translation: "My father is a doctor.",
    grammarHint: "📘 の = possession"
  },
  {
    jp: "母（はは） は 毎朝（まいあさ） 新聞（しんぶん） を 読（よ）みます",
    reading: "はは は まいあさ しんぶん を よみます",
    translation: "My mother reads the newspaper every morning.",
    grammarHint: "🎯 を = direct object"
  },
  {
    jp: "兄（あに） は 大学（だいがく） で 英語（えいご） を 勉強（べんきょう）しています",
    reading: "あに は だいがく で えいご を べんきょうしています",
    translation: "My older brother is studying English at university.",
    grammarHint: "📘 〜ています = currently doing"
  },
  {
    jp: "妹（いもうと） は 小（ちい）さい 時（とき） から ピアノ を 弾（ひ）きます",
    reading: "いもうと は ちいさい とき から ぴあの を ひきます",
    translation: "My younger sister has played piano since she was small.",
    grammarHint: "🎯 〜から = since"
  },
  {
    jp: "祖父（そふ） と 祖母（そぼ） は 田舎（いなか） に 住（す）んでいます",
    reading: "そふ と そぼ は いなか に すんでいます",
    translation: "My grandparents live in the countryside.",
    grammarHint: "📘 AとB = A and B"
  },
  {
    jp: "叔父（おじ）さん は 車（くるま） で 会社（かいしゃ） へ 行（い）きます",
    reading: "おじさん は くるま で かいしゃ へ いきます",
    translation: "My uncle goes to the office by car.",
    grammarHint: "🎯 で = means"
  },
  {
    jp: "従兄弟（いとこ） は 来年（らいねん） 結婚（けっこん）します",
    reading: "いとこ は らいねん けっこんします",
    translation: "My cousin will get married next year.",
    grammarHint: "📘 来年 = next year"
  },
  {
    jp: "新（あたら）しい 隣人（りんじん） は とても 親切（しんせつ） です",
    reading: "あたらしい りんじん は とても しんせつ です",
    translation: "The new neighbor is very kind.",
    grammarHint: "🎯 い-adjective + noun"
  },
  {
    jp: "彼（かれ） は 毎日（まいにち） 一時間（いちじかん） 日本語（にほんご） を 練習（れんしゅう）します",
    reading: "かれ は まいにち いちじかん にほんご を れんしゅうします",
    translation: "He practices Japanese for one hour every day.",
    grammarHint: "📘 duration + を + verb"
  },
  {
    jp: "彼女（かのじょ） は 綺麗（きれい）な 声（こえ） で 歌（うた）います",
    reading: "かのじょ は きれいな こえ で うたいます",
    translation: "She sings with a beautiful voice.",
    grammarHint: "🎯 な-adjective + な + noun"
  },
  {
    jp: "赤（あか）ちゃん は 今（いま） 寝（ね）ています",
    reading: "あかちゃん は いま ねています",
    translation: "The baby is sleeping now.",
    grammarHint: "📘 〜ています = present continuous"
  },
  {
    jp: "先生（せんせい） は 学生（がくせい） に 宿題（しゅくだい） を 出（だ）しました",
    reading: "せんせい は がくせい に しゅくだい を だしました",
    translation: "The teacher gave homework to the students.",
    grammarHint: "🎯 〜に + 出す = give to"
  },
  {
    jp: "友達（ともだち） と 一緒（いっしょ） に ご飯（はん） を 食（た）べました",
    reading: "ともだち と いっしょ に ごはん を たべました",
    translation: "I ate a meal together with my friend.",
    grammarHint: "📘 と一緒に = together with"
  },
  {
    jp: "同僚（どうりょう） は 風邪（かぜ） を 引（ひ）いて 会社（かいしゃ） を 休（やす）みました",
    reading: "どうりょう は かぜ を ひいて かいしゃ を やすみました",
    translation: "My colleague caught a cold and took a day off work.",
    grammarHint: "🎯 〜て + verb = sequence"
  },
  {
    jp: "店員（てんいん）さん は 親切（しんせつ） に 説明（せつめい）して くれました",
    reading: "てんいんさん は しんせつ に せつめいして くれました",
    translation: "The clerk kindly explained for me.",
    grammarHint: "📘 〜てくれる = someone does for me"
  },
  {
    jp: "隣（となり） の 人（ひと） は 毎晩（まいばん） 遅（おそ）く まで 起（お）きています",
    reading: "となり の ひと は まいばん おそく まで おきています",
    translation: "The neighbor stays up late every night.",
    grammarHint: "🎯 まで = until"
  },
  {
    jp: "娘（むすめ） は 学校（がっこう） で 友達（ともだち） を 待（ま）ちます",
    reading: "むすめ は がっこう で ともだち を まちます",
    translation: "My daughter waits for her friend at school.",
    grammarHint: "📘 で = location"
  },
  {
    jp: "息子（むすこ） は 野球（やきゅう） が 好（す）き です",
    reading: "むすこ は やきゅう が すき です",
    translation: "My son likes baseball.",
    grammarHint: "🎯 が = likes/dislikes"
  },
  {
    jp: "両親（りょうしん） は 旅行（りょこう） が 大好（だいす）き です",
    reading: "りょうしん は りょこう が だいすき です",
    translation: "My parents love traveling.",
    grammarHint: "📘 大好き = love"
  },
  {
    jp: "赤（あか）ちゃん が 泣（な）いている の を 聞（き）きました",
    reading: "あかちゃん が ないている の を ききました",
    translation: "I heard a baby crying.",
    grammarHint: "🎯 〜ているのを聞く = hear someone doing"
  },
  {
    jp: "彼（かれ） は とても 真面目（まじめ）な 人間（にんげん） です",
    reading: "かれ は とても まじめな にんげん です",
    translation: "He is a very serious person.",
    grammarHint: "📘 な-adjective modifies nouns"
  },
  {
    jp: "子供（こども）たち は 公園（こうえん） で 遊（あそ）んでいます",
    reading: "こどもたち は こうえん で あそんでいます",
    translation: "The children are playing in the park.",
    grammarHint: "🎯 たち = plural suffix"
  },
  {
    jp: "祖母（そぼ） は いつも 笑顔（えがお） で 話（はな）します",
    reading: "そぼ は いつも えがお で はなします",
    translation: "My grandmother always speaks with a smile.",
    grammarHint: "📘 で = means/state"
  },
  {
    jp: "兄（あに） は 私（わたし） より 背（せ） が 高（たか）い です",
    reading: "あに は わたし より せ が たかい です",
    translation: "My older brother is taller than me.",
    grammarHint: "🎯 より = than"
  },

  // ========== SPRINT 03: Location, Direction, Transport (56-80) ==========
  {
    jp: "駅（えき） は どこ です か",
    reading: "えき は どこ です か",
    translation: "Where is the station?",
    grammarHint: "📘 どこ = where"
  },
  {
    jp: "右（みぎ） に 曲（ま）がって 直進（ちょくしん）して ください",
    reading: "みぎ に まがって ちょくしんして ください",
    translation: "Turn right and go straight.",
    grammarHint: "🎯 〜てください = please do"
  },
  {
    jp: "交差点（こうさてん） を 渡（わた）って 左（ひだり） です",
    reading: "こうさてん を わたって ひだり です",
    translation: "Cross the intersection and it's on the left.",
    grammarHint: "📘 を渡る = cross"
  },
  {
    jp: "銀行（ぎんこう） は スーパー の 隣（となり） に あります",
    reading: "ぎんこう は すーぱー の となり に あります",
    translation: "The bank is next to the supermarket.",
    grammarHint: "🎯 の隣 = next to"
  },
  {
    jp: "図書館（としょかん） は 学校（がっこう） の 向（む）かい です",
    reading: "としょかん は がっこう の むかい です",
    translation: "The library is across from the school.",
    grammarHint: "📘 の向かい = opposite"
  },
  {
    jp: "郵便局（ゆうびんきょく） は 角（かど） を 曲（ま）がった 所（ところ） に あります",
    reading: "ゆうびんきょく は かど を まがった ところ に あります",
    translation: "The post office is around the corner.",
    grammarHint: "🎯 た-form + ところ = place where"
  },
  {
    jp: "バス停（てい） まで 歩（ある）いて 五分（ごふん） です",
    reading: "ばすてい まで あるいて ごふん です",
    translation: "It's a five-minute walk to the bus stop.",
    grammarHint: "📘 まで = up to"
  },
  {
    jp: "新幹線（しんかんせん） は 東京（とうきょう） から 大阪（おおさか） まで 二時間半（にじかんはん） です",
    reading: "しんかんせん は とうきょう から おおさか まで にじかんはん です",
    translation: "The Shinkansen takes 2.5 hours from Tokyo to Osaka.",
    grammarHint: "🎯 AからBまで = from A to B"
  },
  {
    jp: "地下鉄（ちかてつ） に 乗（の）って 二駅（にえき） です",
    reading: "ちかてつ に のって にえき です",
    translation: "Take the subway for two stops.",
    grammarHint: "📘 に乗る = board"
  },
  {
    jp: "飛行機（ひこうき） は 速（はや）い です が 少（すこ）し 高（たか）い です",
    reading: "ひこうき は はやい です が すこし たかい です",
    translation: "The airplane is fast but a little expensive.",
    grammarHint: "🎯 but = が"
  },
  {
    jp: "タクシー で 行（い）った 方（ほう） が いい です",
    reading: "たくしー で いった ほう が いい です",
    translation: "It's better to go by taxi.",
    grammarHint: "📘 たほうがいい = it's better to"
  },
  {
    jp: "自転車（じてんしゃ） で 駅（えき） まで 十分（じゅっぷん） です",
    reading: "じてんしゃ で えき まで じゅっぷん です",
    translation: "It's 10 minutes to the station by bicycle.",
    grammarHint: "🎯 で = means"
  },
  {
    jp: "道（みち） に 迷（まよ）いました",
    reading: "みち に まよいました",
    translation: "I got lost.",
    grammarHint: "📘 に迷う = get lost on"
  },
  {
    jp: "地図（ちず） を 見（み） ながら 歩（ある）きます",
    reading: "ちず を み ながら あるきます",
    translation: "I walk while looking at the map.",
    grammarHint: "🎯 〜ながら = while"
  },
  {
    jp: "看板（かんばん） が 見（み）えます か",
    reading: "かんばん が みえます か",
    translation: "Can you see the sign?",
    grammarHint: "📘 が見える = visible"
  },
  {
    jp: "まっすぐ 行（い）って ください",
    reading: "まっすぐ いって ください",
    translation: "Please go straight.",
    grammarHint: "🎯 〜てください = polite request"
  },
  {
    jp: "ここ で 止（と）まって ください",
    reading: "ここ で とまって ください",
    translation: "Please stop here.",
    grammarHint: "📘 で = location of stopping"
  },
  {
    jp: "次（つぎ） の 角（かど） を 左（ひだり） です",
    reading: "つぎ の かど を ひだり です",
    translation: "At the next corner, it's on the left.",
    grammarHint: "🎯 の = linking"
  },
  {
    jp: "まわり に コンビニ が あります か",
    reading: "まわり に こんびに が あります か",
    translation: "Is there a convenience store around here?",
    grammarHint: "📘 まわりに = in the vicinity"
  },
  {
    jp: "遠（とお）く に 山（やま） が 見（み）えます",
    reading: "とおく に やま が みえます",
    translation: "I can see mountains in the distance.",
    grammarHint: "🎯 に見える = visible at"
  },
  {
    jp: "エレベーター で 三階（さんかい） に 上（あ）がります",
    reading: "えれべーたー で さんかい に あがります",
    translation: "Take the elevator up to the third floor.",
    grammarHint: "📘 で = means"
  },
  {
    jp: "出口（でぐち） は 左側（ひだりがわ） です",
    reading: "でぐち は ひだりがわ です",
    translation: "The exit is on the left side.",
    grammarHint: "🎯 〜側 = side"
  },
  {
    jp: "入口（いりぐち） で 待（ま）ち合（あ）わせましょう",
    reading: "いりぐち で まちあわせましょう",
    translation: "Let's meet at the entrance.",
    grammarHint: "📘 ましょう = let's"
  },
  {
    jp: "駐車場（ちゅうしゃじょう） は 建物（たてもの） の 後（うし）ろ です",
    reading: "ちゅうしゃじょう は たてもの の うしろ です",
    translation: "The parking lot is behind the building.",
    grammarHint: "🎯 の後ろ = behind"
  },
  {
    jp: "階段（かいだん） を 上（あ）がって 二階（にかい） です",
    reading: "かいだん を あがって にかい です",
    translation: "Go up the stairs and it's the second floor.",
    grammarHint: "📘 を上がる = go up"
  },

  // ========== SPRINT 04: Food, Shopping, Quantities (81-105) ==========
  {
    jp: "いらっしゃいませ。 何（なに） を 探（さが）しています か",
    reading: "いらっしゃいませ なに を さがしています か",
    translation: "Welcome. What are you looking for?",
    grammarHint: "📘 を探す = look for"
  },
  {
    jp: "この りんご は 一個（いっこ） いくら です か",
    reading: "この りんご は いっこ いくら です か",
    translation: "How much is this apple?",
    grammarHint: "🎯 この = this | いくら = how much"
  },
  {
    jp: "三本（さんぼん） で 五百円（ごひゃくえん） です",
    reading: "さんぼん で ごひゃくえん です",
    translation: "Three bottles for 500 yen.",
    grammarHint: "📘 counter 本 = long items"
  },
  {
    jp: "もっと 安（やす）い の は ありません か",
    reading: "もっと やすい の は ありません か",
    translation: "Don't you have something cheaper?",
    grammarHint: "🎯 もっと = more"
  },
  {
    jp: "試着（しちゃく）して も いい です か",
    reading: "しちゃくして も いい です か",
    translation: "May I try this on (clothes)?",
    grammarHint: "📘 〜てもいい = may I"
  },
  {
    jp: "サイズ が 合（あ）いません",
    reading: "さいず が あいません",
    translation: "The size doesn't fit.",
    grammarHint: "🎯 が合う = fits"
  },
  {
    jp: "クレジットカード は 使（つか）えます か",
    reading: "くれじっとかーど は つかえます か",
    translation: "Can I use a credit card?",
    grammarHint: "📘 potential: 使える = can use"
  },
  {
    jp: "現金（げんきん） だけ です",
    reading: "げんきん だけ です",
    translation: "Cash only.",
    grammarHint: "🎯 だけ = only"
  },
  {
    jp: "袋（ふくろ） は 有料（ゆうりょう） です か",
    reading: "ふくろ は ゆうりょう です か",
    translation: "Is there a fee for the bag?",
    grammarHint: "📘 有料 = paid"
  },
  {
    jp: "レシート を ください",
    reading: "れしーと を ください",
    translation: "Please give me the receipt.",
    grammarHint: "🎯 をください = give me"
  },
  {
    jp: "寿司（すし） が 食（た）べたい です",
    reading: "すし が たべたい です",
    translation: "I want to eat sushi.",
    grammarHint: "📘 〜たい = want to"
  },
  {
    jp: "ラーメン に 卵（たまご） を 入（い）れて ください",
    reading: "らーめん に たまご を いれて ください",
    translation: "Please add an egg to the ramen.",
    grammarHint: "🎯 に = into"
  },
  {
    jp: "この 料理（りょうり） は 何（なに） が 入（はい）っています か",
    reading: "この りょうり は なに が はいっています か",
    translation: "What does this dish contain?",
    grammarHint: "📘 〜ています = state"
  },
  {
    jp: "もう 少（すこ）し 辛（から）く して ください",
    reading: "もう すこし からく して ください",
    translation: "Please make it a little spicier.",
    grammarHint: "🎯 adjective + くする = make"
  },
  {
    jp: "お会計（かいけい） を お願（ねが）い します",
    reading: "おかいけい を おねがい します",
    translation: "Check, please.",
    grammarHint: "📘 をお願いします = polite request"
  },
  {
    jp: "五枚（ごまい） ください",
    reading: "ごまい ください",
    translation: "Please give me five (flat things).",
    grammarHint: "🎯 枚 = counter for flat"
  },
  {
    jp: "飲（の）み放題（ほうだい） は あります か",
    reading: "のみほうだい は あります か",
    translation: "Do you have an all-you-can-drink option?",
    grammarHint: "📘 〜放題 = unlimited"
  },
  {
    jp: "予約（よやく） を したい の です",
    reading: "よやく を したい の です",
    translation: "I'd like to make a reservation.",
    grammarHint: "🎯 〜のです = explanatory"
  },
  {
    jp: "満席（まんせき） です",
    reading: "まんせき です",
    translation: "We are fully booked.",
    grammarHint: "📘 満席 = full seats"
  },
  {
    jp: "一階（いっかい） で お待（ま）ち ください",
    reading: "いっかい で おまち ください",
    translation: "Please wait on the first floor.",
    grammarHint: "🎯 お〜ください = polite"
  },
  {
    jp: "アルコール は あります か",
    reading: "あるこーる は あります か",
    translation: "Do you have alcohol?",
    grammarHint: "📘 はあります = existence"
  },
  {
    jp: "ちょうど 一万円（いちまんえん） です",
    reading: "ちょうど いちまんえん です",
    translation: "It's exactly 10,000 yen.",
    grammarHint: "🎯 ちょうど = exactly"
  },
  {
    jp: "お釣（つ）り が 違（ちが）います",
    reading: "おつり が ちがいます",
    translation: "The change is wrong.",
    grammarHint: "📘 が違う = is different"
  },
  {
    jp: "ポイントカード は 持（も）っています か",
    reading: "ぽいんとかーど は もっています か",
    translation: "Do you have a point card?",
    grammarHint: "🎯 を持っている = have"
  },
  {
    jp: "次（つぎ）、どうぞ",
    reading: "つぎ どうぞ",
    translation: "Next, please.",
    grammarHint: "📘 どうぞ = here you go"
  },

  // ========== SPRINT 05: Weather, Adjectives, Feelings (106-130) ==========
  {
    jp: "今日（きょう） は とても 暑（あつ）い です",
    reading: "きょう は とても あつい です",
    translation: "Today is very hot.",
    grammarHint: "🎯 い-adjective"
  },
  {
    jp: "昨日（きのう） は 涼（すず）しかった です",
    reading: "きのう は すずしかった です",
    translation: "Yesterday was cool.",
    grammarHint: "📘 past: 〜かった"
  },
  {
    jp: "明日（あした） は 寒（さむ）く なる でしょう",
    reading: "あした は さむく なる でしょう",
    translation: "It will probably get cold tomorrow.",
    grammarHint: "🎯 〜くなる = become"
  },
  {
    jp: "天気予報（てんきよほう） に よると 雨（あめ） が 降（ふ）ります",
    reading: "てんきよほう に よると あめ が ふります",
    translation: "According to the weather forecast, it will rain.",
    grammarHint: "📘 〜によると = according to"
  },
  {
    jp: "曇（くも）り のち 雨（あめ） です",
    reading: "くもり のち あめ です",
    translation: "Cloudy then rain.",
    grammarHint: "🎯 〜のち = later"
  },
  {
    jp: "晴（は）れ のち 曇（くも）り です",
    reading: "はれ のち くもり です",
    translation: "Sunny then cloudy.",
    grammarHint: "📘 weather phrases"
  },
  {
    jp: "風（かぜ） が 強（つよ）い です",
    reading: "かぜ が つよい です",
    translation: "The wind is strong.",
    grammarHint: "🎯 が + adjective"
  },
  {
    jp: "湿度（しつど） が 高（たか）くて 不快（ふかい） です",
    reading: "しつど が たかくて ふかい です",
    translation: "The humidity is high and it's uncomfortable.",
    grammarHint: "📘 〜て = and"
  },
  {
    jp: "雪（ゆき） が 降（ふ）っています",
    reading: "ゆき が ふっています",
    translation: "It's snowing.",
    grammarHint: "🎯 〜ています = ongoing"
  },
  {
    jp: "台風（たいふう） が 近（ちか）づいています",
    reading: "たいふう が ちかづいています",
    translation: "A typhoon is approaching.",
    grammarHint: "📘 近づく = approach"
  },
  {
    jp: "気温（きおん） は 二十度（にじゅうど） です",
    reading: "きおん は にじゅうど です",
    translation: "The temperature is 20 degrees.",
    grammarHint: "🎯 〜度 = degrees"
  },
  {
    jp: "暑（あつ）くて 眠（ねむ）れません",
    reading: "あつくて ねむれません",
    translation: "It's so hot I can't sleep.",
    grammarHint: "📘 potential negative"
  },
  {
    jp: "暖房（だんぼう） を つけて ください",
    reading: "だんぼう を つけて ください",
    translation: "Please turn on the heater.",
    grammarHint: "🎯 をつける = turn on"
  },
  {
    jp: "冷房（れいぼう） が 効（き）きすぎ です",
    reading: "れいぼう が ききすぎ です",
    translation: "The AC is too strong.",
    grammarHint: "📘 〜すぎ = too much"
  },
  {
    jp: "花粉（かふん） で 目（め） が かゆい です",
    reading: "かふん で め が かゆい です",
    translation: "My eyes are itchy due to pollen.",
    grammarHint: "🎯 で = cause"
  },
  {
    jp: "彼（かれ） は 嬉（うれ）しそう です",
    reading: "かれ は うれしそう です",
    translation: "He looks happy.",
    grammarHint: "📘 〜そうです = looks"
  },
  {
    jp: "緊張（きんちょう）して 手（て） が 震（ふる）えています",
    reading: "きんちょうして て が ふるえています",
    translation: "I'm nervous and my hands are shaking.",
    grammarHint: "🎯 〜て + verb = and"
  },
  {
    jp: "悲（かな）しい 映画（えいが） を 見（み）て 泣（な）きました",
    reading: "かなしい えいが を みて なきました",
    translation: "I watched a sad movie and cried.",
    grammarHint: "📘 〜て泣く = cry"
  },
  {
    jp: "楽（たの）しい 旅行（りょこう） でした",
    reading: "たのしい りょこう でした",
    translation: "It was a fun trip.",
    grammarHint: "🎯 past: でした"
  },
  {
    jp: "退屈（たいくつ）な 会議（かいぎ） でした",
    reading: "たいくつな かいぎ でした",
    translation: "It was a boring meeting.",
    grammarHint: "📘 past: でした"
  },
  {
    jp: "疲（つか）れた ので 早（はや）く 帰（かえ）ります",
    reading: "つかれた ので はやく かえります",
    translation: "I'm tired, so I'll go home early.",
    grammarHint: "🎯 〜ので = because"
  },
  {
    jp: "暇（ひま）な 時（とき） は 本（ほん） を 読（よ）みます",
    reading: "ひまな とき は ほん を よみます",
    translation: "When I'm free, I read books.",
    grammarHint: "📘 な-adjective + とき"
  },
  {
    jp: "忙（いそが）しい です か",
    reading: "いそがしい です か",
    translation: "Are you busy?",
    grammarHint: "🎯 question"
  },
  {
    jp: "大変（たいへん）でした ね",
    reading: "たいへんでした ね",
    translation: "That was tough, wasn't it?",
    grammarHint: "📘 ね = agreement"
  },
  {
    jp: "素晴（すば）らしい アイデア です",
    reading: "すばらしい あいであ です",
    translation: "That's a wonderful idea.",
    grammarHint: "🎯 素晴らしい = wonderful"
  },

  // ========== SPRINT 06: Hobbies, Giving/Receiving (131-155) ==========
  {
    jp: "私（わたし） の 趣味（しゅみ） は 写真（しゃしん） を 撮（と）る こと です",
    reading: "わたし の しゅみ は しゃしん を とる こと です",
    translation: "My hobby is taking photos.",
    grammarHint: "📘 〜こと = nominalizer"
  },
  {
    jp: "ギター を 弾（ひ）く こと が できます",
    reading: "ぎたー を ひく こと が できます",
    translation: "I can play the guitar.",
    grammarHint: "🎯 ことができる = can do"
  },
  {
    jp: "映画（えいが） を 見（み）る の が 好（す）き です",
    reading: "えいが を みる の が すき です",
    translation: "I like watching movies.",
    grammarHint: "📘 〜のが好き = like doing"
  },
  {
    jp: "毎週（まいしゅう） ジョギング を しています",
    reading: "まいしゅう じょぎんぐ を しています",
    translation: "I go jogging every week.",
    grammarHint: "🎯 をしている = do regularly"
  },
  {
    jp: "料理（りょうり） を 習（なら）っています",
    reading: "りょうり を ならっています",
    translation: "I'm learning to cook.",
    grammarHint: "📘 〜ている = in progress"
  },
  {
    jp: "友達（ともだち） に 本（ほん） を 貸（か）しました",
    reading: "ともだち に ほん を かしました",
    translation: "I lent a book to my friend.",
    grammarHint: "🎯 〜に貸す = lend to"
  },
  {
    jp: "兄（あに） から 時計（とけい） を もらいました",
    reading: "あに から とけい を もらいました",
    translation: "I received a watch from my brother.",
    grammarHint: "📘 〜からもらう = receive from"
  },
  {
    jp: "彼女（かのじょ） に 花（はな） を あげました",
    reading: "かのじょ に はな を あげました",
    translation: "I gave her flowers.",
    grammarHint: "🎯 〜にあげる = give to"
  },
  {
    jp: "先生（せんせい） が 教（おし）えて くれました",
    reading: "せんせい が おしえて くれました",
    translation: "The teacher taught me.",
    grammarHint: "📘 〜てくれる = someone does for me"
  },
  {
    jp: "友達（ともだち） が 手伝（てつだ）って くれました",
    reading: "ともだち が てつだって くれました",
    translation: "My friend helped me.",
    grammarHint: "🎯 〜てくれる = favor"
  },
  {
    jp: "祖母（そぼ） に 手紙（てがみ） を 書（か）きました",
    reading: "そぼ に てがみ を かきました",
    translation: "I wrote a letter to my grandmother.",
    grammarHint: "📘 〜に書く = write to"
  },
  {
    jp: "荷物（にもつ） を 送（おく）って あげます",
    reading: "にもつ を おくって あげます",
    translation: "I'll send the package for you.",
    grammarHint: "🎯 〜てあげる = do for someone"
  },
  {
    jp: "褒（ほ）められて 嬉（うれ）しかった です",
    reading: "ほめられて うれしかった です",
    translation: "I was happy to be praised.",
    grammarHint: "📘 passive: 褒められる = be praised"
  },
  {
    jp: "試合（しあい） に 勝（か）ちました",
    reading: "しあい に かちました",
    translation: "I won the match.",
    grammarHint: "🎯 に勝つ = win"
  },
  {
    jp: "ゲーム に 負（ま）けました",
    reading: "げーむ に まけました",
    translation: "I lost the game.",
    grammarHint: "📘 に負ける = lose"
  },
  {
    jp: "毎朝（まいあさ） 瞑想（めいそう） を します",
    reading: "まいあさ めいそう を します",
    translation: "I meditate every morning.",
    grammarHint: "🎯 〜をします = do"
  },
  {
    jp: "ヨガ を 習（なら）いたい です",
    reading: "よが を ならいたい です",
    translation: "I want to learn yoga.",
    grammarHint: "📘 〜たい = want"
  },
  {
    jp: "キャンプ に 行（い）った こと が あります",
    reading: "きゃんぷ に いった こと が あります",
    translation: "I have been camping before.",
    grammarHint: "🎯 たことがある = experience"
  },
  {
    jp: "釣（つ）り が 好（す）き です",
    reading: "つり が すき です",
    translation: "I like fishing.",
    grammarHint: "📘 noun + が好き"
  },
  {
    jp: "ダンス を 踊（おど）る の が 上手（じょうず） です",
    reading: "だんす を おどる の が じょうず です",
    translation: "I'm good at dancing.",
    grammarHint: "🎯 のが上手 = good at"
  },
  {
    jp: "歌（うた）う の が 下手（へた） です",
    reading: "うたう の が へた です",
    translation: "I'm bad at singing.",
    grammarHint: "📘 のが下手 = bad at"
  },
  {
    jp: "絵（え） を 描（か）く こと が 楽（たの）しい です",
    reading: "え を かく こと が たのしい です",
    translation: "Drawing pictures is fun.",
    grammarHint: "🎯 〜ことが楽しい = fun"
  },
  {
    jp: "犬（いぬ） の 散歩（さんぽ） を 頼（たの）まれました",
    reading: "いぬ の さんぽ を たのまれました",
    translation: "I was asked to walk the dog.",
    grammarHint: "📘 passive: 頼まれる = be asked"
  },
  {
    jp: "百科事典（ひゃっかじてん） を 引（ひ）きました",
    reading: "ひゃっかじてん を ひきました",
    translation: "I looked up the encyclopedia.",
    grammarHint: "🎯 を引く = look up"
  },
  {
    jp: "交換（こうかん）して もらえます か",
    reading: "こうかんして もらえます か",
    translation: "Could you exchange it for me?",
    grammarHint: "📘 〜てもらえる = can I receive"
  },

  // ========== SPRINT 07: Body, Health, Emergencies (156-175) ==========
  {
    jp: "頭（あたま） が 痛（いた）い です",
    reading: "あたま が いたい です",
    translation: "I have a headache.",
    grammarHint: "🎯 が痛い = hurts"
  },
  {
    jp: "歯（は） が 痛（いた）い ので 歯医者（はいしゃ） に 行（い）きます",
    reading: "は が いたい ので はいしゃ に いきます",
    translation: "I have a toothache, so I'll go to the dentist.",
    grammarHint: "📘 〜ので = because"
  },
  {
    jp: "熱（ねつ） が あります",
    reading: "ねつ が あります",
    translation: "I have a fever.",
    grammarHint: "🎯 がある = existence"
  },
  {
    jp: "咳（せき） が 出（で）ます",
    reading: "せき が でます",
    translation: "I have a cough.",
    grammarHint: "📘 が出る = symptom appears"
  },
  {
    jp: "くしゃみ が 止（と）まりません",
    reading: "くしゃみ が とまりません",
    translation: "My sneezing won't stop.",
    grammarHint: "🎯 〜が止まらない = won't stop"
  },
  {
    jp: "気分（きぶん） が 悪（わる）い です",
    reading: "きぶん が わるい です",
    translation: "I feel sick.",
    grammarHint: "📘 が悪い = bad"
  },
  {
    jp: "病院（びょういん） に 行（い）った 方（ほう） が いい です",
    reading: "びょういん に いった ほう が いい です",
    translation: "You should go to the hospital.",
    grammarHint: "🎯 たほうがいい = it's better to"
  },
  {
    jp: "薬（くすり） を 飲（の）みました か",
    reading: "くすり を のみました か",
    translation: "Did you take your medicine?",
    grammarHint: "📘 を飲む = take medicine"
  },
  {
    jp: "安静（あんせい） に して ください",
    reading: "あんせい に して ください",
    translation: "Please rest.",
    grammarHint: "🎯 〜てください = please do"
  },
  {
    jp: "目（め） が 疲（つか）れました",
    reading: "め が つかれました",
    translation: "My eyes are tired.",
    grammarHint: "📘 が疲れる = get tired"
  },
  {
    jp: "足（あし） を 捻挫（ねんざ）しました",
    reading: "あし を ねんざしました",
    translation: "I sprained my ankle.",
    grammarHint: "🎯 を捻挫する = sprain"
  },
  {
    jp: "救急車（きゅうきゅうしゃ） を 呼（よ）んで ください",
    reading: "きゅうきゅうしゃ を よんで ください",
    translation: "Please call an ambulance.",
    grammarHint: "📘 を呼ぶ = call"
  },
  {
    jp: "事故（じこ） に 遭（あ）いました",
    reading: "じこ に あいました",
    translation: "I had an accident.",
    grammarHint: "🎯 に遭う = encounter"
  },
  {
    jp: "保険証（ほけんしょう） は 持（も）っています か",
    reading: "ほけんしょう は もっています か",
    translation: "Do you have your insurance card?",
    grammarHint: "📘 を持っている = have"
  },
  {
    jp: "診察（しんさつ） を 受（う）けました",
    reading: "しんさつ を うけました",
    translation: "I received a medical examination.",
    grammarHint: "🎯 を受ける = receive"
  },
  {
    jp: "手術（しゅじゅつ） が 必要（ひつよう） です",
    reading: "しゅじゅつ が ひつよう です",
    translation: "Surgery is necessary.",
    grammarHint: "📘 が必要 = necessary"
  },
  {
    jp: "注射（ちゅうしゃ） が 怖（こわ）い です",
    reading: "ちゅうしゃ が こわい です",
    translation: "I'm afraid of injections.",
    grammarHint: "🎯 が怖い = scared of"
  },
  {
    jp: "視力（しりょく） が 悪（わる）くなりました",
    reading: "しりょく が わるくなりました",
    translation: "My eyesight has gotten worse.",
    grammarHint: "📘 〜くなる = become"
  },
  {
    jp: "健康（けんこう） の ため に 運動（うんどう）します",
    reading: "けんこう の ため に うんどうします",
    translation: "I exercise for my health.",
    grammarHint: "🎯 〜のために = for the sake of"
  },
  {
    jp: "よく 寝（ね）る こと が 大切（たいせつ） です",
    reading: "よく ねる こと が たいせつ です",
    translation: "Getting enough sleep is important.",
    grammarHint: "📘 〜ことが大切 = important"
  },

  // ========== SPRINT 08: House, Rooms, Objects (176-195) ==========
  {
    jp: "私（わたし） の 家（いえ） は 駅（えき） から 近（ちか）い です",
    reading: "わたし の いえ は えき から ちかい です",
    translation: "My house is close to the station.",
    grammarHint: "🎯 から近い = near from"
  },
  {
    jp: "リビング に ソファ が あります",
    reading: "りびんぐ に そふぁ が あります",
    translation: "There is a sofa in the living room.",
    grammarHint: "📘 に〜がある = exists"
  },
  {
    jp: "寝室（しんしつ） は 二階（にかい） です",
    reading: "しんしつ は にかい です",
    translation: "The bedroom is on the second floor.",
    grammarHint: "🎯 location + です"
  },
  {
    jp: "キッチン は 狭（せま）い です が 綺麗（きれい） です",
    reading: "きっちん は せまい です が きれい です",
    translation: "The kitchen is small but clean.",
    grammarHint: "📘 contrast が"
  },
  {
    jp: "風呂（ふろ） に 入（はい）ります",
    reading: "ふろ に はいります",
    translation: "I take a bath.",
    grammarHint: "🎯 に入る = enter"
  },
  {
    jp: "洗面所（せんめんじょ） で 手（て） を 洗（あら）います",
    reading: "せんめんじょ で て を あらいます",
    translation: "I wash my hands at the washroom sink.",
    grammarHint: "📘 で = location"
  },
  {
    jp: "庭（にわ） に 木（き） を 植（う）えました",
    reading: "にわ に き を うえました",
    translation: "I planted a tree in the garden.",
    grammarHint: "🎯 に植える = plant in"
  },
  {
    jp: "窓（まど） を 開（あ）けて 空気（くうき） を 入（い）れます",
    reading: "まど を あけて くうき を いれます",
    translation: "I open the window to let in air.",
    grammarHint: "📘 〜て + verb = sequence"
  },
  {
    jp: "カーテン を 閉（し）めます",
    reading: "かーてん を しめます",
    translation: "I close the curtains.",
    grammarHint: "🎯 を閉める = close"
  },
  {
    jp: "電気（でんき） を 消（け）して ください",
    reading: "でんき を けして ください",
    translation: "Please turn off the lights.",
    grammarHint: "📘 を消す = turn off"
  },
  {
    jp: "冷蔵庫（れいぞうこ） に 牛乳（ぎゅうにゅう） が ありません",
    reading: "れいぞうこ に ぎゅうにゅう が ありません",
    translation: "There's no milk in the fridge.",
    grammarHint: "🎯 に〜がない = lack"
  },
  {
    jp: "電子レンジ で 温（あたた）めます",
    reading: "でんしれんじ で あたためます",
    translation: "I heat it in the microwave.",
    grammarHint: "📘 で = means"
  },
  {
    jp: "掃除機（そうじき） を かけて ください",
    reading: "そうじき を かけて ください",
    translation: "Please vacuum.",
    grammarHint: "🎯 をかける = apply"
  },
  {
    jp: "洗濯機（せんたくき） を 回（まわ）します",
    reading: "せんたくき を まわします",
    translation: "I run the washing machine.",
    grammarHint: "📘 を回す = operate"
  },
  {
    jp: "ゴミ を 出（だ）して ください",
    reading: "ごみ を だして ください",
    translation: "Please take out the trash.",
    grammarHint: "🎯 を出す = put out"
  },
  {
    jp: "ベランダ に 洗濯物（せんたくもの） を 干（ほ）します",
    reading: "べらんだ に せんたくもの を ほします",
    translation: "I hang the laundry on the balcony.",
    grammarHint: "📘 に干す = dry on"
  },
  {
    jp: "鍵（かぎ） を かけ忘（わす）れました",
    reading: "かぎ を かけわすれました",
    translation: "I forgot to lock.",
    grammarHint: "🎯 〜忘れる = forget to"
  },
  {
    jp: "住所（じゅうしょ） を 書（か）いて ください",
    reading: "じゅうしょ を かいて ください",
    translation: "Please write your address.",
    grammarHint: "📘 を書く = write"
  },
  {
    jp: "階段（かいだん） を 上（のぼ）ります",
    reading: "かいだん を のぼります",
    translation: "Go up the stairs.",
    grammarHint: "🎯 を上る = ascend"
  },
  {
    jp: "エアコン を つけっぱなし に しないで ください",
    reading: "えあこん を つけっぱなし に しないで ください",
    translation: "Please don't leave the AC on.",
    grammarHint: "📘 〜っぱなし = left in state"
  },

  // ========== SPRINT 09: Work, School, Requests (196-215) ==========
  {
    jp: "会社（かいしゃ） に 遅刻（ちこく）しました",
    reading: "かいしゃ に ちこくしました",
    translation: "I was late for work.",
    grammarHint: "🎯 に遅刻 = late for"
  },
  {
    jp: "残業（ざんぎょう） を しなければなりません",
    reading: "ざんぎょう を しなければなりません",
    translation: "I have to work overtime.",
    grammarHint: "📘 〜なければならない = must"
  },
  {
    jp: "会議（かいぎ） は 何時（なんじ） に 終（お）わります か",
    reading: "かいぎ は なんじ に おわります か",
    translation: "What time does the meeting end?",
    grammarHint: "🎯 に終わる = end at"
  },
  {
    jp: "部長（ぶちょう） に 報告（ほうこく）します",
    reading: "ぶちょう に ほうこくします",
    translation: "I report to the department manager.",
    grammarHint: "📘 に報告 = report to"
  },
  {
    jp: "メール を 送（おく）りました",
    reading: "めーる を おくりました",
    translation: "I sent an email.",
    grammarHint: "🎯 を送る = send"
  },
  {
    jp: "資料（しりょう） を 準備（じゅんび）して ください",
    reading: "しりょう を じゅんびして ください",
    translation: "Please prepare the documents.",
    grammarHint: "📘 を準備 = prepare"
  },
  {
    jp: "コピー機（こぴーき） が 故障（こしょう）しました",
    reading: "こぴーき が こしょうしました",
    translation: "The copier broke down.",
    grammarHint: "🎯 が故障 = breakdown"
  },
  {
    jp: "休暇（きゅうか） を 取（と）りたい です",
    reading: "きゅうか を とりたい です",
    translation: "I want to take a vacation.",
    grammarHint: "📘 を取る = take"
  },
  {
    jp: "授業（じゅぎょう） を 欠席（けっせき）します",
    reading: "じゅぎょう を けっせきします",
    translation: "I will be absent from class.",
    grammarHint: "🎯 を欠席 = be absent"
  },
  {
    jp: "宿題（しゅくだい） を 忘（わす）れました",
    reading: "しゅくだい を わすれました",
    translation: "I forgot my homework.",
    grammarHint: "📘 を忘れる = forget"
  },
  {
    jp: "試験（しけん） に 合格（ごうかく）しました",
    reading: "しけん に ごうかくしました",
    translation: "I passed the exam.",
    grammarHint: "🎯 に合格 = pass"
  },
  {
    jp: "課題（かだい） を 提出（ていしゅつ）します",
    reading: "かだい を ていしゅつします",
    translation: "I will submit the assignment.",
    grammarHint: "📘 を提出 = submit"
  },
  {
    jp: "先生（せんせい） に 質問（しつもん）します",
    reading: "せんせい に しつもんします",
    translation: "I ask the teacher a question.",
    grammarHint: "🎯 に質問 = ask"
  },
  {
    jp: "教科書（きょうかしょ） を 開（ひら）いて ください",
    reading: "きょうかしょ を ひらいて ください",
    translation: "Please open your textbook.",
    grammarHint: "📘 を開く = open"
  },
  {
    jp: "ノート を 取（と）っています",
    reading: "のーと を とっています",
    translation: "I am taking notes.",
    grammarHint: "🎯 〜ています = in progress"
  },
  {
    jp: "発音（はつおん） が 難（むずか）しい です",
    reading: "はつおん が むずかしい です",
    translation: "Pronunciation is difficult.",
    grammarHint: "📘 が難しい = is difficult"
  },
  {
    jp: "もう 一度（いちど） 言（い）って ください",
    reading: "もう いちど いって ください",
    translation: "Please say it one more time.",
    grammarHint: "🎯 〜てください = polite request"
  },
  {
    jp: "ゆっくり 話（はな）して ください",
    reading: "ゆっくり はなして ください",
    translation: "Please speak slowly.",
    grammarHint: "📘 adverb + 〜てください"
  },
  {
    jp: "ペン を 貸（か）して もらえます か",
    reading: "ぺん を かして もらえます か",
    translation: "Could you lend me a pen?",
    grammarHint: "🎯 〜てもらえる = can I receive"
  },
  {
    jp: "手伝（てつだ）って いただけません か",
    reading: "てつだって いただけません か",
    translation: "Could you please help me?",
    grammarHint: "📘 〜ていただけませんか = very polite"
  },

  // ========== SPRINT 10: Mixed Review + N4 Bridges (216-250) ==========
  {
    jp: "もし 時間（じかん） が あれば 行（い）きます",
    reading: "もし じかん が あれば いきます",
    translation: "If I have time, I'll go.",
    grammarHint: "🎯 〜ば = conditional (if/when)"
  },
  {
    jp: "雨（あめ） が 降（ふ）ったら 試合（しあい） は 中止（ちゅうし） です",
    reading: "あめ が ふったら しあい は ちゅうし です",
    translation: "If it rains, the match is canceled.",
    grammarHint: "📘 〜たら = if/when"
  },
  {
    jp: "勉強（べんきょう）すれば 成績（せいせき） が 上（あ）がります",
    reading: "べんきょうすれば せいせき が あがります",
    translation: "If you study, your grades will improve.",
    grammarHint: "🎯 すれば = if do"
  },
  {
    jp: "彼（かれ） は まるで プロ の よう に 歌（うた）います",
    reading: "かれ は まるで ぷろ の よう に うたいます",
    translation: "He sings just like a pro.",
    grammarHint: "📘 〜のように = like"
  },
  {
    jp: "この 本（ほん） を 読（よ）みなさい",
    reading: "この ほん を よみなさい",
    translation: "Read this book!",
    grammarHint: "🎯 〜なさい = command"
  },
  {
    jp: "行（い）くな と 言（い）われました",
    reading: "いくな と いわれました",
    translation: "I was told not to go.",
    grammarHint: "📘 passive + quote"
  },
  {
    jp: "待（ま）たないで 先（さき） に 行（い）って ください",
    reading: "またないで さき に いって ください",
    translation: "Please go ahead without waiting.",
    grammarHint: "🎯 〜ないで = without"
  },
  {
    jp: "彼（かれ） は 毎日（まいにち） 運動（うんどう）する そう です",
    reading: "かれ は まいにち うんどうする そう です",
    translation: "I hear he exercises every day.",
    grammarHint: "📘 〜そうです = hearsay"
  },
  {
    jp: "太陽（たいよう） が 昇（のぼ）る の が 見（み）えました",
    reading: "たいよう が のぼる の が みえました",
    translation: "I saw the sun rise.",
    grammarHint: "🎯 phrase + のが見える"
  },
  {
    jp: "彼女（かのじょ） の 笑顔（えがお） を 見（み）る だけ で 幸（しあわ）せ です",
    reading: "かのじょ の えがお を みる だけ で しあわせ です",
    translation: "Just seeing her smile makes me happy.",
    grammarHint: "📘 〜だけで = just by"
  },
  {
    jp: "その 話（はなし） は 考（かんが）えさせられます",
    reading: "その はなし は かんがえさせられます",
    translation: "That story makes me think.",
    grammarHint: "🎯 causative-passive"
  },
  {
    jp: "もっと 早（はや）く 来（く）れば 良（よ）かった",
    reading: "もっと はやく くれば よかった",
    translation: "I should have come earlier.",
    grammarHint: "📘 〜ばよかった = should have"
  },
  {
    jp: "彼（かれ） は まだ 着（つ）いていない よう です",
    reading: "かれ は まだ ついていない よう です",
    translation: "It seems he hasn't arrived yet.",
    grammarHint: "🎯 〜ようです = seems"
  },
  {
    jp: "この 辺（へん） は 静（しず）か で いい です ね",
    reading: "この へん は しずか で いい です ね",
    translation: "This area is quiet and nice.",
    grammarHint: "📘 〜で = and (な-adjective)"
  },
  {
    jp: "健康（けんこう） の ため には バランス が 大切（たいせつ） です",
    reading: "けんこう の ため には ばらんす が たいせつ です",
    translation: "For health, balance is important.",
    grammarHint: "🎯 〜には = for purpose"
  },
  {
    jp: "知（し）らない 言葉（ことば） が 出（で）てきたら 辞書（じしょ） を 引（ひ）きます",
    reading: "しらない ことば が でてきたら じしょ を ひきます",
    translation: "When an unknown word comes up, I look it up.",
    grammarHint: "📘 〜たら = when"
  },
  {
    jp: "一人（ひとり） で できる 限（かぎ）り やります",
    reading: "ひとり で できる かぎり やります",
    translation: "I'll do as much as I can by myself.",
    grammarHint: "🎯 〜限り = as much as"
  },
  {
    jp: "彼（かれ） の 態度（たいど） に 腹（はら） が 立（た）った",
    reading: "かれ の たいど に はら が たった",
    translation: "I got angry at his attitude.",
    grammarHint: "📘 に腹が立つ = get angry"
  },
  {
    jp: "その 件（けん） は もう 済（す）ませました",
    reading: "その けん は もう すませました",
    translation: "I've already finished that matter.",
    grammarHint: "🎯 〜済ませる = finish"
  },
  {
    jp: "電車（でんしゃ） が 混（こ）んでいる ので 次（つぎ） を 待（ま）ちます",
    reading: "でんしゃ が こんでいる ので つぎ を まちます",
    translation: "The train is crowded, so I'll wait for the next one.",
    grammarHint: "📘 〜ている = state"
  },
  {
    jp: "ここ に 名前（なまえ） を 記入（きにゅう）して ください",
    reading: "ここ に なまえ を きにゅうして ください",
    translation: "Please fill in your name here.",
    grammarHint: "🎯 に記入 = fill in"
  },
  {
    jp: "それ は 少（すこ）し 問題（もんだい） かも しれません",
    reading: "それ は すこし もんだい かも しれません",
    translation: "That might be a bit of a problem.",
    grammarHint: "📘 〜かもしれません = might"
  },
  {
    jp: "申（もう）し込（こ）み は 締（し）め切（き）られました",
    reading: "もうしこみ は しめきられました",
    translation: "Applications have been closed.",
    grammarHint: "🎯 passive: 締め切られる"
  },
  {
    jp: "この 商品（しょうひん） は お値打（ねう）ち です",
    reading: "この しょうひん は おねうち です",
    translation: "This product is a good value.",
    grammarHint: "📘 お値打ち = good value"
  },
  {
    jp: "どうぞ お召（め）し上（あ）がり ください",
    reading: "どうぞ おめしあがり ください",
    translation: "Please enjoy your meal (honorific).",
    grammarHint: "🎯 お〜ください = honorific"
  },
  {
    jp: "ご連絡（れんらく）いただければ 幸（さいわ）い です",
    reading: "ごれんらく いただければ さいわい です",
    translation: "I would appreciate it if you could contact me.",
    grammarHint: "📘 〜いただければ = if I receive"
  },
  {
    jp: "恐（おそ）れ入（い）ります が 少（すこ）し お待（ま）ち ください",
    reading: "おそれいります が すこし おまち ください",
    translation: "I'm sorry, but please wait a moment.",
    grammarHint: "🎯 恐れ入ります = very polite apology"
  },
  {
    jp: "勝手（かって）な こと を しないで ください",
    reading: "かってな こと を しないで ください",
    translation: "Please don't do anything selfish.",
    grammarHint: "📘 〜ないで = negative request"
  },
  {
    jp: "この 機会（きかい） を 逃（のが）さないで ください",
    reading: "この きかい を のがさないで ください",
    translation: "Please don't miss this opportunity.",
    grammarHint: "🎯 を逃す = miss"
  },
  {
    jp: "言葉（ことば） の 壁（かべ） は 高（たか）い です が 楽（たの）しい です",
    reading: "ことば の かべ は たかい です が たのしい です",
    translation: "The language barrier is high, but it's fun.",
    grammarHint: "📘 contrast が"
  }
];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sentencesData;
}