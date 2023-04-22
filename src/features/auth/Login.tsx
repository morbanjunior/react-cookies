import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredential } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    const userRef = useRef<HTMLInputElement>()
    const errRef = useRef()
    const [email, setemail] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()
    const newuserRef = userRef.current as any

    useEffect(() => {
        // newuserRef.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            // console.log('logoin done')
            dispatch(setCredential(userData))
            // console.log('credentianl done')
            setemail('')
            // console.log('clean email done')
            setPwd('')

            console.log('clean password done')
            navigate('/welcome')
            console.log('welcom done')
        } catch (err:any) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // newuserRef.focus();
        }
    }

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={newuserRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    // ref={newuserRef}
                    value={email} 
                    onChange={ (event) => {
                    setemail(event.target.value)}}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={ (event) => {setPwd(event.target.value)}}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )

    return content
}

export default Login
