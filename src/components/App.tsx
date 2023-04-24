import React from 'react';
import Canvas from './canvas/Canvas';
import Toolbox from './toolbox/Toolbox';
import Header from './header/Header';
import { Grid, styled } from '@mui/material';
import { TOP_BAR_HEIGHT } from '../constants/App';
import { grey } from '@mui/material/colors';

const MainBody = styled(Grid)({
  height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`, // adjust this value to match your toolbar height
  overflow: 'auto',
  flexGrow: 1,
  marginTop: `${TOP_BAR_HEIGHT}px`,
  boxSizing: 'border-box',
});

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <MainBody container>
        <Grid height="100%" item xs={6} sm={8} md={9} lg={10} xl={11} padding="16px" sx={{backgroundColor: grey[100]}}>
          <Canvas/>
        </Grid>
        <Grid height="100%" item xs={6} sm={4} md={3} lg={2} xl={1}>
          <Toolbox/>
        </Grid>
      </MainBody>
    </>
  );
};

export default App;
