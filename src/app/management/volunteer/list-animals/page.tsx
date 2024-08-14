"use client";
import { Box } from "@mui/material";
import TableComponent, { TableData } from "@/app/components/Table";
import EditForm from "./components/EditForm";
import { animalList, AnimalListResponse } from "@/services/elsa_back/animal/list";

export default function Dashboard(): JSX.Element {
    const handleList = async (page: number): Promise<TableData<AnimalListResponse>> => {
        // Define your logic for listing items
        return await animalList(page);
    }
    const columns: Array<string> = ['id', 'name', 'age', 'breed', 'petType', 'status'];

    return (
        <Box className="mt-10" component="section">
            <TableComponent<AnimalListResponse>
                EditForm={EditForm}
                handleList={handleList}
                columns={columns}
            />
        </Box>
    );
}
