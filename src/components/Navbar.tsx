import React, { useState } from 'react'
import tw from 'twin.macro'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import styled from 'styled-components'
import { themeAttr } from '../utils/Theme'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../types/hooks'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import Upload from './Upload'
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
const Search = styled.div`
  ${tw`
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
  `};
  &: hover {
    color: ${themeAttr('soft')};
  } ;
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

const User = styled.div`
  ${tw`flex items-center gap-2 font-medium`};
  color: ${themeAttr('text')};
`
const Avatar = styled.img`
  ${tw`w-[32px] h-[32px] rounded-[50%] bg-[#999]`}
`

export default function Navbar() {
  const { user } = useAppSelector(state => state.user)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={e => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${query}`)} />
          </Search>
          {user ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(!open)} />
              <Avatar src={user.img} />
              {user.name}
            </User>
          ) : (
            <Button to="/signin">
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}
