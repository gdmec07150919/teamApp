<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENG = 5
  const CLS_ON = 'on'
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'
  export default {
    props: {
      size: Number,
      score: Number
    },
    computed: {
      starType: function() {
        return 'star' + this.size
        },
        itemClasses: function() {
            let result = []
            let score = Math.floor(this.score * 2) / 2
            let hasDecimal = score % 1 !== 0
            let integer = Math.floor(score)
            for (let i = 0; i < integer; i++) {
              result.push(CLS_ON)
            }
            if (hasDecimal) {
              result.push(CLS_HALF)
            }
            while (result.length < LENG) {
              result.push(CLS_OFF)
            }
            return result
        }
       }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mymixin.styl";
  .star48>.star-item{
    display:inline-block;
    background-repeat: no-repeat;
    height:40px;
    width:38px;
    margin-right: 18px;
    background-size: 38px 40px;
  }
  .star48>.on{
  bg-image('star48_on')
  }
  .star48>.off{
  bg-image('star48_off')
  }
  .star48>.half{
  bg-image('star48_half')
  }


  .star36>.star-item{
    display:inline-block;
    background-repeat: no-repeat;
    height:29px;
    width:30px;
    margin-right: 12.5px;
    background-size: 30px 29px;
  }
  .star36>.on{
  bg-image('star36_on')
  }
  .star36>.off{
  bg-image('star36_off')
  }
  .star36>.half{
  bg-image('star36_half')
  }

  .star24>.star-item{
    display:inline-block;
    background-repeat: no-repeat;
    height:19px;
    width:20px;
    margin-right: 5.6px;
    background-size: 20px 19px;
  }
  .star24>.on{
  bg-image('star24_on')
  }
  .star24>.off{
  bg-image('star24_off')
  }
  .star24>.half{
  bg-image('star24_half')
  }

</style>
