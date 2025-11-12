'use client';

import { ReactNode, useEffect } from 'react';
import styles from './Dialog.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export function Dialog({ isOpen, onClose, children, title }: Props) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}