import React from 'react'
import {Upload, Icon, Modal } from "antd"


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            previewVisible: false,
            previewImage: '',
        }
    }
    // 预览图片
    handlePreview(file){
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }
    // 关闭图片预览窗口
    handleCancel(){
        this.setState({ previewVisible: false })
    }
    render() {
        return (
            <div>
                <Upload
                    accept='image/*'
                    action="/api/manage/product/upload.do"
                    name='upload_file'
                    listType="picture-card"
                    onPreview={(file) => this.handlePreview(file)}
                    onChange={({file, fileList}) => this.props.getImageList(file, fileList)}
                    >
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                </Upload>
                <Modal 
                    visible={this.state.previewVisible} 
                    footer={null} 
                    onCancel={() => this.handleCancel()}>
                    <img alt="example" 
                        style={{ width: '100%' }} 
                        src={this.state.previewImage} />
                </Modal>
            </div>
        );
    }
}

export default ImageUpload;