import React, { Component } from "react";
import axios from 'axios';
import { Form, Input, Modal, Upload, Icon } from "antd";
const { TextArea } = Input;
class AddKegiatanForm extends Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const formData = new FormData();
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
    };
  
    return axios('api/kegiatan', options);

  };
  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
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
        title="Tambah Kegiatan"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silahkan isikan judul kegiatan" },
              ],
            })(<Input placeholder="Judul Kegiatan" />)}
          </Form.Item>
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Silahkan isikan deskripsi kegiatan",
                },
              ],
            })(<TextArea rows={4} placeholder="Deskripsi Kegiatan" />)}
          </Form.Item>
          <Form.Item label="Selengkapnya:">
            {getFieldDecorator("selengkapnya", {
              rules: [
                {
                  required: true,
                  message: "Silahkan isikan catatan/tambahan",
                },
              ],
            })(<TextArea rows={4} placeholder="Selengkapnya" />)}
          </Form.Item>
          <Form.Item label="File" name="file">
            {getFieldDecorator("file")(
              <Upload.Dragger
              beforeUpload={() => false}
              listType="picture"
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddKegiatanForm" })(AddKegiatanForm);
