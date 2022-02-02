import '../styles/user-page.scss';
type Props = {
    isModalShown: boolean
};
export const ModalCreatedCompliment = (props: Props) => {
    return (
        <div className={`modal-create-compliment ${props.isModalShown ? 'shown' : 'not-shown'}`}>
            <h1>Elogio enviado!</h1>
        </div>
    );
};