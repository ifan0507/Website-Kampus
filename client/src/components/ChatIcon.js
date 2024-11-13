// import React from 'react';
// import { Container, Button, Link } from 'react-floating-action-button';
// import { FaBeer } from 'react-icons/fa';

// const ChatIcon = () => {
//     return (
//         <Container>
//             <Link 
//             href="#" 
//             tooltip="You Need Help?"
//             icon={<FaBeer />} 
//             style={{ backgroundColor: 'blue' }} /> 
//             <Button 
//             tooltip="CHAT US" 
//             icon="fas fa-plus" 
//             rotate={true} 
//             style={{ backgroundColor: 'red' }} />
//         </Container>
//     );
// };

// export default ChatIcon;

import React from 'react';
import { FloatButton } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const App = () => (
    <>
        <FloatButton.Group shape="circle">
      <FloatButton
        icon={<MessageOutlined />}
        href='https://wa.link/wuglb5'
        tooltip="You Need Help?"
        type="default"
        style={{ right: 20, }}
      />
      <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </>
  );
  export default App;