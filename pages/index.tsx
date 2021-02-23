import Head from 'next/head';
import {useSession, signIn,signOut,getSession} from "next-auth/client";
import prisma from '../lib/prisma';
import Link from "next/link";


export default function Home({contacts}) {
  const [session,loading] = useSession();
  if(!session){
    return(
      <div className="prose prose-lg container mx-auto my-0 grid justify-items-stretch">
      <img alt="profile" src="https://github.githubassets.com/images/modules/site/social-cards/github-social.png" className="h-96 rounded-full justify-self-center"/>
      <p className="justify-self-center text-2xl text-purple-500">SignIn with github</p>< br/>
        <button className="rounded-md bg-green-500 py-2 px-9 text-white hover:bg-blue-600 justify-self-center" onClick={()=>signIn()}><img alt="profile" src="https://techcrunch.com/wp-content/uploads/2010/07/github-logo.png" className="h-10 rounded-full justify-self-center"/>SignIn</button>
      </div>
    );
  }
  // error checking

  return (
    <div className="grid justify-items-stretch">
      <Head>
        <title>Account Record App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img alt="profile" src={session.user.image} className="w-20 h-30 rounded-full justify-self-center"/>
      <br/>
      <Link href="/create">
        <a className="rounded-md bg-green-500 py-1 px-10 text-white hover:bg-green-600 justify-self-center">
          + Add / Create a new contact info
        </a>
        </Link> 
        <br/>

    <h1 className="text-2xl text-blue-500 justify-self-center">Account Record</h1>
    <br/>
      <ol className="justify-self-center">
        {contacts.length === 0 ? (
          <p className="text-2xl text-red-500">You don't have any account and contacts</p>
        ) : (
          // <div>{contacts.map((yolo)=>console.log("errorChecking",yolo.name))
          
          // }</div>
          // <div>{contacts.map((yolo)=>yolo.name)}</div>
          contacts.map((yolo)=>{
            return (<li className="" key={yolo.id}>              
              <p className="text-2xl text-yellow-500 bg-gradient-to-r from-yellow-100 rounded-md">Full-Name: {yolo.name}</p>
              <p className="text-2xl text-purple-500 bg-gradient-to-r from-purple-100 rounded-md ">Phone-Number: {yolo.number}</p>
              <br/>
            </li>
            )
            {console.log("ghanta",yolo)}
          })
        )
      }
      </ol>
      <br/>
      <br/>
      

      <button className="rounded-md bg-red-500 py-2 px-3 text-white hover:bg-red-700 justify-self-center" onClick={()=>signOut()}>Sign Out</button>

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
