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
        <p>您的粉丝分布情况如下：</p>
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

        <p>您MillonMix模式下FC的歌有<em>{{pdata.fcTotal}}</em>首，FC率达到了<em>{{Math.round(pdata.fcTotal*100/songList.length)}}</em>%，真了不起。</p>
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
  name:"LayoutZH",
  data() {
    return {
      pdata: {
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
      },
      input: {},
      idollist: [],
      imageColor: {},
      eventList: [],
      songList: [],
      enqueteON: false,
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
      this.phone =false;
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
  mounted() {
    let defult = {};
    fetch("./mltd.json").then(res =>
      res.json().then(res => {
        defult = JSON.stringify(res.defult);
        this.idollist = res.idollist;
        this.imageColor = res.imageColor;
        this.eventList = res.eventList;
        this.songList = res.songList;
    if (!localStorage.pdata) {
      localStorage.pdata = defult;
      this.input = JSON.parse(defult);
      this.pdata = JSON.parse(defult);
    } else {
      this.input = JSON.parse(localStorage.pdata);
      this.pdata = JSON.parse(localStorage.pdata);
    }
      })
    );


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

.submit {
  background-color: white;
  width: 100vw;
  padding: 10px 80px;
  position: fixed;
  bottom: 0px;
}
.nothing {
  height: 200px;
}
.qr p {
  line-height: 1em;
  font-size: 0.6em;
}
</style>
