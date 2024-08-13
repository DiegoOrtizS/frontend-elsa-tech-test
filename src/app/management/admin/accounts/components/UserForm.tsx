import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useGlobalContext } from '@/app/context';
import { TError } from '@/domain/errors/ErrorFactory';
import { InputPasswordReveal } from '@/app/components/Password';
import { register } from '@/services/elsa_back/auth/register/request';

export type ShouldRefreshProps = {
    setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserForm: React.FC<ShouldRefreshProps> = ({ setShouldRefresh }: ShouldRefreshProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("adopter");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        if (password !== repeatPassword) {
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "error",
                message: "Passwords do not match",
            });
            return;
        }

        try {
            setOpenLoading(true);
            await register({
                user: {
                    firstName: firstName,
                    lastName: lastName,
                    email,
                    password,
                },
                role,
            });
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
            <InputPasswordReveal
                placeholder="Password"
                modifyPassword={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setPassword(e.target.value);
                }}
            />
            <InputPasswordReveal
                placeholder="Repeat Password"
                modifyPassword={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setRepeatPassword(e.target.value);
                }}
            />
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

export default UserForm;
