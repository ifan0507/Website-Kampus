import React, { Component } from "react";
import { Modal, Table } from "antd";
import { getPengumumanById } from "@/api/pengumuman";

const { Column } = Table;

class DetailPengumuman extends Component {
  state = {
    pengumumans: [], // Untuk menampung daftar gambar pengumuman
  };

  // Mendapatkan pengumuman setiap kali komponen diupdate atau ID berubah
  componentDidUpdate(prevProps) {
    const { currentDetailRowData, visible } = this.props;

    if (visible && currentDetailRowData && currentDetailRowData.id !== prevProps.currentDetailRowData?.id) {
      this.getPengumuman(currentDetailRowData.id);
    }
  }

  // Mengambil detail pengumuman berdasarkan ID
  getPengumuman = async (pengumumanId) => {
    try {
      const result = await getPengumumanById(pengumumanId); // Panggil API untuk mendapatkan pengumuman berdasarkan ID
      const { fileNames } = result.data;
      this.setState({
        pengumumans: fileNames || [],
      }); 
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  render() {
    const { pengumumans } = this.state;
    const { visible, onCancel } = this.props;

    return (
      <Modal title="Gambar-Gambar Pengumuman" visible={visible} onCancel={onCancel} footer={null}>
        <div className="app-container">
          <Table bordered rowKey="fileName" dataSource={pengumumans}>
            <Column title="Nama Gambar" dataIndex="fileName" key="fileName" align="center" />
            <Column
              title="Gambar"
              key="data"
              align="center"
              render={(text, row) => {
                const extension = row.fileName.split(".").pop().toLowerCase();
                const mimeType = extension === "jpg" || extension === "jpeg" ? "image/jpeg" : "image/png";
                const imgSrc = `data:${mimeType};base64,${row.data}`; // Menampilkan gambar dari data base64

                return (
                  <img
                    src={imgSrc}
                    alt={row.fileName}
                    width={100}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent looping
                      e.target.src = "path/to/placeholder/image.jpg"; // Gambar placeholder jika error
                    }}
                  />
                );
              }}
            />
          </Table>
        </div>
      </Modal>
    );
  }
}

export default DetailPengumuman;
