import {
    Box,
    Typography
} from '@mui/material';

const Header = () => {
    return (
        <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5" gutterBottom>
                Offer Funnel
            </Typography>
            <Typography variant="body2" className='link'>
                Support | Talk to Expert
            </Typography>
        </Box>
    );
};

export default Header;
