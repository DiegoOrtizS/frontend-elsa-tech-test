import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useGlobalContext } from '@/app/context';
import { TError } from '@/domain/errors/ErrorFactory';
import { createAdoption } from '@/services/elsa_back/adoption/post';

export type ShouldRefreshProps = {
    setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Form: React.FC<ShouldRefreshProps> = ({ setShouldRefresh }: ShouldRefreshProps) => {
    const [animalId, setAnimalId] = useState("");
    const [volunteerId, setVolunteerId] = useState("");
    const [adopterId, setAdopterId] = useState("");
    const [status, setStatus] = useState("in_progress");

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            await createAdoption({
                animalId,
                volunteerId,
                adopterId,
                status,
            });
            setShouldRefresh((prev) => !prev);

            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Adoption created successfully",
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
                label="Animal ID"
                variant="outlined"
                fullWidth
                margin="normal"
                name="Animal ID"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setAnimalId(e.target.value);
                }}
            />
            <TextField
                label="Volunteer ID"
                variant="outlined"
                fullWidth
                margin="normal"
                name="Volunteer ID"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setVolunteerId(e.target.value);
                }}
            />
            <TextField
                label="Adopter ID"
                variant="outlined"
                fullWidth
                margin="normal"
                name="Adopter ID"
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setAdopterId(e.target.value);
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e: SelectChangeEvent<string>): void => {
                        setStatus(e.target.value);
                    }}
                >
                    <MenuItem value="in_progress">In progress</MenuItem>
                    <MenuItem value="finalized">Finalized</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
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
