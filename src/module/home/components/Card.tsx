'use client'

import {
    Flex,
    Circle,
    Box,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Button,
    Image
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import Rating from './Rating'
import { ProductType } from '../types/type'

//Redux
import { useAppDispatch, useAppSelector } from '@/package/hooks'
import { addProductTocart } from '@/module/cart/slice/cart.slice'
const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
}


const ProductCart = ({ product }: { product: ProductType }) => {

    const {productsInCart} = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();

    console.log(productsInCart)
    const addToCart = (id:string)=>{
      dispatch(addProductTocart(product))
    }
    return (
        <Flex pb={5} p={1} w="full" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}              
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                height={350}               
                position="relative">                
                {data.isNew && (
                    <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />
                )}
                <Image
                    src={product.imageUrl}              
                    alt="Picture of the author"                 
                    boxSize='200px'          
                    objectFit='cover'
                />
                <Box p="6">
                    <Box display="flex" alignItems="baseline">
                        {product.isNew && (
                            <Badge rounded="full" px="2" fontSize="0.5em" colorScheme="red">
                                New
                            </Badge>
                        )}
                    </Box>
                    <Box
                        fontSize="xl"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated>
                        {product.name}
                    </Box>
                    <Flex justifyContent="space-between" alignContent="center">
                        <Rating rating={product.rating} numReviews={data.numReviews} />
                        <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="lg">
                                £
                            </Box>
                            {data.price.toFixed(2)}
                        </Box>
                    </Flex>
                    <Flex paddingTop={5}  justifyContent="center" alignContent="center">
                        <Button onClick={()=>addToCart(product.id)} size={"sm"} bg={"orange"} fontSize={11} color={"white"} >Add To Cart</Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default ProductCart;