import React, {Component} from 'react';
import $ from 'jquery';


class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: event.target.value});

    }

    handleSubmit(e) {
        alert('A file was submitted');
        e.preventDefault();

        let fd = new FormData(this.state.value);
        fd.append("CustomField", "This is some extra data");
        $.ajax({
            url: "/api/projects/1/pins",
            type: "POST",
            data: fd,
            processData: false,  // tell jQuery not to process the data
            contentType: false   // tell jQuery not to set contentType
        });
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
              <h4>My Images:</h4>
              <input type="file" accept=".svg, .jpg, .png" value={this.state.value} onChange={this.handleChange} />
              <input type="submit" value="Upload" />
            </form>
        </div>
        );
    }
}

export default UploadForm;
