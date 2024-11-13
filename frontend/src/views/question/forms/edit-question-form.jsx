import React, { Component } from "react";
import { Form, Input, Modal, Select, Upload, message, Icon } from "antd";
const { TextArea } = Input;
class EditBeritaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [], // Menyimpan file yang akan diunggah
    };
  }

  // Fungsi ini akan dipanggil saat file diunggah atau dihapus
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const { id, name, role, description } = currentRowData;
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
        title="Edit Jalur Pendaftaran"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="ID Berita:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silahkan isikan judul" },
              ],
            })(<TextArea rows={4} placeholder="Judul" />)}
          </Form.Item>
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Silahkan isikan deskripsi" }],
              initialValue: description,
            })(<TextArea rows={4} placeholder="Deskripsi" />)}
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

export default Form.create({ name: "EditBeritaForm" })(EditBeritaForm);