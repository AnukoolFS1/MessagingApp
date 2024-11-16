type Props = {
    id:string,
    className:string,
    name:string,
    value:string
}

export default function Input({id, className, value, name}: Props) {

    return (
        <div className="input">
            <input type="text" id={id} className={className} name={name} required  />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}