import { Upload, Modal } from 'antd';
import React from "react";
import './Avatar.css'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class AvatarUploaderTemplate extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        file: ''
    };

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ file }) => this.setState({ file });

    render() {
        const { file } = this.state;
        const uploadButton = (
            <>
                <div className={'upload-field__button'}/>
                <div className={'upload-field__title'}>Сменить аватар</div>
            </>);
        return (
            <>
                <Upload
                    action="https://imgbb.com/"
                    listType="picture-card"
                    file={file}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    <div className={'upload-field'}>{file ? null : uploadButton}</div>
                </Upload>
            </>
        );
    }
}

export default AvatarUploaderTemplate