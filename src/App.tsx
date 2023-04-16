import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import { darkTheme, lightTheme } from './utils/Theme'
import tw from 'twin.macro'
import { themeAttr } from './utils/Theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from './pages/SignIn'
import Search from './pages/Search'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Container = tw.div`
  flex
  
`
// bg-gray-600
// bg-[#181818]
const Main = styled.div`
  ${tw`flex-[7]`};
  background-color: ${themeAttr('bg')};
`
const Wrapper = tw.div`
  py-6
  px-24
`

// const TwThemeProvider = tw(ThemeProvider)``

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem('darkMode') || 'true')
  )
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])
  const [animationParent] = useAutoAnimate()

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper ref={animationParent}>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App
