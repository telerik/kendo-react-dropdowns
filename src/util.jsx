/* DOM dependent */
function caretIndex(element) {
    return element.disabled ? undefined : element.selectionStart;
}

function caretSelection(element, startIndex, endIndex = startIndex) {
    if (startIndex && !element.disabled && element.selectionStart !== undefined) {
        element.focus();
        element.setSelectionRange(startIndex, endIndex);
    }
}

function endOfWordIndex(text, startIndex, separator) {
    let endIndex;
    if (separator !== "") {
        const word = wordAtCaret(startIndex, text, separator);
        const tmp = text.substring(0, startIndex).split(separator);
        const beginning = tmp[tmp.length - 1];
        endIndex = startIndex + (word.length - beginning.length);
    } else {
        endIndex = text.length;
    }

    return endIndex;
}

function selectEndOfWord(element, startIndex, separator) {
    caretSelection(element, startIndex, endOfWordIndex(element.value, startIndex, separator));
}

function moveToEndOfWord(element, caretIdx, separator) {
    const word = wordAtCaret(element, element.value, separator);
    const end = caretIdx + word.length;
    caretSelection(element, end, end);

    return end;
}

function hasSelection(element) {
    return element.selectionStart !== element.selectionEnd;
}

/* DOM independent */
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
    let result;

    if (!newValue && !oldValue) {
        result = false;
    } else if (newValue.length < oldValue.length) {
        result = true;
    } else if (newValue.length === oldValue.length) {
        result = newValue === oldValue;
    }

    return result;
}

const keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

export {
    caretIndex,
    caretSelection,
    hasSelection,
    indexOfWordAtCaret,
    keys,
    moveToEndOfWord,
    textReduced,
    trim,
    wordAtCaret,
    selectEndOfWord,
    replaceWordAtCaret,
    endOfWordIndex
};
