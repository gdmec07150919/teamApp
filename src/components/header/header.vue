<template xmlns:clear="http://www.w3.org/1999/xhtml">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" src="" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade" type="transition" appear>
    <div v-show="detailShow" class="detail" >
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,$index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>

        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  export default {
    props: {
      'seller': Object
    },
    data: function () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail: function () {
        this.detailShow = true
      },
      hideDetail: function () {
        this.detailShow = false
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star: star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mymixin.styl";

  .header {
    color: #fff;
    position: relative;
    overflow: hidden;
  }

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0px;
  }

  .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .avatar > img {
    border-radius: 2px;
  }

  .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;

  }

  .title {
    margin: 2px 0 8px 0;
  }

  .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    bg-image('brand');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }

  .name {
    margin-left: 6px;
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }

  .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }

  .support > .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .support > .decrease {
  bg-image('decrease_1');
  }

  .support > .discount {
  bg-image('discount_1');
  }

  .support > .invoice {
  bg-image('invoice_1');
  }

  .support > .guarantee {
  bg-image('guarantee_1');
  }

  .support > .special {
  bg-image('special_1');
  }

  .text {
    font-size: 12px;
  }

  .support-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .count {
    font-size: 10px;
    vertical-align: top;
  }

  .icon-keyboard_arrow_right:before {
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
  .bulletin{
    width:80%;
    margin:0 auto;
  }
  .bulletin>.content{
    padding:0 12px;
    line-height: 24px;
    font-size:12px;
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bulletin-title {
    display: inline-block;
    width: 22px;
    height: 12px;
    bg-image('bulletin');
    background-size : 22px 12px;
    background-repeat: no-repeat;
  }

  .bulletin-text {
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
  }

  .bulletin-wrapper > .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
  }
/*  .fade-enter-active, .fade-leave-active {
    transition: opacity .50s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }*/
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }

  .detail-wrapper {
    width: 100%;
    min-height: 100%;
  }

  .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0px auto;
    font-size: 30px;
  }

  .name {

  }

  .star-wrapper{
    text-align: center;
  }

  .title{
    display: flex;
    width: 80%;
    margin: 30px auto 24px auto;

  }
  .line{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .text{
    padding: 0 12px;
    font-size: 16px;


  }
  .supports{
    width:80%;
    margin:0 auto;

  }
  .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .support-item:last-child{
    margin-bottom: 0;
  }
  .support-item>.icon{
    display:inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;

  }
  .support-item>.decrease{
    bg-image('decrease_2')
  }
  .support-item>.discount{
  bg-image('discount_2')
  }
  .support-item>.guarantee{
  bg-image('guarantee_2')
  }
  .support-item>.invoice{
  bg-image('invoice_2')
  }
  .support-item>.special{
  bg-image('special_2')
  }
</style>
