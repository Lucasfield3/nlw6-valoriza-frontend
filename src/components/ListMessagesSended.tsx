/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react'
import { ListsComplimetsContext } from '../context/ListsComplimets'
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

    const { listComplimentsSend, getAllComplimentsSend } = useContext(ListsComplimetsContext)
    const { users, getAllUsers } = useContext(UserDataContext)
    const { tags, } = useContext(TagDataContext)
    const [ resultEmail, setResultEmail ] = useState<ComplimentsFiltered[]>([])
    const [ valuesCompliments, setValuesCompliments ] = useState<Compliment>()
    const [ complimentModalShown, setComplimentModalShown ] = useState(false)

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
        getAllComplimentsSend()
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
                setComplimentModalShown(!complimentModalShown)
            }
        }

     }

    useEffect(() => {
        getAllUsers()
        if(listComplimentsSend.length > 0){
            filterUserReceiver()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        {users && <div className="list-messages">
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
            {complimentModalShown && <ModalCompliments 
            email={users.map(user => user.id === valuesCompliments.user_receiver && user.email)} 
            tag={tags.map(tag => tag.id === valuesCompliments.tag_id && tag.name)} 
            isShown={complimentModalShown}
            forFrom={'Para:'}
            message={valuesCompliments.message}
            />}
            {/* <OverlayDismissModalTag onClick={()=> setComplimentModalShown(!complimentModalShown)} isShown={complimentModalShown}/> */}
            </div>}
        </>
    )

}

