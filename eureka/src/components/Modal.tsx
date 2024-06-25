"use client";

import { useState } from "react";
import "../app/components.css";
import Image from "next/image";
import Button from "./Button";
import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils";
import CheckBox from "./Checkbox";

export default function Modal({ varient, handleCancel }: Readonly<{
    varient: string;
    handleCancel?: Function;
}>) {
    const [idea, setIdea] = useState("");
    const [elaborateIdea, setElaborateIdea] = useState(false);

    function HandleSubmit() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "title" : idea
        });

        const requestOptions:any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://localhost:8080/ideas", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    }
    return <div className="modal-overlay">
        <form className="add-idea-modal flex-column" onSubmit={HandleSubmit}>
            <input type="text" placeholder="Add Idea" onChange={(e) => setIdea(e.target.value)} className="input"/>    
            <div className="modal-options flex-row">
                <div className="flex-row checkbox-cont">
                    <CheckBox checked={elaborateIdea} setChecked={setElaborateIdea} />
                    Elaborate Idea
                </div>
                <div className="flex-row btn-cont">
                    <div>
                      <Button label="Add Idea" handleClick={() => HandleSubmit()} varient="labelled-primary"/>
                    </div>
                    <div>
                      <Button label="Cancel" classes={["button"]} handleClick={handleCancel} varient="labelled-secondary"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
}