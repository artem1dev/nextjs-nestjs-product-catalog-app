'use client';

import styles from './Button.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: Props) {
  const buttonClassName = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}