import React from "react";
import Simditor from "simditor";
import 'simditor/styles/simditor.css'

import style from './index.less'

class RichEditor extends React.Component{
    componentDidMount(){
        this.loadEditor()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail)
        }
    }
    loadEditor(){
        let element = this.refs['textarea']
        this.simditor = new Simditor({
            textarea: element,
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url: '/api/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: "upload_file"
            }
        })
        this.bindEditorEvent();
    }
    // 初始化编辑器事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue())
        })
    }

    render(){
        return(
            <div className={style.richEditor}>
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default RichEditor