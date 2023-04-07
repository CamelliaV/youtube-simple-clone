import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Comment from './Comment'
import { themeAttr } from '../utils/Theme'
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

export default function Comments() {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://th.bing.com/th/id/OIG.WMtTCbVcZ7AzNjn1tVwW?pid=ImgGn" />
        <Input placeholder="Share your idea here..." />
      </NewComment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
    </Container>
  )
}
