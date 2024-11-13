import React, { Component } from "react";
import { Modal, Table } from "antd";
import { getGaleryBaruById } from "@/api/galeri-baru";

const { Column } = Table;

class DetailGaleriBaru extends Component {
  state = {
    galeris: [],
  };

  componentDidUpdate(prevProps) {
    const { currentDetailRowData, visible } = this.props;

    if (visible && currentDetailRowData && currentDetailRowData.id !== prevProps.currentDetailRowData?.id) {
      this.getGaleriBaru(currentDetailRowData.id);
    }
  }

  getGaleriBaru = async (galeryId) => {
    try {
      const result = await getGaleryBaruById(galeryId);
      const { fileNames } = result.data;
      this.setState({
        galeris: fileNames || [],
      });
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  render() {
    const { galeris } = this.state;
    const { visible, onCancel } = this.props;

    return (
      <Modal title="Gambar-Gambar Galeri" visible={visible} onCancel={onCancel} footer={null}>
        <div className="app-container">
          <Table bordered rowKey="fileName" dataSource={galeris}>
            <Column title="Nama Gambar" dataIndex="fileName" key="fileName" align="center" />
            <Column
              title="Gambar"
              key="data"
              align="center"
              render={(text, row) => {
                // Tentukan tipe MIME berdasarkan nama file
                const extension = row.fileName.split(".").pop().toLowerCase();
                const mimeType = extension === "jpg" || extension === "jpeg" ? "image/jpeg" : "image/png";
                const imgSrc = `data:${mimeType};base64,${row.data}`; // Menampilkan gambar dari data base64
                console.log("Image Source:", imgSrc);
                return (
                  <img
                    src={imgSrc}
                    alt={row.fileName}
                    width={100}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent looping
                      e.target.src = "path/to/placeholder/image.jpg"; // Gambar placeholder
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

export default DetailGaleriBaru;
