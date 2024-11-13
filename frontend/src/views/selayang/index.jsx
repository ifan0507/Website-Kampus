import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getSelayangs,
  deleteSelayang,
  editSelayang,
  addSelayang,
} from "@/api/selayang";
import TypingCard from "@/components/TypingCard";
import EditSelayangForm from "./forms/edit-selayang-form";
import AddSelayangForm from "./forms/add-selayang-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class Selayang extends Component {
  state = {
    selayangs: [],
    editSelayangModalVisible: false,
    editSelayangModalLoading: false,
    currentRowData: {},
    addSelayangModalVisible: false,
    addSelayangModalLoading: false,
  };
  getSelayangs = async () => {
    const result = await getSelayangs();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        selayangs: content,
      });
    }
  };
  handleEditSelayang = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editSelayangModalVisible: true,
    });
  };

  handleDeleteSelayang = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus selayang pandang！");
      return;
    }
    console.log(id);
    deleteSelayang({ id }).then((res) => {
      message.success("Berhasil dihapus!");
      this.getSelayangs();
    });
  };

  handleEditSelayangOk = (_) => {
    const { form } = this.editSelayangFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editSelayang(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editSelayangModalVisible: false,
            editSelayangModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getSelayangs();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editSelayangModalVisible: false,
      addSelayangModalVisible: false,
    });
  };

  handleAddSelayang = (row) => {
    this.setState({
      addSelayangModalVisible: true,
    });
  };

  handleAddSelayangOk = (_) => {
    const { form } = this.addSelayangFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addSelayangModalLoading: true });
      addSelayang(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addSelayangModalVisible: false,
            addSelayangModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getSelayangs();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getSelayangs();
  }
  render() {
    const { selayangs } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddSelayang}>
          Tambahkan Selayang Pandang
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi selayang pandang di sistem, seperti menambahkan selayang pandang baru, atau mengubah selayang pandang yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Selayang Pandang" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={selayangs}
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
                    onClick={this.handleEditSelayang.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="delete"
                    onClick={this.handleDeleteSelayang.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditSelayangForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editSelayangFormRef = formRef)
          }
          visible={this.state.editSelayangModalVisible}
          confirmLoading={this.state.editSelayangModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditSelayangOk}
        />
        <AddSelayangForm
          wrappedComponentRef={(formRef) =>
            (this.addSelayangFormRef = formRef)
          }
          visible={this.state.addSelayangModalVisible}
          confirmLoading={this.state.addSelayangModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddSelayangOk}
        />
      </div>
    );
  }
}

export default Selayang;
