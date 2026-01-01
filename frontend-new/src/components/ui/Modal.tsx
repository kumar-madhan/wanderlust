import { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative rounded-lg bg-white p-6 dark:bg-dark-card">
        <button
          onClick={onClose}
          className="absolute right-3 top-2 text-lg"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
