import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getBeritas,
  deleteBerita,
  editBerita,
  addBerita,
} from "@/api/berita";
import TypingCard from "@/components/TypingCard";
import EditBeritaForm from "./forms/edit-question-form";
import AddBeritaForm from "./forms/add-question-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class Berita extends Component {
  state = {
    beritas: [],
    editBeritaModalVisible: false,
    editBeritaModalLoading: false,
    currentRowData: {},
    addBeritaModalVisible: false,
    addBeritaModalLoading: false,
  };
  getBeritas = async () => {
    const result = await getBeritas();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        beritas: content,
      });
    }
  };
  handleEditBerita = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editBeritaModalVisible: true,
    });
  };

  handleDeleteBerita = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus pengguna admin！");
      return;
    }
    console.log(id);
    deleteBerita({ id }).then((res) => {
      message.success("berhasil dihapus");
      this.getBeritas();
    });
  };

  handleEditBeritaOk = (_) => {
    const { form } = this.editBeritaFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
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
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editBeritaModalVisible: false,
      addBeritaModalVisible: false,
    });
  };

  handleAddBerita = (row) => {
    this.setState({
      addBeritaModalVisible: true,
    });
  };

  handleAddBeritaOk = (_) => {
    const { form } = this.addBeritaFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addBeritaModalLoading: true });
      addBerita(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addBeritaModalVisible: false,
            addBeritaModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getBeritas();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getBeritas();
  }
  render() {
    const { beritas } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddBerita}>
          Tambahkan Berita
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi berita di sistem, seperti menambahkan berita baru, atau mengubah berita yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Berita" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={beritas}
            pagination={{ pageSize: 5 }}
          >
            {/* <Column title="ID Selayang" dataIndex="id" key="id" align="center" /> */}
            <Column title="Judul" dataIndex="name" key="name" align="center" />
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
              title="Images"
              dataIndex="image"
              key="image"
              align="center"
              render={(text, row) => {
                // console.log(row.data)
                return row.data != null ? 
                <BlobImageDisplay blob={row.data} /> : <></> 
            }}
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
                    title="edit"
                    onClick={this.handleEditBerita.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeleteBerita.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditBeritaForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editBeritaFormRef = formRef)
          }
          visible={this.state.editBeritaModalVisible}
          confirmLoading={this.state.editBeritaModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditBeritaOk}
        />
        <AddBeritaForm
          wrappedComponentRef={(formRef) =>
            (this.addBeritaFormRef = formRef)
          }
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
