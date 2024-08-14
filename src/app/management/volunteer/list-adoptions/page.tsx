"use client";
import { Box } from "@mui/material";
import TableComponent, { TableData } from "@/app/components/Table";
import { adoptionList, AdoptionListResponse } from "@/services/elsa_back/adoption/list";

export default function Dashboard(): JSX.Element {
    const handleList = async (page: number): Promise<TableData<AdoptionListResponse>> => {
        // Define your logic for listing items
        return await adoptionList(page);
    }
    const columns: Array<string> = ['animal', 'volunteer', 'adopter', 'status'];

    return (
        <Box className="mt-10" component="section">
            <TableComponent<AdoptionListResponse>
                handleList={handleList}
                columns={columns}
            />
        </Box>
    );
}
