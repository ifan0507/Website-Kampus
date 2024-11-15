import React, { Component } from "react";
import axios from "axios";
import { Modal, Form, Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

class AddQuestionForm extends Component {
  state = {
    selectedFile: null,
    categories: [],
    gallerys: [], // gunakan ini untuk galeri
    loading: false,
  };

  BASE_URL = "http://localhost:8080";

  fetchCategories = () => {
    this.setState({ loading: true });
    axios
      .get(`${this.BASE_URL}/api/category-berita`)
      .then((response) => {
        console.log("Kategori Berita Diterima", response.data.content);
        this.setState({ categories: response.data.content, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        this.setState({ loading: false });
      });
  };

  fetchAvailableNews = () => {
    this.setState({ loading: true });
    axios
      .get(`${this.BASE_URL}/api/galeri-berita`)
      .then((response) => {
        console.log("Galeri Berita Diterima", response.data.content);
        this.setState({ gallerys: response.data.content, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching available news:", error);
        this.setState({ loading: false });
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
