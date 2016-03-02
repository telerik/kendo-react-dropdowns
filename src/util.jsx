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
function caretIndex(element) {
    return element.disabled ? undefined : element.selectionStart;
}

function caretSelection(element, startIndex, endIndex = startIndex) {
    if (startIndex && !element.disabled && element.selectionStart !== undefined) {
        element.focus();
        element.setSelectionRange(startIndex, endIndex);
    }
}

function selectEndOfWord(element, startIndex, separator) {
    const text = element.value;
    const word = wordAtCaret(startIndex, text, separator);
    const tmp = text.substring(0, startIndex).split(separator);
    const beginning = tmp[tmp.length - 1];
    const endIndex = startIndex + (word.length - beginning.length);

    caretSelection(element, startIndex, endIndex);
}

function moveToEndOfWord(element, caretIdx, separator) {
    const word = wordAtCaret(element, element.value, separator);
    const end = caretIdx + word.length;
    caretSelection(element, end, end);

    return end;
}

function indexOfWordAtCaret(caretIdx, text, separator) {
    return separator ? text.substring(0, caretIdx).split(separator).length - 1 : 0;
}

function trim(word, separator) {
    const str = separator.substring(0, separator.length - 1);
    return word.endsWith(str) ? word.substring(0, word.length - str.length) : word;
}

function wordAtCaret(caretIdx, text, separator) {
    const result = text.split(separator)[indexOfWordAtCaret(caretIdx, text, separator)];
    return trim(result, separator);
}

function replaceWordAtCaret(caretIdx, text, word, separator) {
    let words = text.split(separator);

    words.splice(indexOfWordAtCaret(caretIdx, text, separator), 1, word);

    return words.join(separator);
}

function textReduced(newValue = "", oldValue = "") {
    return newValue.length <= oldValue.length;
}

export { caretIndex, caretSelection, indexOfWordAtCaret, moveToEndOfWord, textReduced, wordAtCaret, selectEndOfWord, replaceWordAtCaret };
