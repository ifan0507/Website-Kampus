import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
const { TextArea } = Input;
class EditUserForm extends Component {
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
        title="Edit Manajemen User"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Nama:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Username:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Silakan isikan nama pengguna"}],
              initialValue: name,
            })(<Input placeholder="Nama Pengguna" />)}
          </Form.Item>
          <Form.Item label="Role:">
            {getFieldDecorator("role", {
              initialValue: role,
            })(
              <Select style={{ width: 120 }} disabled={id === "admin"}>
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="lecture">editor</Select.Option>
                <Select.Option value="student">guest</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Email:">
            {getFieldDecorator("description", {
              initialValue: description,
            })(<TextArea rows={4} placeholder="Silakan isikan deskripsi pengguna" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditUserForm" })(EditUserForm);
