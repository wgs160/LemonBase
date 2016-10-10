/**
 * Created by 15031493 on 2016/8/18.
 */
// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function getCount (state) {
    return state.count
}
export function getNum (state) {
    return state.s_num
}