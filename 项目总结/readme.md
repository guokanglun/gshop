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



### 5. 开发应用详解 

##### 5.1 项目创建

vue 版本： vue2

```
npm install -g vue-cli
vue init webpack gshop
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
```



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

1. 配置路由，底部导航，点击跳转
2. 首页布局
3. 首页轮播 swiper

```
npm i swiper@4.2.6 --save
```

```js
mounted() {
    new Swiper('.swiper-container', {
        pagination:{
            el:'.swiper-pagination'
        },
        loop:true
    })
}
```

4. search 组件

   

### 7. 自定义组件

##### 7.1 footerGuide

[![sEf7Xn.png](https://s3.ax1x.com/2021/01/06/sEf7Xn.png)](https://imgchr.com/i/sEf7Xn)



1. 通过编程式导航实现路由的切换显示（$router.replace）
2. 通过动态class 实现tab切换（$route.path）
3. 阿里图标显示导航图标



### 8. 知识点 

##### 8.1 控制底部导航显示隐藏

在路由里添加meta属性

```js
  routes: [
    {
      path: '/mysite',
      component: Mysite,
      meta:{
        showFooter: true
      }
    }
```

```html
<FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
```



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

减少请求的次数