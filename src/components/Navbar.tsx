import React from 'react'
import tw from 'twin.macro'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import styled from 'styled-components'
import { themeAttr } from '../utils/Theme'
import { Link } from 'react-router-dom'
const Container = styled.div`
  ${tw`sticky top-0 h-14`};
  background-color: ${themeAttr('bgLighter')};
`
const Wrapper = tw.div`
  flex
  items-center
  px-5
  justify-end
  relative
  h-full
`
const Search = tw.div`
  absolute
  left-0
  w-2/5
  m-auto
  right-0
  flex
  items-center
  justify-between
  p-1
  border-solid
  rounded-[3px]
  border-[#ccc]
  border-[1px]
  
`
const Input = styled.input`
  ${tw`border-none border-0 outline-none bg-transparent w-[90%] p-1`};
  color: ${themeAttr('text')};
`
const Test = tw.div``

const Button = tw(Link)`
  py-1
  px-4
  bg-transparent
  border
  border-solid
  border-[#3ea6ff]
  text-[#3ea6ff]
  rounded-sm
  font-medium
  cursor-pointer
  flex
  items-center
  gap-1
`

export default function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        <Button to='/signin'>
          <AccountCircleOutlinedIcon />
          SIGN IN
        </Button>
      </Wrapper>
    </Container>
  )
}
