/*
function caret(element, startIndex, endIndex = startIndex) {
    const isPosition = startIndex !== undefined;
    let selectionStart;

    if (isPosition && element.disabled) {
        return undefined;
    }

    if (element.selectionStart !== undefined) {
        if (isPosition) {
            element.focus();
            element.setSelectionRange(startIndex, endIndex);
        } else {
            selectionStart = element.selectionStart;
        }
    }

    return selectionStart;
}
*/

function caretSelection(element, startIndex, endIndex = startIndex) {
    if (startIndex && !element.disabled && element.selectionStart !== undefined) {
        element.focus();
        element.setSelectionRange(startIndex, endIndex);
    }
}

function caretPosition(element) {
    return element.disabled ? undefined : element.selectionStart;
}

function indexOfWordAtCaret(caretIdx, text, separator) {
    return separator ? text.substring(0, caretIdx).split(separator).length - 1 : 0;
}

function wordAtCaret(caretIdx, text, separator) {
    return text.split(separator)[indexOfWordAtCaret(caretIdx, text, separator)];
}

function replaceWordAtCaret(caretIdx, text, word, separator) {
    let words = text.split(separator);

    words.splice(indexOfWordAtCaret(caretIdx, text, separator), 1, word);

    if (separator && words[words.length - 1] !== "") {
        words.push("");
    }

    return words.join(separator);
}

export { caretPosition, caretSelection, indexOfWordAtCaret, wordAtCaret, replaceWordAtCaret };
