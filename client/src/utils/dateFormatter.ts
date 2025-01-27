export default function (date: Date) {
    return date.toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).replace(' a. m.', 'am').replace(' p. m.', 'pm');
};