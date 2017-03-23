import React, {Component} from 'react';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import server from '../config/server';


class UploadForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.postImage = this.postImage.bind(this);
    }
    
    //AJAX to post image
    postImage(files) {

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
                    var file = files[0]
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
    
  
    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      alert("dropped");        
      this.postImage(acceptedFiles);            
    }

    handleSubmit(e) {
        e.preventDefault();       
        this.postImage(document.getElementById('imageForm').files); 
    }

    render() {
        return (
        <div>           
              <input id="imageForm" name="customImage" type="file" accept=".svg, .jpg, .png"/>            
              <button value="Upload" onClick={this.handleSubmit}>Upload</button>
              <Dropzone onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
        </div>
        );
    }
}

export default UploadForm;
