import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Link, List, ListItem, Box } from '@mui/material';

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
          <Grid item md={4} xs={12} textAlign="center">
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
          <Grid item md={4} xs={12} textAlign="center">
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
          <Grid item md={4} xs={12} textAlign="center">
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
        <Typography variant="caption">©2023 All Rights Reserved</Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;
