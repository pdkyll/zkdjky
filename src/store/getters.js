/**
 * Created by zhangxin on 2018/11/13.
 */
export default {
  getPublicName (state) {
    console.log(state)
    const { publicName } = state
    return publicName
  }
}
