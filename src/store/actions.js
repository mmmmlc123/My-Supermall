import {
  ADD_COUNTER,
  ADD_TO_CARD
} from './mutation-type.js'

export default {
    addToCard(context, payload) {
      //异步请求 payload 挂载参数
      return new Promise((resolve, reject) => {
        //state.cartList.push(payload)
        //payload 新增加的商品
        /* let oldProduct = null;
          for(let item of state.cartList){
          if(item.iid === payload.iid){
            oldProduct = item;
          }
        } */
        //数组常用的方法？10个 push/pop/unshift/shift/sort/reverse/map/filter/reduce
        
        //1.查找之前数组中书否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
        //2.判断oldProduct
        if (oldProduct) {   //数量+1
          context.commit(ADD_COUNTER, oldProduct)
          resolve('当前的商品数量+1')
        } else{  //添加新的商品
          payload.count = 1  
          //context.state.cartList.push(payLoad)
          context.commit(ADD_TO_CARD, payload) 
          resolve('添加了新的商品')
        }
      })
    }
  }