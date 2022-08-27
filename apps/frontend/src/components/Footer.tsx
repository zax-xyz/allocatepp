import React from 'react';

import { Box, Container, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ marginTop: 'auto' }}>
      <Divider />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 4,
            height: '50px'
          }}
        >
          <Typography color="text.secondary" variant="body2">
            © {year} SYNCS Hack - Angella Pham, Grace Kan, Maxwell Phillips, Michael Vo, Mun Joon Teo
            and Raiyan Ahmed
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              color="text.secondary"
              href="https://github.com/zaxutic/allocatepp"
              target="_blank"
              underline="none"
              variant="body2"
            >
              <IconButton aria-label="GitHub">
                <GitHub />
              </IconButton>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
