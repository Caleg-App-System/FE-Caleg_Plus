import React, { useState } from 'react'
import "./uploadFile.css"
import { ExcelLogo } from '../../../assets'
import { CloudArrowUp, FileEarmarkExcel, TrashFill } from 'react-bootstrap-icons'

const UploadFile = () => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("TIdak ada file terpilih")
  
  return (
    <>
     <main className='upload-containers'>
      <form className='upload-form'
      onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" className='input-field' hidden 
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setFile(URL.createObjectURL(files[0]))
          }
        }}
         />

        {file ?
        <>
        <img src={ExcelLogo} width={150} height={150} alt={fileName} />
        <p className='fw-bold'>{fileName}</p>
        </>
        : 
        <>
        <CloudArrowUp color='#1475cf' size={60} />
        <p>Browse Files to upload</p>
        </>
      }

      </form>
      
      <section className='uploaded-row'>
        <FileEarmarkExcel color='red'  size={20}/>
        <span className='upload-content'>
          {fileName} - 
          <TrashFill color='red' size={20} className='ms-2'
          onClick={() => {
            setFileName("Tidak ada file terpilih")
            setFile(null)
          }}
           />
        </span>
      </section>
      <div className='upload-button'>
      <button className='btn btn-primary'>Upload</button>
    </div>
    </main>
    
    </>
  )
}

export default UploadFile