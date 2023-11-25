"use client"
import React from 'react'
//Data
import { cartData } from "@/package/data/product"

//Components
import Card from "@/module/home/components/Card"

//UI
import { Grid, GridItem } from '@chakra-ui/react'
import { ProductType } from './types/type'


const HomePageLayout = () => {
  console.log(cartData)
  return (
    <Grid padding={5} templateColumns='repeat(5, 1fr)' gap={8}>
      {
       cartData && cartData.map((item:ProductType, i:number) => {
          return (
            <Card key={i} product={item} />
          )
        })
      }
    </Grid>
  )

}

export default HomePageLayout