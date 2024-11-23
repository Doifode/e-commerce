import { Box, Button, Grid } from "@mui/material"
import { useState } from "react"
import { DefaultProduct, ShowProduct } from "../utils/Types"
import ProductPicker from "./ProductPicker"

const AddProductForm = () => {
    const [showProductArray, setShowProductArray] = useState<ShowProduct[]>([])
    const handleProductAdd = () => {
        const ShowProduct: ShowProduct = { product: DefaultProduct, productName: "" }
        setShowProductArray([...showProductArray, ShowProduct])
    }
    return (
        < >{
            showProductArray.map((product: ShowProduct, index: number) => {
                return <ProductPicker product={product.product} key={index} />
            })
        }
            <Box sx={{ my: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>

                    </Grid>
                    <Grid item xs={3}>
                        <Button className='add-product-btn br-0' onClick={handleProductAdd} variant="contained" color="success">
                            Add Product
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default AddProductForm