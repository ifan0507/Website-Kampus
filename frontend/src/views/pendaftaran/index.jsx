import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getPendaftarans,
  deletePendaftaran,
  editPendaftaran,
  addPendaftaran,
} from "@/api/pendaftaran";
import TypingCard from "@/components/TypingCard";
import EditPendaftaranForm from "./forms/edit-pendaftaran-form";
import AddPendaftaranForm from "./forms/add-pendaftaran-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class Pendaftaran extends Component {
  state = {
    pendaftarans: [],
    editPendaftaranModalVisible: false,
    editPendaftaranModalLoading: false,
    currentRowData: {},
    addPendaftaranModalVisible: false,
    addPendaftaranModalLoading: false,
  };
  getPendaftarans = async () => {
    const result = await getPendaftarans();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        pendaftarans: content,
      });
    }
  };
  handleEditPendaftaran = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editPendaftaranModalVisible: true,
    });
  };

  handleDeletePendaftaran = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus pengguna admin！");
      return;
    }
    console.log(id);
    deletePendaftaran({ id }).then((res) => {
      message.success("berhasil dihapus");
      this.getPendaftarans();
    });
  };

  handleEditPendaftaranOk = (_) => {
    const { form } = this.editPendaftaranFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editPendaftaran(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editPendaftaranModalVisible: false,
            editPendaftaramModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getPendaftarans();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editPendaftaranModalVisible: false,
      addPendaftaranModalVisible: false,
    });
  };

  handleAddPendaftaran = (row) => {
    this.setState({
      addPendaftaranModalVisible: true,
    });
  };

  handleAddPendaftaranOk = (_) => {
    const { form } = this.addPendaftaranFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addPendaftaranModalLoading: true });
      addPendaftaran(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addPendaftaranModalVisible: false,
            addPendaftaranModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getPendaftarans();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getPendaftarans();
  }
  render() {
    const { pendaftarans } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddPendaftaran}>
          Tambahkan Jalur Pendaftaran
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi pendaftaran mahasiswa di sistem, seperti menambahkan pendaftaran mahasiswa, atau mengubah pendaftaran mahasiswa yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Pendaftaran Mahasiswa" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={pendaftarans}
            pagination={{ pageSize: 5 }}
          >
            {/* <Column title="ID Jalur Penerimaan" dataIndex="id" key="id" align="center" /> */}
            <Column title="Jalur Penerimaan Mahasiswa" dataIndex="name" key="name" align="center" />
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
                    onClick={this.handleEditPendaftaran.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeletePendaftaran.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditPendaftaranForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editPendaftaranFormRef = formRef)
          }
          visible={this.state.editPendaftaranModalVisible}
          confirmLoading={this.state.editPendaftaranModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditPendaftaranOk}
        />
        <AddPendaftaranForm
          wrappedComponentRef={(formRef) =>
            (this.addPendaftaranFormRef = formRef)
          }
          visible={this.state.addPendaftaranModalVisible}
          confirmLoading={this.state.addPendaftaranModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddPendaftaranOk}
        />
      </div>
    );
  }
}

export default Pendaftaran;