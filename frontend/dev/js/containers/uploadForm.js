import React, {Component} from 'react';


class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        alert('A file was submitted');
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <h4>My Images:</h4>
              <input type="file" value={this.state.file} onChange={this.handleChange} />
              <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default UploadForm;
