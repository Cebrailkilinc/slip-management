"use client"
import React, { useEffect, useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FileUploads from './components/FileUploads';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { decode, encode } from 'base64-arraybuffer';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { type } from 'os';
import { Box, Button } from '@chakra-ui/react';
import { cartData } from "@/package/data/product"
const Dashboard = () => {
    const [modifiedPdf, setModifiedPdf] = useState<Uint8Array | null>(null);
    const [file, setFile] = useState<string | ArrayBuffer | null>("");

    async function modifyPdf(file: any) {
        const existingPdfBytes = decode(file);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        console.log(width, height)


        cartData && cartData.map((item, i: number) => {
            //Id column
            firstPage.drawText(item.id.toString(), {
                x: 60,
                y: 525 - i * 26.5,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
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

        firstPage.drawText("11/07/2023", {
            x: 400,
            y: 627,
            size: 10,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        const modifiedBytes = await pdfDoc.save();

        setModifiedPdf(new Uint8Array(modifiedBytes));

    }

    function bufferToBase64(buf: any) {
        var binstr = Array.prototype.map.call(buf, function (ch) {
            return String.fromCharCode(ch);
        }).join('');
        return btoa(binstr);
    }
    var base64 = bufferToBase64(modifiedPdf != null ? modifiedPdf : new Uint8Array([8, 89]));


    const handleImageSelectLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && event.target.result) {
                    setFile(event.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div >
            <h1>Dashboard</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                <input
                    onChange={handleImageSelectLocal}
                    id="file_input"
                    type="file"
                />
                <div>
                    <Button onClick={() => modifyPdf(file)}>Modify PDF</Button>
                    {modifiedPdf && (
                        <Box display={"flex"} alignItems={"center"} >
                            {file && typeof file === 'string' && <iframe src={file} />}
                            <iframe src={`data:application/pdf;base64,${encode(modifiedPdf)}`} height="100%" width="100%"></iframe>
                        </Box>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
