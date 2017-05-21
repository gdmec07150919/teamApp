<template>
  <div id="body">
     <action title= '首页'></action>
          <v-header :seller='seller'></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>

    </div>
    <router-view :seller="seller">
    
    </router-view>
        <foot-guide></foot-guide>

  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  import footGuide from '@/components/footer/footGuide'
  import ActionBar from '@/components/header/ActionBar'
  const ERR_OK = 0
  export default {

    data: function() {
      return {
        seller: {}
      }
    },
    created: function () {
      this.$http.get('/api/seller').then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.seller = response.data
            console.log(this.seller)
          }
        }
      )
    },
    mounted: function () {
      this.$nextTick(function () {
          console.log('ddd' + this.seller)
          console.log(this.$store)
      })
    },
    components: {
      'v-header': header,
      'foot-guide': footGuide,
      'action': ActionBar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mymixin.styl";
  
  html,body,#body{
   height:100%;
  }
  #body{
    padding-bottom: 50px;
  }
  .tab {
    display: flex;
    width: 100%;

    line-height: 40px;
    /*        border-bottom:1px solid rgba(7,17,27,0.1)*/
  myborder-1px(rgba(7, 17, 27, 0.1));
  }

  .tab-item {
    flex: 1;
  }

  .tab-item > a {
    display: block;
    text-align:center;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab-item > .activess {
    color: rgb(240, 20, 20)
  }

</style>
