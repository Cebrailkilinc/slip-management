import React, { useState } from 'react'
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
import { useAppSelector } from '@/package/hooks'
import InvoiceModal from './InvoiceModal'
import { OrderResponse } from '../types/type'
const OrderTable = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {

    const { allOrder } = useAppSelector(state => state.dashboard)
    const [order, setOrder] = useState<OrderResponse>({
        orderNumber: 0,
        orderDate: "Date()",
        total: 1,
        products: [],
    });

    const handleWriteOrderToPdfFile = (order: OrderResponse) => {
        onOpen()
        setOrder(order)
    }

    return (
        <TableContainer>
            <InvoiceModal order={order} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
                    {
                        allOrder && allOrder.length > 1 ? allOrder.map((item) => {
                            return (
                                <Tr>
                                    <Td>{item.orderNumber && item.orderNumber}</Td>
                                    <Td>{item.orderDate !== null ? item.orderDate : "11/08/2023"}</Td>
                                    <Td isNumeric>25.4</Td>
                                    <Td>
                                        <Button onClick={() => handleWriteOrderToPdfFile(item)} >Belge Oluştur</Button>
                                    </Td>
                                </Tr>
                            )
                        }) : null
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default OrderTable