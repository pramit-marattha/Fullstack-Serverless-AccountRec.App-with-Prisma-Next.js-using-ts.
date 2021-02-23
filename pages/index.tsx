import Head from 'next/head';
import {useSession, signIn,signOut,getSession} from "next-auth/client";
import prisma from '../lib/prisma';

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
    <h1 className="text-6xl text-red-500">Account Record</h1>
    </div>
  )
}

export const getServerSideprops = async ({req,res})=>{
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
