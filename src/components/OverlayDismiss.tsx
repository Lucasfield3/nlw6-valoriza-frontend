import { useContext } from "react"
import { SideMenuContext } from "../context/SideMenuContext"


export default function OverlayDismiss(){
    const { overlayIsActive , isActive} = useContext(SideMenuContext)

    return(
        <div style={{
            backgroundColor:'black', 
            opacity:'0.2', 
            height:'100vh', 
            width:'100vw', 
            zIndex:'10',
            cursor:'pointer',
            position: 'absolute',
            display:isActive ? 'block' : 'none'
            }}
            onClick={overlayIsActive}
            >

        </div>
    )

}

