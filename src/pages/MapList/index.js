import React from 'react';
import './index.scss'

export default class Home extends React.Component{
    componentDidMount(){
        // 创建地图实例对象
        // 在react使用全局对象要带window
        var map = new window.BMapGL.Map("container");
        // 设置中心点坐标
        var point = new window.BMapGL.Point(116.404, 39.915);
        // 初始化地图实例
        map.centerAndZoom(point, 15); 
    }   
    render(){
        return (
            <div className="map">
                {/* 地图容器组件 */}
                <div id="container" />
            </div>
        )
    }
}