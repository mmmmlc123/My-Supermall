import Vue from 'vue'
import Vuex from 'vuex'




//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations:{
    addCounter(state, payload) {
      payload.count ++ 
    },
    addToCard(state, payload) {
      state.cartList.push(payload)
      
      //选中与不选择通过模型进行修改，默认加入为不选中
      payload.checked = false   
    }
  },
  actions: {
    addToCard(context, payload) {
      //异步请求 payload 挂载参数
      return new Promise((resolve, reject) => {
        
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
        //2.判断oldProduct
        if (oldProduct) {   //数量+1
          context.commit('addCounter', oldProduct)
          resolve('当前的商品数量+1')
        } else{  //添加新的商品
          payload.count = 1  
          //context.state.cartList.push(payLoad)
          context.commit('addToCard', payload) 
          resolve('添加了新的商品')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    } 
  }
})

export default store

/* export default new Vuex.Store({
  state: {
    cartList: []
  },

  modules: {
  }
}) */

//3.挂载到Vue实例
