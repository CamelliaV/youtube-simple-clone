import React from 'react'
import tw from 'twin.macro'
import { themeAttr, themeType } from '../utils/Theme'
import styled, { ThemeProvider } from 'styled-components'
import { Link } from 'react-router-dom'

type TypeProps = 'sm' | undefined

const Container = styled.div`
  ${tw`cursor-pointer gap-3`};
  width: ${themeType('', '360px')};
  display: ${themeType('flex', '')};
  margin-bottom: ${themeType('20px', '45px')};
`
const Image = styled.img`
  ${tw`w-full bg-[#999] mt-1 flex-[1]`};
  height: ${themeType('129px', '202px')};
`

const Details = styled.div`
  ${tw`flex gap-3 flex-[1]`};
  margin-top: ${themeType('', '16px')};
`

const ChannelImage = styled.img`
  ${tw`w-9 h-9 rounded-[50%] bg-[#999]`};
  display: ${themeType('none', '')};
`

const Texts = tw.div`
`
const Title = styled.h1`
  ${tw`text-[16px] font-medium`};
  color: ${themeAttr('text')};
`
const ChannelName = styled.h2`
  ${tw`text-[14px] mx-0 my-[9px]`};
  color: ${themeAttr('textSoft')};
`
const Info = styled.div`
  ${tw`text-[14px]`};
  color: ${themeAttr('textSoft')};
`

export default function Card({ type }: { type?: TypeProps }) {
  return (
    <Link to="/video/test" style={{ textDecoration: 'none' }}>
      <ThemeProvider theme={{ type }}>
        <Container>
          <Image src="https://th.bing.com/th/id/OIG.HVWYRFWUsXYyKMa3odwJ?pid=ImgGn" />
          <Details>
            <ChannelImage src="https://th.bing.com/th/id/OIG.lx6pBZ4xH4t4Gc6P5fVh?pid=ImgGn" />
            <Texts>
              <Title>Image from bing image creator</Title>
              <ChannelName>DALL•E</ChannelName>
              <Info>660,908 views • 1 day ago</Info>
            </Texts>
          </Details>
        </Container>
      </ThemeProvider>
    </Link>
  )
}
