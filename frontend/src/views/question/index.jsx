import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Table, message, Divider } from "antd";
import { getBeritas, deleteBerita, editBerita, addBerita } from "@/api/berita";
import TypingCard from "@/components/TypingCard";
import EditBeritaForm from "./forms/edit-question-form";
import AddBeritaForm from "./forms/add-question-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;

class Berita extends Component {
  state = {
    beritas: [],
    categories: [],
    gallerys: [],
    editBeritaModalVisible: false,
    editBeritaModalLoading: false,
    currentRowData: {},
    addBeritaModalVisible: false,
    addBeritaModalLoading: false,
    loadingCategories: true,
    loadingGallerys: true,
  };

  BASE_URL = "http://localhost:8080";

  componentDidMount() {
    this.getBeritas();
    this.fetchCategories();
    this.fetchGallerys();
  }

  getBeritas = async () => {
    const result = await getBeritas();
    const { content, statusCode } = result.data;
    if (statusCode === 200) {
      this.setState({ beritas: content });
    }
  };

  fetchCategories = () => {
    axios.get(`${this.BASE_URL}/api/category-berita`).then((response) => {
      this.setState({
        categories: response.data.content,
        loadingCategories: false,
      });
    });
  };

  fetchGallerys = () => {
    axios.get(`${this.BASE_URL}/api/galeri-berita`).then((response) => {
      this.setState({
        gallerys: response.data.content,
        loadingGallerys: false,
      });
    });
  };

  handleEditBerita = (row) => {
    console.log("Selected row for edit:", row); // Debugging
    this.setState({
      currentRowData: Object.assign({}, row), // Menyimpan data berita yang akan diedit
      editBeritaModalVisible: true, // Menampilkan modal edit
    });
  };

  handleDeleteBerita = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus pengguna admin！");
      return;
    }
    deleteBerita({ id }).then(() => {
      message.success("Berita berhasil dihapus");
      this.getBeritas();
    });
  };
  handleEditBeritaOk = () => {
    const { form } = this.editBeritaFormRef.props;
    form.validateFields((err, values) => {
      if (err) return;
      this.setState({ editBeritaModalLoading: true });
      editBerita(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editBeritaModalVisible: false,
            editBeritaModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getBeritas();
        })
        .catch(() => {
          message.error("Gagal mengedit berita");
          this.setState({ editBeritaModalLoading: false });
        });
    });
  };

  handleCancel = () => {
    this.setState({
      editBeritaModalVisible: false,
      addBeritaModalVisible: false,
    });
  };

  handleAddBerita = () => {
    this.setState({
      addBeritaModalVisible: true,
    });
  };

  handleAddBeritaOk = () => {
    const { form } = this.addBeritaFormRef.props;
    form.validateFields((err, values) => {
      if (err) return;
      this.setState({ addBeritaModalLoading: true });
      addBerita(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addBeritaModalVisible: false, // Menutup modal setelah berhasil
            addBeritaModalLoading: false, // Menghentikan loading
          });
          message.success("Berita berhasil ditambahkan");
          this.getBeritas();
        })
        .catch(() => {
          this.setState({ addBeritaModalLoading: false });
          message.error("Gagal menambahkan berita");
        });
    });
  };

  render() {
    const {
      beritas,
      categories,
      gallerys,
      loadingCategories,
      loadingGallerys,
    } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddBerita}>
          Tambahkan Berita
        </Button>
      </span>
    );

    return (
      <div className="app-container">
        <TypingCard
          title="Manajemen Berita"
          source="Di sini, Anda dapat mengelola informasi berita di sistem, seperti menambahkan berita baru, atau mengubah berita yang sudah ada di sistem."
        />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={beritas}
            pagination={{ pageSize: 5 }}
          >
            <Column title="Judul" dataIndex="name" key="name" align="center" />
            <Column
              title="Gambar Judul Berita"
              dataIndex="image"
              key="image"
              align="center"
              render={(text, row) => {
                // console.log(row.data)
                return row.data != null ? (
                  <BlobImageDisplay blob={row.data} />
                ) : (
                  <></>
                );
              }}
            />
            <Column
              title="Kategori Berita"
              dataIndex="categoryName"
              key="categoryName"
              align="center"
            />
            <Column
              title="Galeri Berita"
              dataIndex="galleryName"
              key="galleryName"
              align="center"
            />
            <Column
              title="Deskripsi"
              dataIndex="description"
              key="description"
              align="center"
            />
            <Column
              title="Selengkapnya"
              dataIndex="selengkapnya"
              key="selengkapnya"
              align="center"
            />
            <Column
              title="Operasi"
              key="action"
              width={195}
              align="center"
              render={(text, row) => (
                <span>
                  <Button
                    type="primary"
                    shape="circle"
                    icon="edit"
                    onClick={() => this.handleEditBerita(row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    onClick={() => this.handleDeleteBerita(row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>

        <EditBeritaForm
          currentRowData={this.state.currentRowData} // Pastikan data yang dikirim sudah benar
          categories={this.state.categories} // Pastikan kategori sudah terisi
          gallerys={this.state.gallerys} // Pastikan galeri sudah terisi
          loadingCategories={this.state.loadingCategories}
          loadingGallerys={this.state.loadingGallerys}
          wrappedComponentRef={(formRef) => (this.editBeritaFormRef = formRef)}
          visible={this.state.editBeritaModalVisible}
          confirmLoading={this.state.editBeritaModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditBeritaOk}
        />
        <AddBeritaForm
          wrappedComponentRef={(formRef) => (this.addBeritaFormRef = formRef)}
          visible={this.state.addBeritaModalVisible}
          confirmLoading={this.state.addBeritaModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddBeritaOk}
        />
      </div>
    );
  }
}

export default Berita;
