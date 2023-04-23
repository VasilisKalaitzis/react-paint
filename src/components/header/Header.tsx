import { AppBar, Toolbar, Typography } from '@mui/material';
import { TOP_BAR_HEIGHT } from '../../constants/App';

const Canvas = () => (
    <AppBar position="fixed" sx={{height: TOP_BAR_HEIGHT, backgroundColor: 'white', color: 'black'}}>
        <Toolbar>
        <Typography variant="h6">Paint Sudio</Typography>
        </Toolbar>
    </AppBar>
);

export default Canvas;


