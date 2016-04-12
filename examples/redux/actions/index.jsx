export function onChange(value) {
    return { type: "CHANGE", value: value };
}

export function onFilter(data) {
    return { type: "FILTER", query: data };
}
