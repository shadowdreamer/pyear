<template>
  <p id="mountNode">

  </p>
</template>

<script>
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    fans: {
      type: Array,
      default: function() {
        return {
          data: []
        };
      }
    },
    fanTotal: 0,
    imageColor: {}
  },
  mounted() {
    setTimeout(() => {
      this.drawChart();
    }, 100);
  },

  computed: {
    _fans() {
      let sum = 0;
      for (let i in this.fans) {
        sum = sum + this.fans[i].value;
      }

      return this.fans.concat([{ name: "其他", value: this.fanTotal - sum }]);
    }
  },

  watch: {
    fans: {
      handler: function(a, b) {
        this.drawChart();
      },
      deep: true
    },
    fanTotal: {
      handler: function() {
        this.drawChart();
      }
    }
  },

  methods: {
    drawChart() {
      this.dv = new DataSet.DataView();

      this.dv.source(this._fans).transform({
        type: "percent",
        field: "value",
        dimension: "name",
        as: "percent"
      });
      if (this.chart) {
        // console.log("销毁旧图");
        this.chart.destroy();
      }
      // console.log("开始画图");
      this.chart = new G2.Chart({
        container: "mountNode",
        forceFit: true,
        padding: "auto",
        height: 300
      });

      this.chart.source(this.dv);
      // 重要：绘制饼图时，必须声明 theta 坐标系
      this.chart.coord("theta", {
        radius: 0.65, // 设置饼图的大小
        innerRadius: 0.6,
        startAngle: (2 * Math.PI) / 2,
        endAngle: (6 * Math.PI) / 2
      });
      this.chart.tooltip({
        showTitle: false
      });
      this.chart
        .intervalStack()
        .position("percent")
        .color("name", name => this.imageColor[name])
        .tooltip("name*percent", (name, percent) => {
          return {
            name,
            value: (percent * 100).toFixed(1) + "%"
          };
        })
        .label("name", {
          textStyle: {
            fontSize: "13",
            fontWeight: "bold"
          },
          formatter: (text, item, index) => {
            const point = item.point; // 每个弧度对应的点
            let percent = point["percent"];
            percent = (percent * 100).toFixed(1) + "%";
            return text + " " + percent;
          }
        })
        .style({
          lineWidth: 1,
          stroke: "#eee"
        });
      this.chart.guide().html({
        position: ["50%", "50%"],
        html: `<div style="color:#878242;font-size: 14px;text-align: center;width: 10em;">总粉丝<br>
            <span style="color:#a39d4b;font-size:20px">${
              this.fanTotal
            }</span></div>`,
        alignX: "middle",
        alignY: "middle"
      });
      this.chart.render();
    }
  }
};
</script>
