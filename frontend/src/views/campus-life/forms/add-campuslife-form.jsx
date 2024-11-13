import React, { Component } from "react";
import { Form, Input, Select, Button, Upload, message, Icon, Modal } from "antd";
const { TextArea } = Input;
class AddCampusLifeForm extends Component {
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
        title="Tambah Fasilitas Kampus"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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

export default Form.create({ name: "AddCampusLifeForm" })(AddCampusLifeForm);
// })(<Button type="primary" onClick={this.showSelectImageDialog}>Select image...</Button>

