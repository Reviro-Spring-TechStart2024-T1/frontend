import { useBeverages, useCloseForm, useUsers } from './services/hooks';
import {
  CREATE_BEVERAGE_FORM,
  DELETE_BEVERAGE,
  EDIT_BEVERAGE_FORM,
  NO_INDEX_PAGE,
} from './constants';
import { fetcher } from './helper';
import { addImage, delete as delete_, download, edit } from './icons';
import { beverage, logo } from './imgs';
import {
  CreateModalContextProvider,
  DeleteModalProvider,
  EditModalContextProvider,
  useCreateModal,
  useDeleteModal,
  useEditModal,
} from './providers';

export {
  addImage,
  beverage,
  CREATE_BEVERAGE_FORM,
  CreateModalContextProvider,
  delete_,
  DELETE_BEVERAGE,
  DeleteModalProvider,
  download,
  edit,
  EDIT_BEVERAGE_FORM,
  EditModalContextProvider,
  fetcher,
  logo,
  NO_INDEX_PAGE,
  useBeverages,
  useCloseForm,
  useCreateModal,
  useDeleteModal,
  useEditModal,
  useUsers,
};
