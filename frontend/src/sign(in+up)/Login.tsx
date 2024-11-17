import Input from "./Input";
import { useNavigate } from "react-router-dom";

type Props = {
    className: string
}

export default function Login({ className }: Props) {
    const navigate = useNavigate()

    const goToSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('../signup')
    }

    return (
        <fieldset>
            <h1>Login</h1>

            <form className={className}>
                <Input id="email-login" className="email" name="email" value="Email" />
                <Input id="password" className="password" name="password" value="Password" />
                <div>
                    <button>Login</button>
                    <button onClick={goToSignup}>New User?</button>
                </div>
            </form>
        </fieldset>
    )
}