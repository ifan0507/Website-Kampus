import React, { Component } from "react";
import { Form, Input, Modal, Select, Upload, message, Icon } from "antd";
const { TextArea } = Input;
class EditPendaftaranForm extends Component {
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
          <Form.Item label="ID Pendaftaran:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Jalur:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Silahkan isi Jalur Pendaftaran" }],
              initialValue: name,
            })(<Select style={{ width: 250 }}>
              <Select.Option value="Seleksi Nasional Berdasarkan Prestasi (SNBP)">Jalur SNBP</Select.Option>
              <Select.Option value="Seleksi Nasional Berdasarkan Tes (SNBT)">Jalur SNBT</Select.Option>
              <Select.Option value="Jalur Mandiri Khusus">Jalur Mandiri Khusus</Select.Option>
              <Select.Option value="Jalur Mandiri Khusus Tahap 2">Jalur Mandiri Khusus Tahap 2</Select.Option>
              <Select.Option value="Jalur Mandiri Prestasi">Jalur Mandiri Prestasi</Select.Option>
              <Select.Option value="Jalur Mandiri Gelombang 1">Jalur Mandiri Gelombang 1</Select.Option>
              <Select.Option value="Jalur Mandiri Gelombang 2">Jalur Mandiri Gelombang 2</Select.Option>
              <Select.Option value="Jalur Mandiri Gelombang 3">Jalur Mandiri Gelombang 3</Select.Option>
              <Select.Option value="Jalur Mandiri Kampus Lumajang">Jalur Mandiri Kampus Lumajang</Select.Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Silahkan isikan deskripsi" }],
              initialValue: description,
            })(<TextArea rows={4} placeholder="Deskripsi" />)}
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

export default Form.create({ name: "EditPendaftaranForm" })(EditPendaftaranForm);