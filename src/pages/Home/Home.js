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
    }).catch(msg => {
      message.error(msg)
    })
  }
  render() {
    return (
      <div className={style.home}>
        <Row gutter={24}>
          <Col className={style.colorBox} xs={24} sm={8}>
            <Link className={style.colorItem} to='/user'>
              <div className={style.count}>{this.state.userCount}</div>
              <div className={style.desc}><Icon type='appstore-o'></Icon> 用户总数</div>
            </Link>
          </Col>
          <Col className={style.colorBox} xs={24} sm={8}>
            <Link className={style.colorItem} to='/product'>
              <div className={style.count}>{this.state.productCount}</div>
              <div className={style.desc}><Icon type='file-text'></Icon> 商品总数</div>
            </Link>
          </Col>
          <Col className={style.colorBox} xs={24} sm={8}>
            <Link className={style.colorItem} to='/order'>
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
