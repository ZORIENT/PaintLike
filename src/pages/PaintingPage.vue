<!-- 涂鸦页面！ -->
<template>
  <div class="paintingPage">
    <div>
      <!-- 顶部工具栏 -->
      <div class="top">
        <!-- 画笔工具类型选择 -->
        <button
          v-for="tool in tools"
          :key="tool.toolType"
          :class="activeTool === tool.toolType ? 'activeTool' : ''"
          @click="handleChangeToolType(tool.toolType)"
        >
          <span :class="'iconfont ' + tool.icon"></span>
        </button>

        <!-- 画笔粗细选择 -->
        <div class="slideSelect">
          <span class="iconfont icon-cuxi"></span>

          <el-select v-model="slide" placeholder="粗细">
            <el-option
              v-for="item in 10"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>

        <!-- 画笔颜色选择 -->
        <div class="colorSelect">
          <span class="iconfont icon-yanseziduan"></span>

          <el-color-picker v-model="color" size="medium"></el-color-picker>
        </div>
      </div>

      <!-- 中间画布部分 -->
      <div class="center">
        <div class="board">
          <!-- 绘制图层 -->
          <canvas
            id="ctx_front"
            ref="ctx_front"
            class="ctxFront"
            :style="'cursor:' + cursor"
          ></canvas>

          <!-- 底图层 -->
          <canvas
            id="ctx_base"
            ref="ctx_base"
            class="ctxBase"
            :style="'cursor:' + cursor"
          ></canvas>

          <!-- 生成绘制后图片的图层 -->
          <canvas
            id="ctx_back"
            ref="ctx_back"
            class="ctxBack"
            :style="'cursor:' + cursor"
          ></canvas>

          <!-- 选择文本工具时弹出的文本框 -->
          <input
            name="text"
            class="text"
            id="text"
            @blur="handleTextBlur"
            @keyup.enter="handleTextBlur"
            v-model="text"
            autofocus
            autocomplete="off"
            :style="'font-size:' + (this.slide * 10 + 6) + 'px;color:' + color"
          />
        </div>
      </div>

      <!-- 右侧工具栏 上一步、下一步、放大、缩小、清除、保存 -->
      <div class="right">
        <button
          :disabled="prevDis"
          :style="prevDis ? 'cursor:not-allowed' : ''"
          :class="prevDis ? 'prev disable' : 'prev'"
          @click="handlePrev"
        >
          ∧
        </button>
        <button
          :disabled="nextDis"
          :style="nextDis ? 'cursor:not-allowed' : ''"
          :class="nextDis ? 'next disable' : 'next'"
          @click="handleNext"
        >
          ∨
        </button>

        <button v-for="item in menu" :key="item.name" @click="item.func">
          <span :class="'iconfont ' + item.icon"></span>
        </button>

        <!-- 这个a标签占位，用于下载图片PaintLike.png -->
        <a
          href="javascript:void(0);"
          ref="download"
          download="PaintLike.png"
          v-show="false"
        ></a>
      </div>
    </div>

    <!-- 下方发布模块组件 -->
    <div class="publishPage">
      <PublishPage/>
    </div>
  </div>
</template>

<script>
// 发布模块组件
import PublishPage from "./PaintingPage/PublishPage.vue";
// 引入鼠标指针图标
import cursors from "./PaintingPage/cursor";
// 引入底图
import baseImg from "./PaintingPage/baseImg";

export default {
  name: "PaintingPage",

  components: { PublishPage },

  data() {
    return {
      // 当前画布的鼠标指针类型(默认为画笔)
      cursor: `url('${cursors.pen}'),auto`,
      // 输入文本框的内容
      text: "",
      // 当前选中的画笔工具，默认为1
      activeTool: 1,
      // 画笔的粗细
      slide: 1,
      // 画笔的颜色（defaultColor）
      color: "#FF2D55",
      // 画笔工具
      tools: [
        {
          icon: "icon-huabigongju-tuya",
          name: "画笔",
          toolType: 1,
        },
        {
          icon: "icon-huabigongju-zhixian",
          name: "直线",
          toolType: 2,
        },
        {
          icon: "icon-huabigongju-tuoyuan",
          name: "圆形",
          toolType: 3,
        },
        {
          icon: "icon-huabigongju-juxing",
          name: "矩形",
          toolType: 4,
        },
        {
          icon: "icon-xiangpica",
          name: "橡皮",
          toolType: 5,
        },
        {
          icon: "icon-huabigongju-wenben",
          name: "文本",
          toolType: 6,
        },
      ],
      // 画笔菜单（放大、缩小、清除、保存）
      menu: [
        {
          icon: "icon-sousuofangda",
          name: "放大",
          func: () => {
            return this.handleBeLarge();
          },
        },
        {
          icon: "icon-fangdasuoxiao",
          name: "缩小",
          func: () => {
            return this.handleBeSmall();
          },
        },
        {
          icon: "icon-qingchu",
          name: "清除",
          func: () => {
            return this.handleClearCanvas();
          },
        },
        {
          icon: "icon-baocun",
          name: "保存",
          func: () => {
            return this.handleCanvasImg();
          },
        },
      ],

      // 画布图层
      canvas_front: null,
      canvas_back: null,
      canvas_base: null,
      // 画布2d绘图区域
      ctx_base: null,
      ctx_front: null,
      ctx_back: null,
      // 当前图层（宽高，缩放比）
      currentImg: {
        url: baseImg,
        width: "",
        height: "",
        scale: 1,
        // index表示当前图层叠放次序（在canvasStore中的下标）
        index: 0,
      },

      // 每一步操作的图层存储数组
      canvasStore: [baseImg],
      // 是否有上一步下一步（如果有就为false）此时按钮可以点击
      prevDis: true,
      nextDis: true,
      // 画布底图
      baseMap: baseImg,
      // 输入文本框的起始位置（相对于画布）
      tl: 0,
      tt: 0,

      // 是否可以画图
      canDraw: false,
    };
  },

  methods: {
    // 工具类型切换(切换当前活动的工具类型)
    handleChangeToolType(type) {
      this.activeTool = type;
      switch (type) {
        case 1:
          this.cursor = `url('${cursors.pen}'),auto`;
          break;
        case 2:
          this.cursor = `crosshair`;
          break;
        case 3:
          this.cursor = `crosshair`;
          break;
        case 4:
          this.cursor = `crosshair`;
          break;
        case 5:
          this.cursor = `url('${cursors.eraser}'),auto`;
          this.slide = 2;
          break;
        case 6:
          this.cursor = `url('${cursors.text}'),auto`;
          this.slide = 1;
          break;
        default:
          this.cursor = `url('${cursors.pen}'),auto`;
          break;
      }
      this.handleDrawCanvas(type);
    },

    //////////////////////////////////////////////////////
    // 初始化画布
    handleInitCanvas() {
      // 重置当前图层为默认底图
      this.currentImg = {
        url: baseImg,
        width: "",
        height: "",
        scale: 1,
        index: 0,
      };
      // 重置图层数组为默认底图
      this.canvasStore = [baseImg];
      this.prevDis = true;
      this.nextDis = true;

      // 用于绘制的画板
      this.canvas_front = document.getElementById("ctx_front");
      // 用于生成绘制后图片的画板
      this.canvas_back = document.getElementById("ctx_back");
      // 底图画板，橡皮擦除时获取像素放到绘制画板中，达到不擦出底图的效果
      this.canvas_base = document.getElementById("ctx_base");

      // 获取所有的2d画板
      this.ctx_front = this.canvas_front.getContext("2d");
      this.ctx_back = this.canvas_back.getContext("2d");
      this.ctx_base = this.canvas_base.getContext("2d");

      // 重置画笔的默认颜色
      this.ctx_front.strokeStyle = this.color;

      // 创建图层的图片
      let img = new Image();
      img.src = this.baseMap;
      let _this = this;
      img.onload = function () {
        let width = 720;
        let height = 600;

        // 设置各图层的宽高
        _this.currentImg.width = width;
        _this.currentImg.height = height;
        _this.canvas_front.width = width;
        _this.canvas_front.height = height;
        _this.canvas_back.width = width;
        _this.canvas_back.height = height;
        _this.canvas_base.width = width;
        _this.canvas_base.height = height;

        // 将绘制好的底图放置在画布上
        _this.ctx_back.drawImage(this, 0, 0, width, height);
        _this.ctx_base.drawImage(this, 0, 0, width, height);
      };
    },

    // 重绘画布
    handleDrawImage() {
      let _this = this;
      let img = new Image();
      let baseImg = new Image();
      img.src = this.currentImg.url;
      baseImg.src = this.baseMap;

      // 处理缩放
      _this.currentImg.width = _this.currentImg.width * this.currentImg.scale;
      _this.currentImg.height = _this.currentImg.height * this.currentImg.scale;

      // 重绘图片
      img.onload = function () {
        _this.canvas_front.width = _this.currentImg.width;
        _this.canvas_front.height = _this.currentImg.height;
        _this.canvas_back.width = _this.currentImg.width;
        _this.canvas_back.height = _this.currentImg.height;

        // 更新前景图（绘制区域）
        _this.ctx_front.drawImage(
          this,
          0,
          0,
          _this.currentImg.width,
          _this.currentImg.height
        );

        // 更新
        _this.ctx_back.drawImage(
          this,
          0,
          0,
          _this.currentImg.width,
          _this.currentImg.height
        );
      };

      // 重绘底图
      baseImg.onload = () => {
        _this.canvas_base.width = _this.currentImg.width;
        _this.canvas_base.height = _this.currentImg.height;
        _this.ctx_base.drawImage(
          baseImg,
          0,
          0,
          _this.currentImg.width,
          _this.currentImg.height
        );
      };
    },

    // 处理画布放大和缩小
    handleBeLarge() {
      this.currentImg.scale = 1;
      this.currentImg.scale += 0.1;
      console.log(this.currentImg.scale);
      this.$nextTick(() => {
        this.handleDrawImage();
      });
    },
    handleBeSmall() {
      this.currentImg.scale = 1;
      this.currentImg.scale -= 0.1;
      console.log(this.currentImg.scale);
      this.$nextTick(() => {
        this.handleDrawImage();
      });
    },

    // 下载图片
    handleCanvasImg() {
      let canvas = document.getElementById("ctx_back");
      this.$refs.download.href = canvas.toDataURL();
      this.$refs.download.click();
    },

    // 清空画布
    handleClearCanvas() {
      this.handleInitCanvas();
    },
    handleFrommatCanvas() {
      this.ctx_front.clearRect(
        0,
        0,
        this.canvas_front.width,
        this.canvas_front.height
      );
    },

    // 画布工具
    handleDrawCanvas(type) {
      this.canDraw = false;
      // sx，sy是鼠标在画布中的位置
      let sx, sy, mx, my;
      let text = document.getElementById("text");

      //鼠标按下
      let mousedown = (e) => {
        this.ctx_front.strokeStyle = this.color;
        this.ctx_front.lineWidth = this.slide;
        e = e || window.event;
        sx = e.clientX - this.canvas_front.offsetLeft;
        sy = e.clientY - this.canvas_front.offsetTop;
        // console.log(sx,sy)

        // getImageData获取画布上指定矩形的像素，
        // 获取底图的像素，放在最上层图层中（橡皮擦）
        const cbx = this.ctx_base.getImageData(
          e.offsetX,
          e.offsetY,
          this.slide * 10,
          this.slide * 10
        );

        this.ctx_front.moveTo(sx, sy);
        this.canDraw = true;

        switch (type) {
          case 1:
            this.ctx_front.beginPath();
            break;
          case 5:
            this.ctx_front.putImageData(cbx, e.offsetX, e.offsetY);
            break;
          case 6:
            this.handleTextBlur();
            this.text = "";
            // text.style.fontSize = 14 + this.slide * 10 + "px";
            text.style.fontSize = 6 + this.slide * 10 + "px";
            text.style.color = this.color;
            // text.style.left =
            //   e.offsetX + this.canvas_front.offsetLeft - 20 + "px";
            text.style.left =
              e.offsetX + this.canvas_front.offsetLeft - 20 + "px";
            // text.style.top =
            //   e.offsetY + this.canvas_front.offsetTop - 10 + "px";
            text.style.top =
              e.offsetY + this.canvas_front.offsetTop - 10 + "px";
            text.style.zIndex = 10;
            text.style.display = "block";
            // this.tl = e.offsetX - 20;
            // this.tt = e.offsetY + 10;
            this.tl = e.offsetX - 20;
            this.tt = e.offsetY + 10;
            break;
        }
      };

      // 鼠标移动
      let mousemove = (e) => {
        e = e || window.event;
        mx = e.clientX - this.canvas_front.offsetLeft;
        my = e.clientY - this.canvas_front.offsetTop;
        const cbx = this.ctx_base.getImageData(
          e.offsetX,
          e.offsetY,
          this.slide * 10,
          this.slide * 10
        );
        if (this.canDraw) {
          switch (type) {
            case 1:
              // this.ctx_front.lineTo(mx - 8, my - 49);
              this.ctx_front.lineTo(mx - 407, my - 155);
              this.ctx_front.stroke();
              break;
            case 2:
              this.handleFrommatCanvas();
              this.ctx_front.beginPath();
              // this.ctx_front.moveTo(sx - 10, sy - 79);
              // this.ctx_front.lineTo(mx - 10, my - 79);
              this.ctx_front.moveTo(sx - 407, sy - 167);
              this.ctx_front.lineTo(mx - 407, my - 167);
              this.ctx_front.stroke();
              break;

            // let rds = Math.sqrt(
            //   (sx - 10 - mx) * (sx - 10 - mx) +
            //     (sy - 49 - my) * (sy - 49 - my)
            // );
            case 3:
              this.handleFrommatCanvas();
              this.ctx_front.beginPath();
              // eslint-disable-next-line no-case-declarations
              let rds = Math.sqrt(
                (sx - mx) * (sx - mx) + (sy - my) * (sy - my)
              );
              // this.ctx_front.arc(sx - 15, sy - 69, rds, 0, Math.PI * 2, false);
              this.ctx_front.arc(
                sx - 407,
                sy - 167,
                rds,
                0,
                Math.PI * 2,
                false
              );
              this.ctx_front.stroke();
              break;
            // this.ctx_front.moveTo(sx - 10, sy - 79);
            // this.ctx_front.lineTo(mx - 18, sy - 79);
            // this.ctx_front.lineTo(mx - 18, my - 79);
            // this.ctx_front.lineTo(sx - 10, my - 79);
            // this.ctx_front.lineTo(sx - 10, sy - 79);
            case 4:
              this.handleFrommatCanvas();
              this.ctx_front.beginPath();
              this.ctx_front.moveTo(sx - 407, sy - 167);
              this.ctx_front.lineTo(mx - 407, sy - 167);
              this.ctx_front.lineTo(mx - 407, my - 167);
              this.ctx_front.lineTo(sx - 407, my - 167);
              this.ctx_front.lineTo(sx - 407, sy - 167);
              this.ctx_front.stroke();
              break;
            case 5:
              this.ctx_front.putImageData(cbx, e.offsetX, e.offsetY);
              break;
          }
        }
      };

      // 鼠标抬起
      let mouseup = () => {
        if (this.canDraw) {
          this.canDraw = false;
          this.ctx_front.closePath();
          if (type != 6) {
            this.handleSaveCanvasStore();
          }
        }
      };

      // 给画布绑定鼠标事件
      this.canvas_front.onmousedown = (e) => mousedown(e);
      this.canvas_front.onmousemove = (e) => mousemove(e);
      this.canvas_front.onmouseup = (e) => mouseup(e);
      this.canvas_front.onmouseout = (e) => mouseup(e);
      this.canvas_front.onmouseleave = (e) => mouseup(e);
    },

    // 绘制文本内容
    handleTextBlur() {
      let text = document.getElementById("text");
      this.ctx_front.font = `300 ${text.style.fontSize} sans-serif`;
      this.ctx_front.fillStyle = this.color;
      this.ctx_front.fillText(this.text, this.tl, this.tt);
      text.style.display = "none";
      this.text = "";
      text.value = "";
      this.handleSaveCanvasStore();
    },

    // 上一步
    handlePrev() {
      // 底图index为0
      if (this.currentImg.index > 0) {
        this.nextDis = false;
        this.currentImg.index -= 1;
        this.currentImg.index == 0
          ? (this.prevDis = true)
          : (this.prevDis = false);
        this.currentImg.url = this.canvasStore[this.currentImg.index];
        this.currentImg.scale = 1;
        this.handleDrawImage();
      } else {
        this.prevDis = true;
      }
    },

    // 下一步
    handleNext() {
      if (this.currentImg.index < this.canvasStore.length - 1) {
        this.prevDis = false;
        this.currentImg.index += 1;
        this.currentImg.index == this.canvasStore.length - 1
          ? (this.nextDis = true)
          : (this.nextDis = false);
        this.currentImg.url = this.canvasStore[this.currentImg.index];
        this.currentImg.scale = 1;
        this.handleDrawImage();
      } else {
        this.nextDis = true;
      }
    },

    // 保存绘制
    handleSaveCanvasStore() {
      let url = this.canvas_front.toDataURL();
      let image = new Image();
      image.src = url;
      image.onload = () => {
        this.ctx_front.clearRect(
          0,
          0,
          this.canvas_front.width,
          this.canvas_front.height
        );
        this.ctx_front.drawImage(image, 0, 0, image.width, image.height);
        this.ctx_back.drawImage(image, 0, 0, image.width, image.height);
        const url2 = this.canvas_back.toDataURL();
        this.currentImg.url = url2;
        this.currentImg.index += 1;
        this.canvasStore.push(url2);
        this.prevDis = false;
        // console.log(this.canvasStore);
      };
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.handleInitCanvas();
      this.handleChangeToolType(1);
    });
  },
};
</script>

<style scoped>
.paintingPage {
  /* border: 1px solid red; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* width: 100%; */
  flex-direction: column;
  position: relative;
}

.top,
.center,
.right {
  /* border: 1px solid red; */
  width: 720px;
  /* width: 80%; */
  /* height: 200px; */
  margin-top: 24px;
}

.top {
  /* border: 1px solid green; */
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  border-radius: calc(var(--borderRadius) * 1px);
  padding: 0px 16px;
  display: flex;
  height: 48px;
  /* justify-content: center; */
  align-items: center;
}

.top button {
  flex-grow: 1;
  height: 32px;
  border: none;
  background-color: transparent;
  /* color: var(--primaryThemeColor); */
  color: var(--primaryFontGreyColor);
  font-weight: bold;
  cursor: pointer;
}

.top button:hover {
  color: var(--primaryThemeColor);
}

.top button.activeTool {
  color: var(--primaryThemeColor);
  animation: toolBtnChange 0.4s;
}

.top .colorSelect,
.top .slideSelect {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* margin-right: 20px; */
  /* border: 1px solid red; */
  flex-grow: 1;
  height: 32px;
  font-weight: bold;
  color: var(--primaryFontGreyColor);
}

.top div >>> .el-select {
  width: 48px;
}

.top div >>> .el-input__inner {
  display: flex;
  height: 32px;
  padding: 8px;
  /* border: 1px solid red; */
}

.top div >>> .el-select .el-input .el-input__inner,
.top div >>> .el-select .el-input.is-focus .el-input__inner {
  /* color: var(--primaryThemeColor); */
  border: none;
  background-color: var(--primaryBackgoundColor);
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
}

.top div >>> .el-input__suffix {
  width: 100%;
  display: flex;
  margin: 0px;
  right: 4px;
  justify-content: end;
  align-items: center;
}

.top div >>> .el-color-picker__color,
.top div >>> .el-color-picker__color-inner {
  border-radius: calc(var(--borderRadius) * 1px);
  border: none;
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
}

/* .top div select{
  width: 40px;
  height: 32px;
  border: none !important;
  border-radius: calc(var(--borderRadius)*1px);
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  color: var(--primaryThemeWhite);
  background-image: var(--primaryThemeLiner);
} */

.center {
  /* border: 1px solid red; */
  margin-bottom: 24px;
}

.center .board {
  /* border: 1px solid red; */
  position: relative;
  height: 600px;
}

.center canvas {
  width: 100%;
  height: 600px;
  position: absolute;
  left: 0px;
  top: 0px;
  box-shadow: 0px 0px 8px #c5c5c5;
  border-radius: calc(var(--borderRadius) * 1px);
  /* background-color: red; */
}

.ctxFront {
  z-index: 5;
}

.ctxBack {
  z-index: 3;
}

.ctxBase {
  z-index: 1;
}

.text {
  position: absolute;
  z-index: -1;
  resize: none;
  outline: none;
  border: 2px dashed var(--primaryThemeColor);
  overflow: hidden;
  background: transparent;
  line-height: 24px;
  display: none;
}

/* .center .menu{
  background-color: red;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 24px;
} */

/* .center .menu button{
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  background-color: var(--primaryBackgoundColor);
  border-radius: calc(var(--borderRadius)*1px);
  border: none;
} */

.right {
  /* border: 1px solid red; */
  display: flex;
  width: 48px;
  flex-direction: column;
  position: absolute;
  top: 160px;
  right: 16px;
  /* background-color: var(--primaryBackgoundColor); */
  /* background-color: red; */
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  /* border-radius: 8px; */
  border-radius: calc(var(--borderRadius) * 1px);
  height: 400px;
  padding: 24px 0px;
}

.right button {
  flex-grow: 1;
  border: none;
  background-color: transparent;
  /* color: var(--primaryThemeColor); */
  color: var(--primaryFontGreyColor);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.4s;
  /* border: 1px solid red; */
}

.right button:hover {
  color: var(--primaryThemeColor);
}

.right button:active {
  animation: toolBtnChange 0.6s;
}

.right .prev,
.right .next {
  font-size: 20px;
  font-weight: bold;
}

.right .prev.disable,
.right .next.disable,
.right .prev:hover.disable,
.right .next:hover.disable,
.right .prev:active.disable,
.right .next:active.disable {
  color: var(--primaryShadowColor);
  animation: none;
}

.publishPage{
  /* border: 1px solid red; */
  width: 720px;
  margin: auto;
  margin-bottom: 16px;
}

@keyframes toolBtnChange {
  from {
    transform: scale(0.6);
    /* width: 0px; */
  }
  to {
    transform: scale(1);
    /* width: 25%; */
  }
}
</style>