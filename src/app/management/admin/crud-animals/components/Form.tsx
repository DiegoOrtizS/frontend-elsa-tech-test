import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useGlobalContext } from '@/app/context';
import { TError } from '@/domain/errors/ErrorFactory';
import { createAnimal } from '@/services/elsa_back/animal/post';

export type ShouldRefreshProps = {
    setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Form: React.FC<ShouldRefreshProps> = ({ setShouldRefresh }: ShouldRefreshProps) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(1);
    const [petType, setPetType] = useState("cat");
    const [breed, setBreed] = useState("");
    const [status, setStatus] = useState("available");

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            await createAnimal({
                name,
                age,
                breed,
                petType,
                status,
            });
            setShouldRefresh((prev) => !prev);

            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Animal created successfully",
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
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setName(e.target.value);
                }}
            />
            <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                name="age"
                type="number"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setAge(parseInt(e.target.value));
                }}
            />
            <TextField
                label="Breed"
                variant="outlined"
                fullWidth
                margin="normal"
                name="breed"
                type="breed"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setBreed(e.target.value);
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>PetType</InputLabel>
                <Select
                    value={petType}
                    onChange={(e: SelectChangeEvent<string>): void => {
                        setPetType(e.target.value);
                    }}
                >
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="dog">Dog</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e: SelectChangeEvent<string>): void => {
                        setStatus(e.target.value);
                    }}
                >
                    <MenuItem value="adopted">Adopted</MenuItem>
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
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

export default Form;
