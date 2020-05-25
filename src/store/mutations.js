import {
  ADD_COUNTER,
  ADD_TO_CARD
} from './mutation-type.js'


export default {  
    //mutations唯一的目的就是修改state中的状态
    //mutation每一个方法尽可能完成的事情单一
    [ADD_COUNTER](state, payload) {
      payload.count ++ 
    },
    [ADD_TO_CARD](state, payload) {
      state.cartList.push(payload)
      
      //默认购物车选中
      payload.checked = true   
    }
  }
