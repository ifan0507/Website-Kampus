import React, { Component } from "react";
import { Form, Input, Upload, message, Icon, Modal } from "antd";
const { TextArea } = Input;

class EditPengumumanForm extends Component {
  constructor(props) {
    super(props);
    // Menyimpan fileList yang ada dari pengumuman yang dipilih
    this.state = {
      fileList: props.currentRowData.data || [],
    };
  }

  // Fungsi ini menangani perubahan pada file yang diunggah
  handleChange = (info) => {
    let fileList = [...info.fileList]; // Ambil fileList dari parameter
    console.log("setelah perubahan ", fileList);

    if (fileList.length > 5) {
      message.error("You can only upload a maximum of 5 files!");
      fileList = fileList.slice(0, 5); // Batasi maksimal 5 file
    }

    this.setState({ fileList }); // Update state dengan fileList baru
  };

  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } =
      this.props;
    const { getFieldDecorator } = form;
    const { id, name } = currentRowData;

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
        title="Edit Pengumuman"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="ID Pengumuman:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>

          <Form.Item label="Judul Pengumuman:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Judul pengumuman harus diisi" },
              ],
              initialValue: name, // Menampilkan judul yang sudah ada
            })(<TextArea rows={4} placeholder="Masukkan Judul Pengumuman" />)}
          </Form.Item>

          <Form.Item label="File" name="files">
            {getFieldDecorator("files")(
              <Upload.Dragger
                beforeUpload={() => false}
                fileList={this.state.fileList} // Ambil fileList dari state
                onChange={this.handleChange}
                listType="picture"
                multiple
              >
                <p className="ant-upload-drag-icon">
                  <i className="anticon anticon-inbox" />
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

export default Form.create({ name: "EditPengumumanForm" })(EditPengumumanForm);
