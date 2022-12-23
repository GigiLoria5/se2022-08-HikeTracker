export function Activity(activity) {
    Object.keys(activity).forEach(key =>
        this[key] = activity[key]
    )
}