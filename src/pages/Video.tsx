import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { themeAttr } from '../utils/Theme'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import Comments from '../components/Comments'
import Card from '../components/Card'
const Container = tw.div`
  flex
  gap-6
`
const Content = tw.div`
  flex-[5]
`
const VideoWrapper = tw.div`

`
const Title = styled.h1`
  ${tw`text-[18px] font-normal mt-5 mb-3`};
  color: ${themeAttr('text')};
`
const Details = tw.div`
  flex
  items-center
  justify-between
`
const Info = styled.span`
  color: ${themeAttr('textSoft')};
`
const Hr = styled.hr`
  ${tw`my-4 border-[0.5px] mx-0 border-solid`};
  border-color: ${themeAttr('soft')};
`

const Buttons = styled.div`
  ${tw`flex gap-5`};
  color: ${themeAttr('text')};
`
const Button = tw.div`
  flex
  items-center
  gap-1
  cursor-pointer
`

const Recommendation = tw.div`
  flex-[2]
`

const Channel = tw.div`
  flex
  justify-between
`
const ChannelInfo = tw.div`
  flex
  gap-5
`
const Image = tw.img`
  rounded-[50%]
  w-12
  h-12
`
const ChannelName = tw.span`
  font-medium
`
const ChannelDetail = styled.div`
  ${tw`flex flex-col`};
  color: ${themeAttr('text')};
`
const ChannelCounter = styled.span`
  ${tw`mt-1 mb-5 text-[12px]`};
  color: ${themeAttr('textSoft')};
`
const Description = tw.p`
  text-[14px]
`
const Subscribe = tw.button`
  bg-[#cc1a00]
  font-medium
  cursor-pointer
  py-2
  px-5
  h-max
  border-none
  rounded-[3px]
  text-[white]
`

export default function Video() {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            src="https://www.veed.io/embed/3003b122-6534-4c78-97ca-7b99970ae8ce"
            width="100%"
            height="720"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Lofi Video Test"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>Lofi Test Video</Title>
        <Details>
          <Info>660,908 views • 1 day ago</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> 123
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://th.bing.com/th/id/OIG.n9uMDUv50OpeIkdd_8u0?pid=ImgGn" />
            <ChannelDetail>
              <ChannelName>Lofi</ChannelName>
              <ChannelCounter>200K subscribers</ChannelCounter>
              <Description>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                culpa soluta atque impedit, sequi ea iure placeat necessitatibus
                labore vero ex recusandae autem, magnam exercitationem pariatur
                facere! Quod, veniam culpa?
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments></Comments>
      </Content>
      <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation>
    </Container>
  )
}
