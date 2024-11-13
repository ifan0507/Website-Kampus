import React from "react";
import clip from "@/utils/clipboard"; 
import { Button, Row, Col } from "antd";

const text = `
i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i is the text to be copied,
   i am the text to be copied
  `;
const handleCopy = (text, event) => {
  clip(text, event);
};
const Clipboard = () => {
  return (
    <div className="app-container">
      <h1>Click the Copy button below to copy the following text to the clipboard</h1>
      <br />
      <Row>
        <Col span={12}>{text}</Col>
      </Row>
      <br />
      <Row>
        <Col span={2}>
          <Button
            type="primary"
            icon="copy"
            onClick={(e) => {
              handleCopy(text, e);
            }}
          >
            Copy
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Clipboard;
