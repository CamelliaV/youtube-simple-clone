import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { themeAttr, themeType } from '../utils/Theme'
import styled, { ThemeProvider } from 'styled-components'
import { Link } from 'react-router-dom'
import { VideoType } from '../types/Video'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { UserType } from '../types/User'
import axios from '../utils/Axios'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

type TypeProps = 'sm' | undefined

const Container = styled.div`
  ${tw`cursor-pointer gap-3`};
  width: ${themeType('400px', '360px')};
  display: ${themeType('flex', '')};
  margin-bottom: ${themeType('20px', '45px')};
`
const Image = styled.img`
  ${tw`bg-[#999] mt-1 flex-1 object-cover rounded-md`};
  height: ${themeType('94px', '202px')};
  width: ${themeType('168px', '100%')};
`

const Details = styled.div`
  ${tw`flex gap-3 flex-1`};
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

export default function Card({
  type,
  video
}: {
  type?: TypeProps
  video: VideoType
}) {
  const [channel, setChannel] = useState<UserType>()

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/find/${video.userId}`)
        // console.log(res.data)
        setChannel(res.data)
      } catch (error) {
        console.log('Errors when fetching channel.')
      }
    }
    fetchChannel()
  }, [video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <ThemeProvider theme={{ type }}>
        <Container>
          <Image src={video.imgUrl} />
          <Details>
            <ChannelImage
              src={
                channel?.img ||
                'https://th.bing.com/th/id/OIG.lx6pBZ4xH4t4Gc6P5fVh?pid=ImgGn'
              }
            />
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{channel?.name || 'DALL•E'}</ChannelName>
              <Info>
                {video.views} views •{' '}
                {timeAgo.format(new Date(video.createdAt))}
              </Info>
            </Texts>
          </Details>
        </Container>
      </ThemeProvider>
    </Link>
  )
}
