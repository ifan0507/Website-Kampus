import React, { Component } from "react";
import { Form, Input, Modal, Select, Spin, Upload, Icon } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

class EditBeritaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], // Menyimpan data kategori
      gallerys: [], // Menyimpan data galeri
      loadingCategories: true, // Indikator loading untuk kategori
      loadingGallerys: true, // Indikator loading untuk galeri
      fileList: [],
    };
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList});
  };

  // URL backend
  BASE_URL = "http://localhost:8080";

  // Mengambil data kategori
  fetchCategories = () => {
    axios
      .get(`${this.BASE_URL}/api/category-berita`)
      .then((response) => {
        console.log("Categories fetched:", response.data.content);
        this.setState({
          categories: response.data.content,
          loadingCategories: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        this.setState({ loadingCategories: false });
      });
  };
  // Mengambil data galeri
  fetchGallerys = () => {
    axios
      .get(`${this.BASE_URL}/api/galeri-berita`)
      .then((response) => {
        console.log("Gallery fetched:", response.data.content);
        this.setState({
          gallerys: response.data.content,
          loadingGallerys: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
        this.setState({ loadingGallerys: false });
      });
  };
  // Memanggil data saat komponen dimount
  componentDidMount() {
    this.fetchCategories();
    this.fetchGallerys();
  }
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData, categories, gallerys } = this.props; // Terima categories dan gallerys
    const { getFieldDecorator } = form;

    const { id, name, description, selengkapnya, categoryBerita, galeryBerita } = currentRowData;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
    };

    return (
      <Modal visible={visible} title="Edit Berita" onCancel={onCancel} onOk={onOk} okText="Simpan" cancelText="Batal">
        <Form {...formItemLayout}>
          {/* ID */}
          <Form.Item label="ID Berita:">
            {getFieldDecorator("id",{
              initialValue : id,
            })(<Input disabled />)}
          </Form.Item>
          {/* Judul */}
          <Form.Item label="Judul:">
            {getFieldDecorator("name", {
              initialValue: name,
              rules: [{ required: true, message: "Silahkan isikan judul" }],
            })(<TextArea rows={2} placeholder="Judul" />)}
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

          {/* Kategori */}
          <Form.Item label="Kategori Berita">
            {getFieldDecorator("categoryId", {
              initialValue: currentRowData.categoryId || undefined, // Pastikan nilai default jika null
              rules: [{ required: true, message: "Pilih kategori!" }],
            })(
              <Select placeholder="Pilih kategori berita" allowClear>
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {/* Galeri */}
          <Form.Item label="Galeri">
            {getFieldDecorator("galleryId", {
              initialValue: currentRowData.galeryId || undefined, // Pastikan initialValue ada
              rules: [{ required: true, message: "Pilih galeri!" }],
            })(
              <Select placeholder="Pilih galeri berita" allowClear>
                {gallerys.map((gallery) => (
                  <Option key={gallery.id} value={gallery.id}>
                    {gallery.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {/* Deskripsi */}
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              initialValue: description,
              rules: [{ required: true, message: "Silahkan isikan deskripsi" }],
            })(<TextArea rows={4} placeholder="Deskripsi" />)}
          </Form.Item>
          {/* Selengkapnya */}
          <Form.Item label="Selengkapnya:">
            {getFieldDecorator("selengkapnya", {
              initialValue: selengkapnya,
              rules: [{ required: true, message: "Silahkan isikan catatan/tambahan" }],
            })(<TextArea rows={4} placeholder="Selengkapnya" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default Form.create({ name: "EditBeritaForm" })(EditBeritaForm);

