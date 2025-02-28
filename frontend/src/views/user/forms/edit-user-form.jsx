import React, { Component } from "react";
import { Form, Input, Select, Modal, Upload, Icon, message } from "antd";

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  // URL backend
  BASE_URL = "http://localhost:8080";

  // Fungsi untuk memvalidasi form sebelum submit
  handleOk = () => {
    const { form, onOk } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return; // Jika ada error pada form, hentikan proses
      }

      const { oldPassword, password } = values;

      // Validasi khusus untuk password
      if ((oldPassword && !password) || (!oldPassword && password)) {
        message.error("Silakan isi kedua password atau kosongkan keduanya.");
        return;
      }

      // Jika validasi lolos, panggil fungsi onOk untuk submit data
      onOk(values);
    });
  };

  render() {
    const { visible, onCancel, form, confirmLoading, currentRowData } =
      this.props;
    const { getFieldDecorator } = form;
    const {
      id = "",
      name = "",
      username = "",
      email = "",
      oldPassword = "",
      password = "",
      roles = "ROLE_ADMINISTRATOR",
    } = currentRowData;

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
        title="Edit Manajemen User"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk} // Gunakan fungsi handleOk untuk validasi
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          {/* ID User */}
          <Form.Item label="ID User:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>

          {/* Nama */}
          <Form.Item label="Nama:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silakan isikan nama pengguna" },
              ],
              initialValue: name,
            })(<Input placeholder="Nama User" />)}
          </Form.Item>

          {/* Username */}
          <Form.Item label="Username:">
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Silakan isikan username pengguna" },
              ],
              initialValue: username,
            })(<Input placeholder="Username Pengguna" />)}
          </Form.Item>

          <Form.Item label="Foto User" name="file">
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

          {/* Email */}
          <Form.Item label="Email:">
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Silakan isikan email pengguna" },
                { type: "email", message: "Masukkan email yang valid" },
              ],
              initialValue: email,
            })(<Input placeholder="Email Pengguna" />)}
          </Form.Item>

          {/* Password Lama */}
          <Form.Item label="Password Lama:">
            {getFieldDecorator("oldPassword", {
              initialValue: oldPassword,
            })(<Input.Password placeholder="Password Lama" />)}
          </Form.Item>

          {/* Password Baru */}
          <Form.Item label="Password Baru:">
            {getFieldDecorator("password", {
              initialValue: password,
            })(
              <Input.Password placeholder="Password Baru (kosongkan jika tidak mengganti)" />
            )}
          </Form.Item>

          {/* Role */}
          <Form.Item label="Role:">
            {getFieldDecorator("roles", {
              initialValue: "ADMINISTRATOR", // Nilai awal
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="ROLE_ADMINISTRATOR">
                  ADMINISTRATOR
                </Select.Option>
                <Select.Option value="ROLE_LECTURE">LECTURE</Select.Option>
                <Select.Option value="ROLE_STUDENT">STUDENT</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditUserForm" })(EditUserForm);
