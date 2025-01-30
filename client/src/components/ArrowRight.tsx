export default function ({ color, w, h }: { color: string, w: string, h: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={color}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}