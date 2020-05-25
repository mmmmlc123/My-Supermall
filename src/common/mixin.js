import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted() {
        //防抖动
        let Refresh = debounce(this.$scroll.refresh, 100)
        this.itemImageListener = () => {
            Refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImageListener)
    },
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        
    },
}