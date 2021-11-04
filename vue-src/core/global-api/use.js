/* @flow */

import { toArray } from '../util/index'

/*初始化use*/
export function initUse (Vue: GlobalAPI) {
  /*https://cn.vuejs.org/v2/api/#Vue-use*/
  Vue.use = function (plugin: Function | Object) {
    /* istanbul ignore if */
    /*标识位检测该插件是否已经被安装*/
    if (plugin.installed) {
      return
    }
    // additional parameters
    const args = toArray(arguments, 1)
    // analyse: 往args前面插入当前Vue对象，所以后续的回调函数的第一个参数就是这个Vue对象
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      /*install执行插件安装*/
      // analyse: 传递 this（vue） 和 其他参数，给到插件内部处理
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    plugin.installed = true
    return this
  }
}
