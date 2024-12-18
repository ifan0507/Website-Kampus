import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getDosens,
  deleteDosen,
  editDosen,
  addDosen,
} from "@/api/dosen";
import TypingCard from "@/components/TypingCard";
import EditDosenForm from "./forms/edit-dosen-form";
import AddDosenForm from "./forms/add-dosen-form";
import { BlobImageDisplay } from "../../components/BlobImageDisplay";
const { Column } = Table;
class Dosen extends Component {
  state = {
    dosens: [],
    editDosenModalVisible: false,
    editDosenModalLoading: false,
    currentRowData: {},
    addDosenModalVisible: false,
    addDosenModalLoading: false,
  };
  
  getDosens = async () => {
    const result = await getDosens();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        dosens: content,
      });
    }
  };
  handleEditDosen = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editDosenModalVisible: true,
    });
  };

  handleDeleteDosen = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus！");
      return;
    }
    console.log(id);
    deleteDosen({ id }).then((res) => {
      message.success("Berhasil menghapus!");
      this.getDosens();
    });
  };

  handleEditDosenOk = (_) => {
    const { form } = this.editDosenFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editDosen(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editDosenModalVisible: false,
            editDosenModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getDosens();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editDosenModalVisible: false,
      addDosenModalVisible: false,
    });
  };

  handleAddDosen = (row) => {
    this.setState({
      addDosenModalVisible: true,
    });
  };

  handleAddDosenOk = (_) => {
    const { form } = this.addDosenFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addDosenModalLoading: true });
      addDosen(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addDosenModalVisible: false,
            addDosenModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getDosens();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getDosens();
  }
  
  render() {
    const { dosens } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddDosen}>
          Tambahkan dosen
        </Button>
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola informasi Dosen di sistem, seperti menambahkan Dosen baru, atau mengubah Dosen yang sudah ada di sistem.`;
    
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Dosen" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={dosens}
            pagination={{ size: 5 }}
          >
            {/* <Column title="ID Jurusan" dataIndex="id" key="id" align="center" /> */}
            <Column title="NIP" dataIndex="nip" key="nip" align="center" />
            <Column
              title="Nama"
              dataIndex="name"
              key="name"
              align="center"
            />
            <Column
              title="Email"
              dataIndex="email"
              key="email"
              align="center"
            />
            <Column
              title="Nomer Hp"
              dataIndex="no_hp"
              key="no_hp"
              align="center"
            />
             <Column
              title="Program Studi"
              dataIndex="program_studi"
              key="program_studi"
              align="center"
            />
             <Column
              title="Bidang Minat"
              dataIndex="bidang_minat"
              key="bidang_minat"
              align="center"
            />
            <Column
              title="Foto"
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
                    onClick={this.handleEditDosen.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="Delete"
                    onClick={this.handleDeleteDosen.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditDosenForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editDosenFormRef = formRef)
          }
          visible={this.state.editDosenModalVisible}
          confirmLoading={this.state.editDosenModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditDosenOk}
        />
        <AddDosenForm
          wrappedComponentRef={(formRef) =>
            (this.addDosenFormRef = formRef)
          }
          visible={this.state.addDosenModalVisible}
          confirmLoading={this.state.addDosenModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddDosenOk}
        />
      </div>
    );
  }
}

export default Dosen;
