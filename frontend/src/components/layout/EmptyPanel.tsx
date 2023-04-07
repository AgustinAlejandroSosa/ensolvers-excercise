import { Typography } from '@mui/material'
import React from 'react'

export default function EmptyPanel() {
  return (
    <>
      <Typography fontSize={25} fontWeight={'bold'} sx={{position:'absolute', top:'50%', left:'40%',right:'40%'}}>
        Let's create a note!
      </Typography>
    </>
  )
}
