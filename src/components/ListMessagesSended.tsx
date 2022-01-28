/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { AuthContext, DEFAULT_COMPLIMENT_DATA } from '../context/AuthContext'
import { ModalIshownContext } from '../context/ModalIsShownContext'
import { TagDataContext } from '../context/TagDataContext'
import { UserDataContext } from '../context/UserDataContext'
import { Compliment } from '../service/Compliment'
import '../styles/user-page.scss'
import { ModalCompliments } from './ModalCompliments'

interface ListMessagesProps {
    searchText:string;
}

interface ComplimentsFiltered{
    compliments:{
        email:string;
        id:string;
       
    }
}
export default function ListMessagesSended({searchText}:ListMessagesProps){

    const { users } = useContext(UserDataContext)
    const { tags, } = useContext(TagDataContext)
    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)
    const { userAuthenticated, listComplimentsSend } = useContext(AuthContext)
    const [ resultEmail, setResultEmail ] = useState<ComplimentsFiltered[]>([])
    const [ valuesCompliments, setValuesCompliments ] = useState<Compliment>()
  

    let finalResult:ComplimentsFiltered[] = [{compliments:{email:'', id:''}}];
    let resultEmailFiltered:Compliment[] = [{
        created_at:new Date(),
        id:'',
        message:'',
        tag_id:'',
        user_receiver:'',
        user_sender:''
    }];
    function filterUserReceiver(){
        const extractCompliment = (arrayValue:Compliment)=>{
            for(const [, value] of users.entries()){
                if(value.id === arrayValue.user_receiver){
                    return resultEmailFiltered.push(arrayValue)

                }
            }
        }

       
        for(const [, value] of listComplimentsSend.entries()){
    
            extractCompliment(value)
          
        }

        console.log(resultEmailFiltered)
         
        const extractValueReceivers = (arrayValue:Compliment)=>{
            for(const [, value] of users.entries()){
                if(value.id === arrayValue.user_receiver){
                    return finalResult.push({compliments:{email:value.email, id:arrayValue.id}})
                }
            }
        }

        for(const [, value] of resultEmailFiltered.entries()){

            extractValueReceivers(value)

        }

        finalResult.shift()
        setResultEmail(finalResult)
        console.log(resultEmail)

    }


    let usersReceiverFiltered = resultEmail.filter(compliment =>{
        if(resultEmail){
             return compliment.compliments.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
         }
     })

     function handleShowCompliment(id:string){
        for(const [, value] of listComplimentsSend.entries()){
            if(value.id === id){
                setValuesCompliments(value)
                return handleModalIsShownCompliments()
            }
        }

     }

    useEffect(() => {
        if(listComplimentsSend !== [DEFAULT_COMPLIMENT_DATA]){
            filterUserReceiver()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        {userAuthenticated && <div className="list-messages">
            {usersReceiverFiltered.map((result, index) => {
                return (
                    <>
                        <p  key={index} onClick={() => {
                            handleShowCompliment(result.compliments.id)
                            }}>
                            {result.compliments.email}
                        </p>
                    </>
                )
            })}
            {valuesCompliments !== undefined &&<ModalCompliments 
            email={users.map(user => user.id === valuesCompliments.user_receiver && user.email)} 
            tag={tags.map(tag => tag.id === valuesCompliments.tag_id && tag.name)} 
            isShown={complimentModalShown}
            forFrom={'Para:'}
            message={valuesCompliments.message}
            />}
            </div>}
        </>
    )

}


