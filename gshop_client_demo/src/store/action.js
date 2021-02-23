/*
    通过mutation间接更新state
 */
import {
    reqAddress,
    reqFoodList,
    reqShopList,
    reqUserInfo,
    reqLogout,
    reqGoods,
    reqInfo,
    reqRatings,
    reqSearchShops
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
    async getFoodList({commit}){
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
    },

    // 同步保存用户信息
    saveUser({commit}, user) {
        commit('saveUserInfo', user)
    },

    // 异步获取登录用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo();
        if(result.code == 0){
            // 保存信息
            commit('saveUserInfo', result.data)
        }else{
            commit('saveUserInfo', {})
        }
    },

    // 退出登录
    async Logout({commit}){
        const result = await reqLogout();
        if(result.code === 0){
            commit('deleteUser')
        }
    },

    // mock
    // 异步获取点餐数据
    async getGoods({commit}, callback){
        const result = await reqGoods();
        if(result.code === 0){
            const {data}  = result;
            commit('receiveGood', data);
            callback && callback()
        }
    },
    // 异步获取评价数据
    async getRatings({commit}, callback){
        const result = await reqRatings();
        if(result.code === 0){
            const {data}  = result;
            commit('receiveRatings', data);
            callback()
        }
    },
    // 异步获取商家数据
    async getInfo({commit}){
        const result = await reqInfo();
        if(result.code === 0){
            const {data}  = result;
            commit('receiveInfo', data)
        }
    },

    // 更新food count
    updateFoodCount({commit}, {isAdd, food}){

        if(isAdd){
            commit('incrementCount', food)
        }else{
            commit('decrementCount', food)
        }
    },

    // 清空购物车
    clearCart({commit}){
        commit('resetCart')
    },

    async reqGetSearchShops ({commit, state}, keyword) {
        const {latitude, longitude} = state;
        const geohash = latitude + ',' + longitude;
        const result = await reqSearchShops(geohash, keyword);
        // debugger
        if (result.code === 0) {
            commit ('getSearchShops', result.data)
        }
    }

}
