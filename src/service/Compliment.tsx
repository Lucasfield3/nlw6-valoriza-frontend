import https from "../utils/https";


export interface NewCompliment {
    tag_id: string;
    user_receiver:string;
    user_sender:string;
    message:string;
}

export interface Compliment {
    id:string;
    user_sender:string;
    user_receiver:string;
    tag_id?:string;
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

    return https
    .post<Compliment>(`/compliments/create/${newCompliment.user_sender}`, newCompliment)
    .then(async(res)=> {
        console.log(res.data);
        return  res.data
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

export async function getComplimentsListSend(id:string):Promise<Compliment[] | any>{


    return await https
    .get<Compliment[]>(`/user/compliments/send/${id}`)
    .then(async(res)=> {
        return res.data
    })
    .catch(err => console.log(err))
    
}

export async function getComplimentsListReceive(id:string):Promise<Compliment[] | any>{

   
   
    return await https
    .get<Compliment[]>(`/user/compliments/receive/${id}`)
    .then(async(res)=> {
        return  res.data 
    })
    .catch(err => console.log(err))
    

}

export async function deleteCompliment(id:string){

    return await https
    .delete(`/remove-compliment/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch(err => console.log(err))

}



