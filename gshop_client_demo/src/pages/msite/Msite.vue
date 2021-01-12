<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.address">
            <template  v-slot:left>
                <router-link to="/search" class="header_search">
                <i class="iconfont icon-sousuo"></i>
              </router-link>
            </template>

            <template v-slot:right>
                <span class="header_login">
                    <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                    <span class="iconfont icon-person" v-else></span>
                </span>
            </template>
        </HeaderTop>
        <!--首页导航-->
        <Nav></Nav>
        <!--首页附近商家-->
        <ShopList></ShopList>
    </section>

</template>

<script>
    import {mapState} from 'vuex'
    import HeaderTop from "../../components/headerTop/HeaderTop";
    import Nav from "../../components/nav/Nav";
    import ShopList from "../../components/shoplist/ShopList";
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
            this.$store.dispatch('getAddress')
        }
    }
</script>

<style scoped lang="stylus">
    .msite  //首页
        width 100%
</style>
