import React, { Component } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

class EditBeritaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], // Data kategori berita
      gallerys: [], // Data galeri berita
      loadingCategories: false, // Status loading kategori
      loadingGallerys: false, // Status loading galeri
    };
  }

  // Fetch Kategori Berita dari API
  fetchCategories = () => {
    this.setState({ loadingCategories: true });
    axios
      .get("http://localhost:8080/api/category-berita")
      .then((response) => {
        console.log("Categories fetched:", response.data.content); // Cek data kategori
        this.setState({ categories: response.data.content, loadingCategories: false });
      })
      .catch((error) => {
        message.error("Gagal mengambil kategori berita");
        this.setState({ loadingCategories: false });
      });
  };

  // Fetch Galeri Berita dari API
  fetchGallerys = () => {
    this.setState({ loadingGallerys: true });
    axios
      .get("http://localhost:8080/api/galeri-berita")
      .then((response) => {
        console.log("Gallerys fetched:", response.data.content); // Cek data galeri
        this.setState({ gallerys: response.data.content, loadingGallerys: false });
      })
      .catch((error) => {
        message.error("Gagal mengambil galeri berita");
        this.setState({ loadingGallerys: false });
      });
  };

  // Lifecycle saat komponen dimuat
  componentDidMount() {
    this.fetchCategories();
    this.fetchGallerys();
  }

  // Lifecycle saat props berubah
  componentDidUpdate(prevProps) {
    const { currentRowData, form } = this.props;
    if (prevProps.currentRowData !== currentRowData && currentRowData) {
      console.log("Current Row Data:", currentRowData); // Cek data yang diterima
      form.setFieldsValue({
        id: currentRowData.id,
        name: currentRowData.name,
        description: currentRowData.description,
        categoryId: currentRowData.categoryId, // Set nilai default kategori
        galeriId: currentRowData.galeriId, // Set nilai default galeri
        selengkapnya: currentRowData.selengkapnya,
      });
    }
  }

  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const { categories, gallerys, loadingCategories, loadingGallerys } = this.state;

    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
    };

    return (
      <Modal
        title="Edit Berita"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          {/* ID Berita */}
          <Form.Item label="ID Berita:">
            {getFieldDecorator("id")(<Input disabled />)}
          </Form.Item>

          {/* Judul Berita */}
          <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Silahkan isikan judul" }],
            })(<TextArea rows={4} placeholder="Judul" />)}
          </Form.Item>

          {/* Dropdown Kategori Berita */}
          <Form.Item label="Category Berita:">
            {getFieldDecorator("categoryId", {
              rules: [{ required: true, message: "Silahkan pilih kategori berita" }],
            })(
              <Select placeholder="Pilih Kategori Berita" loading={loadingCategories}>
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name} {/* Menampilkan nama kategori */}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          {/* Dropdown Galeri Berita */}
          <Form.Item label="Galeri Berita:">
            {getFieldDecorator("galeriId", {
              rules: [{ required: true, message: "Silahkan pilih galeri berita" }],
            })(
              <Select placeholder="Pilih Galeri Berita" loading={loadingGallerys}>
                {gallerys.map((gallery) => (
                  <Option key={gallery.id} value={gallery.id}>
                    {gallery.name} {/* Menampilkan nama galeri */}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          {/* Deskripsi Berita */}
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Silahkan isikan deskripsi" }],
            })(<TextArea rows={4} placeholder="Deskripsi" />)}
          </Form.Item>

          {/* Catatan / Selengkapnya */}
          <Form.Item label="Selengkapnya:">
            {getFieldDecorator("selengkapnya", {
              rules: [{ required: true, message: "Silahkan isikan catatan/tambahan" }],
            })(<TextArea rows={4} placeholder="Selengkapnya" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditBeritaForm);
