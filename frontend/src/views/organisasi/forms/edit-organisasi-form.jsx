import React, { Component } from "react";
import { Form, Input, Upload, message, Icon, Modal } from "antd";
const { TextArea } = Input;

class EditOrganisasiForm extends Component {
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
    const { id, name, description, data} = currentRowData;
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
        title="Edit Gambar"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        
        <Form {...formItemLayout}>
        <Form.Item label="ID Gambar:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
        <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silahkan isikan judul" },
              ],
            })(<Input placeholder="Data" />)}
          </Form.Item>
          
          {/* <Form.Item label="File">
            {getFieldDecorator("data")(
              <Upload
                name="data"
                beforeUpload={() => false}
                fileList={this.state.fileList} // Menghubungkan fileList dengan state
                onChange={this.handleChange} // Menggunakan handleChange untuk mengelola perubahan file
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Klik atau Seret file ke sini</p>
                <p className="ant-upload-hint">support semua file</p>
              </Upload>
            )}
          </Form.Item> */}
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

export default Form.create({ name: "EditOrganisasiForm" })(EditOrganisasiForm);