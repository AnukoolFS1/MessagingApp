import Input from "./Input";

type Props = {
    className: string
}

export default function Login({className}:Props) {

    return (
        <fieldset>
            <h1>Login</h1>

            <form className={className}>
                <Input id="email-login" className="email" name="email" value="Email" />
                <Input id="password" className="password" name="password" value="Password" />
                <button>Login</button>
            </form>
        </fieldset>
    )
}