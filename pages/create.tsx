import React,{useState} from "react";
import Router from "next/router";

const Create = ()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [number,setNumber] = useState("");
    const onSubmit = async (event) =>{
        event.preventDefault();
        const body ={name,email,number};
        try {
            await fetch("/api/create-contact",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body),
            });
            await Router.push("/");

        } catch (error){
            return error;
        }
    };
    return (
        <div className="prose prose-lg container mx-auto my-40 grid justify-items-stretch">
            <h1 className="justify-self-center text-4xl text-green-500 hover:text-blue-500">Create and save a new account</h1>
            <br/>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-5 justify-self-center">
                <input className="border-2 border-black shadow-sm rounded p-2" autoFocus onChange={(event)=>setName(event.target.value)} placeholder="Name" type="text" value={name}/>
                <input className="border-2 border-black shadow-sm rounded p-2" autoFocus onChange={(event)=>setEmail(event.target.value)} placeholder="Email" type="text" value={email}/>
                <input className="border-2 border-black shadow-sm rounded p-2" autoFocus onChange={(event)=>setNumber(event.target.value)} placeholder="Number" type="number" value={number}/>
                <button className="rounded-md bg-green-500 py-1 px-10 text-white hover:bg-green-600 justify-self-center" type="submit">+ Create</button>
          <button className="rounded-md bg-red-500 py-1 px-10 text-white hover:bg-red-600 justify-self-center" onClick={() => Router.push("/")}>
            Cancel
          </button>
            </form>
        </div>
    )
};

export default Create;
