// 创建组件、虚拟DOM、生命周期
import React from 'react' 
// 引入评论项组件
import CommentItem from '@/components/CommentItem'
// 引入 css 样式
import cssObj from '@/css/comment.less'


export default class CommentList extends React.Component {
  constructor() {
    super()
    this.state = {
      commentList: [
        { user: '张三', content: '哈哈，沙发' },
        { user: '张三2', content: '哈哈，板凳' },
        { user: '张三3', content: '哈哈，凉席' },
        { user: '张三4', content: '哈哈，砖头' },
        { user: '张三5', content: '哈哈，楼下山炮' }
      ]
    }
  }
  render() {
    return (
      <div className={cssObj["comment-list"]}>
        {this.state.commentList.map((item, index) => (
          <CommentItem {...item} key={index}></CommentItem>
        ))}
      </div>
    )
  }
}