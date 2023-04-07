import { TwStyle } from 'twin.macro'

export const darkTheme = {
  bg: '#181818',
  bgLighter: '#202020',
  text: 'white',
  textSoft: '#aaaaaa',
  soft: '#373737'
}
export const lightTheme = {
  bg: '#f9f9f9',
  bgLighter: 'white',
  text: 'black',
  textSoft: '#606060',
  soft: '#E4DCCF'
}

export interface ThemeProps {
  bg: '#181818' | '#f9f9f9'
  // bg: string
  bgLighter: '#202020' | 'white'
  text: 'white' | 'black'
  textSoft: '#aaaaaa' | '#606060'
  soft: '#373737' | '#E4DCCF'
}

export interface TypeProps {
  type?: 'sm' | undefined
}
// soft: '#373737' | '#f5f5f5'

export const themeAttr = (attr: keyof ThemeProps) => {
  return ({ theme }: { theme: ThemeProps }) => {
    return theme[attr]
  }
}

export const themeType = (trueReturn: string, falseReturn: string) => {
  return ({ theme }: { theme: TypeProps }) =>
    theme.type === 'sm' ? trueReturn : falseReturn
}
