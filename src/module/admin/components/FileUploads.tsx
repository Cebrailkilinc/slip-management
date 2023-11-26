"use client"
import { ReactNode, SetStateAction, useRef, useState } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'
import { Viewer } from '@react-pdf-viewer/core';

type FileUploadProps = {
    register: UseFormRegisterReturn
    accept?: string
    multiple?: boolean
    children?: ReactNode
}

const FileUploads = () => {

    const [selectedFile, setSelectedFile] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            files.length > 0 && setSelectedFile(URL.createObjectURL(files[0]));
        }

    };


    const handleSubmission = () => {
        console.log(selectedFile)
    }
    return (
        <div>
            <input type="file" accept=".pdf" onChange={changeHandler } />

            <div style={{ height: '750px' }}>
                {selectedFile ? (
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '100%',
                        }}
                    >
                      <Viewer fileUrl={""} />
                    </div>
                ) : (
                    <div
                        style={{
                            alignItems: 'center',
                            border: '2px dashed rgba(0, 0, 0, .3)',
                            display: 'flex',
                            fontSize: '2rem',
                            height: '100%',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        Preview area
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileUploads

function setIsSelected(arg0: boolean) {
    throw new Error('Function not implemented.')
}
