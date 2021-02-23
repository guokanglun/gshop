<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.address">
            <template #left>
                <router-link to="/search" class="header_search">
                <i class="iconfont icon-sousuo"></i>
              </router-link>
            </template>
            <template #right>
                <span class="header_login">
                    <span class="header_login_text" v-if="!userInfo._id" @click="$router.push('/login')">登录|注册</span>
                    <span class="iconfont icon-person" v-else @click="$router.push('/profile')"></span>
                </span>
            </template>
        </HeaderTop>
        <div class="msite-content">
            <div>
                <!--首页导航-->
                <Nav></Nav>
                <!--首页附近商家-->
                <ShopList></ShopList>
            </div>
        </div>
    </section>

</template>

<script>
    import {mapState} from 'vuex'
    import HeaderTop from "../../components/headerTop/HeaderTop";
    import Nav from "../../components/nav/Nav";
    import ShopList from "../../components/shoplist/ShopList";
    import BScroll from 'better-scroll'
    export default {
        name: "Msite",
        components:{
            HeaderTop, Nav, ShopList
        },
        computed:{
            // 映射state数据
            ...mapState(['address', 'userInfo'])
        },
        mounted(){
            // 触发action， 获取地址信息
            this.$store.dispatch('getAddress');
            new BScroll('.msite-content', {
                click: true
            })
        }
    }
</script>

<style scoped lang="stylus">
    .msite  //首页
        width 100%
        .msite-content
            height: 576px
</style>
