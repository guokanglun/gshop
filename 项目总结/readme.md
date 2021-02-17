### 1. 项目描述

1. 此项目为外卖SPA
2. 包括商家，商品，用户，购物车等多个子模块
3. 使用vue全家桶 + es6 +  webpack 技术
4. 采用模块化，组件化，工程化的模式开发

### 2. 技术选型

1. 前台数据处理：vue，vue-router,  vuex,  mint-ui,  vue-lazyload, vue-scroller,  better-scroll, swiper, moment, date-fns
2.  前后台交互：mockjs, postman, axios
3. 模块化：es6, babel
4. 项目构建/工程化：webpack,  vue-cli, eslint
5. css预处理器：stylus



### 3. 路由

| /mysite  | 首页      | 一级路由 |
| -------- | --------- | -------- |
| /search  | 搜索      | 一级路由 |
| /order   | 订单      | 一级路由 |
| /profile | 个人 信息 | 一级路由 |
| /login   | 登录      | 一级路由 |
| /shop    | 商家      | 一级路由 |
| /goods   | 商家商品  | 二级路由 |
| /ratings | 商家评价  | 二级路由 |
| /info    | 商家信息  | 二级路由 |

### 4. 这个项目能学到什么

1. 熟悉一个项目的开发流程
2. 熟悉组件化，模块化，工程化的开发模式
3. 掌握使用vue脚手架初始化vue项目
4. 学会模拟json后台数据，实现前后台分离开发
5. 掌握一些项目优化
6. 学会使用vue-router 开发单页应用
7. 学会使用axios与后端进行交互
8. vuex管理状态
9. better-scroll/vue-scroller 实现页面活滑动效果
10. mint-ui 组件库构建页面
11. vue-lazylod  图片懒加载
12. stylus 编写css
13. vue  过渡编写动画
14. 图标字体
15. 移动端1px边框问题



### 5. 开发前准备

##### 5.1 项目创建

vue 版本： vue2

```
npm install -g vue-cli
vue init webpack gshop
```

vue版本 ： vue3

```
vue create gshop
```

##### 5.2 启动项目

修改package.json  添加 最后一行代码

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "start": "npm run serve"
  },
```

项目启动

```
npm start
```



生产环境运行

```
npm run build 
npm i -g serve
serve dist
```



##### 5.2 项目文件夹

| api        | 请求接口   |
| ---------- | ---------- |
| common     | 通用资源   |
| components | 非路由组件 |
| filters    | 过滤器     |
| mock       | mock 数据  |
| pages      | 路由组件   |
| router     | 路由器     |
| store      | 状态管理   |

##### 5.3 安装stylus

```
npm install stylus@0.54.5 stylus-loader@3.0.2 --save-dev
stylus：将stylus代码转换为css 
stylus-loader: 让webpack理解stylus
```

vue3创建项目时可以选择stylus



##### 5.4 移动端

+ viewport

```html
 <meta name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

+ 解决点击响应延时0.3s

```js
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
      if ('addEventListener' in document) {
          document.addEventListener('DOMContentLoaded', function() {
              FastClick.attach(document.body);
          }, false);
      }
      if(!window.Promise) {
          document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
      }
  </script>
```



### 6. 项目进行流程

##### 6.1 搭建基本页面布局以及路由配置

底部tabbar 点击切换； on 控制高亮

```html
:class="{on: '/msite'===$route.path}" @click="goTo('/msite')"
```

```js
goTo (path) {
    this.$router.replace(path)
}
```

##### 6.2  拆分headTop

headerTop 组件； style 样式里不能使用scoped

错误写法：

```css
<style lang="stylus" scoped>
    .msite_header{}
```



  正确写法：

```vue
<template>
    <header class="msite_header">
        <slot name="left"></slot>
        <span class="header_title">
            <span class="header_title_text ellipsis">{{ title }}</span>
        </span>
        <slot name="right"></slot>

    </header>
</template>

<script>
    export default {
        name: "HeaderTop",
        props:{
            title:String
        }
    }
</script>

<style lang="stylus">
    .msite_header{}
```

msite

```vue
<HeaderTop title="湖北天门">
    <template  v-slot:left>
<span class="header_search">
    <i class="iconfont icon-sousuo"></i>
        </span>
    </template>

    <template v-slot:right>
<span class="header_login">
    <span class="header_login_text">登录|注册</span>
        </span>
    </template>
</HeaderTop>
```



##### 6.3 首页轮播 swiper

安装swiper4

```
npm i --save swiper@4
```

使用

```js
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

mounted(){
    new Swiper('.swiper-container',{
        loop:true,
        pagination:{
            el:'.swiper-pagination'
        }
    })
}
```

##### 6.7  拆分首页组件（轮播，商品列表）

##### 6.8 登录页布局 

1. 返回上一层 功能

```html
<a href="javascript:" class="go_back" @click="$router.back()">
    <i class="iconfont icon-jiantou2"></i>
</a>
```

2. 隐藏底部tabbar

路由添加meta属性，是否显示footerGuide

```js
const routes = [
  {
    path: '/msite',
    component: Msite,
    meta:{
      showFooter: true
    }
  },
```

app.vue

```html
<FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
```

##### 6.9 封装ajax 接口请求函数， 以及对应请求接口

```JS

/*
    封装ajax接口请求函数
 */

import axios from 'axios'

export const ajax = (url, data={}, type='GET') => {
    return new Promise((resolve, reject)=>{
        let promise;
        if(type==='GET'){
            promise = axios.get(url, {params: data})
        }else if(type==="POST"){
            promise = axios.post(url, data)
        }

        promise.then((response)=>{
            resolve(response.data)
        }).catch((err)=>{
            reject(err)
        })
    })
};
```

```js
/*
    封装n个请求接口
 */
import {ajax} from './axios'

// 根据经纬度获取位置详情
export const reqAddress = (geohash)  => ajax(`/api/position/${geohash}`);
...
```



##### 6.10 配置代理实现跨域

在package.json 同级目录下新建 vue.config.js  文件

```js
module.exports = {
    devServer: {
        proxy: {
            '/api': { // 匹配所有以 '/api'开头的请求路径
                target: 'http://localhost:4000', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                    '^/api': ''
                }
            }
        },
    }
};

```

##### 6.11 引入vuex 管理状态

index.js

```js
import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './action'
import getters from './getters'


export default createStore({
  state,
  mutations,
  actions,
  getters
})

```

mutation,js

```js
/*
    多个直接更新state的方法
 */

export default {
    // 接受地址
    receive_address(state, address){
        state.address = address
    },
    // 接受食品分类数据
    receive_category(state, categoryArr){
        state.categoryArr = categoryArr
    },
    // 接受商家数据
    receive_shops(state, shops){
        state.shops = shops
    }
}

```

actions.js

```js
/*
    通过mutation间接更新state
 */
import {
    reqAddress,
    reqFoodList,
    reqShopList
} from '../api'

export default {
    // 异步获取地址
    async getAddress({commit, state}){
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash);
        if(result.code == 0){
            const address = result.data;
            commit('receive_address', address)
        }
    },
    // 异步获取食品分类
    async getFoodList({commit, state}){
        const result = await reqFoodList();
        if(result.code == 0){
            const categoryArr = result.data;
            commit('receive_category', categoryArr)
        }
    },
    // 异步获取商家列表
    async getShops({commit, state}){
        const {latitude, longitude}  = state;
        const result = await reqShopList(latitude, longitude);
        if(result.code == 0){
            const shops = result.data;
            commit('receive_shops', shops)
        }
    }
}

```

state.js

```js
/*
    所有需要管理的状态数据
 */
export default {
    latitude:'30.649846226640655',  // 维度
    longitude: '113.14152622355653',  // 经度
    address: {},   // 地址信息对象
    categoryArr:[],  // 食品分类数组
    shops:[]  // 商家数组
}

```

##### 6.12 异步显示首页轮播数据

```
1. 获取状态数据
2. 构造二维数组（页数，每页数量）
3. watch 监视数据变化
4. nextTick 将回调延迟到下次dom更新循环之后
```

```js
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
```



##### 6.13 加载svg图片显示提示信息

数组长度大于0就显示数据，否则就显示svg图片

```html
<div class="swiper-container" v-if="categorysArr.length >0">
    ...
</div>
<div v-else>
    <img src="./msite_back.svg" alt="">
</div>
```

##### 6.14 拆分评分star组件

```
需要参数： 分数  尺寸
```

```html
<Star :score="shop.rating" :size="24"/>
```

```js
<script>
    export default {
        name: "Star",
        props:{
            score:Number,
            size:Number
        },
        computed:{
            /*
                计算属性计算：
                    'on' 'half' 'off' 个数
                eg:
                    4.2 : 4 + 0 + 1
                    4.5 : 4 + 1 + 1
             */
            starClass(){
                const {score} = this;
                // 定义一个数组 存放 on half off 属性
                let scs = [];
                const onNumber = Math.floor(score);
                for(let i = 0; i<onNumber; i++){
                    scs.push('on')
                }
                // 小数计算不精确问题，所以 x10
                if(score*10 - onNumber*10 > 5){
                    scs.push('half')
                }
                while(scs.length < 5){
                    scs.push('off')
                }
                return scs;

            }
        }
    }
</script>
```

##### 6.15 注册登录功能

###### 1. 切换登录方式

```html
<a href="javascript:;" :class="{on:longinWay}" @click="longinWay = true">短信登录</a>
<a href="javascript:;" :class="{on:!longinWay}" @click="longinWay= false">密码登录</a>
```

```js
data(){
    return{
        longinWay: true  // true代表短信登录  false代表密码登录
    }
}
```

###### 2. 手机号检查

[![sMadO0.png](https://s3.ax1x.com/2021/01/09/sMadO0.png)](https://imgchr.com/i/sMadO0)

```
通过正则检查手机号是否合法，如果合法，给‘获取验证码’ 添加样式
```

```html
<input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
<button disabled="disabled" class="get_verification" :class="{right_phone: isRight}">获取验证码</button>
```

```js
<script>
    export default {
        name: "Login",
        data(){
            return{
                longinWay: true,  // true代表短信登录  false代表密码登录
                phone: ''  //  手机号
            }
        },
        computed:{
            isRight(){
                return /1\d{10}/.test(this.phone)
            }
        }
    }
</script>
```

```stylus
&.right_phone
	color:black
```

###### 3. 倒计时效果

```
1. 验证成功之后才允许点击  disabled是否禁止点击
```

```html
<button :disabled="!isRight" class="get_verification" :class="{right_phone: isRight}"
        @click.prevent="getCode"
        >{{ isCompute?`已发送${computedTime}s`:'获取验证码' }}</button>
```

```js
<script>
    export default {
        name: "Login",
        data(){
            return{
                longinWay: true,  // true代表短信登录  false代表密码登录
                phone: '',  //  手机号
                computedTime: 30,  // 倒计时
                isCompute: false  // 是否启动倒计时
            }
        },
        computed:{
            isRight(){
                return /1\d{10}/.test(this.phone)
            }
        },
        methods:{
            // 点击获取验证码逻辑
            getCode(){
                // isCompute 为false时才允许执行下列操作
                if(!this.isCompute){
                    this.isCompute = true;
                    this.computedTime = 30;
                    // 阻止定时器累加
                    clearInterval(this.timer);
                    this.timer = setInterval(()=>{
                        this.computedTime --;
                        if(this.computedTime <= 0){
                            clearInterval(this.timer);
                            this.isCompute = false
                        }
                    }, 1000)
                }
            }
        }
    }
</script>
```

###### 4. 控制密码显示隐藏

根据指定效果添加特定样式

```html
<input type="tel" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
<input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
```

###### 5. 前台表单简单合法性验证

```
1. 出现input 就添加v-model
2. 使用到了自定义组件 弹窗组件
3. 弹窗： 接收alertText参数， 分发自定义事件 closeTip 
```

弹窗

```js
<script>
    export default {
        props: {
            alertText: String
        },

        methods: {
            closeTip() {
                // 分发自定义事件(事件名: closeTip)
                this.$emit('closeTip')
            }
        }
    }
</script>
```

login

```html
<form @submit.prevent="login">
</form>

<AlertTip  :alertText="alertText" @closeTip="closeTip" v-show="isAlert"/>
```

简单验证：

```js
// 登录
login(){
    if(this.longinWay){  // 短信登录
        const {phone, code, isRight} = this;
        if(!isRight){
            this.showAlert('手机号格式不正确');
            return
        }
        if(!code){
            this.showAlert('验证码必须输入');
            return
        }
    }else{  // 用户名登录
        const {name, pwd, captcha} = this;
        if(!name){
            this.showAlert('请输入用户名');
            return
        }
        if(!pwd){
            this.showAlert('请输入密码');
            return
        }

        if(!captcha){
            this.showAlert('请输入验证码');
            return
        }

    }
},
    // 关闭弹窗
    closeTip(){
        this.isAlert = false;
        this.alertText = ''
    },
        // 封装方法 显示弹窗
        showAlert(alertText){
            this.isAlert = true;
            this.alertText = alertText
        }
```

##### 6.15 注册登录功能

###### 1. 动态显示一次性验证码

```html
<img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
     @click="getCaptcha" ref="captcha">
```

```js
// 获取新的图形验证码
getCaptcha(){
    this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
}
```

###### 2. 定义接口请求函数

###### 3. 发送短信验证码

```js
async getCode(){
    if(!this.isCompute){
        this.isCompute = true;
        this.computedTime = 30;
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            this.computedTime --;
            if(this.computedTime <= 0){
                clearInterval(this.timer);
                this.isCompute = false
            }
        }, 1000);
        // 发送短信验证码 
        const result = await reqSendCode(this.phone);
        if(result.code === 1){
            this.showAlert(result.msg);
            this.isCompute = false;
            clearInterval(this.timer)
        }else{
            this.showAlert('短信发送成功')
        }
    }
}
```

###### 4. 将登录成功的用户信息保存到 vuex

写一套vuex的代码即可



###### 5. 完善profile页面

1. 显示手机号还是用户名

[![slKwPP.png](https://s3.ax1x.com/2021/01/10/slKwPP.png)](https://imgchr.com/i/slKwPP)

[![slKgVs.png](https://s3.ax1x.com/2021/01/10/slKgVs.png)](https://imgchr.com/i/slKgVs)

```html
<p class="user-info-top">{{ userInfo._id ?(userInfo.name || userInfo.phone):'登录/注册' }}</p>

<span class="icon-mobile-number">{{ userInfo.phone ?userInfo.phone:'暂无绑定手机号' }}</span>
```

2. 更新路由跳转

```html
登录了跳转到个人中心，没登录跳转到登录页面
<router-link :to="userInfo._id ?'/userinfo':'/login'" href="javascript:" class="profile-link">
```

2. 自动登录

```js
// 后台逻辑： 登录后保持登录状态一天
//  app.vue 加载页面直接获取用户信息  getUserInfo 定义在actions里
mounted(){
    this.$store.dispatch('getUserInfo')
}
```

###### 6. 退出登录



##### 6.16 商家页面

###### 1. 搭建页面

###### 2. mock数据  mockjs 模拟数据

`npm i --save mockjs`

```
mockjs
	生成随机数据，拦截ajax请求
```

```js
/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock('/goods', {code:0, data: data.goods})
// 返回ratings的接口
Mock.mock('/ratings', {code:0, data: data.ratings})
// 返回info的接口
Mock.mock('/info', {code:0, data: data.info})

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可

```

main.js 导入

```js
import './mock/mockServer'
```

###### 3. shopgoods 静态页面布局

###### 4. 实现滚动效果  better--scroll

`https://better-scroll.github.io/docs/zh-CN/guide/how-to-install.html#npm`

```js
mounted(){
    // 以回调函数形式，在获取数据之后创建better-scroll
    this.$store.dispatch('getGoods', ()=>{
        this.$nextTick(()=>{  // 数据更新后显示
            new BetterScroll('.menu-wrapper')
            new BetterScroll('.foods-wrapper')
        })

    });
}
```

action.js

```js
async getGoods({commit}, callback){
    const result = await reqGoods();
    if(result.code === 0){
        const {data}  = result;
        commit('receiveGood', data);
        callback()
    }
}
```

###### 5. 滑动右侧过程中收集scrollY

```js
let bs2 = new BetterScroll('.foods-wrapper', {
    probeType: 2   // 决定是否派发 scroll 事件
});

// 绑定滚动监听事件
bs2.on('scroll', ({x, y})=>{
    this.scrollY = y;
})
```

###### 6. 收集tops

```js
// 收集tops
const lis = this.$refs.foodsUl.children;
let top = 0;
[...lis].forEach(li=>{
    top += li.clientHeight;
    // debugger
    this.tops.push(top)
});
```

###### 7. 滑动右侧列表更新当前分类

```js
// 计算属性计算当前索引
currentIndex(){
    const {scrollY, tops} = this;
    const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
    });

    return index;
}
```

###### 8. 单击左侧菜单，右侧对应滚动

```js
methods:{
    clickMenu(index){
        // scrollTo  滚动到某个位置，持续时间300ms
        this.bs2.scrollTo(0, -this.tops[index], 300)
    }
}
```

###### 9. cartcontrol 组件

```js
updateCount(isAdd){
    if(isAdd){
        // 增加
        if(!this.food.count){
            this.$set(this.food, 'count', 1)
        }else{
            this.food.count  ++
        }
    }else{
        // 减少
        this.food.count --;
        if(this.food.count <=  1){
            this.food.count = 1
        }
    }
}
```

##### 10 . 动画

```css
&.move-enter-active, &.move-leave-active
	transition all 1s
&.move-enter, &.move-leave-to
    opacity 0
    transform translateX(15px) rotate(180deg)
```

##### 11. 计算属性计算购物车商品总数量总价格

```js

export default {
    totalCount(state){
        return state.cartGoods.reduce((pre, good)=>{
            return pre + good.count
        }, 0)
    },
    totalPrice(state){
        return state.cartGoods.reduce((pre, good)=>{
            return pre + good.count * good.price
        }, 0)
    }
}

```

##### 12. cartList better-scroll

##### 13. 清空购物车

##### 14. 缓存路由组件对象

复用路由组件获取的后台数据

```html
<keep-alive>
    <router-view/>
</keep-alive>
```

##### 15. 图片懒加载

当打开一个有很多图片的页面时，先只加载页面上看到的图片，等滚动到页面下面时，再加载所需的图片。这就是图片懒加载。

1 增强用户体验
2 优化代码
3减少http的请求
4减少服务器端压力
5服务器的按需加载

`npm i --save vue-lazyload`

main.js引入

```js
import VueLazyload from 'vue-lazyload'
// or with options
const loadimage = require('./assets/loading.gif');
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
});
```

使用

```html
<img v-lazy="food.image">
```

##### 16 日期格式过滤

`npm install --save date-fns`

自定义过滤器

```js
/* index.js */import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'
// 自定义过滤器
Vue.filter('date-format', function (value, formatStr='yyyy-MM-dd HH:mm:ss') {
    // return moment(value).format(formatStr)
    return format(value, formatStr)
})

```

main.js 引入

```js
import './filter'
```



使用

```html
{{ time | date-format }}
```



##### 17. 打包文件优化

`npm run build -- --report`

### 8. 知识点 

##### 8.2 什么是模块化 组件化工程化

　　模块化：是从代码逻辑的角度进行划分；方便代码分层开发，保证每个功能模块的职能单一；

　　组件化：是从UI界面的角度进行划分，前端的组件化，方便UI组件的重用

​		工程化： 一种开发思想，从多方面考虑项目的开发，比如：模块化，组件化，规范化，技术选型等，最终就是为了提高项目开发 效率



##### 8.3 接口组成

四大部分：请求地址   请求方式 请求参数  返回结果

##### 8.4 生产环境开发

```
npm run build
npm i -g serve
serve dist
```



##### 8.5 图片base64作用

将图片转换成base64字符串格式，减少请求的次数；小图片

##### 8.6 vue 数据来源

三个来源：

data props computed

##### 8.7 数据驱动视图

页面一切动态效果都是通过数据改变实现，vue框架的核心思想

##### 8.8 代理是什么

代理： 运行在前台服务器上的程序

作用：转发请求，解决ajax请求跨域问题

##### 8.9 父组件操作子组件方法

```js
this.$refs.fl.toggleShow()  // 获取父组件元素可以直接调用子组件里的方法
```



### 9. 你在项目中都遇到了哪些问题

##### 9.1 slot 

使用slot时，子组件里的style不能添加scoped 属性，否则会导致样式不生效的结果

##### 9.2 轮播图数据获取之后，轮播效果不显示问题

原因：vue dom 异步更新

解决：  watch + nextTick   callback + nextTick 将回调延迟到dom更新之后



##### 9.3 图形验证码登录后台接口有问题

##### 9.4  获取用户信息的时候

退出登录后刷新页面直接报错

原因：刚开始没有考虑退出登录的情况；

用户信息在APP里获取，在登录状态下，userinfo为一个对象，但是在注销登录后，userinfo 为undefined  ，， 导致profile页面获取用户信息的时候直接报错；空对象可以获取不存在的属性名，undefined就会直接报错了；

解决办法：在action里获取用户信息的时候做一个判断，状态码为0的时候返回数据，不为0的时候返回一个空对象，就不会报错了 



##### 9.5 给已有数据绑定的数据添加新的属性

this.$set

##### 9.6 better-scroll 遇到的坑

1. 必须加入配置项 click:true , 否则里面的点击事件不起作用（购物车里的商品数量变化）
2.  vue dom 异步更新  ，  必须加上 nextTick  才有效果
3. better-scroll 必须要有内外两层，内层高度大于外层高度



##### 9.7 阻止冒泡

@click.stop





##### 9.8 创建better-scroll 时机

watch + nextTick

callback + nextTick

##### 9.9 路由跳转

replace 模式跳转

```html
<router-link to="/shop/shopGoods" replace>点餐</router-link>
```



##### 9.10 连续点击当前路由多次报错

原因： vue router ≥ v3.1 后 ，回调形式改成 promise api 了，返回的是 promise，如果没有捕获到错误，控制台始终会出现如上图的警告。

```js
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const originalPush1 = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalPush1.call(this, location).catch(err => err)
};
```

