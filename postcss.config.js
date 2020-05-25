module.export = {
    plugins: {
        autoprefixer: {},
        "postcss-pxx-to-viewport": {
            viewportWidth: 375, //视图的宽度，对应的是设计稿的宽度
            viewportHeight:667,//视图的高度，对应的是设计稿的高度
            unitPrecision: 5,  //指定px转换为视图单位值的小数位数（经常无法整除），
            viewportUnit: 'vw', //指定需要转换的视窗单位，建议使用vw

            minPixeValue: 1, //小于或等于‘1px'不转换成视窗单位
            mediaQuery: false //允许在媒体查询中转换px
        }
    }
}