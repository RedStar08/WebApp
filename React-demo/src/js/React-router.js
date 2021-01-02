// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM
// 使用路由模块
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// HashRouter: 可以导入 HashRouter 表示通过 hash 值进行路由

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}

ReactDOM.render(
  <div>
    <h1>this is a h1</h1>
    <App />
  </div>,
  document.querySelector('#demo')
)
