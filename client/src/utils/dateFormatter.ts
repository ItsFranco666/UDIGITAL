export default function (date: Date) {
    return date.toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).replace(' a. m.', 'am').replace(' p. m.', 'pm');
}

export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses van de 0-11
    const day = String(date.getUTCDate()).padStart(2, '0'); // Se usa getUTCDate() para evitar desfases

    return `${year}-${month}-${day}`;
}

export function formatTime(dateInput: Date | string): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput)

    if (isNaN(date.getTime())) throw new Error("Invalid date input")

    let hours = date.getUTCHours();

    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convierte 0 en 12 para formato AM/PM

    return `${hours}:${minutes} ${ampm}`;
}
