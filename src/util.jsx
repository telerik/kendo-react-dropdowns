export default function caret(element, startIndex, endIndex = startIndex) {
    let start = startIndex;
    let end = endIndex;
    const isPosition = start !== undefined;

    if (isPosition && element.disabled) {
        return undefined;
    }

    if (element.selectionStart !== undefined) {
        if (isPosition) {
            element.focus();
            element.setSelectionRange(start, end);
        } else {
            start = [ element.selectionStart, element.selectionEnd ];
        }
    }

    return start;
}
