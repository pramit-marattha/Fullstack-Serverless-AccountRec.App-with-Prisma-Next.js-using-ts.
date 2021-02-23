import Head from 'next/head';
import {useSession, signIn,signOut,getSession} from "next-auth/client";
import prisma from '../lib/prisma';
import Link from "next/link";


export default function Home({contacts}) {
  const [session,loading] = useSession();
  if(!session){
    return(
      <div className="prose prose-lg container mx-auto my-20">
        Currently Not Signed-In< br/>
        <button className="rounded-md bg-green-500 py-2 px-3 text-white hover:bg-blue-600" onClick={()=>signIn()}>Sign In</button>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Account Record App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img alt="profile" src={session.user.image} className="w-20 h-20 rounded-full"/>
      <button className="rounded-md bg-red-500 py-2 px-3 text-white hover:bg-red-600" onClick={()=>signOut()}>Sign Out</button>

    <h1 className="text-2xl text-red-500">Account Record</h1>
      <ul>
        {contacts.length === 0 ?(
          <p>You don't have any acoount and contacts</p>
        ) : (
          contacts.map((contact)=>{
            <li key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Number: {contact.number}</p>
            </li>
          })
        )
      }
      </ul>
    </div>
  )
}

export const  getServerSideProps = async ({req,res})=>{
  // const getserverProps = cost inport(async)
  const session = await getSession({req});
  if (!session){
    res.statusCode = 403;
    return {props: {contacts: []}};

  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const contacts = await prisma.contact.findMany({
    where:{
      userId: user.id,
    },
  });
  return {
    props:{
      contacts,
    },
  };

};
