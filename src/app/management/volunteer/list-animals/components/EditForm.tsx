import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import { useGlobalContext } from '@/app/context';
import { TError } from '@/domain/errors/ErrorFactory';
import { updateAnimal } from '@/services/elsa_back/animal/patch';
import { ShouldRefreshProps } from '@/app/management/admin/crud-animals/components/Form';

interface EditFormProps extends ShouldRefreshProps {
    item: {
        id: string;
        status: string;
    }
}

export const EditForm: React.FC<EditFormProps> = ({
    item,
    setShouldRefresh,
}: EditFormProps) => {
    const [status, setStatus] = useState(item.status);

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            await updateAnimal(item.id, {
                status,
            });
            setShouldRefresh((prev) => !prev);

            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Animal updated successfully",
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

export default EditForm;
