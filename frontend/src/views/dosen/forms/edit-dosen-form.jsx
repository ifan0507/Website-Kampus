import React, { Component } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  message,
  Icon,
  Modal,
} from "antd";
const { TextArea } = Input;
class EditDosenForm extends Component {
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
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } =
      this.props;
    const { getFieldDecorator } = form;
    const { id, nip, name, email, no_hp, program_studi, bidang_minat } =
      currentRowData;
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
        title="Edit Manajemen Dosen"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="ID Jurusan:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="NIP:">
            {getFieldDecorator("nip", {
              rules: [{ required: true, message: "Silakan isikan NIP" }],
              initialValue: nip,
            })(<Input placeholder="NIP Dosen" />)}
          </Form.Item>

          <Form.Item label="Nama:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silakan isikan nama pengguna" },
              ],
              initialValue: name,
            })(<Input placeholder="Nama Pengguna" />)}
          </Form.Item>

          <Form.Item label="Email:">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Silakan isikan email" }],
              initialValue: email,
            })(<Input placeholder="Email Pengguna" />)}
          </Form.Item>

          <Form.Item label="Nomer Hp :">
            {getFieldDecorator("no_hp", {
              rules: [{ required: true, message: "Silakan isikan Nomer Hp" }],
              initialValue: no_hp,
            })(<Input placeholder="Nomer Hp pengguna" />)}
          </Form.Item>

          <Form.Item label="Program Studi:">
            {getFieldDecorator("program_studi", {
              rules: [
                { required: true, message: "Silahkan pilih Program Studi" },
              ],
              initialValue: program_studi,
            })(
              <Select style={{ width: 300 }}placeholder="Pilih Program Studi">
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
              initialValue: bidang_minat,
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

export default Form.create({ name: "EditDosenForm" })(EditDosenForm);
