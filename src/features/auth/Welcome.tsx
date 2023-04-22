import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectCurrentToken } from "../../app/store"
import { useDispatch } from 'react-redux'
import { logOut } from "./authSlice"
import { useLogoutMutation } from "./authApiSlice"
import { useEffect } from 'react'



const Welcome = () => {
    // const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    const[logout, {error, isLoading, isSuccess}] = useLogoutMutation();
   

    // const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    const welcome = 'Welcome!'
    const tokenAbbr = `${token.slice(0, 9)}...`
    
    const handlerLogout = () =>{
        // 
        logout("")
        dispatch(logOut())
        
       
    }

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <div onClick={handlerLogout}>Logout</div>
        </section>
    )

    return content
}
export default Welcome

