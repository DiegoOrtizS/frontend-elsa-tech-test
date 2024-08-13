import React from 'react';
import TableComponent, { TableData } from '@/app/components/Table';
import { userList, UserListResponse } from '@/services/elsa_back/user/list';
import { userDelete } from '@/services/elsa_back/user/delete';
import { UserForm } from '../../accounts/components';
import UserEditForm from '../../accounts/components/UserEditForm';

const handleDelete = async (id: string): Promise<void> => {
  // Define your logic for deleting an item
  return await userDelete(id);
};

const handleList = async (page: number): Promise<TableData<UserListResponse>> => {
  // Define your logic for listing items
  return await userList(page);
}


const columns: Array<string> = ['id', 'user', 'role'];

const CrudTable = () => {
  return (
    <TableComponent<UserListResponse>
      Form={UserForm}
      EditForm={UserEditForm}
      handleDelete={handleDelete}
      handleList={handleList}
      columns={columns}
    />
  );
};

export default CrudTable;
