import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useGlobalContext } from '@/app/context';
import { TError } from '@/domain/errors/ErrorFactory';
import { updateUser } from '@/services/elsa_back/user/patch';
import { ShouldRefreshProps } from './UserForm';

interface UserEditFormProps extends ShouldRefreshProps {
    item: {
        user: {
            firstName: string;
            lastName: string;
            email: string;
            isActive: string;
        };
        role: string;
        id: string;
    }
}

export const UserEditForm: React.FC<UserEditFormProps> = ({
    item,
    setShouldRefresh,
}: UserEditFormProps) => {
    const [firstName, setFirstName] = useState(item.user.firstName);
    const [lastName, setLastName] = useState(item.user.lastName);
    const [role, setRole] = useState(item.role);
    const [email, setEmail] = useState(item.user.email);
    const [isActive, setIsActive] = useState(item.user.isActive);

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            const newEmail = (email === item.user.email) ? undefined : email;
            const isActiveFlag = (isActive === item.user.isActive) ? undefined : isActive;
            console.log(item.id);
            await updateUser(item.id, {
                user: {
                    firstName: firstName,
                    lastName: lastName,
                    email: newEmail,
                },
                role,
                isActiveFlag,
            });
            console.log('User updated successfully');
            setShouldRefresh((prev) => !prev);

            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "User created successfully",
            });
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message,
                });
            }
        } finally {
            setOpenLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={async (e: React.FormEvent<Element>): Promise<void> => {
                e.preventDefault();
                await submitForm();
            }}
            sx={{
                padding: '20px',
            }}
        >
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                margin="normal"
                name="firstName"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setFirstName(e.target.value);
                }}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                margin="normal"
                name="lastName"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setLastName(e.target.value);
                }}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                margin="normal"
                name="email"
                type="email"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setEmail(e.target.value);
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                    value={role}
                    onChange={(e: SelectChangeEvent<string>): void => {
                        setRole(e.target.value);
                    }}
                >
                    <MenuItem value="adopter">Adopter</MenuItem>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Active</InputLabel>
                <Select
                    value={isActive}
                    onChange={(e: SelectChangeEvent<string>): void => {
                        setIsActive(e.target.value);
                    }}
                >
                    <MenuItem value={"true"}>Yes</MenuItem>
                    <MenuItem value={"false"}>No</MenuItem>
                </Select>
            </FormControl>
            <Button
                fullWidth
                type="submit"
                variant="contained"
                className="my-3"
            >
                Submit
            </Button>
        </Box>
    );
};

export default UserEditForm;
