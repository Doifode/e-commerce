import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import DialogBox from '../components/DialogBox';
import ProductListCP from './ProductList';
import { Product } from '../utils/Types';

const ProductPicker = ({ product }: { product: Product }) => {
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>(product)
    const handleAddProductModal = () => {
        setIsAddProductDialogOpen(!isAddProductDialogOpen)
    }
    return (
        <>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <TextField
                            className='br-0'
                            fullWidth
                            value={selectedProduct.title || ""}
                            label="Select Product"
                            placeholder="Enter bundle name"
                            variant="outlined"
                            size="small"
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <EditIcon onClick={handleAddProductModal} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button className='br-0' variant="contained" color="success">
                            Add Discount
                        </Button>
                    </Grid>
                    <Grid xs={9}>
                    </Grid>
                    <Grid xs={3} textAlign={"start"}>
                        <Typography marginLeft={2} component={"a"} className='pointer' onClick={() => {
                            setSelectedProduct({ ...selectedProduct, isShow: !selectedProduct.isShow })
                        }}>{selectedProduct.isShow ? "Hide Variants" : "Show Variants"}</Typography>
                    </Grid>
                </Grid>
                {selectedProduct.isShow ? selectedProduct.variants.map((item, index) => {
                    return < Box className="card w-75 my-2 p-2 br-50"  key={index} > {item.title} </Box >
                }) : ""}

                <DialogBox onClose={handleAddProductModal} open={isAddProductDialogOpen} title='Add Product' >
                    <ProductListCP handleAddProductModal={handleAddProductModal} setShowSelectedProduct={setSelectedProduct}></ProductListCP>
                </DialogBox>
            </Box>
        </>
    );
};

export default ProductPicker;
