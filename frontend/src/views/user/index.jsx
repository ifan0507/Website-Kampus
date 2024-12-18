import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { getUsers, deleteUser, editUser, addUser } from "@/api/user";
import TypingCard from "@/components/TypingCard";
import EditUserForm from "./forms/edit-user-form";
import AddUserForm from "./forms/add-user-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";

const { Column } = Table;
class User extends Component {
  state = {
    users: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
  };

  BASE_URL = "http://localhost:8080/";

  getUsers = async () => {
    const result = await getUsers();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        users: content,
      });
    }
  };
  handleEditUser = (row) => {
    console.log("Selected row for edti:", row);
    this.setState({
      currentRowData: Object.assign({}, row),
      editUserModalVisible: true,
    });
  };

  handleDeleteUser = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus pengguna!");
      return;
    }
    console.log(id);
    deleteUser({ id }).then((res) => {
      message.success("Berhasil dihapus!");
      this.getUsers();
    });
  };

  handleEditUserOk = (_) => {
    const { form } = this.editUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) return;
      this.setState({ editUserModalLoading: true });
      editUser(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editUserModalVisible: false,
            editUserModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getUsers();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
          this.setState({ editUserModalLoading: false });
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleAddUser = (row) => {
    this.setState({
      addUserModalVisible: true,
    });
  };

  handleAddUserOk = (_) => {
    const { form } = this.addUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addUserModalLoading: true });
      addUser(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addUserModalVisible: false,
            addUserModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getUsers();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { users } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddUser}>
          Tambahkan User
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola pengguna di sistem, seperti menambahkan pengguna baru, atau mengubah pengguna yang sudah ada di sistem.。`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen User" source={cardContent} />
        <br />
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={users} pagination={5} scroll={{ x: "100vw" }}>
            <Column title="Nama" dataIndex="name" key="name" align="center" />
            <Column title="Username" dataIndex="username" key="username" align="center" />

            <Column
              title="Foto User"
              dataIndex="image"
              key="image"
              align="center"
              width={500}
              render={(text, row) => {
                console.log(row.data);
                return row.data != null ? <BlobImageDisplay blob={row.data} /> : <></>;
              }}
            />

            <Column title="Email" dataIndex="email" key="email" align="center" />
            <Column title="Role" dataIndex="roles" key="roles" align="center" render={(roles) => (roles && roles.length > 0 ? roles.map((role) => role.name).join(", ") : "No Role")} />

            <Column
              title="Operasi"
              key="action"
              width={195}
              align="center"
              render={(text, row) => (
                <span>
                  <Button type="primary" shape="circle" icon="edit" title="edit" onClick={this.handleEditUser.bind(null, row)} />
                  <Divider type="vertical" />
                  <Button type="primary" shape="circle" icon="delete" title="delete" onClick={this.handleDeleteUser.bind(null, row)} />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditUserForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) => (this.editUserFormRef = formRef)}
          visible={this.state.editUserModalVisible}
          confirmLoading={this.state.editUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditUserOk}
        />
        <AddUserForm wrappedComponentRef={(formRef) => (this.addUserFormRef = formRef)} visible={this.state.addUserModalVisible} confirmLoading={this.state.addUserModalLoading} onCancel={this.handleCancel} onOk={this.handleAddUserOk} />
      </div>
    );
  }
}

export default User;
