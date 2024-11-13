import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { getGaleriBaru, deleteGaleriBaru, editGaleriBaru, addGaleriBaru, getGaleryBaruById } from "@/api/galeri-berita";
import TypingCard from "@/components/TypingCard";
import EditGaleriBaruForm from "./forms/edit-galeribaru-form";
import AddGaleriBaruForm from "./forms/add-galeribaru-form";
import DetailGaleriForm from "./forms/detail-galeribaru-form";

const { Column } = Table;

class GaleriBaru extends Component {
  state = {
    galeris: [],
    editGaleriBaruModalVisible: false,
    editGaleriBaruModalLoading: false,
    currentRowData: {},
    addGaleriBaruModalVisible: false,
    addGaleriBaruModalLoading: false,
    currentDetailRowData: {},
    detailGaleriBaruModalVisible: false,
    detailGaleriBaruModalLoading: false,
    page: 0,
    size: 5,
    totalPages: 0,
  };

  getGaleriBaru = async () => {
    try {
      const result = await getGaleriBaru(this.state.page, this.state.size);
      const { content, totalPages, statusCode } = result.data;

      if (statusCode === 200) {
        this.setState({ galeris: content, totalPages });
      } else {
        message.error("Gagal mengambil data galeri.");
      }
    } catch (error) {
      message.error("Terjadi kesalahan saat mengambil data galeri.");
      console.error(error);
    }
  };

  handleDetailGaleriBaru = async (row) => {
    try {
      const result = await getGaleryBaruById(row.id);
      if (result.status === 200) {
        this.setState({
          currentDetailRowData: result.data,
          detailGaleriBaruModalVisible: true,
        });
      }
    } catch (error) {
      message.error("Gagal mengambil detail galeri.");
      console.error(error);
    }
  };

  handleDeleteGaleriBaru = async (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak Dapat Menghapus!");
      return;
    }

    try {
      await deleteGaleriBaru({ id });
      message.success("Berhasil Menghapus");
      this.getGaleriBaru();
    } catch (error) {
      message.error("Gagal menghapus galeri.");
      console.error(error);
    }
  };

  handleEditGaleriBaru = (row) => {
    this.setState({
      currentRowData: row,
      editGaleriBaruModalVisible: true,
    });
  };

  handleEditGaleriBaruOk = async () => {
    const { form } = this.editGaleriBaruFormRef.props;
    const { fileList } = this.editGaleriBaruFormRef.state;

    const { currentRowData } = this.state; // Memperbaiki akses currentRowData
    if (currentRowData.id) {
      console.log(currentRowData);
    }

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // this.setState({ editGaleriBaruModalLoading: true });
      const data = { ...values, files: fileList };

      editGaleriBaru(data, currentRowData.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editGaleriBaruModalVisible: false,
            editGaleriBaruModalLoading: false,
          });
          message.success("Berhasil Mengedit!");
          this.getGaleriBaru();
        })
        .catch((e) => {
          message.error("Pengeditan Gagal, coba lagi!");
          this.setState({ editGaleriBaruModalLoading: false });
        });
    });
  };

  handleCancel = () => {
    this.setState({
      editGaleriBaruModalVisible: false,
      addGaleriBaruModalVisible: false,
      detailGaleriBaruModalVisible: false,
      currentRowData: {},
      currentDetailRowData: {},
    });
  };

  handleAddGaleriBaru = () => {
    this.setState({
      addGaleriBaruModalVisible: true,
    });
  };

  handleAddGaleriBaruOk = () => {
    const { form } = this.addGaleriBaruFormRef.props;
    const { fileList } = this.addGaleriBaruFormRef.state;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      addGaleriBaru({ ...values, files: fileList })
        .then((response) => {
          form.resetFields();
          this.addGaleriBaruFormRef.setState({ fileList: [] });
          this.setState({
            addGaleriBaruModalVisible: false,
            addGaleriBaruModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getGaleriBaru();
        })
        .catch((e) => {
          message.error("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };

  componentDidMount() {
    this.getGaleriBaru();
  }

  render() {
    const { galeris, totalPages, page } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddGaleriBaru}>
          Tambahkan Galeri Baru
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi galeri baru di sistem, seperti menambahkan galeri baru, atau mengubah galeri baru yang sudah ada di sistem.`;

    return (
      <div className="app-container">
        <TypingCard title="Manajemen Galeri Baru" source={cardContent} />
        <br />
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={galeris} pagination={{ pageSize: 5 }}>
            <Column title="Nama" dataIndex="name" key="name" align="center" />
            <Column title="Deskripsi" dataIndex="description" key="description" align="center" />
            <Column
              title="Operasi"
              key="action"
              width={195}
              align="center"
              render={(text, row) => (
                <span>
                  <Button type="primary" shape="circle" icon="edit" title="edit" onClick={() => this.handleEditGaleriBaru(row)} />
                  <Divider type="vertical" />
                  <Button type="primary" shape="circle" icon="delete" title="delete" onClick={() => this.handleDeleteGaleriBaru(row)} />
                  <Divider type="vertical" />
                  <Button type="primary" shape="circle" icon="info" title="detail" onClick={() => this.handleDetailGaleriBaru(row)} />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditGaleriBaruForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) => (this.editGaleriBaruFormRef = formRef)}
          visible={this.state.editGaleriBaruModalVisible}
          confirmLoading={this.state.editGaleriBaruModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditGaleriBaruOk}
        />
        <AddGaleriBaruForm
          wrappedComponentRef={(formRef) => (this.addGaleriBaruFormRef = formRef)}
          visible={this.state.addGaleriBaruModalVisible}
          confirmLoading={this.state.addGaleriBaruModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddGaleriBaruOk}
        />
        <DetailGaleriForm currentDetailRowData={this.state.currentDetailRowData} visible={this.state.detailGaleriBaruModalVisible} onCancel={this.handleCancel} />
      </div>
    );
  }
}

export default GaleriBaru;
