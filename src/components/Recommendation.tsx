import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import axios from '../utils/Axios'
import { VideoType } from '../types/Video'
import Card from './Card'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Container = tw.div`
  flex-[2]
`
export default function Recommendation({ tags }: { tags: string[] }) {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [animationParent] = useAutoAnimate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get<VideoType[]>(`/videos/tags?tags=${tags}`)
        setVideos(res.data || [])
      } catch (error) {
        console.log('In Recommendation: fetch error: ', error)
      }
    }
    fetchVideos()
  }, [tags])

  return (
    <Container ref={animationParent}>
      {videos.map(video => (
        <Card type="sm" key={video._id} video={video}></Card>
      ))}
    </Container>
  )
}
