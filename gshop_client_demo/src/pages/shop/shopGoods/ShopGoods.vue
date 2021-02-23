<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper">
                <ul>
                    <!--current-->
                    <li class="menu-item" :class="{current: index === currentIndex}"
                        v-for="(item, index) in shopGoods" :key="index"  @click="clickMenu(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="item.icon" v-if="item.icon">
              {{ item.name }}
            </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper">
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(item, index) in shopGoods" :key="index">
                        <h1 class="title">{{ item.name }}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" v-for="(item1, index) in item.foods"
                                :key="index"
                            @click="showFood(item1)"
                            >
                                <div class="icon">
                                    <img width="57" height="57" :src="item1.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{ item1.name }}</h2>
                                    <p class="desc">{{ item1.description }}</p>
                                    <div class="extra">
                                        <span class="count">月售{{ item1.sellCount }}份</span>
                                        <span>好评率{{ item1.rating }}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{ item1.price }}</span>
                                        <span class="old">￥{{ item1.oldPrice }}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControll :food="item1" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <Food :food="food" ref="fl"></Food>
        <ShopCart></ShopCart>
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    import BetterScroll from 'better-scroll'
    import Food from "../../../components/food/Food";
    import CartControll from "../../../components/cartControll/CartControll";
    import ShopCart from "../../../components/shopCart/ShopCart";
    export default {
        data(){
          return{
              scrollY: 0, // 右侧滚动 距离
              tops: [0],  // 右侧所有li的top位置
              food:{},
          }
        },
        computed:{
            ...mapState(['shopGoods']),

            // 计算属性计算当前索引
            currentIndex(){
                const {scrollY, tops} = this;
                return tops.findIndex((top, index) => {
                    return scrollY >= top && scrollY < tops[index + 1]
                });
            }
        },
        mounted(){
            // 以回调函数形式，在获取数据之后创建better-scroll
            this.$store.dispatch('getGoods', ()=>{
                this.$nextTick(()=>{  // 数据更新后显示
                    // 左侧menu滑动
                    new BetterScroll('.menu-wrapper', {
                        click:true  // 允许点击
                    });
                    //  右侧food滑动
                    this.bs2 = new BetterScroll('.foods-wrapper', {
                        probeType: 3 ,  // 决定是否派发 scroll 事件
                        click:true  // 允许点击
                    });

                    // 绑定滚动监听事件，收集scrollY
                    this.bs2.on('scroll', ({x, y})=>{
                        this.scrollY = Math.abs(y);
                    });

                    // 收集tops
                    const lis = this.$refs.foodsUl.children;
                    let top = 0;
                    [...lis].forEach(li=>{
                        top += li.clientHeight;
                        // debugger
                        this.tops.push(top)
                    });

                })

            });
        },
        methods:{
            clickMenu(index){
                this.bs2.scrollTo(0, -this.tops[index], 0)
            },
            showFood(food){
                this.food = food;
                this.$refs.fl.toggleShow()
            }
        },
        components:{
            CartControll, Food, ShopCart
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixin.styl"
    .goods
        display: flex
        position: absolute
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff;
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>
