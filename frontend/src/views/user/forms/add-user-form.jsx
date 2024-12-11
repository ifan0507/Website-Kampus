import React, { Component } from "react";
import { Form, Input, Select, Modal, Upload, Icon } from "antd";
// import { reqValidatUserID } from "@/api/user";
import axios from "axios";
const { TextArea } = Input;
class AddUserForm extends Component {
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
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      method: 'POST',
    };

    return axios('api/user', options);
  };

  // validatUserID = async (rule, value, callback) => {
  //   if (value) {
  //     if (!/^[a-zA-Z0-9]{1,6}$/.test(value)) {
  //       callback("ID Pengguna必须为1-6位数字或字母组合");
  //     }
  //     let res = await reqValidatUserID(value);
  //     const { status } = res.data;
  //     if (status) {
  //       callback("ID Pengguna");
  //     }
  //   } else {
  //     callback("Masukkan ID Pengguna");
  //   }
  //   callback();
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
    return (
      <Modal
        title="Tambah Manajemen User"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Nama:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silakan isikan nama pengguna" },
              ],
            })(<Input placeholder="Nama Pengguna" />)}
          </Form.Item>

          <Form.Item label="Username:">
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Silakan isikan username pengguna" },
              ],
            })(<Input placeholder="Username Pengguna" />)}
          </Form.Item>

          <Form.Item label="Foto User" name="file">
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

          <Form.Item label="Email:">
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Silakan isikan email pengguna" },
              ],
            })(<Input placeholder="Email Pengguna" />)}
          </Form.Item>

          <Form.Item label="Password:">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Silakan isikan password baru" },
              ],
            })(<Input.Password placeholder="Password" />)}
          </Form.Item>

          <Form.Item label="Role:">
            {getFieldDecorator("roles", {
              initialValue: "ADMINISTRATOR", // Nilai awal
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="ROLE_ADMINISTRATOR">ADMINISTRATOR</Select.Option>
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

export default Form.create({ name: "AddUserForm" })(AddUserForm);
