/**
 * Created by lupin on 17-5-21.
 */
 import Vuex from 'vuex'
export const store = new Vuex.Store({
    state: {
        showshopcart: false,
        count: 0
    },
    mutations:　{
        setShopCart: function (state, isShow) {
            state.showshopcart = isShow
        },
        addCount: function (state) {
            state.count++
        },
        decount: function (state) {
            state.count--
        }
    }
})