import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getCampusLifes,
  deleteCampusLife,
  editCampusLife,
  addCampusLife,
} from "@/api/campus-life";
import TypingCard from "@/components/TypingCard";
import EditCampusLifeForm from "./forms/edit-campuslife-form";
import AddCampusLifeForm from "./forms/add-campuslife-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";
const { Column } = Table;
class CampusLife extends Component {
  state = {
    campusLifes: [],
    editCampusLifeModalVisible: false,
    editCampusLifeModalLoading: false,
    currentRowData: {},
    addCampusLifeModalVisible: false,
    addCampusLifeModalLoading: false,
  };
  
  getCampusLifes = async () => {
    const result = await getCampusLifes();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        campusLifes: content,
      });
    }
  };
  handleEditCampusLife = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editCampusLifeModalVisible: true,
    });
  };

  handleDeleteCampusLife = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus！");
      return;
    }
    console.log(id);
    deleteCampusLife({ id }).then((res) => {
      message.success("Berhasil menghapus!");
      this.getCampusLifes();
    });
  };

  handleEditCampusLifeOk = (_) => {
    const { form } = this.editCampusLifeFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editCampusLife(values, values.id)
        .then(() => {
          form.resetFields();
          this.setState({
            editCampusLifeModalVisible: false,
            editCampusLifeModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getCampusLifes();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editCampusLifeModalVisible: false,
      addCampusLifeModalVisible: false,
    });
  };

  handleAddCampusLife = (row) => {
    this.setState({
      addCampusLifeModalVisible: true,
    });
  };

  handleAddCampusLifeOk = (_) => {
    const { form } = this.addCampusLifeFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addCampusLifeModalLoading: true });
      addCampusLife(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addCampusLifeModalVisible: false,
            addCampusLifeModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getCampusLifes();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getCampusLifes();
  }
  
  render() {
    const { campusLifes } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddCampusLife}>
          Tambahkan Fasilitas Kampus
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi fasilitas kampus di sistem, seperti menambahkan fasilitas kampus baru, atau mengubah fasilitas kampus yang sudah ada di sistem.`;
    
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Fasilitas Kampus" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={campusLifes}
            pagination={{ pageSize: 5 }}
          >
            {/* <Column title="ID Jurusan" dataIndex="id" key="id" align="center" /> */}
            <Column title="Nama" dataIndex="name" key="name" align="center" />
            <Column
              title="Deskripsi CampusLife"
              dataIndex="description"
              key="description"
              align="center"
            />
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
                    onClick={this.handleEditCampusLife.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="Delete"
                    onClick={this.handleDeleteCampusLife.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditCampusLifeForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editCampusLifeFormRef = formRef)
          }
          visible={this.state.editCampusLifeModalVisible}
          confirmLoading={this.state.editCampusLifeModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditCampusLifeOk}
        />
        <AddCampusLifeForm
          wrappedComponentRef={(formRef) =>
            (this.addCampusLifeFormRef = formRef)
          }
          visible={this.state.addCampusLifeModalVisible}
          confirmLoading={this.state.addCampusLifeModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddCampusLifeOk}
        />
      </div>
    );
  }
}

export default CampusLife;
