import '../styles/user-page.scss';
type Props = {
    isModalShown: boolean;
    isValid: boolean;
    frase:string,
    shown:string,
    notShown:string
};
export const Modal = (props: Props) => {
    console.log(props.isValid)

    return (
        <div 
        style={{
            border:props.isValid === true ? `3px solid #acd9ae` : '3px solid #f0233e'
        }} 
        className={`modal-create-compliment ${props.isModalShown ? props.shown : props.notShown}`
        }>
            <p>{props.isValid === true ? props.frase : 'Campo/s inválido/s'}</p>
        </div>
    );
};