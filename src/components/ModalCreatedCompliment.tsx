import '../styles/user-page.scss';
type Props = {
    isModalShown: boolean
};
export const ModalCreatedCompliment = (props: Props) => {
    return (
        <div className={`modal-create-compliment ${props.isModalShown ? 'shown' : 'not-shown'}`}>
            <p>Elogio enviado!</p>
        </div>
    );
};