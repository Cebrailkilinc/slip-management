import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useAppDispatch, useAppSelector } from '@/package/hooks'
import { createNewOrder } from '@/module/admin/slices/dashboard.slice'

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

const CartOrderSummary = () => {
  const { productsInCart } = useAppSelector(state => state.cart)
  const { allOrder } = useAppSelector(state => state.dashboard)
  const dispatch = useAppDispatch();
  const today = new Date();

  function formatDate(date: any) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


const formattedDate = formatDate(today);


  const newOrderInfo = {
    orderNumber: 1000 + allOrder.length,
    orderDate: formattedDate,    
    products: productsInCart
  }

  const handleCreateNewOrder = ()=>{
      dispatch(createNewOrder(newOrderInfo))
      
  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(597)} />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(597)}
          </Text>
        </Flex>
      </Stack>
      <Button onClick={ handleCreateNewOrder} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Onayla
      </Button>
    </Stack>
  )
}
export default CartOrderSummary; 