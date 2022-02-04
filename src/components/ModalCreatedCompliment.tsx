import '../styles/user-page.scss';
type Props = {
    isModalShown: boolean;
    isValid: boolean;
};
export const ModalCreatedCompliment = (props: Props) => {
    console.log(props.isValid)

    return (
        <div style={{
            border:props.isValid === true ? `3px solid #acd9ae` : '3px solid #f0233e'
        }} className={`modal-create-compliment ${props.isModalShown ? 'shown' : 'not-shown'}`}>
            <p>{props.isValid === true ? 'Elogio enviado!' : 'Campo/s inválido/s'}</p>
        </div>
    );
};