<template>
  <div id="shopcart" v-show="isShow">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">{{totalPrice}}元</div>
        <div class="desc">另需要配送费{{deliverPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{totalPrice}}元</div>
        <div>{{payDesc}}</div>
      </div>
    </div>

    <div class="ball-container">
      <transition-group
        name="drop"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        >
      <div v-for="(ball,index) in balls" v-if="ball.show" :key="index" class="ball" >
        <div  class="inner inner-hook"></div>
      </div>
      </transition-group>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default: function() {
          return [{
            price: Number,
            count: Number
          }]
        }
      },
      minPrice: {
        type: Number,
        default: 10
      },
      deliverPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isShow: function () {
        return this.$store.state.count > 0
      },
      totalPrice: function() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount: function() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc: function () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        }
      },
      payClass: function () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      drop: function (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            console.log(this.dropBalls)
            return
          }
        }
      },
      beforeEnter: function (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(${x}px,${y}px,0)`
            el.style.transform = `translate3d(${x}px,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,${y}px,0)`
            inner.style.transform = `translate3d(${x}px,${y}px,0)`
            console.log(inner)
          }
        }
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter: function (el) {
       this.dropBalls.forEach(function (ball) {
          ball.show = false
          el.style.display = 'none'
        })
      }
    },
    data: function () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [Object]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #shopcart {
    position: fixed;
    left : 0 ;
    bottom : 0 ;
    z-index : 50;
    width : 100% ;
    height : 48px;
  }


 #shopcart > .content {
   display: flex;
 background: #141d27;
 font-size: 0;
 margin:0;
 color: rgba(255, 255, 255, 0.4);

  }

  #shopcart >div > div.content-left {
    flex: 1
  }
  #shopcart > div > div.content-left > div.logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing:border-box;
    vertical-align: top;
    border-radius:50%;
    background : #141d27;
    text-align: center;
  }
  #shopcart > div > div.content-left > div.logo-wrapper>.num{
    position: absolute;
    top:0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius:16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240,20,20)
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
  }
  #shopcart > div > div.content-left > div.logo-wrapper > div.logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
  }
  #shopcart > div > div.content-left > div.logo-wrapper > div.logo.highlight{
    background: rgb(0,160,220);

  }

  #shopcart > div > div.content-left > div.logo-wrapper > div > .icon-shopping_cart{
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
  }
  #shopcart > div > div.content-left > div.logo-wrapper > div > .icon-shopping_cart.highlight{
    color: #fff;
  }
  #shopcart > div > div.content-left > div.price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: 700;
  }
  #shopcart > div > div.content-left > div.price.highlight{
    color: #fff;
  }
  #shopcart > div > div.content-left > div.desc{
       display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    color:rgba(255,255,255,0.4);
    font-size: 10px;

     }
  #shopcart > div > div.content-right {
    flex: 0 0 105px ;
    width : 105px;
  }
  #shopcart > div > div.content-right>.pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
  }
  #shopcart > div > div.content-right>.pay.not-enough{
    background: #2b333b
  }
  #shopcart > div > div.content-right>.pay.enough{
    background: #00b43c;
    color: #fff;
  }

  .ball-container .ball{
    position: fixed;
    left: 32px;
    bottom:22px;
    z-index:200;
  }
   .drop-enter-active,.drop-leave-active{
    transition:all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  }
.drop-leave{
    opacity:1;
  }
  .drop-enter{
    opacity:0;
  }
  .ball .inner{
    width:16px;
    height:16px;
    border-radius: 50%;
    background: rgb(0,160,220);
    transition: all 1s linear;
  }
</style>
