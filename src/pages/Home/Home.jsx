import React, { Component } from 'react'
import { Row, Col, Icon, message } from 'antd'
import { Link } from 'react-router-dom'
import style from './Home.less'
import HomeService from '../../service/HomeService'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      productCount: 0,
      orderCount: 0,
    }
  }
  componentWillMount(){
    this.loadCount()
  }
  // 各个模块数据获取
  loadCount(){
    HomeService.getHomeCount().then(res => {
      this.setState(res)
    }).catch(errMsg => {
      message.error(errMsg)
    })
  }
  componentWillUnmount(){
    // 重写setState， 防止异步请求导致报错
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <div className={style.home}>
        <Row gutter={24}>
          <Col className={style.colorBox} xs={24} sm={8}>
            <Link className={style.colorItem} to='/user/user-list'>
              <div className={style.count}>{this.state.userCount}</div>
              <div className={style.desc}><Icon type='appstore-o'></Icon> 用户总数</div>
            </Link>
          </Col>
          <Col className={style.colorBox} xs={24} sm={8}>
            <Link className={style.colorItem} to='/product/product-list'>
              <div className={style.count}>{this.state.productCount}</div>
              <div className={style.desc}><Icon type='file-text'></Icon> 商品总数</div>
            </Link>
          </Col>
          <Col className={style.colorBox} xs={24} sm={8}>
            <Link className={style.colorItem} to='/order/order-list'>
              <div className={style.count}>{this.state.orderCount}</div>
              <div className={style.desc}><Icon type='user'></Icon> 订单总数</div>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
