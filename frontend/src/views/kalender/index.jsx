import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
// import { Image } from "antd";
import {
  getKalender,
  deleteKalender,
  editKalender,
  addKalender,
} from "@/api/kalender";
import TypingCard from "@/components/TypingCard";
import EditKalenderForm from "./forms/edit-kalender-form";
import AddKalenderForm from "./forms/add-kalender-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class Kalender extends Component {
  state = {
    kalenders: [],
    editKalenderModalVisible: false,
    editKalenderModalLoading: false,
    currentRowData: {},
    addKalenderModalVisible: false,
    addKalenderModalLoading: false,
  };
  getKalender = async () => {
    const result = await getKalender();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        kalenders: content,
      });
    }
  };
  handleEditKalender = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editKalenderModalVisible: true,
    });
  };

  handleDeleteKalender = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak Dapat Menghapus!");
      return;
    }
    console.log(id);
    deleteKalender({ id }).then((res) => {
      message.success("Berhasil Menghapus");
      this.getKalender();
    });
  };

  handleEditKalenderOk = (_) => {
    const { form } = this.editKalenderFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editKalender(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editKalenderModalVisible: false,
            editKalenderModalLoading: false,
          });
          message.success("Berhasil Mengedit!");
          this.getKalender();
        })
        .catch((e) => {
          message.success("Pengeditan Gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editKalenderModalVisible: false,
      addKalenderModalVisible: false,
    });
  };

  handleAddKalender = (row) => {
    this.setState({
      addKalenderModalVisible: true,
    });
  };

  handleAddKalenderOk = (_) => {
    const { form } = this.addKalenderFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addKalenderModalLoading: true });
      addKalender(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addKalenderModalVisible: false,
            addKalenderModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getKalender();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getKalender();
  }
  render() {
    const { kalenders } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddKalender}>
          Tambahkan Kalender 
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi kalender akademik di sistem, seperti menambahkan kalender akademik, atau mengubah kalender akademik yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Kalender" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={kalenders}
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
                    onClick={this.handleEditKalender.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeleteKalender.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditKalenderForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editKalenderFormRef = formRef)
          }
          visible={this.state.editKalenderModalVisible}
          confirmLoading={this.state.editKalenderModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditKalenderOk}
        />
        <AddKalenderForm
          wrappedComponentRef={(formRef) =>
            (this.addKalenderFormRef = formRef)
          }
          visible={this.state.addKalenderModalVisible}
          confirmLoading={this.state.addKalenderModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddKalenderOk}
        />
      </div>
    );
  }
}

export default Kalender;
