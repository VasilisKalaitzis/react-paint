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
  backgroundColor: grey[100],
});

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <MainBody container>
        <Grid height="100%" item xs={10} sm={11}>
          <Canvas/>
        </Grid>
        <Grid height="100%" item xs={2} sm={1}>
          <Toolbox/>
        </Grid>
      </MainBody>
    </>
  );
};

export default App;
