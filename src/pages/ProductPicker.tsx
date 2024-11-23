import { Close } from '@mui/icons-material';
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
import { Product } from '../utils/Types';
import ProductListCP from './ProductList';

const ProductPicker = ({ product }: { product: Product }) => {
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>(product)
    const handleAddProductModal = () => {
        setIsAddProductDialogOpen(!isAddProductDialogOpen)
    }
    const handleVariants = (id: number) => {
        const variants = selectedProduct.variants.filter((_, index) => index !== id)
        setSelectedProduct({ ...selectedProduct, variants })
    }
    console.log(selectedProduct, "selectedProduct")
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
                        <Typography hidden={(selectedProduct?.variants[0]?.id === 0) || (selectedProduct.variants.length === 0)} marginLeft={2} component={"a"} className='pointer' onClick={() => {
                            setSelectedProduct({ ...selectedProduct, isShow: !selectedProduct?.isShow })
                        }}>{selectedProduct?.isShow ? "Hide Variants" : "Show Variants"}</Typography>
                    </Grid>
                </Grid>
                {selectedProduct?.isShow ? selectedProduct?.variants?.map((item, index) => {
                    return <div key={index} className='d-flex justify-content-space-between align-items-center'>
                        <Box className="card w-75 my-2 p-2 br-50" key={index} > {item?.title}  </Box >
                        <Close onClick={() => handleVariants(index)} className='pointer'> </Close>
                    </div>
                }) : ""}

                <DialogBox onClose={handleAddProductModal} open={isAddProductDialogOpen} title='Add Product' >
                    <ProductListCP handleAddProductModal={handleAddProductModal} setShowSelectedProduct={setSelectedProduct}></ProductListCP>
                </DialogBox>
            </Box >
        </>
    );
};

export default ProductPicker;
