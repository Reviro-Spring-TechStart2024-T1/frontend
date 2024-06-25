import { create } from 'zustand';

type ModalType =
  | 'createPost'
  | 'createPlan'
  | 'archivePlan'
  | 'unarchivePlan'
  | 'editPlan'
  | 'deletePlan';

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

interface ModalData {
  plan_id?: string;
  title?: string;
  description?: string;
  price?: number;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => {
    document.body.style.overflow = 'hidden';
    set({ isOpen: true, type, data });
  },
  onClose: () => {
    document.body.style.overflow = 'auto';
    set({ isOpen: false, type: null });
  },
}));
