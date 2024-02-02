import React, { lazy } from "react"
// Navigate重定向组件
import { Navigate } from "react-router-dom"

import Home from "./Home"
// import About from  "../views/About"
// import User from  "../views/User"
import Login from "./Login"
const About = lazy(() => import("./Page301"))
const Posts = lazy(() => import("./sys/Posts"))
const Page1 = lazy(() => import("./Page1"))
const Page2 = lazy(() => import("./Page2"))
const Page301 = lazy(() => import("./Page301"))
const TaxFiles = lazy(() => import("./taxFiles/fileManage"))

// 报错A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator.
// 懒加载的模式的组件的写法，外面需要套一层 Loading 的提示加载组件


const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
  </React.Suspense>
)

const routes = [
  //  嵌套路由 开始-------------------
  {
    path: "/",
    element: <Navigate to="/Page1" />
  },
  {
    path: "/",
    element: <Posts />,
    children: [
      {
        path: "/sys",
        element: withLoadingComponent(<Posts />)
      },
      {
        path: "/page1",
        element: withLoadingComponent(<Page1 />)
      },
      {
        path: "/page2",
        element: withLoadingComponent(<Page2 />)
      },
      {
        path: "/page3/page301",
        element: withLoadingComponent(<Page301 />)
      },
      {
        path: "/taxFiles/fileManage",
        element: withLoadingComponent(<TaxFiles />)
      },
    ]
  },
  // 嵌套路由 结束-------------------
  {
    path: "/login",
    element: <Login />
  },
  // {
  //   path: "/taxFiles",
  //   element: <TaxFiles />,
  //   children: [
  //     {
  //       path: "/fileManage",
  //       element: withLoadingComponent(<TaxFiles />)
  //     },
  //   ]
  // },
  // 访问其余路径的时候直接跳到首页
  {
    path: "*",
    element: <Navigate to="/TaxFiles" />
  }

  // {
  //   path:"/home",
  //   element: <Home />
  // },
  // {
  //   path:"/about",
  //   element: withLoadingComponent(<About />)

  // },
  // {
  //   path:"/user",
  //   element: withLoadingComponent(<User />)
  // }
]

export default routes