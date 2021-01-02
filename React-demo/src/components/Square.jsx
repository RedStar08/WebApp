// 创建组件、虚拟DOM、生命周期
import React from 'react'
// 引入样式
import gameCss from '@/css/game.less'

// 棋子组件 (通过棋盘 Borad 组件来维护所有棋子所有的状态 故声明成无状态组件)
export default function Square(props) {
  return (
    <button className={gameCss['square']} onClick={props.onClick}>
      {props.value}
    </button>
  )
}
