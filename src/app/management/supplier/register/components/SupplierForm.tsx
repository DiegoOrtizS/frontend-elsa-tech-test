import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Divider, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Address {
    address_line: string;
    district: string;
    province: string;
    department: string;
    country: string;
    postal_code: string;
}

export interface Contact {
    contact_type: string;
    contact_info: string;
}

export interface SupplierDataProps {
    name: string;
    last_name: string;
    addresses: Address[];
    contacts: Contact[];
}

interface SupplierFormProps {
    onSubmit: (supplierData: SupplierDataProps) => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [addresses, setAddresses] = useState<Address[]>([
        {
            address_line: '',
            district: '',
            province: '',
            department: '',
            country: '',
            postal_code: ''
        }
    ]);
    const [contacts, setContacts] = useState<Contact[]>([
        {
            contact_type: '',
            contact_info: ''
        }
    ]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        type: 'address' | 'contact',
        field: keyof Address | keyof Contact
    ): void => {
        const value = event.target.value;
        if (type === 'address') {
            const updatedAddresses = addresses.map((addr, i) =>
                i === index ? { ...addr, [field]: value } : addr
            );
            setAddresses(updatedAddresses);
        } else if (type === 'contact') {
            const updatedContacts = contacts.map((contact, i) =>
                i === index ? { ...contact, [field]: value } : contact
            );
            setContacts(updatedContacts);
        }
    };

    const handleAddAddress = (): void => {
        const newAddress: Address = {
            address_line: '',
            district: '',
            province: '',
            department: '',
            country: '',
            postal_code: ''
        };
        setAddresses([...addresses, newAddress]);
    };

    const handleAddContact = (): void => {
        const newContact: Contact = {
            contact_type: '',
            contact_info: ''
        };
        setContacts([...contacts, newContact]);
    };

    const handleRemoveAddress = (index: number): void => {
        if (addresses.length > 1) {
            const updatedAddresses = [...addresses];
            updatedAddresses.splice(index, 1);
            setAddresses(updatedAddresses);
        }
    };

    const handleRemoveContact = (index: number): void => {
        if (contacts.length > 1) {
            const updatedContacts = [...contacts];
            updatedContacts.splice(index, 1);
            setContacts(updatedContacts);
        }
    };

    const handleSubmit = (): void => {
        onSubmit({ name, last_name: lastName, addresses, contacts });
    };

    return (
        <Paper elevation={3} className="p-6">
            <Typography variant="h6" gutterBottom>
                Supplier Form
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">User Data</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e): void => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={(e): void => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Addresses</Typography>
                    <Divider />
                </Grid>
                {addresses.map((address, index) => (
                    <Grid container item spacing={2} key={index}>
                        <Grid item xs={6}>
                            <TextField
                                label="Address Line"
                                variant="outlined"
                                fullWidth
                                value={address.address_line}
                                onChange={(e): void => handleInputChange(e, index, 'address', 'address_line')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="District"
                                variant="outlined"
                                fullWidth
                                value={address.district}
                                onChange={(e): void => handleInputChange(e, index, 'address', 'district')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Province"
                                variant="outlined"
                                fullWidth
                                value={address.province}
                                onChange={(e): void => handleInputChange(e, index, 'address', 'province')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Department"
                                variant="outlined"
                                fullWidth
                                value={address.department}
                                onChange={(e): void => handleInputChange(e, index, 'address', 'department')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Country"
                                variant="outlined"
                                fullWidth
                                value={address.country}
                                onChange={(e): void => handleInputChange(e, index, 'address', 'country')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Postal Code"
                                variant="outlined"
                                fullWidth
                                value={address.postal_code}
                                onChange={(e): void => handleInputChange(e, index, 'address', 'postal_code')}
                            />
                        </Grid>
                        {index > 0 && (
                            <Grid item xs={1}>
                                <IconButton aria-label="delete" onClick={(): void => handleRemoveAddress(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddAddress}>
                        Add Address
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Contacts</Typography>
                    <Divider />
                </Grid>
                {contacts.map((contact, index) => (
                    <Grid container item spacing={2} key={index}>
                        <Grid item xs={6}>
                            <TextField
                                select
                                label="Contact Type"
                                variant="outlined"
                                fullWidth
                                value={contact.contact_type}
                                onChange={(e): void => handleInputChange(e, index, 'contact', 'contact_type')}
                            >
                                <MenuItem value="phone">Phone</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Contact Info"
                                variant="outlined"
                                fullWidth
                                value={contact.contact_info}
                                onChange={(e): void => handleInputChange(e, index, 'contact', 'contact_info')}
                            />
                        </Grid>
                        {index > 0 && (
                            <Grid item xs={1}>
                                <IconButton aria-label="delete" onClick={(): void => handleRemoveContact(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddContact}>
                        Add Contact
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Supplier
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SupplierForm;
