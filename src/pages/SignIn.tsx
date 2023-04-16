import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { themeAttr } from '../utils/Theme'
import axios from '../utils/Axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { useAppDispatch } from '../types/hooks'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(loginStart())
    try {
      console.log('access handleLogin')
      
      const res = await axios.post('/auth/signin', {
        name,
        password
      })
      dispatch(loginSuccess(res.data))
      // console.log(res.data)
    } catch (error) {
      // console.log(error)
      dispatch(loginFailure())
    }
  }

  const signInWithGoogle = () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
      .then(async result => {
        return await axios.post('/auth/google', {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL
        })
      })
      .then(res => dispatch(loginSuccess(res.data)))
      .catch(err => dispatch(loginFailure()))
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Vtube</SubTitle>
        <Input
          id="signin-username"
          type="text"
          placeholder="username"
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <Input
          id="signin-password"
          type="password"
          placeholder="password"
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Input
          type="text"
          placeholder="username"
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <Input
          type="text"
          placeholder="email"
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
        <Button
          onClick={e => {
            if (
              document.getElementById('signin-username')?.textContent ||
              document.getElementById('signin-password')?.textContent
            )
              return
          }}
        >
          Sign Up
        </Button>
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
