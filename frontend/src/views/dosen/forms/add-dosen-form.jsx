import React, { Component } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Icon,
  Modal,
} from "antd";
const { TextArea } = Input;
class AddDosenForm extends Component {
  // state = {
  //   selectedFile: null,
  // };

  // fileSelectedHandler = (event) => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   });
  // };

  // fileUploadHandler = () => {
  //   const formData = new FormData();
  //   const options = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     data: formData,
  //     method: "POST",
  //   };

  //   return Axios("api/dosen", options);
  // };

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
    // const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Tambah Manajemen Dosen"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="NIP:">
            {getFieldDecorator("nip", {
              rules: [{ required: true, message: "Silakan isikan NIP" }],
            })(<Input placeholder="NIP Dosen" />)}
          </Form.Item>

          <Form.Item label="Nama:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silakan isikan nama pengguna" },
              ],
            })(<Input placeholder="Nama Pengguna" />)}
          </Form.Item>

          <Form.Item label="Email:">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Silakan isikan email" }],
            })(<Input placeholder="Email Pengguna" />)}
          </Form.Item>

          <Form.Item label="Nomer Hp :">
            {getFieldDecorator("no_hp", {
              rules: [{ required: true, message: "Silakan isikan Nomer Hp" }],
            })(<Input placeholder="Nomer Hp pengguna" />)}
          </Form.Item>

          <Form.Item label="Program Studi:">
            {getFieldDecorator("program_studi", {
              rules: [
                { required: true, message: "Silahkan pilih Program Studi" },
              ],
            })(
              <Select style={{ width: 300 }}>
                <Select.Option value="Jurusan Teknologi Informasi">
                  D-III Jurusan Teknologi Informasi
                </Select.Option>
                <Select.Option value="Jurusan Teknologi Sipil">
                  D-III Jurusan Teknologi Sipil
                </Select.Option>
                <Select.Option value="Jurusan Teknologi Rekayasa Otomotif">
                  D-IV Jurusan Teknologi Rekayasa Otomotif
                </Select.Option>
                <Select.Option value="Jurusan Akuntansi">
                  D-III Jurusan Akuntansi
                </Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Bidang Minat:">
            {getFieldDecorator("bidang_minat", {
              rules: [
                { required: true, message: "Silahkan pilih Bidang Minat" },
              ],
            })(
              <Select style={{ width: 300 }}>
                <Select.Option value="Teknologi dan Rekayasa">
                  Teknologi dan Rekayasa
                </Select.Option>
                <Select.Option value="Ekonomi dan Manajemen">
                  Ekonomi dan Manajemen
                </Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="File" name="file">
            {getFieldDecorator("file")(
              <Upload.Dragger beforeUpload={() => false} listType="picture">
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

export default Form.create({ name: "AddDosenForm" })(AddDosenForm);
// })(<Button type="primary" onClick={this.showSelectImageDialog}>Select image...</Button>
