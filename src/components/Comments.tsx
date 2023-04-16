import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Comment from './Comment'
import { themeAttr } from '../utils/Theme'
import axios from '../utils/Axios'
import { CommentType } from '../types/Comment'
import { useAppSelector } from '../types/hooks'
const Container = tw.div`

`
const NewComment = tw.div`
  flex
  items-center
  gap-3
`

const Avatar = tw.img`
  rounded-[50%]
  w-12
  h-12
`

const Input = styled.input`
  ${tw`border-none bg-transparent outline-0 w-full p-1`};
  border-bottom: 1px solid ${themeAttr('soft')};
  color: ${themeAttr('text')};
`

export default function Comments({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState([])

  const { user } = useAppSelector(state => state.user)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`)
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchComments()
  }, [videoId])

  return (
    <Container>
      <NewComment>
        <Avatar
          src={
            user?.img ||
            'https://th.bing.com/th/id/OIG.WMtTCbVcZ7AzNjn1tVwW?pid=ImgGn'
          }
        />
        <Input placeholder="Share your idea here..." />
      </NewComment>
      {comments.map((comment: CommentType) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  )
}
