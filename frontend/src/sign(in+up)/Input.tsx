type Props = {
    id:string,
    className:string,
    name:string,
    value:string
}

export default function Input({}: Props) {

    return (
        <div>
            <input type="text" id="" className="" name=""  />
            <label htmlFor=""></label>
        </div>
    )
}