/*
    封装n个请求接口
 */
import ajax from './axios'

// 根据经纬度获取位置详情
export const reqAddress = (geohash)  => ajax(`/api/position/${geohash}`);

// 获取食品分类列表
export const reqFoodList = () => ajax('/api/index_category');

// 根据经纬度获取商铺列表
export const reqShopList = (latitude, longitude) => ajax('/api/shops', {latitude, longitude});

// 用户名密码登录
export const reqUserPwdLogin = (name, pwd, captcha) => ajax('/api/login_pwd', {name, pwd, captcha}, 'POST');

// 发送短信验证码
export const reqSendCode = (phone) => ajax('/api/sendcode', {phone});

// 手机号验证码 登录
export const reqPhoneLogin = (phone, code) => ajax('/api/login_sms', {phone, code}, 'POST');

// 根据会话获取用户信息
export const reqUserInfo = () => ajax('/api/userinfo');

// 用户登出
export const reqLogout = () => ajax('/api/logout');

// 根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash, keyword) => ajax('/api/search_shops', {geohash, keyword});

//  mockjs 模拟接口数据接口
// shopgoods
export const  reqGoods = () => ajax('/goods');
// shopratings
export const  reqRatings = () => ajax('/ratings');
// shopinfo
export const  reqInfo = () => ajax('/info');
