/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { ListsComplimetsContext } from '../context/ListsComplimets'
import { UserDataContext } from '../context/UserDataContext'
import '../styles/user-page.scss'




export default function ListMessages(){

    const { listComplimentsSend, getAllComplimentsSend } = useContext(ListsComplimetsContext)
    const { users, getAllUsers } = useContext(UserDataContext)
    const [ resultEmail, setResultEmail ] = useState<string[]>([])
    

    let finalResult:string[] = [''];
    let resultEmailFiltered:string[] = [''];
    function filterUserSender(){
        let userExtract:string[] = users.map((user) => {
            return user.id
          } )
        let userReceiverExtract:string[] = listComplimentsSend.map((usersReceiver)=>{
            return usersReceiver.user_receiver
        })
        
        const extractValueIds = (arrayValue:string)=>{
            for(const [, value] of userExtract.entries()){
                if(value === arrayValue){
                    return resultEmailFiltered.push(value)
                     // setResultEmail([...resultEmail, {
                    //     user_receiver:value
                    // }])
                }
            }
        }

        console.log(resultEmailFiltered)

        for(const [, value] of userReceiverExtract.entries()){
    
            extractValueIds(value)
          
        }

         
        const extractValueEmails = (arrayValue:string)=>{
            for(const [, value] of users.entries()){
                if(value.id === arrayValue){
                    return finalResult.push(value.email)
                    // setResultEmail([...resultEmail, {
                    //     email:value.email
                    // }])
                
                }
            }
        }

     
       
        for(const [, value] of resultEmailFiltered.entries()){

            extractValueEmails(value)

        }

        setResultEmail(finalResult)
        console.log(resultEmail)
        // console.log(finalResult)

    }

  

    useEffect(() => {
        getAllComplimentsSend()
        getAllUsers()
        filterUserSender()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        <div className="list-messages">
            {resultEmail && resultEmail.map((result, index) => {
                return (
                    <>
                        <p key={index} onClick={(e) => {
                            console.log(listComplimentsSend[index - 1])
                        }}>{result}</p>
                    </>
                )
            })}
            </div>
        </>
    )

}