import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
// import { Image } from "antd";
import {
  getGaleriKampus,
  deleteGaleriKampus,
  editGaleriKampus,
  addGaleriKampus,
} from "@/api/galeri-kampus";
import TypingCard from "@/components/TypingCard";
import EditGaleriKampusForm from "./forms/edit-galerikampus-form";
import AddGaleriKampusForm from "./forms/add-galerikampus-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class GaleriKampus extends Component {
  state = {
    galeris: [],
    editGaleriKampusModalVisible: false,
    editGaleriKampusModalLoading: false,
    currentRowData: {},
    addGaleriKampusModalVisible: false,
    addGaleriKampusModalLoading: false,
  };
  getGaleriKampus = async () => {
    const result = await getGaleriKampus();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        galeris: content,
      });
    }
  };
  handleEditGaleriKampus = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editGaleriKampusModalVisible: true,
    });
  };

  handleDeleteGaleriKampus = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak Dapat Menghapus!");
      return;
    }
    console.log(id);
    deleteGaleriKampus({ id }).then((res) => {
      message.success("Berhasil Menghapus");
      this.getGaleriKampus();
    });
  };

  handleEditGaleriKampusOk = (_) => {
    const { form } = this.editGaleriKampusFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editGaleriKampus(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editGaleriKampusModalVisible: false,
            editGaleriKampusModalLoading: false,
          });
          message.success("Berhasil Mengedit!");
          this.getGaleriKampus();
        })
        .catch((e) => {
          message.success("Pengeditan Gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editGaleriKampusModalVisible: false,
      addGaleriKampusModalVisible: false,
    });
  };

  handleAddGaleriKampus = (row) => {
    this.setState({
      addGaleriKampusModalVisible: true,
    });
  };

  handleAddGaleriKampusOk = (_) => {
    const { form } = this.addGaleriKampusFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addGaleriKampusModalLoading: true });
      addGaleriKampus(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addGaleriKampusModalVisible: false,
            addGaleriKampusModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getGaleriKampus();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getGaleriKampus();
  }
  render() {
    const { galeris } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddGaleriKampus}>
          Tambahkan Galeri Kampus 
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi galeri kampus di sistem, seperti menambahkan galeri kampus, atau mengubah galeri kampus yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Galeri Kampus" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={galeris}
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
            {/* <Column title="ID Kalender" dataIndex="id" key="id" align="center" /> */}
            <Column
              title="Gambar"
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
                    onClick={this.handleEditGaleriKampus.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeleteGaleriKampus.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditGaleriKampusForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editGaleriKampusFormRef = formRef)
          }
          visible={this.state.editGaleriKampusModalVisible}
          confirmLoading={this.state.editGaleriKampusModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditGaleriKampusOk}
        />
        <AddGaleriKampusForm
          wrappedComponentRef={(formRef) =>
            (this.addGaleriKampusFormRef = formRef)
          }
          visible={this.state.addGaleriKampusModalVisible}
          confirmLoading={this.state.addGaleriKampusModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddGaleriKampusOk}
        />
      </div>
    );
  }
}

export default GaleriKampus;
