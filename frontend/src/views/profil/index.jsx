import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getProfil,
  deleteProfil,
  editProfil,
  addProfil,
} from "@/api/profil";
import TypingCard from "@/components/TypingCard";
import EditProfilForm from "./forms/edit-profil-form";
import AddProfilForm from "./forms/add-profil-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class Profil extends Component {
  state = {
    profils: [],
    editProfilModalVisible: false,
    editProfilModalLoading: false,
    currentRowData: {},
    addProfilModalVisible: false,
    addProfilModalLoading: false,
  };
  getProfil = async () => {
    const result = await getProfil();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        profils: content,
      });
    }
  };
  handleEditProfil = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editProfilModalVisible: true,
    });
  };

  handleDeleteProfil = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus！");
      return;
    }
    console.log(id);
    deleteProfil({ id }).then((res) => {
      message.success("berhasil dihapus!");
      this.getProfil();
    });
  };

  handleEditProfilOk = (_) => {
    const { form } = this.editProfilFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editProfil(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editProfilModalVisible: false,
            editProfilModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getProfil();
        })
        .catch((e) => {
          // Untuk pengecekkan message error
          // console.log(e.message)
          // console.log(e)
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editProfilModalVisible: false,
      addProfilModalVisible: false,
    });
  };

  handleAddProfil = (row) => {
    this.setState({
      addProfilModalVisible: true,
    });
  };

  handleAddProfilOk = (_) => {
    const { form } = this.addProfilFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addProfilModalLoading: true });
      addProfil(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addProfilModalVisible: false,
            addProfilModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getProfil();
        })
        .catch((e) => {
          // Untuk pengecekkan message error
          // console.log(e.message)
          // console.log(e)
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getProfil();
  }
  render() {
    const { profils } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddProfil}>
          Tambahkan Data
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi profil kampus di sistem, seperti menambahkan profil baru, atau mengubah profil yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen  Profil" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={profils}
            pagination={{ pageSize: 5 }}
          >
            {/* <Column title="ID Profil" dataIndex="id" key="id" align="center" /> */}
            <Column title="Judul" dataIndex="name" key="name" align="center" />
            <Column
              title="Deskripsi"
              dataIndex="description"
              key="description"
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
                    onClick={this.handleEditProfil.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeleteProfil.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditProfilForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editProfilFormRef = formRef)
          }
          visible={this.state.editProfilModalVisible}
          confirmLoading={this.state.editProfilModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditProfilOk}
        />
        <AddProfilForm
          wrappedComponentRef={(formRef) =>
            (this.addProfilFormRef = formRef)
          }
          visible={this.state.addProfilModalVisible}
          confirmLoading={this.state.addProfilModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddProfilOk}
        />
      </div>
    );
  }
}

export default Profil;