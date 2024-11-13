import React, { Component } from "react";
import { Form, Input, Select, Button, Upload, message, Icon, Modal } from "antd";
const { TextArea } = Input;
class EditCampusLifeForm extends Component {
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
    const { id, name, description } = currentRowData;
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
        title="Edit Fasilitas Kampus"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="ID Fasilitas Kampus:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="Kategori:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silahkan pilih kategori fasilitas kampus" },
              ],
            })(<Select style={{ width: 300 }}>
              <Select.Option value="Unit Kegiatan Mahasiswa">Unit Kegiatan Mahasiswa</Select.Option>
              <Select.Option value="Keamanan">Keamanan</Select.Option>
              <Select.Option value="Kantin">Kantin</Select.Option>
              <Select.Option value="Flora dan Fauna">Flora dan Fauna</Select.Option>
              <Select.Option value="Fasilitas Parkir">Fasilitas Parkir</Select.Option>
              <Select.Option value="Fasilitas Bangunan">Fasilitas Bangunan</Select.Option>
              <Select.Option value="Fasilitas Olahraga">Fasilitas Olahraga</Select.Option>
              <Select.Option value="Keselamatan dan Kesehatan Kerja">Keselamatan dan Kesehatan Kerja</Select.Option>
              <Select.Option value="Perpustakaan">Perpustakaan</Select.Option>
              <Select.Option value="Peta Kampus">Peta Kampus</Select.Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="Deskripsi Kategori:">
            {getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Silahkan isikan deskripsi kategori",
                },
              ],
            })(<TextArea rows={4} placeholder="Deskripsi Kategori Campus Life" />)}
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

export default Form.create({ name: "EditCampusLifeForm" })(EditCampusLifeForm);
