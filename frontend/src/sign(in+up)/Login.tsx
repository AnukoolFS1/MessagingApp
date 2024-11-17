import { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

type Props = {
    className: string
}

interface UserData {
    email: string,
    password: string
}

export default function Login({ className }: Props) {
    const [userData, setUserData] = useState<UserData>({
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const goToSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('../signup')
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setUserData((prev:UserData):UserData => {
            return {...prev, [name]: value}
        })
    }

    return (
        <fieldset>
            <h1>Login</h1>

            <form className={className}>
                <Input id="email-login" className="email" name="email" value="Email" onChange={handleUserInput} />
                <Input id="password" className="password" name="password" value="Password" onChange={handleUserInput} />
                <div>
                    <button>Login</button>
                    <button onClick={goToSignup}>New User?</button>
                </div>
            </form>
        </fieldset>
    )
}