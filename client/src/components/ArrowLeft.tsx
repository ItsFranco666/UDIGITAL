export default function ({ color, w, h }: { color: string, w: string, h: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    )
}