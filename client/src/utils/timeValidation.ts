export function validateTime(time: string, field: "start" | "end", startTime: string) {
    if (!time) return "Este campo es requerido";

    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    const openingTime = 8 * 60; // 8:00 AM en minutos
    const closingTime = 20 * 60; // 8:00 PM en minutos
    const lunchStart = 12 * 60; // 12:00 PM en minutos
    const lunchEnd = 14 * 60; // 2:00 PM en minutos

    if (totalMinutes < openingTime || totalMinutes > closingTime) {
        return "Debe estar entre 8:00 AM y 8:00 PM";
    }

    if (totalMinutes >= lunchStart && totalMinutes < lunchEnd) {
        return "No se puede reservar entre 12:00 PM y 2:00 PM";
    }

    if (field === "end" && startTime) {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const startTotalMinutes = startHours * 60 + startMinutes;

        if (totalMinutes <= startTotalMinutes) {
            return "La hora de finalización debe ser mayor a la de inicio";
        }
    }

    return true
};

export function validateDate(date: string) {
    if (!date) return "La fecha es obligatoria";

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Eliminar la hora para comparación exacta
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Obtener mañana

    if (selectedDate < tomorrow) {
        return "Debes elegir una fecha a partir de mañana";
    }

    return true;
};