// ==UserScript==
// @name         B站直播表情包增强
// @name:en      Bilibili Live Emoticon Enhancer
// @namespace 	 https://steamcommunity.com/profiles/76561198132556503
// @version      1.0.1
// @description  优化B站直播表情包面板体验，支持快捷切换、搜索与自定义分类
// @description:en Enhance Bilibili live emoticon panel with better navigation, search and UX improvements
// @author       黑山東雲光圈研究所
// @match        https://live.bilibili.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";
  const categories = [
    {
      emoji: "😄",
      name: "开心",
      words: [
        "哈哈",
        "笑",
        "乐",
        "开心",
        "愉快",
        "快乐",
        "万岁",
        "自由",
        "浪起来",
        "乐观",
        "耶",
        "嘻",
        "草",
        "嘿嘿",
        "233",
        "hh",
        "绷不住",
        "!哭笑不得",
        "!不乐",
        "!鲨鱼开心",
        "894dc489523d79b2ab949956b5008b143b1f9333",
        "b7cc65d17b93ebb50b9a218d8a05dd2a63bccabc",
        "a2e620950d577a4bae7f52f2143cf23aaa033f9d",
        "9e8124127458195a3f3f6d476a76b79ae33301d5",
        "23cca06fd5912cbf35f8fc8d221d3edcb54cd943",
      ],
    },
    {
      emoji: "😭",
      name: "难过",
      words: [
        "哭",
        "呜",
        "泪",
        "难过",
        "伤心",
        "悲伤",
        "委屈",
        "想哭",
        "555",
        "叹气",
        "嘤嘤",
        "唉",
        "哀",
        "悲",
        "神伤",
        "郁闷",
        "柠檬",
        "心痛",
        "心碎",
        "伤脑筋",
        "不乐",
        "酸了",
        "e25fc3cfd880b3b09755e2d91df69143754a4f40",
        "9fcc31674b6a1b8e893cb73dad8e485d0fc40265",
        "49d68463ad88a09a47775d6d4964aa439a27cfad",
        "96549cf4815a3f4a5eaae6987ccdc7bec0d4a074",
      ],
    },
    {
      emoji: "🤔",
      name: "疑惑",
      words: [
        "疑惑",
        "疑问",
        "问号",
        "？",
        "?",
        "怎么",
        "为什么",
        "一脸懵",
        "懵",
        "懵逼",
        "哈？",
        "啊？",
        "啥情况",
        "这啥",
        "看不懂",
        "啊咧",
        "0e890049bf07da351168f634dac373b3cff68949",
        "!2256af5b5965fbac5e7b0cf66235fa5d9bfa4823",
        "!af5169196a8d079f6e62742ee072965e84695f8c",
        "!db4b2ac98102d7dd039e2e768ac7a83b3f7fa56d",
      ],
    },
    {
      emoji: "👋",
      name: "打招呼",
      words: [
        "你好",
        "嗨",
        "hi",
        "hello",
        "在吗",
        "起床",
        "来了",
        "^早",
        "欢迎",
        "在的",
        "回来",
        "请多指教",
        "认识一下",
      ],
    },
    {
      emoji: "🚪",
      name: "再见",
      words: [
        "溜了",
        "下播",
        "再见",
        "拜拜",
        "bye",
        "走了",
        "撤了",
        "消失",
        "run",
        "拜了",
        "撤退",
        "先走一步",
        "时间",
        "到点",
        "结束",
        "咻",
        "!贤者时间",
      ],
    },
    {
      emoji: "😫",
      name: "难听折磨",
      words: [
        "难听",
        "折磨",
        "痛苦",
        "崩溃",
        "nooo",
        "不要",
        "晕",
        "sos",
        "救命",
        "打击",
        "按住",
        "惊吓",
        "裂开",
        "两眼一黑",
        "寄了",
        "顶不住",
        "死了",
        "去世",
        "吐",
        "恶心",
        "没眼看",
        "升天",
        "有蟑螂",
        "呕",
        "半死",
        "!哭晕",
        "78abf9612df81ff76d50f4a3d76bf3d5b6d11fe2",
        "e14d02451313018c2b9711ea2d103840b0a92276",
        "!64d7180c8c9865c1e0729789373f044b8ae7629c",
        "!2b93db3c7e827749b882a897968e2f9cb852594d",
      ],
    },
    {
      emoji: "❤️",
      name: "爱了爱了",
      words: [
        "喜欢",
        "喜爱",
        "爱",
        "爱了",
        "爱你",
        "心动",
        "真爱",
        "贴贴",
        "亲亲",
        "抱抱",
        "蹭",
        "表白",
        "亲",
        "害羞",
        "脸红",
        "色",
        "hso",
        "爱心",
        "比心",
        "awsl",
        "期待",
        "好听",
        "mua",
        "skr",
        "羡慕",
        "玫瑰",
        "赞美",
        "鼻血",
        "一键三",
        "好看",
        "好康",
        "唱歌",
        "花痴",
        "心心",
        "爱心",
        "两眼一亮",
        "这个好",
        "!工作",
        "b1e49f5085729f8d460c0c0476c9203f598d46d7",
        "4159859e6c9c2e0476299454b6015c2659149e3c",
        "15ce7be838f67409a2bb12c8810cdac793d98c0c",
        "7978a634c70a50a92ae6c1d37a821822fac248ea",
        "cab228f398220b60dd9a1966f9efbf1f8f395ebb",
        "85500090cd3f23801229df69209f48d74f526c05",
        "ce6c7b024e9ca7a1b59305b74174be1ac07df012",
        "874a0da66edeb99e77e4d345455e29fe96b1d4ce",
        "dddd7904a4a30211e661f7ae71cc315eca6dd730",
        "f46f666f5403762facecf11bc465fb965de8b48a",
        "92ae02814999bd8c6ec0e54f04c4cc3a015497d8",
        "1034944853250dedc69a37eeac424cbb9b662382",
        "fe02bd118c526c9edbe239f622ffe3da285574c2",
      ],
    },
    {
      emoji: "🙏",
      name: "谢谢",
      words: ["谢", "3q", "蟹蟹", "thank", "辛苦了", "辛苦啦"],
    },
    {
      emoji: "🙇",
      name: "对不起",
      words: ["对不起", "抱歉", "不好意思", "失礼", "冒犯", "对不住"],
    },
    {
      emoji: "😡",
      name: "生气",
      words: [
        "生气",
        "气",
        "怒",
        "愤怒",
        "火大",
        "不爽",
        "烦",
        "恼火",
        "暴躁",
        "仇",
        "红温",
        "指责",
        "猫猫流泪",
        "挑衅",
        "哼",
        "傲娇",
        "!叹气",
        "ecbf803baf654efcbc07ea4bfb58201cd615bd19",
        "fccc02ced9a11a55add249a9928daa546eea0037",
        "81e079863c32589a1bd85fbb558ce1dd59b99633",
      ],
    },
    {
      emoji: "😱",
      name: "害怕",
      words: [
        "害怕",
        "发抖",
        "紧张",
        "石化",
        "慌",
        "不妙",
        "完了",
        "吓",
        "怕",
        "要完",
        "啊？",
        "哈？",
        "不要过来",
        "绝望",
        "糟",
        "!惊吓兔",
      ],
    },
    {
      emoji: "😲",
      name: "惊讶",
      words: [
        "震惊",
        "惊",
        "惊讶",
        "卧槽",
        "我去",
        "我靠",
        "呆",
        "逆天",
        "啊？",
        "慌",
        "哈？",
        "啊.",
        "加载中",
        "警觉",
        "愣",
        "吃鲸",
        "什么",
        "糟",
        "b976ed1563909c1321a854cb881554eeac1d4dae",
        "55df437e8613e117f4f4bbdac4f7e659ec6691f3",
        "7e264e6f0c7b04c5047f44c6fea7ec018999081f",
        "9461cf154de7f3bfcfe61bd85aebe7e84272cdef",
        "c983966505fc457a742bea889137e14e91cf86e4",
        "8a1422ef21f83398552ed6a6150e16a94a4b88ff",
        "b8317e5c817e056bf76cddc9455c38d4b97e9107",
      ],
    },
    {
      emoji: "🎉",
      name: "喝彩",
      words: [
        "哇",
        "牛",
        "nb",
        "厉害",
        "强",
        "哇塞",
        "666",
        "给力",
        "呜哇",
        "稳",
        "可以的",
        "祝贺",
        "恭喜",
        "撒钱",
        "干杯",
        "激动",
        "生日快乐",
        "撒花",
        "过年",
        "这个好",
        "鼓掌",
        "打call",
        "e2f35f75f878a53a415e0468668fbfd1fb459d54",
        "a2e620950d577a4bae7f52f2143cf23aaa033f9d",
        "31c728a7cc680bff215690ff2845a8ebdc66e57e",
        "f46f666f5403762facecf11bc465fb965de8b48a",
        "026316bd12f5ae6e1759ec9b32066d4fd3c9c586",
        "6339c7ff60c31cdb42af96e94552c790a03401f6",
        "1fbb0f1b9b49f5499008c59bcbd12a0402dacb81",
      ],
    },
    {
      emoji: "👍",
      name: "点赞",
      words: [
        "赞",
        "不错",
        "nice",
        "good",
        "棒",
        "好耶",
        "支持",
        "好活",
        "鸟不起",
        "资词",
        "星星眼",
        "拿捏",
        "优秀",
        "哟西",
      ],
    },
    {
      emoji: "😴",
      name: "睡了劳累",
      words: [
        "困",
        "倦",
        "睡",
        "累",
        "晚安",
        "哈欠",
        "zzz",
        "night",
        "瘫",
        "升天",
        "呼噜",
        "眠",
        "f2a0ab6d19b53ac5a67a1a79dcdfb6f2255cecc3",
        "b7dff82d645dc5f26023e0338e532f4e94fb0020",
        "e14af9764f5d3b5b6500f6ecd6cd4c6e7eb9c308",
        "1f71a02445ea62b0af1255ca7eb9cb1b90ab933c",
        "d07452b160ed15f0b8d7ecddbf29ada354df6939",
      ],
    },
    {
      emoji: "🪫",
      name: "摆烂放弃",
      words: [
        "不想动",
        "摆了",
        "毁灭吧",
        "无所谓",
        "寄了",
        "咕",
        "休息",
        "歇",
        "一滴也没",
        "心平气和",
        "功德增加",
        "蒜鸟",
        "算了",
        "完蛋",
        "瘫",
        "自闭",
        "放弃",
        "佛系",
        "随缘",
        "07db01e9df3376e659e8e80915dbe469f63939ff",
        "a0573ca4fa6937983574d7f02e20c84f8b8c91c9",
      ],
    },
    {
      emoji: "🙄",
      name: "尴尬无语",
      words: [
        "无语",
        "无话可说",
        "服了",
        "无奈",
        "尴尬",
        "社死",
        "绝了",
        "离谱",
        "嫌弃",
        "石化",
        "雷",
        "没辙",
        "叹气",
        "随便",
        "麻烦",
        "一般",
        "踢石子",
        "无聊",
        "哈欠",
        "投降",
        "头痛",
        "头疼",
        "我不好说",
        "麻了",
        "离大谱",
        "小丑",
        "完蛋",
        "没眼看",
        "好屑",
        "emmm",
        "挠头",
        "d9a1f82dac9133cf7b569c5bcb6fb09595b9f4fa",
        "2256af5b5965fbac5e7b0cf66235fa5d9bfa4823",
        "7479d66baf0ddc6b7d07bac8acfcecea51fde4af",
        "39ab2c5a6556da72d214bd6ce387b32ad38b1443",
        "e6dcec0bde4165cf0dc198d581799a7fb9f3155c",
        "49fa9a84e9fdace3faeee287ad2b9b9ffa34443f",
        "ca2cb2ef5741d52feda2a63f9efd7510a101d05a",
        "8a36bb55de6d086cc3448260cb044be7e24ed68c",
        "c70dd6628af80edd548b4a84008ef37c26f6af06",
      ],
    },
    {
      emoji: "✔️",
      name: "附和",
      words: [
        "确实",
        "对对对",
        "没错",
        "是的",
        "有道理",
        "赞同",
        "说得对",
        "正确",
        "ok",
        "可以",
        "鸟解",
        "我觉得行",
        "我觉得星",
        "靠谱",
        "a85ea2acc418c4368d4df072e4901cc6aa50de29",
        "7abeac6f1b8458b32067cdb8b991751075216cf4",
        "247bf6a6fd67f6c78202dfc1af701eab28968a15",
      ],
    },
    {
      emoji: "🚫",
      name: "否定拒绝",
      words: [
        "不要",
        "不行",
        "拒绝",
        "打咩",
        "达咩",
        "不可以",
        "算了",
        "别",
        "不约",
        "装傻",
        "一般",
        "反驳",
        "不是吧",
        "离谱了",
        "扯",
        "瞎说",
        "你在说啥",
        "这不对吧",
        "胡说",
        "否认",
        "不行",
        "不约",
        "不可以",
        "别这样",
        "想peach",
        "想桃吃",
        "下次一定",
        "!不要过来",
        "!别急",
        "!别走",
        "87c788aa57588c6dac5f15cf02528e584af63307",
        "b694c8d83c0577eef470d4fba84eea95c241aff4",
      ],
    },
    {
      emoji: "🥰",
      name: "可爱调皮",
      words: [
        "可爱",
        "萌",
        "卡哇伊",
        "乖巧",
        "kira",
        "歪头",
        "歪脑",
        "软软",
        "rua",
        "超凶",
        "略略略",
        "变猪",
        "嘻嘻",
        "不愧是我",
        "得意",
        "坏笑",
        "没钱",
        "学习",
        "wink",
        "耍赖",
        "鬼脸",
        "我装的",
        "挠头",
        "嘲笑",
        "9403291378cef79b8b9d4efcf889bee138a57520",
        "303559cec0d604130fec71a78c58fbfe1806bfcd",
        "2277c2b72646cf22a7217897f3cd62c5c80a6451",
        "a27d28d382adba86d1e16c9d4dc03d609d7beca3",
        "8a36bb55de6d086cc3448260cb044be7e24ed68c",
        "ba03f95ebe480106806377024e0c93ddb9c0f836",
        "8979109a229b06e283e858add84c7df6b362c0f5",
      ],
    },
    {
      emoji: "💪",
      name: "加油",
      words: [
        "加油",
        "冲",
        "努力",
        "打气",
        "奥利给",
        "干杯",
        "冲鸭",
        "狠狠干",
        "拼了",
        "火力全开",
        "6339c7ff60c31cdb42af96e94552c790a03401f6",
      ],
    },
    {
      emoji: "🍔",
      name: "吃饭",
      words: [
        "吃",
        "饭",
        "干饭",
        "恰饭",
        "好吃",
        "美味",
        "补充",
        "炫",
        "饿",
        "打嗝",
        "嗦面",
        "外卖",
        "碗",
        "b2770b50f152085a06d538f8f43523693b2daf05",
        "b7bd4041a3bba02acbc98bfc8ee67317e3ce686b",
        "9f4aab378d9b34e3246320e1f2da8c632f834f4b",
      ],
    },
    {
      emoji: "😳",
      name: "思考呆滞",
      words: [
        "思考",
        "猜猜",
        "感受宇宙",
        "无欲无求",
        "看破",
        "8a36bb55de6d086cc3448260cb044be7e24ed68c",
      ],
    },
    {
      emoji: "🐟",
      name: "摸鱼放假",
      words: [
        "摸鱼",
        "摸了",
        "划水",
        "偷懒",
        "摆烂",
        "躺平",
        "休息",
        "歇",
        "不上班",
        "下班",
        "宅",
        "玩游戏",
        "看戏",
        "简单的快乐",
        "80dc69ad6d0c6858ffee40c8029478bb46745e8f",
      ],
    },
    {
      emoji: "💼",
      name: "上班忙碌",
      words: [
        "上班",
        "忙碌",
        "加班",
        "工作",
        "干活",
        "搬砖",
        "社畜",
        "!不上班",
      ],
    },
    { emoji: "🥶", name: "好冷", words: ["冷", "冻", "冰", "寒", "!冷漠"] },
    { emoji: "🥵", name: "好热", words: ["热", "烫", "晒", "融化", "温"] },
    {
      emoji: "👀",
      name: "偷看",
      words: [
        "暗中观察",
        "探头",
        "偷看",
        "监视",
        "看看",
        "3fc4273a3cb4b189b473f0e1db51d7c064ae19c3",
        "59e34db87c0cb601a5e100c2db0ccfb2894aa02f",
        "eedd49d8d1d6c5b0eafc3e0a10966f508a7ab6f1",
        "7f99e8ee32fa081f183a25f7993fd7777aa69b4c",
        "55f62fd0e0073c86331a985fea951bc2a0fefbdc",
      ],
    },
    {
      emoji: "👊",
      name: "攻击",
      words: [
        "打",
        "戳",
        "揍",
        "锤",
        "敲",
        "拍",
        "拳",
        "拍",
        "扇",
        "削",
        "叉",
        "korosuzo",
        "凶",
        "比兜",
        "威胁",
        "!打call",
        "!打咩",
        "!超凶",
        "!打动",
        "!打扰",
        "!拍拍",
        "14c7e6a6e76c485a1bff5b996bedd77a3a88dc78",
        "0e890049bf07da351168f634dac373b3cff68949",
        "b679f56e9784a37eeef17fd7e8136e0aefe25414",
        "76a37daa8162b5c88411fe5621078fe188114bf9",
      ],
    },
    {
      emoji: "⚡",
      name: "催促",
      words: [
        "快点",
        "^快",
        "赶紧",
        "抓紧",
        "速度",
        "gkd",
        "^急",
        "go",
        "急急",
        "快上车",
        "赶快",
      ],
    },
    {
      emoji: "😎",
      name: "酷",
      words: [
        "帅",
        "酷",
        "谁也不爱",
        "得意",
        "厉害吧",
        "高冷",
        "冷漠",
        "无情",
        "社会",
        "大佬",
        "人生赢家",
        "ea13bd5ebe0054bd2f9756fa96d839bb1bbc0f8b",
        "9c5b4401362643b45b6af6768def2d504fb93396",
      ],
    },
    {
      emoji: "🍀",
      name: "祝福",
      words: [
        "好运",
        "红包",
        "发财",
        "恭喜",
        "愿",
        "流星",
        "锦鲤",
        "心想事成",
        "92844b770762494677d2b87d2c55e6862f124b78",
      ],
    },
  ];
  let _savedSearchKeyword = "";
  let _savedTabIndex = 0;
  function injectStyle() {
    if (document.getElementById("tm-style")) return;
    const style = document.createElement("style");
    style.id = "tm-style";
    style.textContent = `.tm-category-item.tm-active{background:#fb7299!important;color:#fff!important;box-shadow:0 0 0 1px rgba(251,114,153,.25)}.dialog-ctnr.emoticons{height:460px!important}.danmaku-preference-ctnr[data-v-041466f0]{height:370px!important}.tm-btn{position:absolute;top:50%;transform:translateY(-50%);transition:.3s;width:50px;height:80px;background:rgba(0,0,0,0.2);color:#fff;border:none;cursor:pointer;z-index:99999;font-size:24px;line-height:80px;text-align:center}.tm-left{left:-160px!important;border-top-left-radius:8px;border-bottom-left-radius:8px}.tm-right{right:-52px;border-top-right-radius:8px;border-bottom-right-radius:8px}.tm-close{position:absolute;top:0px;right:-55px;width:48px;height:48px;background:rgba(0,0,0,0.3);color:#fff;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;z-index:99999;transition:.3s}.tm-cover{background:transparent;position:absolute;left:-1px;top:466px;width:72px;height:36px;z-index:1}div#aside-area-vm{overflow:visible;z-index:999}.tm-close:hover,.tm-btn:hover{background:rgba(0,0,0,0.6)}.tm-category-sidebar{position:absolute;left:-109px;top:1px;width:102px;height:442px;background:#ffffff;border-radius:12px;overflow-y:auto;padding:8px 4px;z-index:99998;display:flex;flex-direction:column;gap:2px}.tm-category-item{display:flex;align-items:center;gap:0px;padding:4px 4px;border-radius:9999px;background:#f6f7f8;border:none;font-size:12px;color:#222;cursor:pointer;transition:all.2s cubic-bezier(0.4,0,0.2,1);white-space:nowrap;margin:0px 3px;font-weight:500}.tm-category-item:hover{background:#fff;box-shadow:0 3px 10px rgba(251,114,153,0.3);transform:translateY(-1px)}.tm-category-item:active{transform:scale(0.96)}.border-box.dialog-ctnr.common-popup-wrap.top-left.emoticons{border-top-left-radius:0px;border-bottom-left-radius:0px}.tab-pane-content.ps.ps--theme_default.ps--active-x{transition:.2s;padding-bottom:2px}.tab-pane:hover.tab-pane-content.ps.ps--theme_default.ps--active-x,.tab-pane:focus.tab-pane-content.ps.ps--theme_default.ps--active-x{padding-bottom:12px}.ps__scrollbar-x-rail{height:15px!important}.ps__scrollbar-x{height:12px!important;top:1px!important}.border-box.dialog-ctnr.common-popup-wrap.top-left.emoticons{overflow:visible;position:absolute}.emoticon-item{position:relative}.emoticon-item::after{content:attr(title);position:absolute;left:50%;top:100%;transform:translateX(-50%)translateY(-10px);background:#ffffff;color:#000;padding:2px 4px;border-radius:6px;font-size:10px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity 0.2s ease}.emoticons-pane:hover.emoticon-item::after{opacity:0.65}.control-panel-icon-row.emoticons-panel[data-v-5031e2b2]{width:34px;height:34px;transform:scale(1.5);left:-6px}.like-btn{left:-15px}.tm-search-container{padding:5px 8px;background:#fff;border-bottom:1px solid#ebedf0;z-index:10;position:sticky;top:0;box-shadow:0 2px 4px rgba(0,0,0,0.05)}.tm-search-wrapper{display:flex;align-items:center;gap:6px}.tm-search-input-box{position:relative;flex:1 1 auto;min-width:0}.tm-search-input{width:100%;box-sizing:border-box;height:24px;padding:0 32px 0 40px;border:1px solid#e5e5e5;border-radius:9999px;font-size:14px;background:#f6f7f8;outline:none;transition:all.25s cubic-bezier(0.4,0,0.2,1);color:#222}.tm-search-icon{position:absolute;left:9px;top:50%;transform:translateY(-50%);font-size:1.3rem;color:#aaa;pointer-events:none;line-height:1}.tm-search-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:18px;color:#aaa;cursor:pointer;display:none;line-height:1;transition:color.2s}.tm-search-result{flex:0 0 auto;white-space:nowrap;font-size:13px;color:#fb7299}.emoticon-item.tm-highlight{position:relative;z-index:2}.emoticon-item.tm-highlight::before{content:'';position:absolute;inset:-6px;border:3px solid#fb7299;border-radius:12px;opacity:0.75;pointer-events:none;animation:tm-highlight-pulse 1.8s infinite ease-in-out}@keyframes tm-highlight-pulse{0%,100%{opacity:0.6;transform:scale(0.92)}50%{opacity:1;transform:scale(1.08)}}.emoticon-item.tm-highlight img{filter:drop-shadow(0 0 10px rgba(251,114,153,0.6))brightness(1)saturate(1.5);transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}.emoticon-item.tm-search-dim{filter:grayscale(0.2)brightness(0.82);opacity:0.9;transition:filter.2s,opacity.2s}body:not(.pure_room_root).chat-history-panel.chat-history-list{scrollbar-width:thin;padding:5px 0px 5px 10px}`;
    document.head.appendChild(style);
  }
  function parseKeywords(words) {
    const includes = [];
    const excludes = [];
    for (const w of words) {
      const s = String(w || "")
        .toLowerCase()
        .trim();
      if (!s) continue;
      if (s.startsWith("!")) {
        const inner = s.slice(1).trim();
        if (inner) excludes.push(inner);
      } else {
        includes.push(s);
      }
    }
    return { includes, excludes };
  }
  function matchMetaByKeywords(meta, { includes, excludes }) {
    if (
      excludes.length > 0 &&
      excludes.some((kw) => matchMetaByKeyword(meta, kw))
    ) {
      return false;
    }
    if (includes.length === 0) return true;
    return includes.some((kw) => matchMetaByKeyword(meta, kw));
  }
  function matchMetaByKeyword(meta, rawKw) {
    let kw = String(rawKw || "")
      .toLowerCase()
      .trim();
    if (!kw) return false;
    if (isHexIdKeyword(kw)) {
      return meta.src.includes(kw);
    } else {
      let exact = false;
      if (kw.startsWith("^")) {
        exact = true;
        kw = kw.slice(1).trim();
      }
      if (exact) {
        return meta.title === kw || meta.plain === kw;
      }
      return meta.title.includes(kw) || meta.plain.includes(kw);
    }
  }
  function getDialog() {
    return document.querySelector(".dialog-ctnr.emoticons");
  }
  function getTrigger() {
    return (
      document.querySelector('.emoticons-panel[title="表情包"]') ||
      document.querySelector(".emoticons-panel")
    );
  }
  function hideUnwantedTabs() {
    const dialog = getDialog();
    if (!dialog) return;
    const unwantedSrcs = ["4428c84e694fbf4e0ef6c06e958d9352c3582740"];
    const unwantedKeys = ["4428c84e694fbf4e0ef6c06e958d9352c3582740"];
    function isUnwanted(unwanted, src) {
      return unwanted.some((key) => src.includes(key));
    }
    const items = dialog.querySelectorAll(".tab-pane-item");
    Array.from(items).forEach((item) => {
      const img = item.querySelector("img");
      if (img && isUnwanted(unwantedSrcs, img.src)) item.remove();
    });
    const items2 = dialog.querySelectorAll(".emoticons-pane>.img-pane");
    items2.forEach((item) => {
      const imgs = item.querySelectorAll("img");
      const hasUnwanted = Array.from(imgs).some((img) => {
        const src = img.getAttribute("src") || img.src || "";
        return isUnwanted(unwantedKeys, src);
      });
      if (hasUnwanted) item.remove();
    });
  }
  function smoothScrollTo(element, targetLeft, duration = 240) {
    if (!element) return;
    const startLeft = element.scrollLeft;
    const distance = targetLeft - startLeft;
    let startTime = null;
    function step(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      element.scrollLeft = startLeft + distance * ease;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.scrollLeft = targetLeft;
        element.dispatchEvent(new Event("scroll", { bubbles: true }));
      }
    }
    requestAnimationFrame(step);
  }
  function centerActiveTab(dialog) {
    if (!dialog) return;
    const scroller = dialog.querySelector(".tab-pane-content");
    if (!scroller) return;
    const items = dialog.querySelectorAll(".tab-pane-item");
    if (!items.length) return;
    let activeIndex = [...items].findIndex((el) =>
      el.classList.contains("active"),
    );
    if (activeIndex < 0) activeIndex = 0;
    const activeItem = items[activeIndex];
    const itemLeft = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;
    const scrollerWidth = scroller.clientWidth;
    let targetScrollLeft = itemLeft + itemWidth / 2 - scrollerWidth / 2;
    const maxScroll = scroller.scrollWidth - scrollerWidth;
    targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll || 0));
    smoothScrollTo(scroller, targetScrollLeft);
  }
  function setupActiveObserver(dialog) {
    if (dialog.dataset.tmActiveObserver) return;
    dialog.dataset.tmActiveObserver = "true";
    const observer = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        if (mut.type === "attributes" && mut.attributeName === "class") {
          const el = mut.target;
          if (
            el.classList.contains("tab-pane-item") &&
            el.classList.contains("active")
          ) {
            setTimeout(() => centerActiveTab(dialog), 0);
            return;
          }
        }
      }
    });
    const container =
      dialog.querySelector(".tab-pane-content") ||
      dialog.querySelector(".emoticons-pane");
    if (container) {
      observer.observe(container, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }
  function move(dir) {
    const dialog = getDialog();
    if (!dialog) return;
    const visibleTabs = Array.from(
      dialog.querySelectorAll(".tab-pane-item"),
    ).filter((tab) => tab.style.display !== "none");
    if (!visibleTabs.length) return;
    let activeIndex = visibleTabs.findIndex((el) =>
      el.classList.contains("active"),
    );
    if (activeIndex === -1) activeIndex = 0;
    const nextIndex = activeIndex + dir;
    if (nextIndex < 0 || nextIndex >= visibleTabs.length) return;
    visibleTabs[nextIndex].click();
  }
  function goToFirst() {
    const dialog = getDialog();
    if (!dialog) return;
    const visibleTabs = Array.from(
      dialog.querySelectorAll(".tab-pane-item"),
    ).filter((tab) => tab.style.display !== "none");
    if (visibleTabs.length > 0) visibleTabs[0].click();
  }
  function goToLast() {
    const dialog = getDialog();
    if (!dialog) return;
    const visibleTabs = Array.from(
      dialog.querySelectorAll(".tab-pane-item"),
    ).filter((tab) => tab.style.display !== "none");
    if (visibleTabs.length > 0) visibleTabs[visibleTabs.length - 1].click();
  }
  function setupNavButton(btn, shortAction, longAction) {
    let timer = null;
    const LONG_PRESS_DELAY = 500;
    btn.addEventListener("mousedown", function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(() => {
        longAction();
        timer = null;
      }, LONG_PRESS_DELAY);
    });
    const handleMouseUp = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        shortAction();
      }
    };
    btn.addEventListener("mouseup", handleMouseUp);
    btn.addEventListener("mouseleave", function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    btn.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  }
  function bindHorizontalWheel(dialog) {
    if (!dialog) return;
    const pane = dialog.querySelector(".tab-pane");
    const scroller = dialog.querySelector(".tab-pane-content");
    if (!pane || !scroller) return;
    let isHover = false;
    let isScrolling = false;
    pane.addEventListener("mouseenter", () => {
      isHover = true;
    });
    pane.addEventListener("mouseleave", () => {
      isHover = false;
    });
    pane.addEventListener(
      "wheel",
      (e) => {
        if (!isHover) return;
        e.preventDefault();
        if (isScrolling) return;
        isScrolling = true;
        const delta = e.deltaY;
        const STEP = 240;
        let target = scroller.scrollLeft;
        if (delta > 0) target += STEP;
        else target -= STEP;
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        target = Math.max(0, Math.min(target, maxScroll || 0));
        smoothScrollTo(scroller, target);
        setTimeout(() => {
          isScrolling = false;
        }, 200);
      },
      { passive: false },
    );
  }
  function isHexIdKeyword(str) {
    return /^[a-f0-9]{16,}$/i.test(str);
  }
  function getSearchState(dialog) {
    if (dialog.__tmSearchState) return dialog.__tmSearchState;
    const tabs = Array.from(dialog.querySelectorAll(".tab-pane-item"));
    const panes = Array.from(dialog.querySelectorAll(".img-pane"));
    if (!tabs.length || !panes.length) return null;
    dialog.__tmSearchState = {
      tabs,
      panes,
      searchTab: tabs[0] || null,
      searchPane: panes[0] || null,
      originalSearchTabHTML: tabs[0] ? tabs[0].innerHTML : "",
      originalSearchPaneHTML: panes[0] ? panes[0].innerHTML : "",
      initialized: false,
    };
    return dialog.__tmSearchState;
  }
  function initSearchPlaceholder(dialog) {
    const state = getSearchState(dialog);
    if (!state || state.initialized) return;
    state.initialized = true;
    if (state.searchTab) {
      state.searchTab.style.display = "none";
      state.searchTab.innerHTML = state.originalSearchTabHTML;
    }
    if (state.searchPane) {
      state.searchPane.style.display = "none";
      state.searchPane.innerHTML = state.originalSearchPaneHTML;
    }
    const firstNormal = state.tabs
      .slice(1)
      .find((tab) => tab.style.display !== "none");
    if (firstNormal) firstNormal.click();
  }
  function collectAllEmoticonMeta(dialog) {
    const state = getSearchState(dialog);
    if (!state) return [];
    const metas = [];
    state.panes.slice(1).forEach((pane, paneIndexOffset) => {
      const paneIndex = paneIndexOffset + 1;
      const wrap = pane.querySelector(".emotion-wrap");
      if (!wrap) return;
      Array.from(wrap.querySelectorAll(".emoticon-item")).forEach(
        (node, itemIndex) => {
          const titleRaw = (node.getAttribute("title") || "").trim();
          const title = titleRaw.toLowerCase();
          const plain = titleRaw.replace(/^\[(.*)\]$/, "$1").toLowerCase();
          const img = node.querySelector("img");
          const src = (
            img?.getAttribute("src") ||
            img?.src ||
            ""
          ).toLowerCase();
          metas.push({ node, paneIndex, itemIndex, title, plain, src });
        },
      );
    });
    return metas;
  }
  function resetEmoticonMarks(dialog) {
    dialog
      .querySelectorAll(
        ".emoticon-item.tm-highlight, .emoticon-item.tm-search-dim",
      )
      .forEach((el) => {
        el.classList.remove("tm-highlight", "tm-search-dim");
      });
  }
  function buildProxyItem(originalNode) {
    const proxy = originalNode.cloneNode(true);
    proxy.removeAttribute("style");
    proxy.classList.remove("tm-highlight", "tm-search-dim");
    proxy.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        originalNode.click();
      },
      true,
    );
    proxy.addEventListener(
      "mousedown",
      (e) => {
        e.stopPropagation();
      },
      true,
    );
    return proxy;
  }
  function prepareSearchPane(dialog) {
    const state = getSearchState(dialog);
    if (!state || !state.searchPane || !state.searchTab) return null;
    state.searchTab.innerHTML =
      '<span style="font-size:18px;line-height:1;">🔍</span>';
    state.searchTab.style.display = "";
    state.searchPane.innerHTML = `<!----><!----><div id="tm-search-emotion-wrap"data-v-041466f0 class="emotion-wrap"></div>`;
    state.searchPane.style.display = "";
    return state.searchPane.querySelector("#tm-search-emotion-wrap");
  }
  function restoreSearchPane(dialog) {
    const state = getSearchState(dialog);
    if (!state || !state.searchPane || !state.searchTab) return;
    state.searchPane.innerHTML = state.originalSearchPaneHTML;
    state.searchPane.style.display = "none";
    state.searchTab.innerHTML = state.originalSearchTabHTML;
    state.searchTab.style.display = "none";
  }
  function clearSearchMode(dialog) {
    const state = getSearchState(dialog);
    if (!state) return;
    resetEmoticonMarks(dialog);
    restoreSearchPane(dialog);
    state.tabs.slice(1).forEach((tab) => {
      tab.style.display = "";
    });
    const resultEl = document.querySelector(
      "#bSearchContainer .tm-search-result",
    );
    const clearBtn = document.querySelector(
      "#bSearchContainer .tm-search-clear",
    );
    if (resultEl) resultEl.textContent = "";
    if (clearBtn) clearBtn.style.display = "none";
    const firstNormal = state.tabs
      .slice(1)
      .find((tab) => tab.style.display !== "none");
    if (firstNormal) firstNormal.click();
  }
  function runSearch(dialog, matcher) {
    const state = getSearchState(dialog);
    if (!state) return 0;
    resetEmoticonMarks(dialog);
    const searchWrap = prepareSearchPane(dialog);
    if (!searchWrap) return 0;
    searchWrap.scrollTop = 0;
    searchWrap.parentElement && (searchWrap.parentElement.scrollTop = 0);
    const metas = collectAllEmoticonMeta(dialog);
    let totalMatches = 0;
    const matchPaneIndexes = new Set();
    const fragment = document.createDocumentFragment();
    metas.forEach((meta) => {
      const ok = !!matcher(meta);
      if (ok) {
        totalMatches++;
        matchPaneIndexes.add(meta.paneIndex);
        meta.node.classList.add("tm-highlight");
        fragment.appendChild(buildProxyItem(meta.node));
      } else {
        meta.node.classList.add("tm-search-dim");
      }
    });
    searchWrap.innerHTML = "";
    searchWrap.appendChild(fragment);
    searchWrap.scrollTop = 0;
    searchWrap.parentElement && (searchWrap.parentElement.scrollTop = 0);
    state.tabs.forEach((tab, idx) => {
      if (idx === 0) return;
      tab.style.display = matchPaneIndexes.has(idx) ? "" : "none";
    });
    state.searchTab.style.display = "";
    state.searchPane.style.display = "";
    setTimeout(() => {
      state.searchTab?.click();
    }, 0);
    return totalMatches;
  }
  function getCategoryByKeyword(k) {
    return (
      categories.find(
        (cat) =>
          k === `${cat.emoji}${cat.name}`.toLowerCase() ||
          k === cat.name.toLowerCase() ||
          k === cat.emoji,
      ) || null
    );
  }
  function applyFilter(keyword) {
    _savedSearchKeyword = keyword || "";
    const dialog = getDialog();
    if (!dialog) return;
    const k = (keyword || "").toLowerCase().trim();
    const searchContainer = document.querySelector("#bSearchContainer");
    const clearBtn = searchContainer?.querySelector(".tm-search-clear");
    const resultEl = searchContainer?.querySelector(".tm-search-result");
    if (!k) {
      clearSearchMode(dialog);
      clearActiveCategorySidebar(dialog);
      return;
    }
    if (clearBtn) clearBtn.style.display = "block";
    const matchedCat = getCategoryByKeyword(k);
    let count;
    if (matchedCat) {
      setActiveCategorySidebar(dialog, matchedCat.name);
      const parsed = parseKeywords(matchedCat.words);
      count = runSearch(dialog, (meta) => matchMetaByKeywords(meta, parsed));
      if (resultEl) {
        resultEl.textContent =
          count > 0
            ? `${matchedCat.emoji}${matchedCat.name}(${count}个)`
            : `${matchedCat.emoji}${matchedCat.name}无匹配`;
      }
    } else {
      clearActiveCategorySidebar(dialog);
      const parsed = parseKeywords([k]);
      count = runSearch(dialog, (meta) => matchMetaByKeywords(meta, parsed));
      if (resultEl) {
        resultEl.textContent = count > 0 ? `找到${count}个` : "无匹配的表情";
      }
    }
  }
  function betterEmotion() {
    const dialog = getDialog();
    if (!dialog) return;
    dialog
      .querySelectorAll(".img-pane .emoticon-item img, .tab-pane-item img")
      .forEach((img) => {
        const src = img.getAttribute("src");
        if (!src) return;
        const match = src.match(/@(\d+)w\.webp$/);
        if (!match) return;
        const width = parseInt(match[1], 10);
        const target = 130;
        if (width < target) {
          const newSrc = src.replace(/@\d+w\.webp$/, "@" + target + "w.webp");
          img.setAttribute("src", newSrc);
        }
      });
  }
  function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.className = "tm-category-sidebar";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "tm-category-item";
      btn.dataset.catName = cat.name;
      btn.innerHTML = `<span style="font-size:18px;flex-shrink:0;">${cat.emoji}</span><span>${cat.name}</span>`;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        _savedTabIndex = 0;
        const input = document.querySelector(".tm-search-input");
        if (input) {
          const val = `${cat.emoji}${cat.name}`;
          input.value = val;
          applyFilter(val);
          input.focus();
        }
      });
      sidebar.appendChild(btn);
    });
    return sidebar;
  }
  function setActiveCategorySidebar(dialog, catName) {
    const sidebar = dialog?.querySelector(".tm-category-sidebar");
    if (!sidebar) return;
    sidebar.querySelectorAll(".tm-category-item").forEach((btn) => {
      btn.classList.toggle("tm-active", btn.dataset.catName === catName);
    });
  }
  function clearActiveCategorySidebar(dialog) {
    const sidebar = dialog?.querySelector(".tm-category-sidebar");
    if (!sidebar) return;
    sidebar.querySelectorAll(".tm-category-item").forEach((btn) => {
      btn.classList.remove("tm-active");
    });
  }
  function setupEnhancedUI(dialog) {
    if (dialog.dataset.tmEnhancedSetup) return;
    dialog.dataset.tmEnhancedSetup = "true";
    const emoticonsPane = dialog.querySelector(".emoticons-pane");
    if (!emoticonsPane) return;
    const state = getSearchState(dialog);
    if (state) {
      state.tabs.forEach((tab, i) => {
        tab.addEventListener("click", (e) => {
          if (!e.isTrusted) return;
          if (i === 0) return;
          _savedTabIndex = i - 1;
          console.log("s", _savedTabIndex);
        });
      });
    }
    const savedIdx = _savedTabIndex;
    initSearchPlaceholder(dialog);
    const searchHTML = `<div class="tm-search-container"><div class="tm-search-wrapper"><div class="tm-search-input-box"><span class="tm-search-icon">🔍</span><input type="text"class="tm-search-input"placeholder="搜索表情包..."><span class="tm-search-clear"style="display:none;">✕</span></div><span class="tm-search-result"style="margin-left:12px; font-size:13px; color:#fb7299; white-space:nowrap;"></span></div></div>`;
    const searchOuter = document.createElement("div");
    searchOuter.id = "bSearchContainer";
    searchOuter.innerHTML = searchHTML;
    emoticonsPane.insertBefore(searchOuter, emoticonsPane.firstChild);
    const input = searchOuter.querySelector(".tm-search-input");
    const clearBtn = searchOuter.querySelector(".tm-search-clear");
    let isComposing = false;
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
      applyFilter(input.value);
    });
    input.addEventListener("input", (e) => {
      if (isComposing || e.isComposing) return;
      applyFilter(input.value);
    });
    input.addEventListener("input", () => applyFilter(input.value));
    clearBtn.addEventListener("click", () => {
      input.value = "";
      applyFilter("");
      input.focus();
    });
    if (_savedSearchKeyword) {
      input.value = _savedSearchKeyword;
      clearBtn.style.display = "block";
      setTimeout(() => applyFilter(_savedSearchKeyword), 30);
    }
    const state2 = getSearchState(dialog);
    if (state2) {
      const normalTabs = state2.tabs.filter((t) => t.style.display !== "none");
      const target = normalTabs[savedIdx] || normalTabs[0];
      console.log("g", savedIdx, target, normalTabs);
      if (target) setTimeout(() => target.click(), 50);
    }
  }
  function addButtons() {
    const dialog = getDialog();
    if (!dialog) return;
    if (!dialog.querySelector(".tm-category-sidebar")) {
      dialog.appendChild(createSidebar());
    }
    if (!dialog.querySelector(".tm-left")) {
      const l = document.createElement("button");
      l.className = "tm-btn tm-left";
      l.innerText = "‹";
      setupNavButton(l, () => move(-1), goToFirst);
      dialog.appendChild(l);
    }
    if (!dialog.querySelector(".tm-right")) {
      const r = document.createElement("button");
      r.className = "tm-btn tm-right";
      r.innerText = "›";
      setupNavButton(r, () => move(1), goToLast);
      dialog.appendChild(r);
    }
    if (!dialog.querySelector(".tm-close")) {
      const closeBtn = document.createElement("button");
      closeBtn.className = "tm-close";
      closeBtn.innerText = "✕";
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        const trigger = getTrigger();
        if (trigger) trigger.click();
        else dialog.style.display = "none";
      };
      dialog.appendChild(closeBtn);
    }
    if (!dialog.querySelector(".tm-cover")) {
      const cover = document.createElement("div");
      cover.className = "tm-cover";
      cover.innerText = "";
      dialog.appendChild(cover);
    }
    if (!dialog.dataset.tmPreventClose) {
      dialog.dataset.tmPreventClose = "true";
      const prevent = (e) => e.stopImmediatePropagation();
      ["mouseleave", "pointerleave", "mouseout"].forEach((ev) => {
        dialog.addEventListener(ev, prevent, true);
        const inner = dialog.querySelector(".danmaku-preference-ctnr");
        if (inner) inner.addEventListener(ev, prevent, true);
      });
    }
    if (!dialog.dataset.tmInitialized) {
      dialog.dataset.tmInitialized = "true";
      waitForElement(".emoticons-pane", dialog)
        .then(() => {
          hideUnwantedTabs();
          bindHorizontalWheel(dialog);
          centerActiveTab(dialog);
          setupActiveObserver(dialog);
          setupEnhancedUI(dialog);
        })
        .catch(() => {});
    }
  }
  function waitForElement(selector, root = document, timeout = 3000) {
    return new Promise((resolve, reject) => {
      const found = root.querySelector(selector);
      if (found) return resolve(found);
      const observer = new MutationObserver(() => {
        const el = root.querySelector(selector);
        if (el) {
          observer.disconnect();
          clearTimeout(timer);
          resolve(el);
        }
      });
      observer.observe(root, { childList: true, subtree: true });
      const timer = setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout waiting for ${selector}`));
      }, timeout);
    });
  }
  function focusSearch() {
    const dialog = getDialog();
    if (!dialog) return;
    const input = dialog.querySelector(".tm-search-input");
    if (input) {
      input.focus();
      input.select();
    }
  }
  function bindHotkey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const input = document.querySelector(".tm-search-input");
        if (input && document.activeElement === input) {
          input.value = "";
          applyFilter("");
          input.blur();
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      if (!e.ctrlKey) return;
      if (e.key === "b") {
        e.preventDefault();
        document.querySelector(".emoticons-panel.p-relative").click();
        return;
      }
      const dialog = getDialog();
      const input = document.querySelector(".tm-search-input");
      if (!dialog) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        focusSearch();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (input) {
          input.value = "";
          applyFilter("");
        }
        return;
      }
      const tag = document.activeElement?.tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA";
      if (isInput && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      }
    });
  }
  const observer = new MutationObserver(() => {
    injectStyle();
    addButtons();
    betterEmotion();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  bindHotkey();
})();
