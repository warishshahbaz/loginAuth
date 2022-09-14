import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();

  const logout = () =>{
    navigate('/')
  }
  return (
    <>
      <Container  as='nav' bg='purple.300' maxW='full' h="8vh" display='flex' boxShadow='lg'>
      <Flex >
      <ul style={{display:"flex"}} >
      <li>Home</li>
      <li>About</li>
        <li onClick={logout} >Log Out</li>
      </ul>
      </Flex>
      </Container>
    </>
  )
}

export default Navbar