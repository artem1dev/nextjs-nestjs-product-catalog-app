'use client';

import styles from './Input.module.scss';
import { InputHTMLAttributes, ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export function Input({ icon, className = '', ...props }: Props) {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        className={styles.input}
        style={{ paddingLeft: icon ? '2.25rem' : '0.75rem' }}
        {...props}
      />
    </div>
  );
}