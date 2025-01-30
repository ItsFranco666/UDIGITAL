import { InputProps } from "@/types/props";

export default function ({ handleChange, name }: InputProps) {
    return (
        <>
            <input type="text" name={name} placeholder="Buscar..." onChange={handleChange}/>
        </>
    )
}