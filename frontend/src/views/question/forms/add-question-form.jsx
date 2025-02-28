import React, { Component } from "react";
import axios from "axios";
import { Modal, Form, Input, Upload, Select, Icon } from "antd";
const { TextArea } = Input;
const { Option } = Select;

class AddQuestionForm extends Component {
  state = {
    selectedFile: null,
    categories: [],
    gallerys: [], // gunakan ini untuk galeri
    loading: false,
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
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      method: 'POST',
    };
  
    return axios('api/berita', options);

  };

  BASE_URL = "http://localhost:8080";

  fetchCategories = () => {
    axios
      .get("http://localhost:8080/api/category-berita")
      .then((response) => {
        console.log("Categories fetched:", response.data.content);
        this.setState({ categories: response.data.content });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  fetchAvailableNews = () => {
    axios
      .get("http://localhost:8080/api/galeri-berita")
      .then((response) => {
        console.log("Gallery fetched:", response.data.content);
        this.setState({ gallerys: response.data.content });
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
      });
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchAvailableNews();
  }

  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const { categories, gallerys, loading } = this.state;

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
          <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Silahkan isikan judul" }],
            })(<TextArea rows={4} placeholder="Judul" />)}
          </Form.Item>

          <Form.Item label="Gambar Judul Berita" name="file">
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

          <Form.Item label="Category Berita:" required>
            {getFieldDecorator("categoryId", {
              rules: [
                { required: true, message: "Silahkan pilih kategori berita" },
              ],
            })(
              <Select placeholder="Pilih Kategori Berita">
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Galeri Berita:">
            {getFieldDecorator("galeriId", {
              rules: [
                { required: true, message: "Silahkan pilih galeri berita" },
              ],
            })(
              <Select placeholder="Pilih Galeri Berita" loading={loading}>
                {gallerys.length > 0 ? (
                  gallerys.map((gallery) => (
                    <Option key={gallery.id} value={gallery.id}>
                      {gallery.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled value="">
                    Tidak ada galeri berita
                  </Option>
                )}
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
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddQuestionForm" })(AddQuestionForm);
