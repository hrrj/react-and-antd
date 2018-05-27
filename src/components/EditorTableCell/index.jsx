import React from 'react'
import { Input, Icon } from "antd";
import style from './index.less'

class EditortableCell extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value,
            editable: false,
        }
    }
    handleChange(e){
        const value = e.target.value;
        this.setState({ value });
    }
    check(){
        this.setState({ editable: false });
        // 值没有改变则不执行更新操作
        if(this.props.value !== this.state.value && this.props.onChange){
            this.props.onChange(this.state.value);
        }
    }
    edit(){
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className={style.editableCell}>
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={(e) => this.handleChange(e)}
                            onPressEnter={this.check}
                            suffix={
                                <Icon
                                    type="check"
                                    className={style.editableCellIconCheck}
                                    onClick={() => this.check()}
                                />
                            }
                        />
                    ) : (
                            <div style={{ paddingRight: 24 }}>
                                {value || ' '}
                                <Icon
                                    type="edit"
                                    className={style.editableCellIcon}
                                    onClick={() => this.edit()}
                                />
                            </div>
                        )
                }
            </div>
        );
    }
}

export default EditortableCell