
import { fetchData } from './operations/fetch';
import { insertData } from './operations/insert';
import { updateData } from './operations/update';
import { deleteData } from './operations/delete';
import type { ApiResponse } from './types';

export const secureApi = {
  fetch: fetchData,
  insert: insertData,
  update: updateData,
  delete: deleteData
};

export type { ApiResponse };
export default secureApi;
