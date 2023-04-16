import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { VideoType } from '../types/Video'
import axios from '../utils/Axios'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'

const Container = tw.div`
  flex
  flex-wrap
  justify-between
`

export default function Search() {
  const [videos, setVideos] = useState<VideoType[]>([])

  const query = useLocation().search

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/search${query}`)
        setVideos(res.data || [])
      } catch (error) {
        console.log('In Search: errors for fetching videos')
      }
    }

    fetchVideos()
  }, [query])

  return (
    <Container>
      {videos.map(video => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}
