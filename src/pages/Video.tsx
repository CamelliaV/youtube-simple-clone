import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { themeAttr } from '../utils/Theme'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import Comments from '../components/Comments'
import Card from '../components/Card'
import userSlice, { subscribe } from '../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../types/hooks'
import { useLocation } from 'react-router-dom'
import axios from '../utils/Axios'
import { VideoType } from '../types/Video'
import { UserType } from '../types/User'
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
  dislike
} from '../redux/videoSlice'
import TimeAgo from 'javascript-time-ago'
import Recommendation from '../components/Recommendation'

const timeAgo = new TimeAgo('en-US')

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
const Subscribe = styled.button`
  ${tw`
  bg-[#cc1a00]
  font-medium
  cursor-pointer
  py-2
  px-5
  h-max
  border-none
  rounded-[3px]
  text-[white]
  `};
  background-color: ${({ theme }) => (theme === 'yes' ? '#373737' : '')};
`

const VideoFrame = tw.video`
  w-full
  max-w-[720px]
  object-cover
`

export default function Video() {
  const { user } = useAppSelector(state => state.user)
  const { video } = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()

  const path = useLocation().pathname.split('/')[2]

  const [channel, setChannel] = useState<UserType>()

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${video?._id}`)
      dispatch(like(user?._id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDislike = async () => {
    try {
      await axios.put(`/users/like/${video?._id}`)
      dispatch(dislike(user?._id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubscribe = async () => {
    try {
      const action = user?.subscribedUsers.includes(channel?._id!)
        ? 'unsub'
        : 'sub'
      await axios.put(`/users/${action}/${channel?._id}`)
      dispatch(subscribe(channel?._id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart())
      try {
        const video = await axios.get<VideoType>(`/videos/find/${path}`)
        const channel = await axios.get<UserType>(
          `/users/find/${video.data.userId}`
        )

        dispatch(fetchSuccess(video.data))
        setChannel(channel.data)
      } catch (error) {
        dispatch(fetchFailure())
      }
    }
    fetchData()
  }, [path, dispatch])

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={video?.videoUrl} controls />
          {/* <iframe
            src="https://www.veed.io/embed/3003b122-6534-4c78-97ca-7b99970ae8ce"
            width="100%"
            height="720"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Lofi Video Test"
            allowFullScreen
          ></iframe> */}
        </VideoWrapper>
        <Title>{video?.title}</Title>
        <Details>
          <Info>
            {video?.views} views •{' '}
            {timeAgo.format(new Date(video?.createdAt || new Date()))}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {video?.likes.includes(user!._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {video?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {video?.dislikes.includes(user!._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
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
            <Image
              src={
                channel?.img ||
                'https://th.bing.com/th/id/OIG.n9uMDUv50OpeIkdd_8u0?pid=ImgGn'
              }
            />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{video?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {user?.subscribedUsers.includes(channel?._id || '') ? (
            <Subscribe onClick={handleSubscribe} theme="yes">
              Subscribed
            </Subscribe>
          ) : (
            <Subscribe onClick={handleSubscribe} theme="no">
              Subscribe
            </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={video?._id!} />
      </Content>
      <Recommendation tags={video?.tags || []} />
      {/* <Recommendation>
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
      </Recommendation> */}
    </Container>
  )
}
