import React, { Component } from "react";
import { Modal, Form, Input, Upload, Icon, message } from "antd";
const { TextArea } = Input;

class AddGaleriBaruForm extends Component {
  state = {
    fileList: [],
  };

  handleChange = (info) => {
    let fileList = [...info.fileList];
    console.log("setelah perubahan ", fileList);

    // Limit to a maximum of 5 files
    if (fileList.length > 5) {
      message.error("You can only upload a maximum of 5 files!");
      fileList = fileList.slice(0, 5);
    }

    // Update the fileList in the state
    this.setState({ fileList });
  };

  // fileUploadHandler = () => {
  //   const { form } = this.props;
  //   const { fileList } = this.state;

  //   form.validateFields(async (err, values) => {
  //     if (!err) {
  //       const formData = new FormData();
  //       formData.append("name", values.name);
  //       formData.append("description", values.description);

  //       // Append all files to the FormData
  //       fileList.forEach((file) => {
  //         formData.append("files", file);
  //       });

  //       try {
  //         const response = await axios.post("api/galeri-baru", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });
  //         console.log(response.data);
  //         message.success("Files uploaded successfully!");
  //         this.setState({ fileList: [] });
  //         form.resetFields();
  //       } catch (error) {
  //         console.error("Error details:", error.response ? error.response.data : error.message);
  //         message.error("Upload failed, please try again!");
  //       }
  //     }
  //   });
  // };

  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const { fileList } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal title="Tambah Gambar Galeri Baru" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formItemLayout}>
          <Form.Item label="Name:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Silahkan isikan nama galeri" }],
            })(<Input placeholder="Nama Galeri" />)}
          </Form.Item>
          <Form.Item label="Deskripsi:">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Silahkan isikan deskripsi galeri" }],
            })(<TextArea rows={4} placeholder="Deskripsi Galeri" />)}
          </Form.Item>

          <Form.Item label="File" name="files">
            {getFieldDecorator("files", {
              rules: [{ required: true, message: "Silahkan unggah file!" }],
            })(
              <Upload.Dragger beforeUpload={() => false} listType="picture" fileList={fileList} onChange={this.handleChange} multiple>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for five file upload.</p>
              </Upload.Dragger>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddGaleriBaruForm" })(AddGaleriBaruForm);
