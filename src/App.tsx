import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import ItemsList from './components/items-list'
import Filters from './components/filters'
import { history } from './index'

const URL = 'https://fakestoreapi.com/products'

export interface ItemProps {
  title: string
  id: number
  image: string
  category: string
  price: string
}

function App() {
  const [rawProducts, setRawProducts] = useState<ItemProps[]>([])
  const [categories, setCategories] = useState([
    `men's clothing`,
    'jewelery',
    'electronics',
    `women's clothing`,
  ])

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  React.useEffect(() => {
    history.listen(() => {
      forceUpdate()
    })
  }, [])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const res = await fetch(URL)
    const json = await res.json()
    setRawProducts(json)
  }

  return (
    <Box className="App" maxWidth="800px" mx="auto">
      <Box as="header" textAlign="center" py={7}>
        <Box as="h1" fontSize="1.5rem">
          Query params state management
        </Box>
      </Box>

      <Box>
        <Box fontSize="2rem" textAlign="center">
          Products List
        </Box>
        <Filters categories={categories} />
        <ItemsList rawProducts={rawProducts} categories={categories} />
      </Box>
    </Box>
  )
}

export default App
