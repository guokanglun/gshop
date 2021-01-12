<template>
    <nav class="msite_nav">
        <div class="swiper-container" v-if="categorysArr.length >0">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                    <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                        <div class="food_container">
                            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3772057134,2720637882&fm=11&gp=0.jpg">
                        </div>
                        <span>{{  category.title }}</span>
                    </a>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        <div v-else>
            <img src="./msite_back.svg" alt="">
        </div>
    </nav>
</template>

<script>
    import {mapState} from  'vuex'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    export default {
        name: "Nav",
        computed:{
          ...mapState(['categoryArr']),
            // 计算属性计算出一个二维数组
            categorysArr(){
                const {categoryArr} = this;
                // 外层
                const arr = [];
                // 内层
                let minArr = [];
                categoryArr.forEach((c)=>{
                    if(minArr.length === 8){
                        minArr = []
                    }
                    if(minArr.length === 0){
                        arr.push(minArr);
                    }
                    minArr.push(c);
                });
                return arr
            }
        },
        watch: {
            categoryArr(value){  // 监视categoryArr数据变化
                // nextTick 将回调延迟到下次 DOM 更新循环之后执行
                this.$nextTick(()=>{
                    new Swiper('.swiper-container',{
                        loop:true,
                        pagination:{
                            el:'.swiper-pagination'
                        }
                    })
                })
            }
        },
        mounted(){
            this.$store.dispatch('getFoodList');
        }
    }
</script>

<style lang="stylus">
    .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 45px
        height 200px
        background #fff
        .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                    display flex
                    justify-content center
                    align-items flex-start
                    flex-wrap wrap
                    .link_to_food
                        width 25%
                        .food_container
                            display block
                            width 100%
                            text-align center
                            padding-bottom 10px
                            font-size 0
                            img
                                display inline-block
                                width 50px
                                height 50px
                        span
                            display block
                            width 100%
                            text-align center
                            font-size 13px
                            color #666
            .swiper-pagination
                >span.swiper-pagination-bullet-active
                    background #02a774
</style>
