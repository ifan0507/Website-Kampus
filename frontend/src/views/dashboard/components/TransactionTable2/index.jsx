import React, { Component } from "react";
import { Table, Tag } from "antd";
import { transactionList } from "@/api/remoteSearch";
import {
  getDepartments,
} from "@/api/department";

// const columns = [
//   {
//     title: "Order_No",
//     dataIndex: "order_no",
//     key: "order_no",
//     width: 200,
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     width: 195,
//     render: text => (`$${text}`),
//   },
//   {
//     title: "Status",
//     key: "tag",
//     dataIndex: "tag",
//     width: 100,
//     render: (tag) => (
//       <Tag color={tag === "pending" ? "magenta" : "green"} key={tag}>
//         {tag}
//       </Tag>
//     ),
//   },
// ];
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 195,
    render: text => (`#${text}`),
  },
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
    width: 195,
    render: text => (`${text}`),
  },
  {
    title: "Deskripsi",
    dataIndex: "description",
    key: "description",
    width: 195,
    render: text => (`${text}`),
  },
];

class TransactionTable extends Component {
  _isMounted = false;   // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
  };
  fetchData = () => {
    getDepartments().then((response) => {
      const list = response.data.content;
      if (this._isMounted) {
        this.setState({ list });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.list}
        pagination={false}
      />
    );
  }
}

export default TransactionTable;
