import prisma from "../../lib/prisma";
import {getSession} from"next-auth/client";

export default async function(req,res) {
    const {name,number,email} = req.body;
    const session = await getSession({req})

    const user = await prisma.user.findUnique({
        where:{
            email:session.user.email,
        },
    });
    console.log(user)
    const result = await prisma.contact.create({
        data:{
            email:email,
            name:name,
            number:number,
            userId:user.id,
        },
    });
    return res.json(result);
}