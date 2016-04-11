export function onChange(data) {
    return { type: "CHANGE", value: data };
}

export function onFilter(data) {
    return { type: "FILTER", query: data };
}
