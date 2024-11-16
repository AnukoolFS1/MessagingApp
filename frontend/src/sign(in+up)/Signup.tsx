import { useState } from "react"
import Input from "./Input"

type Props = {
    className: string
}


export default function Signup({ className }: Props) {
    const [value, setValue] = useState<string>("")
    const condition = value === "" || value === "--select--";
    const selectStyle = {color:condition?"grey":"white"}


    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)
    const role: string[] = ["--select--",'Teacher', "Institute", "Student"]

    return (
        <div>
            <fieldset>
                <h1>Signup</h1>

                <form className={className}>
                    <Input id="name" className="name" name="name" value="Name" />
                    <Input id="email-signup" className="email" name="email" value="Email" />
                    <Input id="phone" className="phone" name="phone" value="Phone" />
                    <div>
                        <select name="role" id="role" value={value} onChange={selectChange} style={selectStyle}>
                            {role.map((e:string, i:number):JSX.Element => (
                                <option value={e} key={i} style={{color:i===0?"grey":"white"}}>{e}</option>
                            ))}
                        </select>
                    </div>
                    <Input id="password-signup" className="password" name="password" value="Password" />
                    <button>Signup</button>
                </form>
            </fieldset>
        </div>
    )
}