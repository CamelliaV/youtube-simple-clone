import React, { Dispatch, SetStateAction } from 'react'
import tw from 'twin.macro'
import logoImage from '../img/logo.png'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import styled from 'styled-components'
import { themeAttr } from '../utils/Theme'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../types/hooks'
// bg-black

const Container = styled.div`
  background-color: ${themeAttr('bgLighter')};
  color: ${themeAttr('text')};
  ${tw`flex-[1] h-[100vh] text-sm sticky top-0`};
`
const Wrapper = tw.div`
  px-6
  py-4
  h-full
`
const Logo = tw.div`
  flex
  items-center
  gap-1
  font-bold
  mb-6
`
const Img = tw.img`
  h-6
`
const Item = styled.div`
  ${tw`flex items-center gap-5 cursor-pointer py-2`}

  &: hover {
    background-color: ${themeAttr('soft')};
  }
`
const Hr = styled.hr`
  ${tw`my-4 border-[0.5px] border-solid`};
  border-color: ${themeAttr('soft')};
`
const Login = tw.div`
  
`
const Button = tw(Link)`
  py-1 
  px-4
  min-w-min
  max-w-max
  bg-transparent
  border 
  border-solid 
  border-[#3ea6ff]
  text-[#3ea6ff]
  rounded-sm 
  font-medium
  mt-3 
  cursor-pointer 
  flex 
  items-center
  gap-1
`
const Title = tw.h2`
  text-sm
  font-medium
  text-[#aaaaaa]
  mb-5
`

export default function Menu({
  darkMode,
  setDarkMode
}: {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}) {
  const { user } = useAppSelector(state => state.user)

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>
            <Img src={logoImage} />
            VTube
          </Logo>
        </Link>
        <Link to="/">
          <Item>
            <HomeIcon></HomeIcon>
            Home
          </Item>
        </Link>
        <Link to="/trends">
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link to="/subscriptions">
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!user && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              {/* Note that: you should not wrap a <button> inside a <a> (or vice versa)*/}
              <Button to="/signin">
                <AccountCircleOutlinedIcon /> SIGN IN
              </Button>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF VTUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? 'Light' : 'Dark'} Mode
        </Item>
      </Wrapper>
    </Container>
  )
}
