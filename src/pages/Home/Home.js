import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom'
import style from './Home.less'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {

  }
  render() {
    return (
      <div className={style.home}>
        <Row gutter={24}>
          <Col className={style.colorBox} span='8'>
            <Link className={style.colorItem} to='/user'>
              <div className={style.count}>000</div>
              <div className={style.desc}><Icon type='appstore-o'></Icon> 用户总数</div>
            </Link>
          </Col>
          <Col className={style.colorBox} span='8'>
            <Link className={style.colorItem} to='/product'>
              <div className={style.count}>000</div>
              <div className={style.desc}><Icon type='file-text'></Icon> 商品总数</div>
            </Link>
          </Col>
          <Col className={style.colorBox} span='8'>
            <Link className={style.colorItem} to='/order'>
              <div className={style.count}>000</div>
              <div className={style.desc}><Icon type='user'></Icon> 订单总数</div>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
