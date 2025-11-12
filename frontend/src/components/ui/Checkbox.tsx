'use client';

import styles from './Checkbox.module.scss';
import { InputHTMLAttributes, useId } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ label, id: providedId, ...props }: Props) {
  const fallbackId = useId();
  
  const id = providedId || fallbackId;

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        {...props}
      />
      {label}
    </label>
  );
}