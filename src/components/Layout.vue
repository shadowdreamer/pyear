<template>
  <div class="warp">
    <div
      class="layout"
      id="topic"
    >
      <img
        src="../assets/logo.png"
        alt="logo"
        class="logo"
      >
      <div class="tittle">
        <p>
          百万现场剧场时光年鉴
        </p>
        <span>2018</span>
      </div>
      <div class="avata">
        <span>PRODUCER NAME</span>
        <p>

          {{pdata.pname}}P
        </p>

      </div>
      <div class="items">
        <p><em>{{pdata.time|timeModify}}</em>您初次在765Pro Theater与偶像们相遇。</p>
        <P>今天是您在765Pro Theater的第<em>{{Math.round((new Date().getTime()-pdata.time)/86400000)}}</em>天。</P>
        <p>您的PLv是<em>{{pdata.plv}}</em>,超过了全世界<em>{{pdata.plv|plvPercent}}%</em>的玩家</p>
        <p>您与<em><span :style="{color:imageColor[pdata.idol]}">{{pdata.idol}}</span></em>的亲密度最高，达到了<em>{{pdata.idolLove}}</em>,
          应该是一名<em><span :style="{color:imageColor[pdata.idol]}">{{pdata.idol}}</span></em>P。</p>
        <p>您的粉丝分部情况如下：</p>
        <g2radius
          :fans="pdata.fans"
          :fanTotal="pdata.fanTotal"
          :imageColor="imageColor"
        ></g2radius>

        <p>2018年您增加了<em>{{pdata.friend}}</em>个同僚,最近和他们聊过天吗？。</p>
        <p>您一共送出了<em>{{pdata.flowerSend}}</em>个花篮，收到了<em>{{pdata.flowerResive}}</em>个花篮，您的无私奉献让世界更美好。</p>
        <p>2018年，你在活动<em>{{pdata.eventName}}</em>中大放异彩，挤进了前<em>{{pdata.eventRank}}</em>名。</p>
        <p class="word">“灭了同担”</p>
        <p>在过去的2018年里您一共打了<em>{{pdata.songCount}}</em>首歌，其中FC的回数是<em>{{pdata.SongFcCount}}</em>。</p>

        <p>您MillonMix模式下FC的歌有<em>{{pdata.fcTotal}}</em>首，FC率达到了<em>{{Math.round(pdata.fcTotal*100/74)}}</em>%，真了不起。</p>
        <p><em>{{pdata.songMost}}</em>是您打的最多的一首歌，一共打了<em>{{pdata.songMostCount}}</em>次，您一定很喜欢这首歌。</p>
        <p>2018年您一共抽了<em>{{pdata.gashaCount}}</em>次卡，增加了<em>{{pdata.SSRCount}}</em>个new SSR。</p>
        <p class="word">
          “万代亏了我赚了”
        </p>
        <p>去年您抽了<em>{{pdata.pinkGasha}}</em>次粉币，出现了<em>{{pdata.pinkSSR}}</em>次SSR。</p>
        <p class="word">“都市传说”</p>
        <p>您完全觉醒了<em>{{pdata.aniva}}</em>个一周年纪念卡，一周年活动真是令人怀念。</p>
        <p class="word">
          “这歌声就是UNION！”
        </p>
      </div>

      <div class="foot">
        <p>2019年も<br>これからも<br><em>アイマス</em>ですよ</p>
      </div>
      <div class="qr">
        <img
          src="../assets/qr.png"
          alt="qrcode"
        >
        <p>扫码给我也弄一个</p>
      </div>
    </div>
    <div
      class="enquete"
      v-show="enqueteON"
    >
      tips:参考游戏内数据，有些可以估算。
      <p>
        普罗丢撒name：
        <el-input
          style="width:150px"
          v-model="input.pname"
        ></el-input>&nbsp;P
      </p>
      <p>初次登入MLTD的日期：
        <el-date-picker
          v-model="input.time"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </p>
      <p>

        <p>Plv是多少：
          <el-input-number
            style="width:150px'"
            v-model="input.plv"
            :controls="false"
          ></el-input-number>
        </p>
        <p>亲密度最高的偶像：
          <el-select
            v-model="input.idol"
            placeholder="选，都可以选"
            filterable
          >
            <el-option
              v-for="item in idollist"
              :key="item.label"
              :value="item.name"
            ></el-option>
          </el-select>
          <br>
        </p>
        <p>亲密度为：
          <el-input-number
            style="width:150px'"
            v-model="input.idolLove"
            :controls="false"
          ></el-input-number>
        </p>
        <p>
          粉丝总数： <el-input-number
            style="width:150px'"
            v-model="input.fanTotal"
            :controls="false"
          ></el-input-number>
        </p>
        <p>
          最高的几位，会自动加一个“其他”<br>
          <ul>
            <span style="display:inline-block;width:40px"></span>
            <span style="display:inline-block;width:120px">偶像</span>
            <span style="display:inline-block;width:50px">粉丝数</span>
            <li
              v-for="(item,index) in input.fans"
              :key="index"
            >
              <el-select
                v-model="item.name"
                placeholder="选，都可以选"
                filterable
                style="width:150px"
              >
                <el-option
                  v-for="item in idollist"
                  :key="item.label"
                  :value="item.name"
                ></el-option>
              </el-select>
              &nbsp;
              <el-input-number
                v-model="item.value"
                controls-position="right"
                style="width:120px"
                :controls="false"
              ></el-input-number>
              &nbsp;&nbsp;

              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteidol(index)"
                plain
              ></el-button>
            </li>
          </ul>
          <el-button
            plain
            @click="addidol"
            style="margin-left:100px;width:200px"
          >增加偶像</el-button>
        </p>
        <p>

          今年加了多少好友：<el-input-number
            v-model="input.friend"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <P>

          送了多少花：<el-input-number
            v-model="input.flowerSend"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
          收到多少花：<el-input-number
            v-model="input.flowerResive"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </P>
        <p>

          18年排名最高的活动： <el-select
            v-model="input.eventName"
            filterable
          >
            <el-option
              v-for="item in eventList"
              :key=item
              :value="item"
            ></el-option>
          </el-select><br>
          这个活动的排名是：<el-input-number
            v-model="input.eventRank"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <p>

          18年大概打了多少歌：<el-input-number
            v-model="input.songCount"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
          FC了多少次：<el-input-number
            v-model="input.SongFcCount"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <p>

          mmfc了几首：<el-input-number
            v-model="input.fcTotal"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <p>

          打的最多的歌： <el-select
            v-model="input.songMost"
            placeholder="选，都可以选"
            filterable
          >
            <el-option
              v-for="item in songList"
              :key="item"
              :value="item"
            ></el-option>
          </el-select><br>
          打了多少次：<el-input-number
            v-model="input.songMostCount"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <p>

          大概抽了多少抽：<el-input-number
            v-model="input.gashaCount"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
          弄个多少ssr：<el-input-number
            v-model="input.SSRCount"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <p>

          大概抽了多少粉币：<el-input-number
            v-model="input.pinkGasha"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
          粉币ssr：<el-input-number
            v-model="input.pinkSSR"
            style="width:100px"
            :controls="false"
          ></el-input-number><br>
        </p>
        <p>

          周年卡觉醒了几个：<el-input-number
            v-model="input.aniva"
            style="width:100px"
            :controls="false"
          ></el-input-number>
        </p>
        <div class="nothing">&nbsp;</div>
        <div class="submit">
          <el-button
            @click="enqueteON = false"
            type="warning"
            plain
          >取消</el-button>

          <el-button
            @click="submit"
            type="success"
            plain
          >完成</el-button>

        </div>
    </div>

    <div class="buttons">
      <div
        v-show="phone"
        v-loading='loading'
      >
        <p id=img></p><br>
        ↑右键或者长按
      </div>
      <el-button
        @click="enqueteON = true"
        type="primary"
        plain
      >编辑数据</el-button>
      <el-button
        @click="toPic"
        type="success"
        plain
      >生成图片</el-button>
    </div>
  </div>
</template>

<script>
import G2radius from "./G2radius";
export default {
  data() {
    return {
      pdata: {},
      enqueteON: false,
      input: {},
      idollist: [
        { name: "白石紬", color: "#ebe1ff", lable: "0" },
        { name: "天海春香", color: "#e22b30", label: "1" },
        { name: "如月千早", color: "#2743d2", lable: "2" },
        { name: "萩原雪歩", color: "#2743d2", lable: "3" },
        { name: "高槻やよい", color: "#f39939", lable: "4" },
        { name: "秋月律子", color: "#01a860", lable: "5" },
        { name: "三浦あずさ", color: "#9238be", lable: "6" },
        { name: "水瀬伊織", color: "#fd99e1", lable: "7" },
        { name: "菊地真", color: "#515558", lable: "8" },
        { name: "双海亜美/真美", color: "#ffe43f", lable: "9" },
        { name: "星井美希", color: "#b4e04b", lable: "10" },
        { name: "我那覇響", color: "#01adb9", lable: "11" },
        { name: "四条貴音", color: "#a6126a", lable: "12" },
        { name: "伊吹翼", color: "#fed552", lable: "13" },
        { name: "エミリー", color: "#554171", lable: "14" },
        { name: "大神環", color: "#ee762e", lable: "15" },
        { name: "春日未来", color: "#ea5b76", lable: "16" },
        { name: "北上麗花", color: "#6bb6b0", lable: "17" },
        { name: "北沢志保", color: "#afa690", lable: "18" },
        { name: "木下ひなた", color: "#d1342c", lable: "19" },
        { name: "高坂海美", color: "#e9739b", lable: "20" },
        { name: "佐竹美奈子", color: "#58a6dc", lable: "21" },
        { name: "篠宮可憐", color: "#b63b40", lable: "22" },
        { name: "島原エレナ", color: "#9bce92", lable: "23" },
        { name: "ジュリア", color: "#d7385f", lable: "24" },
        { name: "周防桃子", color: "#efb864", lable: "25" },
        { name: "高山紗代子", color: "#7f6575", lable: "26" },
        { name: "田中琴葉", color: "#92cfbb", lable: "27" },
        { name: "天空橋朋花", color: "#bee3e3", lable: "28" },
        { name: "徳川まつり", color: "#5abfb7", lable: "29" },
        { name: "所恵美", color: "#454341", lable: "30" },
        { name: "豊川風花", color: "#7278a8", lable: "31" },
        { name: "中谷育", color: "#f7e78e", lable: "32" },
        { name: "永吉昴", color: "#aeb49c", lable: "33" },
        { name: "七尾百合子", color: "#c7b83c", lable: "34" },
        { name: "二階堂千鶴", color: "#f19557", lable: "35" },
        { name: "野々原茜", color: "#eb613f", lable: "36" },
        { name: "箱崎星梨花", color: "#ed90ba", lable: "37" },
        { name: "馬場このみ", color: "#f1becb", lable: "38" },
        { name: "福田のり子", color: "#eceb70", lable: "39" },
        { name: "舞浜歩", color: "#e25a9b", lable: "40" },
        { name: "真壁瑞希", color: "#99b7dc", lable: "41" },
        { name: "松田亜利沙", color: "#b54461", lable: "42" },
        { name: "宮尾美也", color: "#b54461", lable: "43" },
        { name: "最上静香", color: "#6495cf", lable: "44" },
        { name: "望月杏奈", color: "#7e6ca8", lable: "45" },
        { name: "百瀬莉緒", color: "#f19591", lable: "46" },
        { name: "矢吹可奈", color: "#f5ad3b", lable: "47" },
        { name: "横山奈緒", color: "#788bc5", lable: "48" },
        { name: "ロコ", color: "#fff03c", lable: "49" },
        { name: "桜守歌織", color: "#274079", lable: "50" }
      ],
      imageColor: {
        天海春香: "#e22b30",
        如月千早: "#2743d2",
        萩原雪歩: "#2743d2",
        高槻やよい: "#f39939",
        秋月律子: "#01a860",
        三浦あずさ: "#9238be",
        水瀬伊織: "#fd99e1",
        菊地真: "#515558",
        "双海亜美/真美": "#ffe43f",
        星井美希: "#b4e04b",
        我那覇響: "#01adb9",
        四条貴音: "#a6126a",
        伊吹翼: "#fed552",
        エミリー: "#554171",
        大神環: "#ee762e",
        春日未来: "#ea5b76",
        北上麗花: "#6bb6b0",
        北沢志保: "#afa690",
        木下ひなた: "#d1342c",
        高坂海美: "#e9739b",
        佐竹美奈子: "#58a6dc",
        篠宮可憐: "#b63b40",
        島原エレナ: "#9bce92",
        ジュリア: "#d7385f",
        周防桃子: "#efb864",
        高山紗代子: "#7f6575",
        田中琴葉: "#92cfbb",
        天空橋朋花: "#bee3e3",
        徳川まつり: "#5abfb7",
        所恵美: "#454341",
        豊川風花: "#7278a8",
        中谷育: "#f7e78e",
        永吉昴: "#aeb49c",
        七尾百合子: "#c7b83c",
        二階堂千鶴: "#f19557",
        野々原茜: "#eb613f",
        箱崎星梨花: "#ed90ba",
        馬場このみ: "#f1becb",
        福田のり子: "#eceb70",
        舞浜歩: "#e25a9b",
        真壁瑞希: "#99b7dc",
        松田亜利沙: "#b54461",
        宮尾美也: "#b54461",
        最上静香: "#6495cf",
        望月杏奈: "#7e6ca8",
        百瀬莉緒: "#f19591",
        矢吹可奈: "#f5ad3b",
        横山奈緒: "#788bc5",
        ロコ: "#fff03c",
        桜守歌織: "#274079",
        白石紬: "#ebe1ff",
        其他: "#ccc"
      },
      eventList: [
        "～HOME, SWEET FRIENDSHIP～",
        "～昏き星、遠い月～",
        "～合言葉はスタートアップ！～",
        "〜虹色letters〜",
        "～星屑のシンフォニア～",
        "～ZETTAI × BREAK!! トゥインクルリズム～",
        "～ジレるハートに火をつけて～",
        "～Melty Fantasia～",
        "～Birth of Color～",
        "～花ざかりWeekend✿～",
        "～Eternal Harmony～",
        "BRAND★NEW★PERFORM@NCE!!!",
        "～Blooming Star～",
        "～サンリズム・オーケストラ♪～",
        "～ビッグバンズバリボー!!!!!～",
        "～brave HARMONY～",
        "～オーディナリィ・クローバー～",
        "～Starry Melody～",
        "～ラスト・アクトレス～",
        "～ジャングル☆パーティー～",
        "～ハーモニクス～",
        "～PRETTY DREAMER～",
        "～ハルマチ女子～"
      ],
      songList: [
        "Brand New Theater",
        "THE IDOLM＠STER",
        "Thank You！",
        "自分REST＠RT",
        "READY‼",
        "Welcome‼",
        "待ち受けプリンス",
        "UNION‼",
        "Blooming Star",
        "ToP!!!!!!!!!!!!!",
        "Dreaming！",
        "メリー",
        "THE IDOLM＠STER 初星-mix",
        "ココロがかえる場所",
        "素敵なキセキ",
        "透明なプロローグ",
        "スマイルいちばん",
        "ハッピー☆ラッキー☆ジェットマシーン",
        "Growing Storm！",
        "オリジナル声になって",
        "Princess Be Ambitious‼",
        "HOME，SWEET FRIENDSHIP",
        "合言葉はスタートアップ！",
        "ココロ☆エクササイズ",
        "ZETTAI × BREAK‼ トゥインクルリズム",
        "ジレるハートに火をつけて",
        "Birth of Color",
        "vivid color",
        "咲くは浮世の君花火",
        "ビッグバンズバリボー!!!!!",
        "チョー↑元気Show☆アイドルch＠ng！",
        "Starry Melody",
        "フェスタ・イルミネーション",
        "PRETTY DREAMER",
        "アニマル☆ステイション！",
        "Blue Symphony",
        "Sentimental Venus",
        "Precious Grain",
        "瑠璃色金魚と花菖蒲",
        "IMPRESSION→LOCOMOTION！",
        "Shooting Stars",
        "アフタースクールパーリータイム",
        "FairyTaleじゃいられない",
        "ライアー・ルージュ",
        "昏き星、遠い月",
        "ユニゾン☆ビート",
        "Melty Fantasia",
        "Eternal Harmony",
        "WHY?",
        "brave HARMONY",
        "...In The Name Of。 ...LOVE？",
        "ラスト・アクトレス",
        "恋心マスカレード",
        "ハーモニクス",
        "Raise the FLAG",
        "Marionetteは眠らない",
        "恋のLesson初級編",
        "ハミングバード",
        "トキメキの音符になって",
        "Good-Sleep，Baby♡",
        "STANDING ALIVE",
        "Happy Darling",
        "Angelic Parade♪",
        "ドリームトラベラー",
        "虹色letters",
        "dear...",
        "星屑のシンフォニア",
        "ハッピ～ エフェクト！",
        "花ざかりWeekend✿",
        "ファンタジスタ・カーニバル",
        "サンリズム・オーケストラ♪",
        "オーディナリィ・クローバー",
        "Heart♡・デイズ・Night☆",
        "ジャングル☆パーティー",
        "FIND YOUR WIND！",
        "ハルマチ女子"
      ],
      phone: false,
      loading: false
    };
  },
  filters: {
    timeModify(stamp) {
      let tmp = new Date(stamp);
      return `${tmp.getFullYear()}年${tmp.getMonth() + 1}月${tmp.getDate()}日`;
    },
    plvPercent(plv) {
      plv = plv || 0;
      if (plv > 400) {
        pfv = 400;
      }
      return Math.floor(Math.sqrt(plv / 400) * 100);
    }
  },

  methods: {
    submit() {
      // console.log("安排");
      var tmp = "";
      if (this.input.time.constructor.name == "Date") {
        this.input.time = this.input.time.getTime();
      }
      this.input.fans.sort((a, b) => {
        return b.value - a.value;
      });

      tmp = JSON.stringify(this.input);
      localStorage.pdata = tmp;
      this.pdata = JSON.parse(tmp);

      this.enqueteON = false;
    },
    deleteidol(index) {
      this.input.fans.splice(index, 1);
    },
    addidol() {
      this.input.fans.push({ name: null, value: 0 });
    },
    toPic() {
      this.phone = true;
      this.loading = true;
      let dom = window.document.querySelector("#img");
      this.$h2c(document.querySelector("#topic")).then(canvas => {
        if (dom.children[0]) {
          dom.children[0].remove();
        }
        dom.appendChild(this.$c2img.convertToPNG(canvas));
        this.loading = false;
      });
    }
  },
  created() {
    var defult = `{
        "pname":"defult",
        "time": 1498838400000,
        "idol": "",
        "idolLove": "",
        "fanTotal": "100000",
        "fans": [
          { "name": "天海春香", "value": 50000 },
          { "name": "箱崎星梨花", "value": 40000 },
          { "name": "所恵美", "value": 30000 },
          { "name": "エミリー", "value": 13431 }
        ],
        "friend": 0,
        "flowerSend": 0,
        "flowerResive": 0,
        "eventName": "",
        "eventRank": 0,
        "songCount": 0,
        "SongFcCount": 0,
        "fcTotal": 0,
        "songMost": "",
        "songMostCount": 0,
        "gashaCount": 0,
        "SSRCount": 0,
        "pinkGasha": 0,
        "pinkSSR": 0,
        "aniva": 0
      }`;

    if (!localStorage.pdata) {
      localStorage.pdata = defult;
      this.input = JSON.parse(defult);
      this.pdata = JSON.parse(defult);
    } else {
      this.input = JSON.parse(localStorage.pdata);
      this.pdata = JSON.parse(localStorage.pdata);
    }
  },
  components: {
    G2radius
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  width: 500px;
}
li {
  list-style: none;
}

.layout {
  margin: 0px auto;
  padding: 10px 1.2em 5px;
  max-width: 400px;

  background-image: url("../assets/bg.jpg");
  background-size: 100%;
  font-size: 1.2em;
  line-height: 1.5em;
}
.logo {
  width: 300px;
}
.tittle {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #f0c967,
    rgba(255, 255, 255, 0)
  );
  text-shadow: 0px 0px 3px white;
}
.tittle p {
  font-size: 1.6em;
  font-style: italic;
  color: white;
  padding: 0.6em 0 0.3em;
}
.tittle span {
  font-size: 1.2em;
  color: white;
}
.avata {
  font-size: 1.6em;
  color: rgb(37, 37, 37);
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #ffffff,
    rgba(255, 255, 255, 0)
  );
}
.avata p {
  padding: 0px 0px 10px;

  /* line-height: 1.8em; */
}
.avata span {
  display: inline-block;
  font-size: 0.3em;
  line-height: 0.5em;
  padding: 5px;
  color: white;
  background-color: rgb(179, 179, 179);
  border-radius: 5px;
}
.items {
  text-align: left;
}
.items p {
  margin: 8px 0px;
}
em {
  font-style: normal;
  font-size: 1.2em;
  color: rgb(185, 152, 80);
  text-shadow: 2px 2px 3px #e7dfc9;
}
.word {
  text-align: center;
  font-size: 1.4em;
  padding: 10px;
  color: #b89c58;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #ffffff,
    rgba(255, 255, 255, 0)
  );
}
#img {
  display: inline-block;
  height: 2em;
  width: 10em;
  overflow: hidden;
  border: 1px solid #b89c58;
}
.enquete {
  position: fixed;

  top: 0px;
  z-index: 100;
  background-color: white;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;

  padding: 10px 5px 50px;
  text-align: left;
}
@media screen and (min-width: 75px) {
  .enquete {
    width: 750px;
    border: 1px rgb(150, 150, 150) solid;
  }
}
@media screen and (max-width: 800px) {
  .enquete {
    left: 0px;
    width: 100vw;
  }
}
.enquete p {
  padding-bottom: 3px;
  border-bottom: 1px rgb(179, 175, 175) solid;
}
.buttons {
  margin: 10px 50px 10px;
  padding: 0px 0px 30px;
}

.submit{
  background-color: white;
  width: 100vw;
  padding: 10px 80px;
  position: fixed;
  bottom: 0px;
}
.nothing{
  height: 200px;
}
.qr p {
  line-height: 1em;
  font-size: 0.6em;
}
</style>
