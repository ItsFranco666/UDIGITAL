import { PaginationProps } from "@/types/props";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import { PAGE_SIZE } from "@/config/initialStates";

export default function ({ handleNext, handlePageChange, handlePrev, total, session }: PaginationProps) {
    const totalPages = Math.ceil(total / PAGE_SIZE)
    return (
        <>
            <div className="pag">
                <button type="button" className={`btn ${session ? 'session' : ''}`} onClick={handlePrev}>
                    <ArrowLeft w="22" h="22" color="#eee" />
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => handlePageChange(idx)}
                        className={`${session ? 'session' : ''}`}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button type="button" className={`btn ${session ? 'session' : ''}`} onClick={handleNext}>
                    <ArrowRight w="22" h="22" color="#eee" />
                </button>
            </div>
        </>
    )
}