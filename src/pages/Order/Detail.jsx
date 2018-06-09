import React from 'react'
import { Form, message, Table, Button, Popconfirm } from "antd"
import style from './Detail.less'
import OrderService from '../../service/OrderService';
import PageHeader from '../../layouts/PageHeader';
const FormItem = Form.Item

class Detail extends React.Component {
    constructor(params){
        super(params)
        this.state = {
            orderNo: this.props.match.params.orderNo,
            orderInfo: {}
        }
    }
    componentWillMount() {
        this.loadOrderDetail()
    }
    // 加订单详情
    loadOrderDetail(){
        this.state.orderNo && OrderService.getOrderDetail(this.state.orderNo).then(res => {
            this.setState({
                orderInfo: res
            })
        }).catch(errMsg => {
            if(errMsg === OrderService.CANCELTOKEN) return
            message.error(errMsg)
        })
    }
    // 发货
    onSendGoods(e){
        OrderService.sendGoods(this.state.orderNo).then(res => {
            message.success('发货成功！')
            this.loadOrderDetail()
        }).catch(errMsg => {
            message.error(errMsg)
        })
    }
    componentWillUnmount(){
        // 取消请求
        OrderService.cancelOrderDetailRequest(OrderService.CANCELTOKEN)
      
    }
    render() {
        // 导航栏数据
        const breadcrumbList = [
            {
                path: '/',
                name: '首页'
            }, {
                path: '/order',
                name: '订单列表'
            }, {
                path: '/order/order-detail',
                name: '订单详情'
            }
        ];
        // 商品列表表头
        let columns = [{
            title: '商品图片',
            dataIndex: 'productImage',
            render: (text, record) => (
                <img className={style.productImg} src={orderInfo.imageHost + text} alt=""/>
            )
        }, {
            title: '商品信息',
            width: '30%',
            dataIndex: 'productName',
        }, {
            title: '单价',
            dataIndex: 'currentUnitPrice',
        }, {
            title: '数量',
            dataIndex: 'quantity',
        }, {
            title: '合计',
            dataIndex: 'totalPrice',
        }]
        
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
        };
        let orderInfo = this.state.orderInfo || {}
        let shippingVo = orderInfo.shippingVo || {}
        let prodocutList = orderInfo.orderItemVoList || []
        return (
            <div className={style.detail}>
                <PageHeader breadcrumbList={breadcrumbList}></PageHeader>
                <Form>
                    <FormItem {...formItemLayout} label='订单号'>
                        {orderInfo.orderNo}
                    </FormItem>
                    <FormItem {...formItemLayout} label='创建时间'>
                        {new Date(orderInfo.createTime).toLocaleString()}
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }}
                        label='收件人'
                        >
                        {shippingVo.receiverName}，
                        {shippingVo.receiverProvince}
                        {shippingVo.receiverCity}
                        {shippingVo.receiverAddress}
                        {shippingVo.receiverMobile || shippingVo.receiverPhone}
                    </FormItem>
                    <FormItem {...formItemLayout} label='订单状态'>
                        {orderInfo.statusDesc}
                        {
                            orderInfo.status === 20
                            ? <Popconfirm 
                                title={'确定要发货吗？'} 
                                onConfirm={() => this.onSendGoods()}>
                                <Button type={'primary'} size='small'>发货</Button>
                            </Popconfirm>
                            : ''
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label='支付方式'>
                        {orderInfo.paymentTypeDesc}
                    </FormItem>
                    <FormItem {...formItemLayout} label='订单金额'>
                        {`￥${orderInfo.payment}`}
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }}
                        label='商品列表'>
                        <Table
                            className={style.productList} 
                            rowKey={(record, index) => index} 
                            bordered={true}
                            dataSource={prodocutList}  
                            columns={columns} 
                            pagination={false}
                        ></Table>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Detail