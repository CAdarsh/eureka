"use client";
import  "./page.css";
import Card from "../../../components/Card";
import {clsx} from 'clsx'
import { useEffect, useState } from 'react';
import Button from "../../../components/Button";
import font from "../../../utils/font";
import CheckBox from "../../../components/Checkbox";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from 'next/navigation'


function Page({ params }: { params: { id: string } }) {
    const router = useRouter()
    interface Task {
        name: string;
        selected: boolean;
    };

    interface Idea {
        title: string;
        category?: string;
        description?: string;
        features?: string[];
        tasks?: Task[];
    };

    const [idea, setIdea] = useState<Idea>({
        title: "",
        category: "",
        description: "",
        features: [],
        tasks: []
    })

    useEffect(() => {
        const requestOptions:any = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch(`http://localhost:8080/ideas/${params.id}`, requestOptions)
            .then((response) => {
                if (response.status != 200) {
                    throw Error("invalid slug");
                }
                return response.json()
            }
            )
            .then((result) => {
                console.log(result)
                setIdea(result)
            })
            .catch((error) => {
                console.error(error)
                router.push('/')
            });
    }, [])


    function toggleTask(index: number, state: boolean) {
        setIdea((idea: Idea) => {
            let tasks: Task[] = Array.from(idea.tasks);
            tasks[index].selected =  state;
            return {
                ...idea,
                tasks
            }
        })
    }

    function addFeature() {
        setIdea((idea: Idea) => {
            let features = Array.from(idea.features);
            features.push("__empty__");
            return {
                ...idea,
                features
            }
        })
    }

    function updateFeature(e:any, idx:number) {
        setIdea((idea: Idea) => {
            let features = Array.from(idea.features);
            features[idx] = e.target.value;
            return {
                ...idea,
                features
            }
        })
    }

    function addTask() {
        setIdea((idea: Idea) => {
            let tasks = Array.from(idea.tasks);
            tasks.push({name: "__empty__", selected: false});
            return {
                ...idea,
                tasks
            }
        })
    }

    function updateTask(e:any, idx:number) {
        setIdea((idea: Idea) => {
            let tasks = Array.from(idea.tasks);
            tasks[idx] = {name: e.target.value, selected: false};
            return {
                ...idea,
                tasks
            }
        })
    }

    function updateDescription(e:any) {
        setIdea((idea: Idea) => {
            return {
                ...idea,
                description: e.target.value
            }
        })
    }

    
    function updateTitle(e:any) {
        setIdea((idea: Idea) => {
            return {
                ...idea,
                title: e.target.value
            }
        })
    }

    function submitForm() {
        console.log("SF")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log({idea})
        const raw = JSON.stringify(idea);

        const requestOptions: any = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/ideas/${params.id}`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
    }

    function DeleteIdea() {
        const raw = "";

        const requestOptions:any = {
            method: "DELETE",
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/ideas/${params.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            window.location.href = "http://localhost:3000";
        })
        .catch((error) => console.error(error));


    }

return <>
    <main className={clsx('main','flex-row')}>
    <Card classes={["idea-card", "flex-col"]} width={"90%"} borderRadius={12}>
        <div className="flex-row idea-header">
            <div className={clsx("title")}>
                View / Edit Idea
            </div>
        <Button handleClick={() => {window.location.href = "http://localhost:3000"}}  varient={ "cross"} />
        </div>
        <div className="flex-row">
            <span className="label">Title:</span>  <input placeholder={idea.title} value={idea.title} onChange={(e) => updateTitle(e)} />  
        </div>
        {/* <div>
            Category:  <input placeholder={idea.category} />  
        </div> */}
        <div className="flex-row">
            <span className="label">Description: </span> <textarea className={font.L_Franklin} value={idea.description} placeholder={idea.description} onChange={(e) => updateDescription(e)}/>
        </div>
        <div className="task-list-cont">
            <div>
            <span className="label">Features:</span>
                <div>
                    <ol className="flex-column feature-cont">
                       {
                        idea &&
                        idea.features.map((feature,idx) => {
                            return <li className={clsx("feature-item", feature === "__empty__" && "new-feature")}>
                                {feature === "__empty__" ? <input placeholder="Add Feature" onChange={(e) => updateFeature(e, idx)} /> : <input value={feature} onChange={(e) => updateFeature(e, idx)} />}
                            </li>
                        })
                       }
                       <div className="add-feature" onClick={() => addFeature()}>
                        + add feature
                       </div>
                    </ol>
                </div>
            </div>
            <div className="to-do">
            <span className="label">To-Do:</span>
                <ul className="flex-column task-cont">
                    {
                        idea &&
                        idea.tasks.map((idea,idx) => {
                            return <div className="to-do-item">
                                <CheckBox checked={idea.selected} setChecked={() => toggleTask(idx, !idea.selected)} /> 
                                { idea.name === "__empty__" ? <input placeholder="Add Task" onChange={(e) => updateTask(e, idx)} />: <input value={idea.name} onChange={(e) => updateTask(e, idx)} /> }  
                            </div>
                        })
                       }
                        <div className="add-feature" onClick={() => addTask()}>
                        + add task
                       </div>
                </ul>
            </div>
        </div>
        <div className="idea-footer flex-row">
            <Button label="Update Idea" handleClick={() => submitForm()}  varient="labelled-primary"/>
            <Button label="Delete Idea" handleClick={() => DeleteIdea()} varient="labelled-red"/>
            <Button label="Cancel" classes={["button"]} handleClick={() => {window.location.href = "http://localhost:3000"}} varient="labelled-secondary"/>
        </div>
    </Card>
    </main>
    </>
  }
 
export default Page;