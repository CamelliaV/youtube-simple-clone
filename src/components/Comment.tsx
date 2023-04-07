import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { themeAttr } from '../utils/Theme'
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
const Date = styled.span`
  ${tw`font-normal text-[12px] ml-2`};
  color: ${themeAttr('textSoft')};
`
const Text = tw.span`
  text-[14px]
`

export default function Comment() {
  return (
    <Container>
      <Avatar src="https://th.bing.com/th/id/OIG..r71eUK6hhMQiM6pVaro?pid=ImgGn"></Avatar>
      <Details>
        <Name>
          Alpha<Date>1 day ago</Date>
        </Name>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ex
          blanditiis vel velit ea debitis consectetur odio porro cumque totam
          fugit beatae eum, at exercitationem voluptatem obcaecati maiores
          laboriosam nihil?
        </Text>
      </Details>
    </Container>
  )
}
