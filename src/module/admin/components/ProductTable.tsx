import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
} from '@chakra-ui/react'
const ProductTable = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {
   
    return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Sipariş No</Th>
                        <Th>Tarih</Th>
                        <Th>Toplam</Th>                        
                        <Th >Fatura Oluştur</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>1001</Td>
                        <Td>11/05/2023</Td>
                        <Td isNumeric>25.4</Td>
                        <Td>
                            <Button onClick={onOpen} >Belge Oluştur</Button>
                        </Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default ProductTable