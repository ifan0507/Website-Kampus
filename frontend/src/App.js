import React, { Component } from 'react';
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import en_US from "antd/es/locale/en_US";
import store from "./store";
import Router from "./router";

class App extends Component {
  render() { 
    return (
      <ConfigProvider locale={en_US}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    );
  }
}
 
export default App;
