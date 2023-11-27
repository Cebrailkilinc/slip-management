import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box
} from '@chakra-ui/react'

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { decode, encode } from "base64-arraybuffer";
import '@react-pdf-viewer/core/lib/styles/index.css';

import { cartData } from "@/package/data/product"
import { useAppSelector } from '@/package/hooks';

const InvoiceModal = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {

    const [modifiedPdf, setModifiedPdf] = useState<Uint8Array | null>(null);
    const [file, setFile] = useState<string | ArrayBuffer | null>("");
    const { allOrder } = useAppSelector(state => state.dashboard)

    async function modifyPdf(file: any) {
        const existingPdfBytes = decode(file);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        console.log(allOrder)
        //Id column
        allOrder && allOrder.map((products, i: number) => {
            products.products.map((product, i: number) => {
                console.log(product.id)
                firstPage.drawText(product && product.id.toString(), {
                    x: 60,
                    y: 525 - i * 26.5,
                    size: 10,
                    font: helveticaFont,
                    color: rgb(0.95, 0.1, 0.1),
                })
            })



        })

        //name column
        cartData && cartData.map((item, i: number) => {
            firstPage.drawText(item.name, {
                x: 110,
                y: 525 - i * 26.5,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
            })
        })
        cartData && cartData.map((item, i: number) => {
            //Price column
            firstPage.drawText(item.price.toString(), {
                x: 345,
                y: 525 - i * 26.5,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
            })
        })

        cartData && cartData.map((item, i: number) => {
            //Quantity column
            firstPage.drawText(item.quantity.toString(), {
                x: 435,
                y: 525 - i * 26.5,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
            })
        })

        cartData && cartData.map((item, i: number) => {
            //Quantity column
            firstPage.drawText((item.price * item.quantity).toString(), {
                x: 490,
                y: 525 - i * 26.5,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
            })
        })

        // Invoice Number
        firstPage.drawText("52148", {
            x: 450,
            y: 647,
            size: 12,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        // Invoice Date
        firstPage.drawText("11/07/2023", {
            x: 425,
            y: 627,
            size: 12,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        // Invoice To
        firstPage.drawText(
            `Mario can use three basic three power-ups three basic three power-ups`,
            {
                x: 50,
                y: 640,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
                maxWidth: 120,
                lineHeight: 9
            })

        // Sub Total
        firstPage.drawText("513,00", {
            x: 450,
            y: 217,
            size: 11,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        // Tax
        firstPage.drawText("Tax", {
            x: 412,
            y: 195,
            size: 11,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        // Total
        firstPage.drawText("500.00", {
            x: 435,
            y: 156,
            size: 13,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        const modifiedBytes = await pdfDoc.save();
        setModifiedPdf(new Uint8Array(modifiedBytes));

    }

    // function bufferToBase64(buf: any) {
    //     var binstr = Array.prototype.map.call(buf, function (ch) {
    //         return String.fromCharCode(ch);
    //     }).join('');
    //     return btoa(binstr);
    // }


    //Select file ffrom local as base64
    const handleImageSelectLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files)
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && event.target.result) {
                    setFile(event.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleWriteInvoice = (file: any) => {
        modifyPdf(file)
    }

    const deletFile = () => {
        setModifiedPdf(null)
        setFile("")
    }
    console.log(file)
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} >
                <ModalOverlay />
                <ModalContent height={"400px"} overflowX="auto" >
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody  >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                            <Box display={"flex"} alignItems={"center"} gap={10} fontSize={"10px"}>
                                <input
                                    onChange={handleImageSelectLocal}
                                    id="file_input"
                                    type="file"
                                />
                                <Button fontSize='10px' colorScheme='blue' size='sm' onClick={() => deletFile()}>Belgeyi Ekle</Button>
                                <Button fontSize='10px' colorScheme='blue' size='sm' onClick={() => deletFile()}>Belgeyi Temizle</Button>
                            </Box>
                            <Box >
                                {modifiedPdf && (
                                    <Box display={"flex"} alignItems={"center"} gap={5}>
                                        {file && typeof file === 'string' && <iframe src={file} height="300px" />}
                                        <iframe src={`data:application/pdf;base64,${encode(modifiedPdf)}`} height="300px" ></iframe>
                                    </Box>
                                )}
                            </Box>
                        </div>
                    </ModalBody>
                    <ModalFooter >
                        <Button fontSize='12px' size='sm' colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button fontSize='12px' colorScheme='teal' size='sm' onClick={() => handleWriteInvoice(file)}>Belgeyi Yazdır</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InvoiceModal