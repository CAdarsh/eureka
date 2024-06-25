"use client";
import Image from "next/image";
import  "./page.css";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import {clsx} from 'clsx'
import font from "../utils/font";
import {useEffect, useState} from "react"; 
import { useRouter } from "next/router";


export default function Home() {
  // const router = useRouter();
  interface IdeaMetaData {
    title: string;
    description?: string;
    _id: string;
  };

  const [showModal, setShowModal] = useState(false);
  const [ideas, setIdeas] = useState<IdeaMetaData[]>([])


  useEffect(() => {
    const requestOptions:any = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://localhost:8080/ideas/metadata", requestOptions)
      .then((response) => response.json())
      .then((result) => setIdeas(result))
      .catch((error) => console.error(error));
  }, [])

  return (
    <main className={clsx('main','flex-row')}>
    <Card classes={["dashboard-card"]} width={"90%"} borderRadius={12}>
      {ideas.length === 0 ? <div className={clsx('idea-placeholder', font.PlaywriteUSModern)}> No ideas discovered!  </div> :
      <div className="idea-card-cont">
        {
          ideas.map((idea, idx) => <>
            <Card key={idx} handleClick={() => { window.location.href = `http://localhost:3000/ideas/${idea._id}` }} classes={["ideas"]} borderRadius={12}>
              <div className="title">
                {idea.title}
              </div>
              <p className="desc">
                {idea.description}
              </p>
            </Card>
          </>)
        }
      </div>}

    </Card>
    <Button handleClick={() => setShowModal(true)} varient={ ideas.length === 0 ? "addidea-empty" : "addidea-filled"} />
    { showModal && <Modal varient="add-idea" handleCancel={() => setShowModal(false)} />}
    </main>
  );
}
