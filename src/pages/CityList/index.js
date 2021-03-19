import React from 'react';
import { NavBar } from 'antd-mobile';
import './index.scss'
import axios from 'axios'
const formatCityList=(list)=>{
    const cityList={}
    // const cityIndex=[]
    // 1遍历数组
    list.forEach(item=>{
    // 获取每一个城市的首字母
        const first=item.short.substr(0,1)
        // 判断cityList中是否有该分类
        if(cityList[first]){
            // 如果有直接往该分类中push数据
            cityList[first].push(item)
        }else{
            // 如果没有，首先创建一个数组，然后把当前城市信息添加到数组中
            cityList[first]=[item] 
        }

    })
    // 获取索引数据,sort()方法用来排序
    const cityIndex=Object.keys(cityList).sort()
    return {
        cityList,
        cityIndex
    }
}
export default class CityList extends React.Component{
    state={
        cityListData:[]
    }
    // 获取城市列表
    async getCityList (){
        const res=await axios.get(`http://localhost:8080/area/city?level=1`)
        const {cityList,cityIndex}=formatCityList(res.data.body)
        console.log(cityList,cityIndex);
    }
    componentDidMount(){
        this.getCityList()
    }
    render(){
        return (
            <div className="cityList">
                {/* 顶部导航栏 */}
                <NavBar
                mode="light"
                icon={<i className="iconfont icon-back"></i>}
                onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>
            </div>
        )
    }
}