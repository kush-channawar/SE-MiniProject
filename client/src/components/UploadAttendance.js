import React, { Fragment, useState,useEffect } from 'react';
import { toast } from "react-toastify";
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const UploadAttendance = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [name,setName] = useState('');
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboardteacher/attended", {
        method: "POST",
      });

      const parseData = await res.json();
      setName(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

 
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/dashboardteacher/uploadstudent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      toast.success('File Uploaded')

    getProfile();
    
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  

  return (
    <Fragment>
      <h1>Student Upload Attendance</h1>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file' accept = ".csv"
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload and Validate'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      <form action = "/dashboardteacher"><button className='btn btn-danger btn-block mt-4'> Go Back</button></form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>Attendance Marked</h3>
            <p> Present :</p><br></br><p>{" " + name + " \n"}</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default UploadAttendance;
