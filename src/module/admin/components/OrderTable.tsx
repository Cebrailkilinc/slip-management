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
import { useAppSelector } from '@/package/hooks'
const OrderTable = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {

    const { allOrder } = useAppSelector(state => state.dashboard)

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

                    {
                        allOrder && allOrder.length > 1 ? allOrder.map((item) => {
                            return (
                    <Tr>
                        <Td>{item.orderNumber}</Td>
                        <Td>{item.orderDate}</Td>
                        <Td isNumeric>25.4</Td>
                        <Td>
                            <Button onClick={onOpen} >Belge Oluştur</Button>
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