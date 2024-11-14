import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Form, Upload, Icon, Input, Select} from 'antd';
const { TextArea } = Input;
const { Option } = Select;


class AddQuestionForm extends Component {
  state = {
    selectedFile: null,
    categories: [],
    loading: false,
  };

  BASE_URL = 'http://localhost:8080';

  fetchCategories = () => {
    this.setState({ loading: true });
    axios
      .get(`${this.BASE_URL}/api/category-berita`)
      .then((response) => {
        console.log("Kategori Berita Diterima", response.data.content);
        this.setState({ categories: response.data.content, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.fetchCategories();
  }


  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const formData = new FormData();
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
    };
  
    return axios('api/berita', options);

  };

  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const { categories, loading} = this.state;

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
        title="Tambah Berita"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          {/* <Form.Item label="File">
            <Upload
              name="file"
              beforeUpload={() => false}
              maxCount={1}
              customRequest={({ file }) => {
                this.setState({
                  selectedFile: file,
                });
              }}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Klik atau Seret file ke sini</p>
              <p className="ant-upload-hint">support semua file</p>
            </Upload>
          </Form.Item> */}
          <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Silahkan isikan judul" },
              ],
            })(<TextArea rows={4} placeholder="Judul" />)}
          </Form.Item>

          <Form.Item label="Category Berita:">
           {getFieldDecorator('category-berita', {
            rules: [{ required: true, message: 'Silahkan pilih kategori berita' }],
            })(
            <Select placeholder="Pilih Kategori Berita" loading={loading}>
            {categories.length > 0 ? (
            categories.map((category) => (
            <Option key={category.id} value={category.id}>
            {category.name}
          </Option>
        ))
      ) : (
        <Option disabled value="">
          Tidak ada kategori
        </Option>
      )}
    </Select>
  )}
</Form.Item>
          
          <Form.Item label="Galeri Berita:">
            {getFieldDecorator("galeri-baru", {
              rules: [{ required: true, message: "Silahkan pilih galeri berita" }],
            })(
              <Select placeholder="Pilih Kategori Galeri Berita">
                <Option value="nasional">Nasional</Option>
                <Option value="internasional">Internasional</Option>
                <Option value="politik">Politik</Option>
              </Select>
            )}
          </Form.Item>
          
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Silahkan isikan deskripsi",
                },
              ],
            })(<TextArea rows={4} placeholder="Deskripsi" />)}
          </Form.Item>

          <Form.Item label="Selengkapnya:">
            {getFieldDecorator("selengkapnya", {
              rules: [
                {
                  required: true,
                  message: "Silahkan isikan catatan/tambahan",
                },
              ],
            })(<TextArea rows={4} placeholder="Selengkapnya" />)}
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

export default Form.create({ name: "AddQuestionForm" })(AddQuestionForm);