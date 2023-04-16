import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import Card from '../components/Card'
import styled from 'styled-components'
import axios from '../utils/Axios'
import { VideoType } from '../types/Video'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// color: ${themeText};
const Container = styled.div`
  ${tw`flex justify-between flex-wrap`};
`

export default function Home({ type }: { type: 'trend' | 'sub' | 'random' }) {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [animationParent] = useAutoAnimate()
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/${type}`)
        // console.log(res.data)
        setVideos(res.data)
      } catch (error) {
        console.log('Errors when fetching videos.')
      }
    }
    fetchVideos()
  }, [type])

  return (
    <Container ref={animationParent}>
      {videos.map(video => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}
