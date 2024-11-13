import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { getCategorys, deleteCategory, editCategory, addCategory } from "@/api/category-berita";
import TypingCard from "@/components/TypingCard";
import EditCategoryForm from "./forms/edit-category-form";
import AddCategoryForm from "./forms/add-category-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class CategoryBerita extends Component {
  state = {
    categorys: [],
    editCategoryModalVisible: false,
    editCategoryModalLoading: false,
    currentRowData: {},
    addCategoryModalVisible: false,
    addCategoryModalLoading: false,
  };
  getCategorys = async () => {
    const result = await getCategorys();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        categorys: content,
      });
    }
  };
  handleEditCategory = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editCategoryModalVisible: true,
    });
  };

  handleDeleteCategory = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus category berita！");
      return;
    }
    console.log(id);
    deleteCategory({ id }).then((res) => {
      message.success("Berhasil dihapus!");
      this.getCategorys();
    });
  };

  handleEditCategoryOk = (_) => {
    const { form } = this.editCategoryFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editCategory(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editCategoryModalVisible: false,
            editCategoryModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getCategorys();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editCategoryModalVisible: false,
      addCategoryModalVisible: false,
    });
  };

  handleAddCategory = (row) => {
    this.setState({
      addCategoryModalVisible: true,
    });
  };

  handleAddCategoryOk = (_) => {
    const { form } = this.addCategoryFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addCategoryModalLoading: true });
      addCategory(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addCategoryModalVisible: false,
            addCategoryModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getCategorys();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const { categorys } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddCategory}>
          Tambahkan Category Berita
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi category berita di sistem, seperti menambahkan category berita baru, atau mengubah category berita yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Category Berita" source={cardContent} />
        <br />
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={categorys} pagination={{ pageSize: 5 }}>
            {/* <Column title="ID Selayang" dataIndex="id" key="id" align="center" /> */}
            <Column title="Nama" dataIndex="name" key="name" align="center" />
            <Column title="Deskripsi" dataIndex="description" key="description" align="center" />
            {/* <Column
              title="Images"
              dataIndex="image"
              key="image"
              align="center"
              render={(text, row) => {
                // console.log(row.data)
                return row.data != null ? 
                <BlobImageDisplay blob={row.data} /> : <></> 
            }}
            /> */}
            <Column
              title="Operasi"
              key="action"
              width={195}
              align="center"
              render={(text, row) => (
                <span>
                  <Button type="primary" shape="circle" icon="edit" title="edit" onClick={this.handleEditCategory.bind(null, row)} />
                  <Divider type="vertical" />
                  <Button type="primary" shape="circle" icon="delete" title="delete" onClick={this.handleDeleteCategory.bind(null, row)} />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditCategoryForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) => (this.editCategoryFormRef = formRef)}
          visible={this.state.editCategoryModalVisible}
          confirmLoading={this.state.editCategoryModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditCategoryOk}
        />
        <AddCategoryForm
          wrappedComponentRef={(formRef) => (this.addCategoryFormRef = formRef)}
          visible={this.state.addCategoryModalVisible}
          confirmLoading={this.state.addCategoryModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddCategoryOk}
        />
      </div>
    );
  }
}

export default CategoryBerita;
