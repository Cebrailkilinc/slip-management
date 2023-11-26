"use client"
import React, { useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FileUploads from './components/FileUploads';

const Dashboard = () => {
    const [modifiedPdf, setModifiedPdf] = useState<Uint8Array | null>(null);
    async function modifyPdf() {
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
        const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText('This text was added with JavaScript!', {
            x: 55,
            y: height / 2 + 300,
            size: 10,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(0),
        });

        const modifiedBytes = await pdfDoc.save();
        setModifiedPdf(new Uint8Array(modifiedBytes));
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <FileUploads/>
            <button onClick={modifyPdf}>Modify PDF</button>
            {modifiedPdf && (
                <div>
                    <h2>Modified PDF:</h2>
                    {/* Bir iframe kullanarak PDF'yi gösterme */}
                    <iframe
                        src={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(modifiedPdf)))}`}
                        width="600"
                        height="400"
                    ></iframe>
                    {/* Veya bir PDF görüntüleyici kütüphanesi kullanarak gösterme */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
