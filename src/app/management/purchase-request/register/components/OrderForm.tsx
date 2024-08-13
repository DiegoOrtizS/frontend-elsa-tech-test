import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
    name: string;
    quantity: number;
    link: string;
    unit_price: number;
}

interface OrderFormProps {
    onSubmit: (orderData: { products: Product[], supplier: number }) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [supplierId, setSupplierId] = useState<number>(0);

    const calculateTotalPrice = (): number => {
        return products.reduce((total, product) => total + (product.quantity * product.unit_price), 0);
    };

    const handleAddProduct = (): void => {
        const newProduct: Product = {
            name: 'test',
            quantity: 1,
            link: 'https://test.com',
            unit_price: 1
        };
        setProducts([...products, newProduct]);
    };

    const handleProductChange = (index: number, field: keyof Product, value: string | number): void => {
        const updatedProducts = [...products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: value
        };
        setProducts(updatedProducts);
    };

    const handleRemoveProduct = (index: number): void => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const handleSubmit = (): void => {
        onSubmit({ products, supplier: supplierId });
    };

    return (
        <Paper elevation={3} className="p-6">
            <Typography variant="h6" gutterBottom>
                Order Form
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Supplier ID"
                        variant="outlined"
                        fullWidth
                        value={supplierId}
                        onChange={(e): void => setSupplierId(Number(e.target.value))}
                    />
                </Grid>
                {products.map((product, index) => (
                    <Grid container item spacing={2} key={index}>
                        <Grid item xs={4}>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                value={product.name}
                                onChange={(e): void => handleProductChange(index, 'name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Quantity"
                                variant="outlined"
                                type="number"
                                fullWidth
                                value={product.quantity}
                                onChange={(e): void => handleProductChange(index, 'quantity', Number(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Link"
                                variant="outlined"
                                fullWidth
                                value={product.link}
                                onChange={(e): void => handleProductChange(index, 'link', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Unit Price"
                                variant="outlined"
                                type="number"
                                fullWidth
                                value={product.unit_price}
                                onChange={(e): void => handleProductChange(index, 'unit_price', Number(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="delete" onClick={(): void => handleRemoveProduct(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        Total Price: {calculateTotalPrice()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Order
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderForm;
