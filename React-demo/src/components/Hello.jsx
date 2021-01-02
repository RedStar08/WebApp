//  必须导入 React 否则会报错
import React from 'react' // 需要通过 React.createElement() 来构建 jsx 组件
 
 export default function Hello(props) {
  // 外部传递过来的数据组件通过，定义 props 属性来接收；
  // 通过 props 得到的任何数据都是只读的，不能从新赋值
  console.log(props)
  return (
    <div>
      <h3>这是在 Hello 组件中定义的元素</h3>
      <h5>通过 props 拿到只读的外部数据 name --- {props.name}</h5>
      <h5>通过 props 拿到只读的外部数据 age --- {props.age}</h5>
      <h5>通过 props 拿到只读的外部数据 gender --- {props.gender}</h5>
    </div>
  )
}
