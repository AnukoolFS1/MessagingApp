import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "./Input"
import axios from "axios"

type Props = {
    className: string
}

interface UserData {
    name: string,
    phone: string,
    email: string,
    password: string,
    role: "Teacher" | "Student" | "Institute" | ""
}


export default function Signup({ className }: Props) {
    const [userData, setUserData] = useState<UserData>({
        name: "",
        phone: "",
        email: "",
        password: "",
        role: ""
    })
    const navigate = useNavigate()
    const [value, setValue] = useState<string>("")
    const condition = value === "" || value === "--select--";
    const selectStyle = { color: condition ? "grey" : "white" }

    const GotoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('../login')
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget
        setUserData((prev: UserData): UserData => {
            return { ...prev, [name]: value }
        })
    }

    const handleOnSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log(userData)
        try {
            await axios.post('http://localhost:5000/register', userData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-custom-user": "taquila"
                }
            })

        } catch (err: any) {
            console.log(err.message)
            alert('something went wrong')
        }

    }

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
        handleUserInput(e)
    }
    const role: string[] = ["--select--", 'Teacher', "Institute", "Student"]

    return (
        <div>
            <fieldset>
                <h1>Signup</h1>

                <form className={className}>
                    <Input id="name" className="name" name="name" value="Name" onChange={handleUserInput} />
                    <Input id="email-signup" className="email" name="email" value="Email" onChange={handleUserInput} />
                    <Input id="phone" className="phone" name="phone" value="Phone" onChange={handleUserInput} />
                    <div>
                        <select name="role" id="role" value={value} onChange={selectChange} style={selectStyle}>
                            {role.map((e: string, i: number): JSX.Element => (
                                <option value={e} key={i} style={{ color: i === 0 ? "grey" : "white" }}>{e}</option>
                            ))}
                        </select>
                    </div>
                    <Input id="password-signup" className="password" name="password" value="Password" onChange={handleUserInput} />
                    <div>
                        <button onClick={handleOnSubmit}>Signup</button>
                        <button onClick={GotoLogin}>Already have an account!</button>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}