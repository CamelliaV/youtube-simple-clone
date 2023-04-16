import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { themeAttr } from '../utils/Theme'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import app from '../firebase'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'

const Container = tw.div`
  w-full
  h-full
  absolute
  top-0
  left-0
  bg-[#000000a7]
  flex
  z-[1]
  items-center
  justify-center
`

const Wrapper = styled.div`
  ${tw`
  w-[600px]
  h-[700px]
  flex
  flex-col
  gap-5
  relative
  p-5
  `};
  background-color: ${themeAttr('bgLighter')};
  color: ${themeAttr('text')};
`

const Close = tw.div`
  absolute
  top-5
  right-5
  cursor-pointer
`
const Title = tw.h1`
  font-semibold
  text-center
  text-2xl
`

const Input = styled.input`
  ${tw`
  rounded-sm
  flex
  items-center
  justify-center
  p-3
  bg-transparent
  `};
  border: 1px solid ${themeAttr('soft')};
  color: ${themeAttr('text')};
`
const Desc = styled.textarea`
  ${tw`
  rounded-sm
  p-3
  bg-transparent
  `};
  border: 1px solid ${themeAttr('soft')};
  color: ${themeAttr('text')};
`
const Button = styled.button`
  ${tw`rounded-sm border-none py-2 px-5 font-medium cursor-pointer`};
  color: ${themeAttr('textSoft')};
  background-color: ${themeAttr('soft')};
`

const Label = tw.label`
  text-sm
`
export default function Upload({
  setOpen
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [img, setImg] = useState<File>()
  const [video, setVideo] = useState<File>()
  const [imgPerc, setImgPerc] = useState(0)
  const [videoPerc, setVideoPerc] = useState(0)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState<string[]>([])

  const uploadFile = (file: File, type: 'imgUrl' | 'videoUrl') => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        type === 'imgUrl' ? setImgPerc(progress) : setVideoPerc(progress)
        // console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      error => {
        // Handle unsuccessful uploads
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          // console.log('File available at', downloadURL)
          setInputs(prev => {
            return { ...prev, [type]: downloadURL }
          })
        })
      }
    )
  }
  const handleChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  useEffect(() => {
    video && uploadFile(video, 'videoUrl')
  }, [video])
  useEffect(() => {
    img && uploadFile(img, 'imgUrl')
  }, [img])
  
  const navigate = useNavigate()


  const handleUpload = async () => {
    const res = await axios.post('/videos', {...inputs, tags})
    setOpen(false)
    res.status === 200 && navigate(`/video/${res.data._id}`)
  }
  

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          `Uploading Video: ${videoPerc.toFixed(2)}%`
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={e => {
              e.target.files && setVideo(e.target.files[0])
            }}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          rows={8}
          placeholder="Description"
          name="desc"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={e => {
            setTags(e.target.value.split(','))
          }}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          `Uploading Image: ${imgPerc.toFixed(2)}%`
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={e => {
              e.target.files && setImg(e.target.files[0])
            }}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  )
}
