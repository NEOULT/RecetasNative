
export function convertTimeToIso(time, unit) {
    if (!time || isNaN(time)) return '';
    switch (unit) {
        case 'min':
            return `PT${time}M`;
        case 'h':
            return `PT${time}H`;
        case 'day':
            return `P${time}D`;
        case 'week':
            return `P${time}W`;
        case 'month':
            return `P${time}M`;
        case 'year':
            return `P${time}Y`;
        default:
            return '';
    }
}

export function convertIsoToTime(iso) {
    if (!iso) return { time: '', unit: '' };
    const minMatch = iso.match(/^PT(\d+)M$/i);
    if (minMatch) return { time: Number(minMatch[1]), unit: 'min' };
    const hourMatch = iso.match(/^PT(\d+)H$/i);
    if (hourMatch) return { time: Number(hourMatch[1]), unit: 'h' };
    const dayMatch = iso.match(/^P(\d+)D$/i);
    if (dayMatch) return { time: Number(dayMatch[1]), unit: 'day' };
    const weekMatch = iso.match(/^P(\d+)W$/i);
    if (weekMatch) return { time: Number(weekMatch[1]), unit: 'week' };
    const monthMatch = iso.match(/^P(\d+)M$/i);
    if (monthMatch) return { time: Number(monthMatch[1]), unit: 'month' };
    const yearMatch = iso.match(/^P(\d+)Y$/i);
    if (yearMatch) return { time: Number(yearMatch[1]), unit: 'year' };
    return { time: '', unit: '' };
}