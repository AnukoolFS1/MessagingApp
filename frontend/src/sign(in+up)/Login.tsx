import { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

type Props = {
    className: string
}

interface UserData {
    email: string,
    password: string
}

export default function Login({ className }: Props) {
    const [userData, setUserData] = useState<UserData>({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const goToSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('../signup')
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setUserData((prev: UserData): UserData => {
            return { ...prev, [name]: value }
        })
    }

    const handleOnSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', userData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-custom-user": "taquila"
                },
                withCredentials: true
            })

            const data = response.data
            // const response = await fetch('http://localhost:5000/login', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "X-custom-user": "taquila"
            //     },
            //     body:JSON.stringify(userData),
            //     credentials: "include"
            // })
            // const data = await response.json()
            
            console.log(data)

            navigate('/chatapp')
        }
        catch (err: any) {
            // alert(err.response.data.msg)
            console.log(err)
        }
    }
    return (
        <fieldset>
            <h1>Login</h1>

            <form className={className}>
                <Input id="email-login" className="email" name="email" value="Email" onChange={handleUserInput} />
                <Input id="password" className="password" name="password" value="Password" onChange={handleUserInput} />
                <div>
                    <button onClick={handleOnSubmit}>Login</button>
                    <button onClick={goToSignup}>New User?</button>
                </div>
            </form>
        </fieldset>
    )
}