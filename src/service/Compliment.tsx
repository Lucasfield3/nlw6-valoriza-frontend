import https from "../utils/https";

export interface NewCompliment {
    tag_id: string;
    user_receiver:string;
    message:string;
}

interface Compliment {
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

interface Tag {
    id: string;
    name: string;
    created_at:Date;
    updated_at:Date;
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