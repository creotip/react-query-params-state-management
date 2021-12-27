import React, { useEffect, useState } from 'react'
import { Badge, Box, Grid, Image } from '@chakra-ui/react'
import { ItemProps } from '../App'
import { useFilters } from '../hooks/useFilters'

interface Props {
  rawProducts: ItemProps[]
  categories: string[]
}
const ItemsList = ({ rawProducts, categories }: Props) => {
  const { categoryParam, setCategoryParam } = useFilters()
  const [filteredProducts, setFilteredProducts] = useState(rawProducts)

  const isFiltered = categoryParam && categories.includes(categoryParam)

  useEffect(() => {
    if (isFiltered) {
      setFilteredProducts(filterByCategory(rawProducts, categoryParam))
    } else {
      setFilteredProducts(rawProducts)
    }
  }, [rawProducts, categoryParam, isFiltered])

  const filterByCategory = (p: ItemProps[], cat: string) => {
    return p.filter((item) => item.category === cat)
  }
  // useEffect(() => {
  //   if (categoryParam && categories.includes(categoryParam)) {
  //     const filteredProductsByCategory = rawProducts.filter(
  //       (item) => item.category === categoryParam
  //     )
  //     setFilteredProducts(filteredProductsByCategory)
  //   } else {
  //     setFilteredProducts(rawProducts)
  //   }
  // }, [categoryParam])
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        {filteredProducts.length &&
          filteredProducts.map((item) => (
            <Box
              key={item.id}
              boxShadow="lg"
              borderRadius={5}
              overflow="hidden"
              position="relative"
              padding={5}
            >
              <Image
                src={item.image}
                boxSize="250px"
                objectFit="cover"
                mb={4}
              />
              <Box fontSize="sm">{item.title}</Box>
              <Badge>{item.category}</Badge>
            </Box>
          ))}
      </Grid>
    </Box>
  )
}

export default ItemsList
