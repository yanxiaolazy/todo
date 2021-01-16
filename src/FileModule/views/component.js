import { Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function FileModule({
  isOpen, 
  fileList,
  uploadAction, 
  onChange, 
  onRemove,
  onCancel,
  onOk
}) {
  return(
    <Modal
      visible={isOpen}
      maskClosable={false}
      title='添加文件'
      className={isOpen ? 'animate-bottom' : ''}
      {...{onCancel, onOk}}
    >
      <Upload
        listType='text'
        multiple={true}
        // withCredentials
        action={uploadAction}
        {...{fileList, onRemove, onChange}}
      >
        <Button icon={<UploadOutlined />}>Add File</Button>  
      </Upload>
    </Modal>
  );
}