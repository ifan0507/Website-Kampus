import React, { Component } from "react";
import { Card, Button, Table, message, Divider, Modal } from "antd";  // Tambahkan Modal dari Ant Design
import {
  getAlumnis,
  deleteAlumni,
  editAlumni,
  addAlumni,
} from "@/api/alumni";
import TypingCard from "@/components/TypingCard";
import EditAlumniForm from "./forms/edit-alumni-form";
import AddAlumniForm from "./forms/add-alumni-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";
const { Column } = Table;

class Alumni extends Component {
  state = {
    alumnis: [],
    editAlumniModalVisible: false,
    editAlumniModalLoading: false,
    currentRowData: {},
    addAlumniModalVisible: false,
    addAlumniModalLoading: false,
  };

  getAlumnis = async () => {
    const result = await getAlumnis();
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        alumnis: content,
      });
    }
  };

  handleEditAlumni = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editAlumniModalVisible: true,
    });
  };

  handleDeleteAlumni = (row) => {
    const { id } = row;

  
    if (id === "admin") {
      message.error("Tidak dapat menghapus！");
      return;
    }

   
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: `Apakah Anda yakin ingin menghapus alumni dengan NIM ${row.nim}?`,
      okText: "Ya, Hapus",
      cancelText: "Batal",
      centered: true,
      onOk: () => {
        deleteAlumni({ id }).then((res) => {
          message.success("Berhasil menghapus!");
          this.getAlumnis();
        }).catch(() => {
          message.error("Gagal menghapus, coba lagi!");
        });
      },
    });
  };

  handleEditAlumniOk = (_) => {
    const { form } = this.editAlumniFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editAlumniModalLoading: true });
      editAlumni(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editAlumniModalVisible: false,
            editAlumniModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getAlumnis();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editAlumniModalVisible: false,
      addAlumniModalVisible: false,
    });
  };

  handleAddAlumni = (row) => {
    this.setState({
      addAlumniModalVisible: true,
    });
  };

  handleAddAlumniOk = (_) => {
    const { form } = this.addAlumniFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addAlumniModalLoading: true });
      addAlumni(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addAlumniModalVisible: false,
            addAlumniModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getAlumnis();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };

  componentDidMount() {
    this.getAlumnis();
  }

  render() {
    const { alumnis } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddAlumni}>
          Tambahkan Alumni
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi Alumni di sistem, seperti menambahkan Alumni baru, atau mengubah Alumni yang sudah ada di sistem.`;

    return (
      <div className="app-container">
        <TypingCard title="Manajemen Alumni" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={alumnis}
            pagination={{ size: 5 }}
          >
            <Column title="NIM" dataIndex="nim" key="nim" align="center" />
            <Column title="Nama" dataIndex="name" key="name" align="center" />
            <Column title="Email" dataIndex="email" key="email" align="center" />
            <Column title="Nomer Hp" dataIndex="no_hp" key="no_hp" align="center" />
            <Column title="Program Studi" dataIndex="program_studi" key="program_studi" align="center" />
            <Column title="Judul TA" dataIndex="judul_ta" key="judul_ta" align="center" />
            <Column title="Tanggal Lulus" dataIndex="tgl_lulus" key="tgl_lulus" align="center" />
            <Column title="Foto" dataIndex="image" key="image" align="center" render={(text, row) => row.data != null ? <BlobImageDisplay blob={row.data} /> : <></>} />
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
                    onClick={this.handleEditAlumni.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="Delete"
                    onClick={this.handleDeleteAlumni.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditAlumniForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editAlumniFormRef = formRef)
          }
          visible={this.state.editAlumniModalVisible}
          confirmLoading={this.state.editAlumniModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditAlumniOk}
        />
        <AddAlumniForm
          wrappedComponentRef={(formRef) =>
            (this.addAlumniFormRef = formRef)
          }
          visible={this.state.addAlumniModalVisible}
          confirmLoading={this.state.addAlumniModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddAlumniOk}
        />
      </div>
    );
  }
}

export default Alumni;
