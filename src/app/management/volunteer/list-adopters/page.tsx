"use client";
import { Box } from "@mui/material";
import TableComponent, { TableData } from "@/app/components/Table";
import { userList, UserListResponse } from "@/services/elsa_back/user/list";

export default function Dashboard(): JSX.Element {
    const handleList = async (page: number): Promise<TableData<UserListResponse>> => {
        // Define your logic for listing items
        return await userList(page);
    }
    const columns: Array<string> = ['id', 'user', 'role'];

    return (
        <Box className="mt-10" component="section">
            <TableComponent<UserListResponse>
                handleList={handleList}
                columns={columns}
            />
        </Box>
    );
}
