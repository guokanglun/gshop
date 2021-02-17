/*
    多个直接更新state的方法
 */
import Vue from 'vue'

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
    },
    // 保存用户信息
    saveUserInfo(state, userInfo){
        state.userInfo = userInfo
    },
    // 删除用户信息
    deleteUser(state){
        state.userInfo = {};
    },

    // mock
    // 点餐数据
    receiveGood(state, shopGoods){
        state.shopGoods = shopGoods
    },
    // 评价数据
    receiveRatings(state, shopRatings){
        state.shopRatings = shopRatings
    },
    // 商家数据
    receiveInfo(state, shopInfo){
        state.shopInfo = shopInfo
    },

    incrementCount(state, food){
        // debugger
        if(!food.count){
            Vue.set(food, 'count', 1);
            // 添加到购物车
            state.cartGoods.push(food)
        }else{
            food.count ++
        }
    },
    decrementCount(state, food){
        food.count --;
        if(food.count <= 0){
            food.count = 0;
            state.cartGoods.splice(state.cartGoods.indexOf(food), 1)
        }
    },

    // 清空购物车
    resetCart(state){
        state.cartGoods.forEach(good=>{
            good.count = 0;
        });
        state.cartGoods = []
    },

    getSearchShops (state, searchShops) {
        state.searchShops = searchShops
    }
}
