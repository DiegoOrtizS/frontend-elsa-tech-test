import React, { useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemText,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    SelectChangeEvent,
} from '@mui/material';
import { PurchaseRequestGetResponse } from '@/services/elsa_back/purchase-request/get/response';
import { patchPurchaseRequest } from '@/services/elsa_back/purchase-request/patch/request';
import { TError } from '@/domain/errors/ErrorFactory';
import { useGlobalContext } from '@/app/context';
import { Product } from '@/services/elsa_back/purchase-request/create/payload';

interface PurchaseRequestsGridProps {
    purchaseRequests: PurchaseRequestGetResponse[];
    refetchData: () => Promise<void>;
}

export const PurchaseRequestsGrid: React.FC<PurchaseRequestsGridProps> = ({ purchaseRequests, refetchData }) => {
    const [requests, setRequests] = useState<PurchaseRequestGetResponse[]>(purchaseRequests);
    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    useEffect(() => {
        setRequests(purchaseRequests);
    }, [purchaseRequests]);

    const handleStatusChange = (event: SelectChangeEvent<string>, index: number): void => {
        const newStatus = event.target.value;
        const updatedRequests = [...requests];
        updatedRequests[index].status = newStatus;
        setRequests(updatedRequests);
    };

    const handleSubmit = async (id: number, status: string): Promise<void> => {
        if (status === 'pending') {
            return;
        }
        try {
            setOpenLoading(true);
            await patchPurchaseRequest(id, status);
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Solicitud de compra actualizada correctamente"
            });
            await refetchData();
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
            }
        } finally {
            setOpenLoading(false);
        }
    };

    return (
        <Grid container spacing={3}>
            {requests.map((request, index) => (
                <Grid item xs={12} key={index}>
                    <Paper elevation={3} className="p-6">
                        <Typography variant="h6" gutterBottom>
                            Purchase Request #{index + 1}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader title="Products" />
                                    <CardContent>
                                        {request.products.length > 0 ? (
                                            <List>
                                                {request.products.map((product, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <ListItem>
                                                            <ListItemText primary={`Product Name: ${product.name}`} />
                                                            <ListItemText primary={`Quantity: ${product.quantity}`} />
                                                            <ListItemText primary={`Unit Price: $${product.unit_price}`} />
                                                        </ListItem>
                                                        <Divider />
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        ) : (
                                            <Typography variant="body1">No products added.</Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader title="Status" />
                                    <CardContent>
                                        <FormControl fullWidth>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                value={request.status}
                                                onChange={(event): void => handleStatusChange(event, index)}
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="approved">Approved</MenuItem>
                                                <MenuItem value="rejected">Rejected</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(): Promise<void> => handleSubmit(request.id, request.status)}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader title="Total" />
                                    <CardContent>
                                        <Typography variant="body1">
                                            Total: ${calculateTotal(request.products)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

const calculateTotal = (products: Product[]): string => {
    let total = 0;
    products.forEach((product) => {
        total += product.quantity * product.unit_price;
    });
    return total.toFixed(2);
};

export default PurchaseRequestsGrid;
