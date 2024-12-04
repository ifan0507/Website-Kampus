import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getPengumuman,
  deletePengumuman,
  editPengumuman,
  addPengumuman,
  getPengumumanById,
} from "@/api/pengumuman";
import TypingCard from "@/components/TypingCard";
import AddPengumumanForm from "./forms/add-pengumuman-form";
import EditPengumumanForm from "./forms/edit-pengumuman-form";
import DetailPengumumanForm from "./forms/detail-pengumuman-form";

const { Column } = Table;

class Pengumuman extends Component {
  state = {
    pengumumans: [],
    totalPages: 0,
    page: 0,
    size: 5,
    editPengumumanModalVisible: false,
    editPengumumanModalLoading: false,
    currentRowData: {},
    addPengumumanModalVisible: false,
    addPengumumanModalLoading: false,
    detailPengumumanModalVisible: false,
    detailPengumumanModalLoading: false,
    currentDetailRowData: {},
  };


  getPengumuman = async () => {
    try {
      const result = await getPengumuman(this.state.page, this.state.size); // Ambil halaman pertama dan 5 pengumuman
      const { content, totalPages, statusCode } = result.data;

      if (statusCode === 200) {
        this.setState({ pengumumans: content, totalPages });
      } else {
        message.error("Gagal mengambil data pengumuman.");
      }
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
      message.error(error.message);
    }
  };


  handleDetailPengumuman = async (row) => {
    try {
      const result = await getPengumumanById(row.id);
      if (result.status === 200) {
        this.setState({
          currentDetailRowData: result.data,
          detailPengumumanModalVisible: true,
        });
      }
    } catch (error) {
      message.error("Gagal mengambil pengumuman.");
      console.error(error);
    }
  };

  handleEditPengumuman = (row) => {
    console.log(row);
    this.setState({
      currentRowData: row,
      editPengumumanModalVisible: true,
    });
  };


  handleDeletePengumuman = async (row) => {
    const { id } = row;

    if (id === "admin") {
      message.error("Tidak dapat menghapus pengumuman ini!");
      return;
    }
    try {
      await deletePengumuman(id); 
      message.success("Pengumuman berhasil dihapus");
      this.getPengumuman(); 
    } catch (error) {
      message.error("Gagal menghapus pengumuman.");
      console.error("Error deleting pengumuman:", error);
    }
  };


  handleEditPengumumanOk = async () => {
    const { form } = this.editPengumumanFormRef.props;
    const { fileList } = this.editPengumumanFormRef.state;

    const { currentRowData } = this.state;
    if (currentRowData.id) {
      console.log(currentRowData);
    }

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const data = { ...values, files: fileList };

      editPengumuman(data, currentRowData.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editPengumumanModalVisible: false,
            editPengumumanModalLoading: false,
          });
          message.success("Berhasil Mengedit!");
          this.getPengumuman();
        })
        .catch((e) => {
          message.error("Pengeditan Gagal, coba lagi!");
          this.setState({ editPengumumanModalLoading: false });
        });
    });
  };


  handleAddPengumumanOk = async () => {
    const { form } = this.addPengumumanFormRef.props;
    const { fileList } = this.addPengumumanFormRef.state;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      addPengumuman({ ...values, files: fileList })
        .then((response) => {
          form.resetFields();
          this.addPengumumanFormRef.setState({ fileList: [] });
          this.setState({
            addPengumumanModalVisible: false,
            addPengumumanModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getPengumuman();
        })
        .catch((e) => {
          message.error("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };


  handleCancel = () => {
    this.setState({
      editPengumumanModalVisible: false,
      addPengumumanModalVisible: false,
      detailPengumumanModalVisible: false,
      currentRowData: {},
      currentDetailRowData: {},
    });
  };


  handleAddPengumuman = () => {
    this.setState({ addPengumumanModalVisible: true });
  };

  componentDidMount() {
    this.getPengumuman();
  }

  render() {
    const { pengumumans, totalPages, page } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddPengumuman}>
          Tambahkan Pengumuman
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi pengumuman di sistem, seperti menambahkan pengumuman baru, atau mengubah pengumuman yang sudah ada di sistem.`;

    return (
      <div className="app-container">
        <TypingCard title="Manajemen Pengumuman" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={pengumumans}
            pagination={{ pageSize: 5 }}
          >
            <Column title="Judul" dataIndex="name" key="name" align="center" />
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
                    onClick={() => this.handleEditPengumuman(row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={() => this.handleDeletePengumuman(row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="info"
                    title="detail"
                    onClick={() => this.handleDetailPengumuman(row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditPengumumanForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editPengumumanFormRef = formRef)
          }
          visible={this.state.editPengumumanModalVisible}
          confirmLoading={this.state.editPengumumanModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditPengumumanOk}
        />
        <AddPengumumanForm
          wrappedComponentRef={(formRef) =>
            (this.addPengumumanFormRef = formRef)
          }
          visible={this.state.addPengumumanModalVisible}
          confirmLoading={this.state.addPengumumanModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddPengumumanOk}
        />
        <DetailPengumumanForm
          currentDetailRowData={this.state.currentDetailRowData}
          visible={this.state.detailPengumumanModalVisible}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default Pengumuman;
