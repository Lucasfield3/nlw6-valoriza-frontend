import https from "../utils/https";

export interface NewCompliment {
    tag_id: string;
    user_receiver:string;
    message:string;
}

export interface Compliment {
    id:string;
    user_sender:string;
    user_receiver:string;
    tag_id:string;
    message:string;
    created_at:Date;
}

export interface NewTag {
    name: string;
}

export interface Tag {
    id: string;
    name: string;
    created_at:Date;
    updated_at:Date;
    custom_name:string;
}

export async function createCompliment(newCompliment:NewCompliment){

    console.log(newCompliment);

    return https
    .post<Compliment>('/compliments', newCompliment)
    .then(async(res)=> {
        return await res.data
    })
    .catch(err => console.log(err))

}

export async function createTag(newTag:NewTag){

    
    return https
    .post<Tag>('/tags', newTag)
    .then(async(res)=> {
        console.log(res.data)
        return await res.data
    })
    .catch(err => console.log(err))

}

export async function getTags():Promise<Tag[] | any>{

    return https
    .get('/tags')
    .then(async(res)=> {
        return await res.data as Tag[]
    })
    .catch(err => console.log(err))

}

export async function getComplimentsListSend():Promise<Compliment[]>{

    return https
    .get('/user/compliments/send')
    .then(async(res)=> {
        return await res.data as Compliment[] | any
    })
    .catch(err => console.log(err))

}

export async function getComplimentsListReceive():Promise<Compliment[] | any>{

    return https
    .get('/user/compliments/receive')
    .then(async(res)=> {
        return await res.data as Compliment[] | any
    })
    .catch(err => console.log(err))

}