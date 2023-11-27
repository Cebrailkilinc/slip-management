"use client"
import React, { useEffect, useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FileUploads from './components/FileUploads';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { decode, encode } from "base64-arraybuffer";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { type } from 'os';
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import { cartData } from "@/package/data/product"
import ProductTable from './components/OrderTable';
import InvoiceModal from './components/InvoiceModal';
import { useAppSelector } from '@/package/hooks';
const Dashboard = () => {    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {allOrder} = useAppSelector(state => state.dashboard)
    return (
        <Box maxWidth={"3xl"} margin={"auto"}>            
            <Heading display={"flex"} justifyContent={"start"} as='h2' size='2xl' p={10}>
                Yönetim Paneli
            </Heading>
            <ProductTable  isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>            
        </Box>
    );
};

export default Dashboard;
