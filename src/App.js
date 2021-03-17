// 根组件，配置路由信息
// 导入路由组件
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home/index'
import CityList from './pages/CityList/index'
import MapList from './pages/MapList/index'
function App() {
  return (
    <Router>
    <div className="App">
      {/* 定义路由占位 */}
      {/* 路由重定向 */}
      <Route exact path='/' component={()=><Redirect to='/home' />}></Route>
      <Route path='/home' component={Home}></Route>
      <Route path='/citylist' component={CityList}></Route>
      <Route path='/maplist' component={MapList}></Route>
    </div>
    </Router>
  );
}

export default App;
