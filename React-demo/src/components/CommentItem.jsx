// 创建组件、虚拟DOM、生命周期
import React from 'react' 
// 引入 css 样式
import cssObj from '@/css/comment.less'

export default function CommentItem(props) {
  return (
    <div className={cssObj["comment-item"]}>
      <h3>评论人：{props.user}</h3>
      <p>评论内容：{props.content}</p>
    </div>
  )
}