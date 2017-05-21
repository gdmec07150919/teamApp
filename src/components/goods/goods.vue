<template >
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul >
          <li v-for="(item,index,event) in goods"   class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul >
          <li v-for="item in goods" class="food-list food-list-hook" >
            <h1 class="title">{{item.name}}</h1>
            <ul id="foodwra
            pper">
              <li v-for="food in item.foods" class="food-item ">
                <div class="icon">
                  <img :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol v-on:cartadd="_drop" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :deliver-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
  var BScorll = require('better-scroll')
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  const ERR_OK = 0
    export default {
      props: ['seller'],
      data: function () {
        return {
          goods: [],
          classMap: [],
          listHeight: [],
          scrollY: 0
        }
      },
      created: function() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        this.$http.get('/api/goods').then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.goods = response.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculate()
            })
            console.log('this.goods')
          }
        })
      },
      methods: {
        _initScroll: function () {
            this.meunScroll = new BScorll(this.$refs.menuWrapper, {
              click: true
            })
            this.foodScroll = new BScorll(this.$refs.foodsWrapper, {
              click: true,
              probeType: 3
            })
            this.foodScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculate: function () {
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          let height = 0
          this.listHeight.push(height)
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
          }
        },
        selectMenu: function (index, event) {
          if (!event._constructed) {
            return
          }
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          this.foodScroll.scrollToElement(el, 200)
        },
        _drop: function (target) {
          this.$refs.shopcart.drop(target)
        }
      },
      computed: {
        currentIndex: function () {
            for (let i = 0; i < this.listHeight.length - 1; i++) {
              let height1 = this.listHeight[i]
              let height2 = this.listHeight[i + 1]
              if (this.scrollY >= height1 && this.scrollY < height2) {
                return i
              }
            }
          return 0
       },
        selectFoods: function () {
          console.log('selectFoods ')
          let foods = []
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
          return foods
        }
      },
      components: {
        shopcart: shopcart,
        cartcontrol: cartcontrol
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mymixin.styl";
  .goods{
    display:flex;
    position: absolute;
    top: 258.8px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .menu-item{
    display:table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding:0 12px;
  }
   .current {
    position: relative;
    z-index: 10;
    margin-top: -1px ;
    background: #fff;
    font-weight: 700;
  }
  .menu-item>.current>.text {
    border-none()
  }
  .menu-item> .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .text{
    display: table-cell;
    font-size: 12px;
    width: 56px;
    padding:0;
    myborder-1px(rgba(7,17,27,0.1));
    vertical-align: middle;
  }
  .foods-wrapper{
    flex: 1;
  }
   h1.title{
     margin:0;
    padding: 0;
    padding-left: 14px;
     width: 100%;
    height: 26px;
    line-height: 26px;
    border-left:2px solid #d9dde1;
    font-size: 12px;
    color:rgb(147,153,159);
    background: #f3f5f7;
  }
   .food-item{
     display:flex;
     margin: 18px;
     padding-bottom: 18px;
     myborder-1px(rgba(7,17,27,0.1));
   }
   &:last-child{
      myborder-none();
      margin-bottom: 0;
    }
    .icon{
      flex: 0 0 57px;
      margin-right: 10px;
    }
    .content{
      flex: 1;
    }
    .content>.name{
      text-align: left;
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7,17,27);
    }
    .desc,.extra {
      margin-bottom: 8px;
      line-height:10px;
      font-size: 10px;
      color: rgb(147,153,159)
    }
    .desc{
      margin-bottom:8px;
    }
    .extra > .count{
      margin-right: 12px;
    }

    .price {
      font-weight: 700;
      line-height: 24px;
    }
    .cartcontrol-wrapper{
      position: absolute;
      right: 0;
      bottom: 12px;
    }
    .now{
      margin-right:8px;
      font-size:14px;
      color:rgb(240,20,20);
    }
    .old{
      text-decoration: line-through;
      font-size:10px;
      color:rgb(147,153,159);
    }


  .decrease {
  bg-image('decrease_3');
  }

  .discount {
  bg-image('discount_3');
  }

  .invoice {
  bg-image('invoice_3');
  }

  .guarantee {
  bg-image('guarantee_3');
  }
  .special{
  bg-image('special_3');
  }

</style>
