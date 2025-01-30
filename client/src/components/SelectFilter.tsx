import { SelectProps } from "@/types/props";

export default function ({ name, filter, data, handleChange }: SelectProps) {
    return (
        <>
            <section className="select">
                <select id={name} name={name} onChange={handleChange} value={filter}>
                    <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
                    {data.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
            </section>
        </>
    )
}