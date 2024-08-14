import React from 'react';
import TableComponent, { TableData } from '@/app/components/Table';
import { adoptionList, AdoptionListResponse } from '@/services/elsa_back/adoption/list';
import { adoptionDelete } from '@/services/elsa_back/adoption/delete';
import Form from './Form';
import EditForm from './EditForm';

const handleDelete = async (id: string): Promise<void> => {
  // Define your logic for deleting an item
  return await adoptionDelete(id);
};

const handleList = async (page: number): Promise<TableData<AdoptionListResponse>> => {
  // Define your logic for listing items
  return await adoptionList(page);
}


const columns: Array<string> = ['animal', 'volunteer', 'adopter', 'status'];

const CrudTable = (): JSX.Element => {
  return (
    <TableComponent<AdoptionListResponse>
      Form={Form}
      EditForm={EditForm}
      handleDelete={handleDelete}
      handleList={handleList}
      columns={columns}
    />
  );
};

export default CrudTable;
