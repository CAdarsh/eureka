import react, { useState } from "react";
import "../app/components.css";
import { clsx } from "clsx";

export default function Card({ children, height, width, borderRadius, classes, handleClick }: Readonly<{
  children: React.ReactNode;
  height?: string| number;
  width?: string| number;
  borderRadius?: string | number;
  classes?: string | string[];
  handleClick?: Function;
}>) {
  classes =  typeof classes === 'string' ? clsx('Card', classes) : classes ? clsx('Card', ...classes) : clsx('Card'); 
  return <div className={classes} onClick={() => { handleClick && handleClick() }} style={{ height, width, borderRadius }}>{children}</div>;
}
