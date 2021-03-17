import React from 'react';
import { Route } from 'react-router-dom'

// 导入tabbar
import { TabBar } from 'antd-mobile';
// 引入组件
import Index from '../Index/index'
import List from '../List/index'
import News from '../News/index'
import Profile from '../Profile/index'
// 引入样式
import './index.css'
// 导航数据
const tabItems = [{
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
},
{
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
},
{
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
},
{
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
}]
/*
    问题：点击首页导航菜单，导航到找房列表页面时，找房菜单没有高亮
    原因：原来我们实现该功能的时候，只考虑点击以及第一次加载home组件的情况，但是没有考虑不重新加载Home组件时的路由切换，因为这种情况下，我们的代码没有覆盖到
    解决：
        思路：在路由切换时，也执行 菜单高亮 的代码
        1.添加componentDidUpdate钩子函数,在路由切换时会触发componentDidUpdate钩子函数
        2.在钩子函数中判断路由地址是否切换
        3.在路由地址切换时，让菜单高亮
*/ 
export default class Home extends React.Component{
    state = {
        selectedTab: this.props.location.pathname,//默认选中的tab菜单
    }
    componentDidUpdate(prevProps){
        console.log('componentDidUpdate');
        // 在钩子函数中判断路由地址是否切换，一定要写在判断中，fouze会造成递归更新
        console.log('上一次路由信息:',prevProps);
        console.log('当前的路由信息:',this.props);
        if(prevProps.location.pathname!==this.props.location.pathname){
            // 此时，就说明路由发生了变化
            this.setState({
                selectedTab:this.props.location.pathname
            })
        }
    }
    renderTabItem(){
        return tabItems.map(item=>(
            <TabBar.Item
                title={item.title}
                key={item.title}
                icon={
                    <i className={`iconfont ${item.icon}`}></i>
                }
                selectedIcon={
                    <i className={`iconfont ${item.icon}`}></i>
                }
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                this.setState({
                    selectedTab: item.path,
                });
                this.props.history.push(item.path)
                }}
            >
            </TabBar.Item>
        ))
    }
    render(){
        return (
                <div className="tab-bar">
                    {/* 渲染子路由 */}
                    <Route exact path='/home' component={Index}></Route>
                    <Route path='/home/list' component={List}></Route>
                    <Route path='/home/news' component={News}></Route>
                    <Route path='/home/profile' component={Profile}></Route>
                    {/* tabar */}
                    <TabBar
                    noRenderContent={true}
                    tintColor="#21b97a"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                        {this.renderTabItem()}
                    </TabBar>
                </div>
        )
    }
}