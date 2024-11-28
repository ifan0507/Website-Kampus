import React, { Component } from "react";
import { Modal, Form, Upload, Icon, message, Input } from "antd";
import { addPengumuman } from "@/api/pengumuman";

class AddPengumumanForm extends Component {
state = {
  fileList : []
}

  handleChange = (info) => {
    let fileList = [...info.fileList];
    console.log("setelah perubahan ", fileList);

    if (fileList.length > 5) {
      message.error("You can only upload a maximum of 5 files!");
      fileList = fileList.slice(0, 5);
    }

    this.setState({ fileList });
  };
  render() {
    const { visible, onCancel, confirmLoading, form, onOk } = this.props;
    const { getFieldDecorator } = form;
    const {fileList } = this.state;

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
      <Modal
        title="Tambah Pengumuman"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        
      >
        <Form {...formItemLayout}>
          <Form.Item label="Judul Pengumuman">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Judul pengumuman harus diisi!" },
              ],
            })(<Input placeholder="Masukkan judul pengumuman" />)}
          </Form.Item>

        
          <Form.Item label="File" name="files">
            {getFieldDecorator("files", {
              rules: [{ required: true, message: "Silahkan unggah file!" }],
            })(
              <Upload.Dragger beforeUpload={() => false} listType="picture" fileList={fileList} onChange={this.handleChange} multiple>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for five file upload.</p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddPengumumanForm" })(AddPengumumanForm);
