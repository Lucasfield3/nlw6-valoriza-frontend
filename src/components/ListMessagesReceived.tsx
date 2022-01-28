/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { AuthContext, DEFAULT_COMPLIMENT_DATA } from '../context/AuthContext'
import { ListsComplimetsContext } from '../context/ListsComplimets'
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
export default function ListMessagesReceived({searchText}:ListMessagesProps){

    const {getAllComplimentsReceiver } = useContext(ListsComplimetsContext)
    const { users} = useContext(UserDataContext)
    const { tags, } = useContext(TagDataContext)
    const { userAuthenticated, listComplimentsReceiver } = useContext(AuthContext)
    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)
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
    function filterUserSender(){

        const extractCompliment = (arrayValue:Compliment)=>{
            for(const [, value] of users.entries()){
                if(value.id === arrayValue.user_sender){
                    return resultEmailFiltered.push(arrayValue)

                }
            }
        }

       
        for(const [, value] of listComplimentsReceiver.entries()){
    
            extractCompliment(value)
          
        }

        console.log(resultEmailFiltered)
         
        const extractValueSenders = (arrayValue:Compliment)=>{
            for(const [, value] of users.entries()){
                if(value.id === arrayValue.user_sender){
                    return finalResult.push({compliments:{email:value.email, id:arrayValue.id}})
                }
            }
        }

        for(const [, value] of resultEmailFiltered.entries()){

            extractValueSenders(value)

        }

        finalResult.shift()
        setResultEmail(finalResult)
        console.log(resultEmail)

    }


    let usersSenderFiltered = resultEmail.filter(compliment =>{
        if(resultEmail){
             return compliment.compliments.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
         }
     })

     function handleShowCompliment(id:string){
         if(tags.length > 0){
             for(const [, value] of listComplimentsReceiver.entries()){
                 if(value.id === id){
                     setValuesCompliments(value)
                     return handleModalIsShownCompliments()
                 }
             }
         }

     }

    useEffect(() => {
        if(listComplimentsReceiver !== [DEFAULT_COMPLIMENT_DATA]){
            filterUserSender()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        {listComplimentsReceiver && <div className="list-messages">
            {usersSenderFiltered.map((result, index) => {
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
           {valuesCompliments !== undefined && <ModalCompliments 
            email={users.map(user => user.id === valuesCompliments.user_sender && user.email)} 
            tag={tags.map(tag => tag.id === valuesCompliments.tag_id && tag.name)} 
            isShown={complimentModalShown}
            forFrom={'De:'}
            message={valuesCompliments.message}
            />}
            </div>}
        </>
    )

}


