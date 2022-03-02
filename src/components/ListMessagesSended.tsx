/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ModalIshownContext } from '../context/ModalIsShownContext'
import { DEFAULT_TAG_ID } from '../pages/Home'
import { Compliment, deleteCompliment, Tag } from '../service/Compliment'
import { User } from '../service/User'
import '../styles/user-page.scss'
import { ModalCompliments } from './ModalCompliments'

interface ListMessagesProps {
    searchText:string;
    arrayUsers:User[];
    arrayComplimentsSend:Compliment[];
    arrayTag:Tag[];
}

interface ComplimentsFiltered{
    compliments:{
        email:string;
        id:string;
       
    }
}
export default function ListMessagesSended({searchText, arrayUsers, arrayComplimentsSend, arrayTag}:ListMessagesProps){

    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)
    const {  listComplimentsSend, getAllComplimentsSend } = useContext(AuthContext)
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
            for(const [, value] of arrayUsers.entries()){
                if(value.id === arrayValue.user_receiver){
                    return resultEmailFiltered.push(arrayValue)

                }
            }
        }

       
        for(const [, value] of arrayComplimentsSend.entries()){
    
            extractCompliment(value)
          
        }

         
        const extractValueReceivers = (arrayValue:Compliment)=>{
            for(const [, value] of arrayUsers.entries()){
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
        console.log(listComplimentsSend)

    }


    let usersReceiverFiltered = resultEmail.filter(compliment =>{
        if(resultEmail){
             return compliment.compliments.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
         }
     })

     function handleShowCompliment(id:string){
        for(const [, value] of arrayComplimentsSend.entries()){
            if(value.id === id){
                setValuesCompliments(value)
                return handleModalIsShownCompliments()
            }
        }

     }

     async function deleteComplimentId(id:string){
        const complimentDeleted =  resultEmail.filter((compliment) => compliment.compliments.id !== id )
        setResultEmail(complimentDeleted)
        await deleteCompliment(id)
        getAllComplimentsSend()
     }

     function handleEmptyTag(){
        let tagName = ['']
        arrayTag.map(tag => {
            if(valuesCompliments.tag_id === DEFAULT_TAG_ID){
                return tagName
            }else if(tag.id === valuesCompliments.tag_id){
                return tagName =  [tag.custom_name] 
            }
        })

        return tagName
    }

    useEffect(() => {
        if(listComplimentsSend){

            filterUserReceiver()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return(
        <>
            <div className="list-messages">
                {listComplimentsSend && usersReceiverFiltered.map((result, index) => {
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
                {valuesCompliments !== undefined &&<ModalCompliments 
                email={arrayUsers.map(user => user.id === valuesCompliments.user_receiver && user.email)} 
                tag={handleEmptyTag()} 
                isShown={complimentModalShown}
                forFrom={'Para:'}
                message={valuesCompliments.message}
                />}
            {listComplimentsSend === null || listComplimentsSend.length === 0 ? <div className="empty">Vazio</div> : null}
            </div>
        </>
    )

}


