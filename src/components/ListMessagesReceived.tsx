/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { AuthContext, DEFAULT_COMPLIMENT_DATA } from '../context/AuthContext'
import { ListsComplimetsContext } from '../context/ListsComplimets'
import { ModalIshownContext } from '../context/ModalIsShownContext'
import { TagDataContext } from '../context/TagDataContext'
import { UserDataContext } from '../context/UserDataContext'
import { Compliment, deleteCompliment, Tag } from '../service/Compliment'
import { getUsers, User } from '../service/User'
import '../styles/user-page.scss'
import { ModalCompliments } from './ModalCompliments'

interface ListMessagesProps {
    searchText:string;
    arrayUsers:User[];
    arrayComplimentsReceiver:Compliment[];
    arrayTag:Tag[];
}

interface ComplimentsFiltered{
    compliments:{
        email:string;
        id:string;
    }
}
export default function ListMessagesReceived({searchText, arrayUsers, arrayComplimentsReceiver, arrayTag}:ListMessagesProps){

    //const {getAllComplimentsReceiver } = useContext(ListsComplimetsContext)
    const { users, getAllUsers} = useContext(UserDataContext)
    const { tags, } = useContext(TagDataContext)
    const { userAuthenticated, listComplimentsReceiver, getAllComplimentsReceiver } = useContext(AuthContext)
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
            for(const [, value] of arrayUsers.entries()){
                if(value.id === arrayValue.user_sender){
                    return resultEmailFiltered.push(arrayValue)

                }
            }
        }

       
        for(const [, value] of arrayComplimentsReceiver.entries()){
    
            extractCompliment(value)
          
        }

        console.log(resultEmailFiltered)
         
        const extractValueSenders = (arrayValue:Compliment)=>{
            for(const [, value] of arrayUsers.entries()){
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
            for(const [, value] of arrayComplimentsReceiver.entries()){
                if(value.id === id){
                    setValuesCompliments(value)
                    return handleModalIsShownCompliments()
                }
            }
     }

     async function deleteComplimentId(id:string){
        const complimentDeleted =  resultEmail.filter((compliment) => compliment.compliments.id !== id )
        setResultEmail(complimentDeleted)
        return await deleteCompliment(id)
     }

    useEffect(() => {
        filterUserSender()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        <div className="list-messages">
            {usersSenderFiltered.map((result, index) => {
                return (
                    <>
                    <div className="messages">
                        <p title={result.compliments.email} key={index} onClick={() => {
                           
                           handleShowCompliment(result.compliments.id)
                            }}>
                            {result.compliments.email}
                        </p>
                        <div title='apagar' onClick={()=> deleteComplimentId(result.compliments.id)} className='close-icon'>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    </>
                )
            })}
           {valuesCompliments !== undefined && <ModalCompliments 
            email={arrayUsers.map(user => user.id === valuesCompliments.user_sender && user.email)} 
            tag={arrayTag.map(tag => tag.id === valuesCompliments.tag_id && tag.name)} 
            isShown={complimentModalShown}
            forFrom={'De:'}
            message={valuesCompliments.message}
            />}
             {listComplimentsReceiver.length === 0 && <div className="empty">Vazio</div>}
            </div>
        </>
    )

}


