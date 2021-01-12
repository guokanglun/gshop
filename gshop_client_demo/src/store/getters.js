
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
    },
    positiveSize (state) {
        return state.shopRatings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0) , 0)
    }
}
