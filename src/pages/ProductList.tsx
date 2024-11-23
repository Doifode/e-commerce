import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

import { ProductList } from "../utils/Constants";
import { Product, ProductVariant } from "../utils/Types";

const ProductListCP: React.FC<{ setShowSelectedProduct: Dispatch<SetStateAction<Product>>, handleAddProductModal: () => void }> = ({ setShowSelectedProduct, handleAddProductModal }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState<{ product: Product; variants: ProductVariant[] }[]>([]);
    const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: boolean }>({});
    const [selectedVariants, setSelectedVariants] = useState<{ [key: number]: boolean }>({});

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Filter products based on the search query
    const filteredProducts = ProductList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
    );

    // Handle product selection toggle
    const handleProductToggle = (productId: number) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    // Handle variant selection toggle
    const handleVariantToggle = (variantId: number) => {
        setSelectedVariants((prev) => ({
            ...prev,
            [variantId]: !prev[variantId],
        }));
    };

    // Add selected products and variants to cart
    const handleAddToCart = () => {
        const productsToAdd = filteredProducts
            .filter((product) => selectedProducts[product.id])
            .map((product) => ({
                product,
                variants: product.variants.filter((variant) => selectedVariants[variant.id]),
            }));
        setCart((prev) => [...prev, ...productsToAdd]);
        setShowSelectedProduct(productsToAdd[0].product)
        handleAddProductModal()
        setSelectedProducts({});
        setSelectedVariants({});
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleSearchChange}
            />
            <List>
                {filteredProducts.map((product) => (
                    <Box key={product.id} sx={{ borderBottom: "1px solid #ddd", mb: 2, pb: 2 }}>
                        <ListItem>
                            <Checkbox
                                checked={!!selectedProducts[product.id]}
                                onChange={() => handleProductToggle(product.id)}
                            />
                            <img
                                src={product.image.src}
                                alt={product.title}
                                style={{ width: "50px", height: "50px", marginRight: "16px" }}
                            />
                            <ListItemText primary={product.title} secondary={`Price: $${product.variants[0].price}`} />
                            <IconButton
                                onClick={() =>
                                    setExpandedProduct((prev) => (prev === product.id ? null : product.id))
                                }
                            >
                                {expandedProduct === product.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </ListItem>
                        <Collapse in={expandedProduct === product.id} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 6 }}>
                                {product.variants.map((variant) => (
                                    <ListItem key={variant.id}>
                                        <Checkbox
                                            checked={!!selectedVariants[variant.id]}
                                            onChange={() => handleVariantToggle(variant.id)}
                                        />
                                        <ListItemText primary={variant.title} secondary={`Price: $${variant.price}`} />
                                    </ListItem>
                                ))}
                            </Box>
                        </Collapse>
                    </Box>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
                Add Selected to Cart
            </Button>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Cart</Typography>
                {cart.length > 0 ? (
                    cart.map(({ product, variants }) => (
                        <Box key={product.id} sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">{product.title}</Typography>
                            {variants.length > 0 ? (
                                variants.map((variant) => (
                                    <Typography key={variant.id} variant="body2">
                                        - {variant.title} (${variant.price})
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body2">No variants selected</Typography>
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">Cart is empty</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProductListCP;
