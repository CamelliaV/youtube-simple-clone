import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { themeAttr } from '../utils/Theme'
import { CommentType } from '../types/Comment'
import TimeAgo from 'javascript-time-ago'
import { useAppSelector } from '../types/hooks'
import axios from '../utils/Axios'
import { UserType } from '../types/User'

const timeAgo = new TimeAgo('en-US')

const Container = tw.div`
  flex
  gap-3
  my-8
  mx-0
`
const Avatar = tw.img`
  rounded-[50%]
  w-12
  h-12
`
const Details = styled.div`
  ${tw`flex flex-col gap-3`};
  color: ${themeAttr('text')};
`
const Name = tw.span`
  text-[14px]
  font-medium
`
const DateTag = styled.span`
  ${tw`font-normal text-[12px] ml-2`};
  color: ${themeAttr('textSoft')};
`
const Text = tw.span`
  text-[14px]
`

export default function Comment({ comment }: { comment: CommentType }) {
  const [commenter, setCommenter] = useState<UserType>()

  useEffect(() => {
    const fetchCommenter = async () => {
      try {
        const res = await axios.get(`/users/find/${comment.userId}`)
        setCommenter(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCommenter()
  }, [comment.userId])

  return (
    <Container>
      <Avatar
        src={
          commenter?.img ||
          'https://th.bing.com/th/id/OIG..r71eUK6hhMQiM6pVaro?pid=ImgGn'
        }
      />
      <Details>
        <Name>
          {commenter?.name}
          <DateTag>
            {timeAgo.format(new Date(comment?.createdAt || new Date()))}
          </DateTag>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  )
}
