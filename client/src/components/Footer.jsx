import React from 'react'
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography'
import { Trans } from 'react-i18next'

export default function Footer() {
  return (
    <Box component="footer" sx={{
        bgcolor: "primary.main",
        boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.2)"
    }}>
      <Typography variant='body1' color='secondary.contrastText' align='center' sx={{p: 1}}>
        &copy; 随便 {new Date().getFullYear()} <Trans>all right is bull shit</Trans>
      </Typography>
    </Box>
  )
}
