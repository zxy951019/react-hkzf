import React from 'react';
import axios from 'axios'
// 导入组件
import { Carousel, Flex, Grid, Card, InputItem } from 'antd-mobile';
// 引入图片
import Nav1 from '../../assest/images/nav-1.png'
import Nav2 from '../../assest/images/nav-2.png'
import Nav3 from '../../assest/images/nav-3.png'
import Nav4 from '../../assest/images/nav-4.png'

// 导入样式文件
import './index.scss'
// 导航菜单的数据
const navs = [{
    id: 0,
    img: Nav1,
    title: '整租',
    path: '/home/list'
}, {
    id: 1,
    img: Nav2,
    title: '合租',
    path: '/home/list'
}, {
    id: 2,
    img: Nav3,
    title: '地图找房',
    path: '/home/map'
}, {
    id: 3,
    img: Nav4,
    title: '去出租',
    path: '/home/list'
}]
const data = Array.from(new Array(4)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
  }));
  // 获取地理位置信息
  navigator.geolocation.getCurrentPosition(position=>{
        console.log('当前位置信息：',position);
})
export default class Index extends React.Component{
    state = {
        swipers: [],//轮播图片名称
        isRenderSwiper:false,//是否渲染轮播图
        groups:[],
        news:[]
      }
    /*  获取轮播图
    // 轮播图存在的问题
    // 1.刚开始轮播图不会自动切换，哪怕设置了
    // 2.页面切换回轮播图页面，图片高度会出现问题，
        原因：轮播图数据是动态加载的，加载前数据存在差异
        解决办法：设置一个状态值，等轮播图的图片加载完成后，变为true，并渲染轮播图
     */
    async getSwipers(){
        const res = await axios.get('http://localhost:8080/home/swiper')
        this.setState(()=>{
            return {
                swipers:res.data.body,
                isRenderSwiper:true
            }
        })
    }
    // 获取小组信息
    async getGroups(){
        const result=await axios.get('http://localhost:8080/home/groups',{
            params:{
                area:'AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        this.setState({
            groups:result.data.body
        })
    }
    // 获取最新资讯
    async getNews(){
        const res = await axios.get('http://localhost:8080/home/news',{
            params:{
                area: 'AREA|88cff55c-aaa4-e2e0'
            }
        })
        this.setState({
            news: res.data.body
        })
    }
    
    renderSwipers(){
        return this.state.swipers.map(item => (
            <a
            key={item.id}
            href="http://www.alipay.com"
            style={{ display: 'inline-block', width: '100%', height: 212 }}
            > 
            
            <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
            />
            </a>
        ))
    }
    renderNav(){
        return navs.map((item)=>{
            return (
                <Flex.Item key={item.id} onClick={()=>this.props.history.push(item.path)}>
                    <img src={item.img}></img>
                    <span>{item.title}</span>
                </Flex.Item>
            )
        })

    }
    renderGroups(item){
        return (<Flex className="groups-item" justify="around" key={item.id}>
        <div className="desc">
            <p className="title">{item.title}</p>
            <span className="info">{item.desc}</span>
        </div>
        <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
    </Flex>)
    }
    renserNews(){
        return this.state.news.map(item=>{
            return (
                <Card key={item.id}>
                    <Card.Body>
                        <Flex>
                            <Flex.Item>
                                <img src={`http://localhost:8080${item.imgSrc}`} alt=""></img>
                            </Flex.Item>
                            <Flex.Item>
                                <h3 className="title">{item.title}</h3>
                                <div className="content">
                                    <span className="laiyun">{item.from}</span>
                                    <span className="shijian">{item.date}</span>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </Card.Body>
                </Card>
            )
        })
    }
    componentDidMount() {
        //   页面一加载就获取
        this.getSwipers()
        this.getGroups()
        this.getNews()
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
      }
    render(){
        return (
            <div className='home'>
                
                {/* 轮播图 */}
                <div className="swiper">
                    {this.state.isRenderSwiper?( <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={5000}
                        >
                        {this.renderSwipers()}
                    </Carousel>):''}
                    <Flex className="top">
                        <Flex className="search">
                            {/* w位置 */}
                            <div className="location" onClick={()=>this.props.history.push('citylist')}>
                                <span className="name">上海</span>
                                <i className="iconfont icon-arrow"></i>
                            </div>
                            {/* 搜索表单 */}
                            <div className="form">
                                <i className="iconfont icon-seach"></i>
                                <span className="text ">请输入</span>
                            </div>
                        </Flex>
                        {/* 右侧图标 */}
                        <i className="iconfont icon-map" onClick={()=>this.props.history.push('Maplist')}></i>
                    </Flex>
                </div>
                
               
                {/* 导航菜单 */}
                <Flex className='nav'>
                    {this.renderNav()}
                </Flex>
                {/* 租房小组 */}
                <div className='groups'>
                    <div className="title">
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </div>
                    {/* 宫格 */}
                    <Grid data={this.state.groups} square={false} hasLine={false} columnNum={2} renderItem={(item) => (
                            this.renderGroups(item)
                    )} />
                </div>
                <div className="news">
                    <h4>最新资讯</h4>
                    {this.renserNews()}
                </div>
            </div>
        )
    }
}