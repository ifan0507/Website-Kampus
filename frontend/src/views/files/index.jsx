import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import {
  getFiles,
  deleteFiles,
  editFiles,
  addFiles,
} from "@/api/files";
import UploadFiles from "./upload-files.component";

import TypingCard from "@/components/TypingCard";
// import EditDepartmentForm from "./forms/edit-department-form";
// import AddDepartmentForm from "./forms/add-department-form";
const { Column } = Table;
class Files extends Component {
  state = {
    files: [],
    editFilesModalVisible: false,
    editFilesModalLoading: false,
    currentRowData: {},
    addFilesModalVisible: false,
    addFilesModalLoading: false,
  };
  getFiles = async () => {
    const result = await getFiles();
    console.log(result);
    const { content, statusCode } = result.data;

    if (statusCode === 200) {
      this.setState({
        files: content,
      });
    }
  };
  handleEditFiles = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editFilesModalVisible: true,
    });
  };

  handleDeleteFiles = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Tidak dapat menghapus！");
      return;
    }
    console.log(id);
    deleteFiles({ id }).then((res) => {
      message.success("Berhasil menghapus!");
      this.getFiless();
    });
  };

  handleEditFilesOk = (_) => {
    const { form } = this.editFilesFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editFiles(values, values.id)
        .then((response) => {
          form.resetFields();
          this.setState({
            editFilesModalVisible: false,
            editFilesModalLoading: false,
          });
          message.success("Berhasil diedit!");
          this.getFiles();
        })
        .catch((e) => {
          message.success("Pengeditan gagal, coba lagi!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editFilesModalVisible: false,
      addFilesModalVisible: false,
    });
  };

  handleAddFiles = (row) => {
    this.setState({
      addFilesModalVisible: true,
    });
  };

  handleAddFilesOk = (_) => {
    const { form } = this.addFilesFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addFilesModalLoading: true });
      addFiles(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addFilesModalVisible: false,
            addFilesModalLoading: false,
          });
          message.success("Berhasil ditambahkan!");
          this.getFiles();
        })
        .catch((e) => {
          message.success("Gagal menambahkan, silakan coba lagi!");
        });
    });
  };
  componentDidMount() {
    this.getFiles();
  }
  render() {
    const { files } = this.state;
    const title = (
      <span>
        <UploadFiles />
      </span>
    );
    const cardContent = `Di sini, Anda dapat mengelola jurusan di sistem, seperti menambahkan jurusan baru, atau mengubah jurusan yang sudah ada di sistem.`;
    return (
      <div className="app-container">
        <TypingCard title="Manajemen Jurusan" source={cardContent} />
        <br />
        <Card title={title}>
          <Table
            bordered
            rowKey="id"
            dataSource={files}
            pagination={false}
          >
            <Column title="ID Jurusan" dataIndex="id" key="id" align="center" />
            <Column title="Nama" dataIndex="name" key="name" align="center" />
            <Column
              title="Deskripsi Jurusan"
              dataIndex="description"
              key="description"
              align="center"
            />
            <Column
              title="Kompetensi Lulusan"
              dataIndex="kompetensi"
              key="kompetensi"
              align="center"
            />
            <Column
              title="Peluang Kerja"
              dataIndex="peluang"
              key="peluang"
              align="center"
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
                    onClick={this.handleEditFiles.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="Delete"
                    onClick={this.handleDeleteFiles.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        {/* <EditFilesForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) =>
            (this.editFilesFormRef = formRef)
          }
          visible={this.state.editFilesModalVisible}
          confirmLoading={this.state.editFilesModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditFilesOk}
        />
        <AddFilesForm
          wrappedComponentRef={(formRef) =>
            (this.addFilesFormRef = formRef)
          }
          visible={this.state.addFilesModalVisible}
          confirmLoading={this.state.addFilesModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddFilesOk}
        /> */}
      </div>
    );
  }
}

export default Files;
