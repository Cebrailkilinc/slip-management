"use client"
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import CartItem from "@/module/cart/components/CartItem"
import CartOrderSummary from "@/module/cart/components/CartOrderSummary"
import { cartData } from "@/package/data/product"
import { useAppSelector } from '@/package/hooks'
const CartSummaryLayout = () => {
  const { productsInCart } = useAppSelector(state => state.cart)
  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({productsInCart.length})
          </Heading>

          <Stack spacing="6">
            {productsInCart && productsInCart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default CartSummaryLayout;