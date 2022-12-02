export function Hike(hike) {
    Object.keys(hike).forEach(key =>
        this[key] = hike[key]
    )
}