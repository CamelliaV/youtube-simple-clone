import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { themeAttr } from '../utils/Theme'

const Container = styled.div`
  ${tw`flex flex-col items-center justify-center h-[calc(100vh - 3.5rem)]`};
  color: ${themeAttr('text')};
`
const Wrapper = styled.div`
  ${tw`flex items-center flex-col py-5 px-12 gap-2`};
  background-color: ${themeAttr('bgLighter')};
  border: 1px solid ${themeAttr('soft')};
`
const Title = styled.h1`
  ${tw`text-2xl`}
`
const SubTitle = styled.h2`
  ${tw`text-xl font-light`}
`
const Input = styled.input`
  ${tw`rounded-sm p-2 bg-transparent w-full`};
  border: 1px solid ${themeAttr('soft')};
`
const Button = styled.button`
  ${tw`rounded-sm border-none py-2 px-5 font-medium cursor-pointer`};
  color: ${themeAttr('textSoft')};
  background-color: ${themeAttr('soft')};
`
const More = styled.div`
  ${tw`flex text-xs mt-2 justify-between w-[300px]`};
  color: ${themeAttr('textSoft')};
`
// ml-14
const Links = tw.div`
  gap-3
  flex
`
const Link = styled.span``

export default function SignIn() {
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Vtube</SubTitle>
        <Input type="text" placeholder="username" />
        <Input type="password" placeholder="password" />
        <Button>Sign in</Button>
        <Title>Or</Title>
        <Input type="text" placeholder="username" />
        <Input type="text" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        <span>English(USA)</span>
        <Links>
          {/* Not that from react-router-dom */}
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}
