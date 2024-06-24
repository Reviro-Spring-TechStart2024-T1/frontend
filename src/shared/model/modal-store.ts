import { create } from 'zustand';

type ModalType = 'createPost' | 'createPlan';

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  onOpen: type => {
    document.body.style.overflow = 'hidden';
    set({ isOpen: true, type });
  },
  onClose: () => {
    document.body.style.overflow = 'auto';
    set({ isOpen: false, type: null });
  },
}));
