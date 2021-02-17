import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from "../pages/msite/Msite";
import Order from "../pages/order/Order";
import Search from "../pages/search/Search";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Shop from "../pages/shop/Shop";
import ShopGoods from "../pages/shop/shopGoods/ShopGoods";
import ShopInfo from "../pages/shop/shopInfo/ShopInfo";
import ShopRatings from "../pages/shop/shopRatings/ShopRatings";

Vue.use(VueRouter)

const routes = [
  {
    path: '/msite',
    component: Msite,
    meta:{
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta:{
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta:{
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      showFooter: true
    }
  },
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/login',
    component: Login,
    meta:{
      showFooter: false
    }
  },
  {
    path: '/shop',
    component: Shop,
    children:[
      {
        path: '/shop/shopRatings',
        component:ShopRatings
      },
      {
        path: '/shop/shopInfo',
        component:ShopInfo
      },
      {
        path: '/shop/shopGoods',
        component:ShopGoods
      },
      {
        path: '/shop',
        redirect:'/shop/shopGoods'
      }
    ]
  },

];

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const originalPush1 = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalPush1.call(this, location).catch(err => err)
};

export default router
