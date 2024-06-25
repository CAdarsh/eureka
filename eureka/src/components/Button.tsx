"use client";
import "../app/components.css";
import { clsx } from "clsx";
import Image  from "next/image";
import font from "../utils/font";


export default function Button({ varient, height, width, borderRadius, classes, label, handleClick }: Readonly<{
    varient: string;
    height?: string| number;
    width?: string| number;
    borderRadius?: string | number;
    classes?: string | string[];
    label?: string;
    handleClick: Function; 
  }>){
    classes =  typeof classes === 'string' ? clsx('Button', classes) : classes ? clsx('Button', ...classes) : clsx('Button'); 
    const addIdea = 
        <div className="btn fixed-btn">
            {varient.split("-")[1] === "empty" &&
            <div className="click-prompt flex-row">
             <div className={font.PlaywriteUSModern}>Click Here</div>
                <Image 
                    className="curve"
                    src="/curve.svg"
                    width={120}
                    height={50}
                    alt="curve"
                />
            </div>}
        <Image
            src="/add-idea.svg"
            width={25}
            height={25}
            alt="Add Idea"
            />
            </div>;
    const labelledButton = <div className={clsx("labelled-btn", varient.split("-")[1])} >
        {label}
    </div>

    const crossButton =    
    <div className="btn cross">    
        <Image
            className="cross-btn"
            src="/add-idea.svg"
            width={25}
            height={25}
            alt="Exit"
            />
    </div>;
         
    return <div onClick={() => handleClick()} className={classes} style={{ height, width, borderRadius }}> 
        {varient.split("-")[0] === "addidea" ? addIdea : varient === "cross" ? crossButton : labelledButton}       
    </div> 
}