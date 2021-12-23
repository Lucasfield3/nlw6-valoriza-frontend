/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { ListsComplimetsContext } from '../context/ListsComplimets'
import { UserDataContext } from '../context/UserDataContext'
import { Compliment } from '../service/Compliment'
import { User } from '../service/User'
import '../styles/user-page.scss'

interface ArrayFilteredUser {
    user:{ id: string; email: string };
   
} 

interface ArrayFilteredUserReceiver {
    userReceiverId:{user_receiver:string};
}

interface ResultArray {
    email: string;
}

interface ArrayMerge {
    
    id:string;
    email: string;
    user_receiver:string;
    
}



export default function ListMessages(){

    const { listComplimentsSend, getAllComplimentsSend } = useContext(ListsComplimetsContext)
    const { users, getAllUsers } = useContext(UserDataContext)
    const [ resultEmail, setResultEmail ] = useState<string[]>([])


    // function valueArray(valueUsers:User[], valueCompliments:Compliment[]): User[] | Compliment[] {  
    //     return (valueUsers).concat(valueCompliments);  
    // }
    let finalResult:string[] = [''];

    function filterUserSender(){
        let userExtract:string[] = users.map((user) => {
            return user.id
          } )
        let userReceiverExtract:string[] = listComplimentsSend.map((usersReceiver)=>{
            return usersReceiver.user_receiver
        })

        let userReceiverEmailFiltered:string[] = userExtract.concat(userReceiverExtract)

        console.log(userReceiverEmailFiltered)
        let resultEmail:string[] = [''];

        for(var i = 0; i < userReceiverEmailFiltered.length; i ++ ){
            console.log(i)
            if(userExtract[i] === userReceiverExtract[i]){
                resultEmail.push(userReceiverEmailFiltered[i]);
                console.log(resultEmail[i])
            }
            if(userExtract[i] === undefined || userReceiverExtract[i] === undefined){
                 continue;
            }

        }

        console.log(resultEmail)
       
        for(var x = 0; x < users.length; x ++ ){
            console.log(x)
            if(resultEmail[x] === users[x].id){
                finalResult.push(users[x].email);
                console.log(users[x])
            }
            if(resultEmail[x] === undefined || users[x] === undefined){
                 continue;
            }

        }

        setResultEmail(finalResult)
        console.log(finalResult)

    }

    useEffect(() => {
        getAllComplimentsSend()
        getAllUsers()
        filterUserSender()
    }, [])

    return(
        <>
        <div className="list-messages">
            {resultEmail && resultEmail.map((result) => {
                return (
                    <>
                        <p>{result}</p>
                    </>
                )
            })}
            </div>
        </>
    )

}