function resolveInitialValue(data, value, valueField) {
    return data.find(element => element[valueField] === value);
}

export {
    resolveInitialValue
};
