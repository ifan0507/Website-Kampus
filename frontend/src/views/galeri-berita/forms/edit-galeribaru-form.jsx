import React, { Component } from "react";
import { Form, Input, Upload, message, Icon, Modal } from "antd";
const { TextArea } = Input;

class EditGaleriBaruForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: props.currentRowData.data || [], // Menyimpan file yang akan diunggah
    };
  }

  // Fungsi ini akan dipanggil saat file diunggah atau dihapus
  handleChange = (info) => {
    let fileList = [...info.fileList];
    console.log("setelah perubahan ", fileList);

    // Limit to a maximum of 5 files
    if (fileList.length > 5) {
      message.error("You can only upload a maximum of 5 files!");
      fileList = fileList.slice(0, 5);
    }

    // Update the fileList in the state
    this.setState({ fileList });
  };

  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } = this.props;
    const { getFieldDecorator } = form;
    const { id, name, description} = currentRowData;  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal title="Edit Galeri" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formItemLayout}>
          <Form.Item label="ID Galeri:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>

          <Form.Item label="Name:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Silahkan isikan nama galeri baru" }],
              initialValue: name,
            })(<Input placeholder="Nama Galeri" />)}
          </Form.Item>
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Silahkan isikan deskripsi galeri",
                },
              ],
              initialValue: description,
            })(<TextArea rows={4} placeholder="Deskripsi Galeri" />)}
          </Form.Item>

          <Form.Item label="File" name="files">
            {getFieldDecorator("files")(
              <Upload.Dragger beforeUpload={() => false} fileList={this.state.fileList} onChange={this.handleChange} listType="picture" multiple>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditGaleriBaruForm" })(EditGaleriBaruForm);
