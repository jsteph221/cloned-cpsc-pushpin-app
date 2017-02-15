import React, {Component} from 'react';
import $ from 'jquery';

import server from '../config/server';


class UploadForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});

    }

    handleSubmit(e) {
        e.preventDefault();

        var server = 'http://localhost:3030';

        /*get 1st project*/
        $.ajax(
        {
            url : server+"/api/projects",
            type : "GET",
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            success : function(data) {
                if (data.success === true){
                    var project = data.projects[0];
                    /* create a new custom image document */
                    var customImageEndPoint = server+"/api/projects/"+project+"/customImages";
                    var file = document.getElementById('imageForm').files[0]
                    var fd = new FormData();
                    fd.append('file', file);
                    $.ajax(
                    {
                        url : customImageEndPoint,
                        type : "POST",
                        xhrFields: {
                           withCredentials: true
                        },
                        data : fd,
                        crossDomain: true,
                        processData: false,
                        contentType: false,
                        success : function(data) {
                            if (data.success === true){
                                var id = data.customImages._id;
                                alert("A custom image has been submitted and created with id: " + id);
                            }
                            else{
                                alert(data.message);
                            }
                        }
                    })
                    .fail(
                        function() { alert("ajax failure");}
                    );
                }
                else{
                    alert(data.message);
                }
            }
        })
        .fail(
            function() { alert("ajax failure");}
        );
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
              <h4>My Images:</h4>
              <input id="imageForm" name="customImage" type="file" accept=".svg, .jpg, .png" value={this.state.value} onChange={this.handleChange} />
              <input type="submit" value="Upload" />
            </form>
        </div>
        );
    }
}

export default UploadForm;
