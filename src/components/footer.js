import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Link, List, ListItem, Box } from '@mui/material';
import { Security, Info } from '@mui/icons-material';
import theme from '../assets/images/styles/color';
import { style } from '@mui/system';

const Footer = () => (
  <>
    <Grid sx={{ backgroundColor: '#0A1C3A', color: '#fff' }}>
      <Grid
        container
        justify="center"
        style={{ minHeight: '212px' }}
        maxWidth="lg"
        sx={{ justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}
      >
        <Grid
          container
          item
          lg={12}
          xs={12}
          justify="space-between"
          maxWidth="md"
          sx={{ justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}
        >
          <Grid item lg={4} xs={12}>
            <img src="https://halalcenter.id/uploads/system/af0a991f666ca273ed1d7e56e2f9e415.png" />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Typography paragraph>
              <Box sx={{ mt: 2 }} />
              <h3>
                <span className="header-underline">Useful links</span>
              </h3>
              <List
                sx={{
                  listStyleType: 'none',
                  pl: 2,
                  '& .MuiListItem-root': {
                    display: 'list-item',
                  },
                }}
              >
                <ListItem>
                  <Link href="#" color="#fff" underline="none">
                    Link 1
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" color="#fff" underline="none">
                    Link 2
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" color="#fff" underline="none">
                    Link 3
                  </Link>
                </ListItem>
              </List>
            </Typography>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Typography paragraph>
              <Box sx={{ mt: 2 }} />
              <h3>
                <span className="header-underline">Useful links</span>
              </h3>
              <List
                sx={{
                  listStyleType: 'none',
                  pl: 2,
                  '& .MuiListItem-root': {
                    display: 'list-item',
                  },
                }}
              >
                <ListItem>
                  <Link href="#" color="#fff" underline="none">
                    Link 1
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" color="#fff" underline="none">
                    Link 2
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#" color="#fff" underline="none">
                    Link 3
                  </Link>
                </ListItem>
              </List>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <AppBar
      position="static"
      elevation={0}
      component="footer"
      sx={{ backgroundColor: '#0A1C3A', borderTop: '1px solid #293e61' }}
    >
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="caption">©2023</Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;
