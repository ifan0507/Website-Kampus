import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
// import { Image } from "antd";
import {
  getOrganisasi,
  deleteOrganisasi,
  editOrganisasi,
  addOrganisasi,
} from "@/api/organisasi";
import TypingCard from "@/components/TypingCard";
import EditOrganisasiForm from "./forms/edit-organisasi-form";
import AddOrganisasiForm from "./forms/add-organisasi-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class Organisasi extends Component {
  state = {
    Organisasis: [],
    editOrganisasiModalVisible: false,
    editOrganisasiModalLoading: false,
    currentRowData: {},
    addOrganisasiModalVisible: false,
    addOrganisasiModalLoading: false,
  };
  getOrganisasi = async () => {
    const result = await getOrganisasi();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        Organisasis: content,
      });
    }
  };
  handleEditOrganisasi = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editOrganisasiModalVisible: true,
    });
  };

  handleDeleteOrganisasi = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak Dapat Menghapus!");
      return;
    }
    console.log(id);
    deleteOrganisasi({ id }).then((res) => {
      message.success("Berhasil Menghapus");
      this.getOrganisasi();
    });
  };

  handleEditOrganisasiOk = (_) => {
    const { form } = this.editOrganisasiFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editOrganisasi(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editOrganisasiModalVisible: false,
            editOrganisasiModalLoading: false,
          });
          message.success("Berhasil Mengedit!");
          this.getOrganisasi();
        })
        .catch((e) => {
          message.success("Pengeditan Gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editOrganisasiModalVisible: false,
      addOrganisasiModalVisible: false,
    });
  };

  handleAddOrganisasi = (row) => {
    this.setState({
      addOrganisasiModalVisible: true,
    });
  };

  handleAddOrganisasiOk = (_) => {
    const { form } = this.addOrganisasiFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addOrganisasiModalLoading: true });
      addOrganisasi(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addOrganisasiModalVisible: false,
            addOrganisasiModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getOrganisasi();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getOrganisasi();
  }
  render() {
    const { Organisasis } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddOrganisasi}>
          Tambahkan Gambar 
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi struktur organisasi di sistem, seperti menambahkan struktur organisasi, atau mengubah struktur organisasi yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Struktur Organisasi" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={Organisasis}
            pagination={{ pageSize: 5 }}
          >
            {/* <Column title="ID Kalender" dataIndex="id" key="id" align="center" />
            <Column title="Judul" dataIndex="fileName" key="name" align="center" /> */}
             {/* <Column
              title="Gambar"
              key="data"
              align="center"
              render={(text, row) => (
                <img
                src={'data:image/jpeg;base64,${row.data}'}
                alt="Gambar Kalender"
                width={100}
                />
              )}
            />
            <Column */}
                      
            <Column title="Judul" dataIndex="name" key="name" align="center" />
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
                    onClick={this.handleEditOrganisasi.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeleteOrganisasi.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditOrganisasiForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editOrganisasiFormRef = formRef)
          }
          visible={this.state.editOrganisasiModalVisible}
          confirmLoading={this.state.editOrganisasiModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditOrganisasiOk}
        />
        <AddOrganisasiForm
          wrappedComponentRef={(formRef) =>
            (this.addOrganisasiFormRef = formRef)
          }
          visible={this.state.addOrganisasiModalVisible}
          confirmLoading={this.state.addOrganisasiModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddOrganisasiOk}
        />
      </div>
    );
  }
}

export default Organisasi;
