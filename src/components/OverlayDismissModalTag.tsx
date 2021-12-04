
interface OverlayDismissModalTagProps{
    onClick:() => void;
    isShown:boolean;
}

export function OverlayDismissModalTag({onClick, isShown}:OverlayDismissModalTagProps){

    return(
        <div style={{
            backgroundColor:'black', 
            opacity:'0.2', 
            height:'100vh', 
            width:'100vw', 
            zIndex:'10',
            cursor:'pointer',
            position: 'absolute',
            display:isShown ? 'block' : 'none'
            }}
            onClick={onClick}
            >

        </div>
    )

}