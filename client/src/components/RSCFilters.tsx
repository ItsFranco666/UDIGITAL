import { FiltersProps } from "@/types/props";
import SelectFilter from "./SelectFilter";
import InputFilter from "./InputFilter";

export default function ({ filters, dataFilters, handleChange, handleOrderChange, session }: FiltersProps) {
    return (
        <>
            <section className="filters">
                <InputFilter
                    name="search"
                    handleChange={handleChange}
                />
                <section className="select-row">
                    <SelectFilter
                        data={dataFilters.states}
                        handleChange={handleChange}
                        name="state"
                        filter={filters.state}
                    />
                    <SelectFilter
                        data={dataFilters.types}
                        handleChange={handleChange}
                        name="type"
                        filter={filters.type}
                    />
                    <SelectFilter
                        data={dataFilters.locations}
                        handleChange={handleChange}
                        name="location"
                        filter={filters.location}
                    />
                </section>
                <div className="sorts">
                    <button id="asc" onClick={() => handleOrderChange('asc')} className={`${filters.order === "asc" ? "active" : ""} ${session ? 'session' : ''}`}>⬆ A-Z</button>
                    <button id="desc" onClick={() => handleOrderChange('desc')} className={`${filters.order === "desc" ? "active" : ""} ${session ? 'session' : ''}`}>⬇ Z-A</button>
                </div>
            </section>
        </>
    )
}