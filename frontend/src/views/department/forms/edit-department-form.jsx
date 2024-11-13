import React, { Component } from "react";
import { Form, Input, Select, Button, Upload, message, Icon, Modal } from "antd";
const { TextArea } = Input;
class EditDepartmentForm extends Component {
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
    const { id, name, description, kompetensi, peluang } = currentRowData;
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
        title="Edit Jurusan"
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
          <Form.Item label="Nama Jurusan:">
            {getFieldDecorator("name", {
              // rules: [{ required: true, message: "Silahkan pilih jurusan" }],
              initialValue: name,
            })(<Select style={{ width: 300 }}>
              <Select.Option value="Jurusan Teknologi Informasi">Jurusan Teknologi Informasi</Select.Option>
              <Select.Option value="Jurusan Sipil">Jurusan Teknologi Sipil</Select.Option>
              <Select.Option value="Jurusan Teknologi Rekayasa Otomotif">Jurusan Teknologi Rekayasa Otomotif</Select.Option>
              <Select.Option value="Jurusan Akuntansi">Jurusan Akuntansi</Select.Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="Deskripsi Jurusan:">
            {getFieldDecorator("description", {
              // rules: [{ required: true, message: "Silahkan isikan deskripsi jurusan" }],
              initialValue: description,
            })(<TextArea rows={4} placeholder="Deskripsi Jurusan" />)}
          </Form.Item>
          <Form.Item label="Kompetensi Lulusan:">
            {getFieldDecorator("kompetensi", {
              // rules: [{ required: true, message: "Silahkan diisi" }],
              initialValue: kompetensi,
            })(<TextArea rows={4} placeholder="Kompetensi Lulusan" />)}
          </Form.Item>
          <Form.Item label="Peluang Kerja:">
            {getFieldDecorator("peluang", {
              // rules: [{ required: true, message: "Silahkan diisi" }],
              initialValue: peluang,
            })(<TextArea rows={4} placeholder="Peluang Kerja" />)}
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

export default Form.create({ name: "EditDepartmentForm" })(EditDepartmentForm);
