import Input from "./Input";

export default function Login() {

    return (
        <fieldset>
            <h1>Login</h1>

            <form>
                <Input id="email-login" className="email" name="email" value="Email" />
                <Input id="password" className="password" name="password" value="Password" />
                <button>Login</button>
            </form>
        </fieldset>
    )
}