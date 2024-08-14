import React from 'react';
import TableComponent, { TableData } from '@/app/components/Table';
import { animalList, AnimalListResponse } from '@/services/elsa_back/animal/list';
import { animalDelete } from '@/services/elsa_back/animal/delete';
import EditForm from './EditForm';
import Form from './Form';

const handleDelete = async (id: string): Promise<void> => {
  // Define your logic for deleting an item
  return await animalDelete(id);
};

const handleList = async (page: number): Promise<TableData<AnimalListResponse>> => {
  // Define your logic for listing items
  return await animalList(page);
}


const columns: Array<string> = ['id', 'name', 'age', 'breed', 'petType', 'status'];

const CrudTable = (): JSX.Element => {
  return (
    <TableComponent<AnimalListResponse>
      Form={Form}
      EditForm={EditForm}
      handleDelete={handleDelete}
      handleList={handleList}
      columns={columns}
    />
  );
};

export default CrudTable;
