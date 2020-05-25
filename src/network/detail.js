//封装详情页请求

import {request} from './request'

export function getDetail(iid) {
    return request ({
        url: '/detail',
        params: {
            iid 
        }
    })   
}

export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.topImages = itemInfo.topImages
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.Price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc        
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }

export class GoodsParam {
    constructor(info, rule) {
        //注：image有些商品没有值,需要做个判断
        this.image = info.image ? image[0]: '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export function GetRecommend() {
    return request ({
        url: '/recommend'
    })
}