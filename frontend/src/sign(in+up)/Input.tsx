type Props = {
    id:string,
    className:string,
    name:string,
    value:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export default function Input({id, className, value, name, onChange}: Props) {

    return (
        <div className="input">
            <input type="text" id={id} className={className} name={name} required onChange={onChange}  />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}