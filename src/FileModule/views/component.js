import { Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getToken, getUser } from "../../utils/parse";

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
        accept='image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        listType='text'
        multiple={true}
        // withCredentials
        action={uploadAction}
        headers={{Authorization: `Bearer ${getToken()}`}}
        data={{uploader: getUser(), uploadTime: Date.now(), todoStatus: 'pending'}}
        {...{fileList, onRemove, onChange}}
      >
        <Button icon={<UploadOutlined />}>Add File</Button>  
      </Upload>
    </Modal>
  );
}