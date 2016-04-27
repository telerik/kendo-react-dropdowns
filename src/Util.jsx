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

function getExtraHeight(element) {
    let result = 0;
    let dom = element.previousElementSibling;

    while (dom) {
        result += dom.offsetHeight;
        dom = dom.previousElementSibling;
    }

    return result;
}

function resizeList(list, listContainer, height) {
    const extraHeight = getExtraHeight(list);
    const listHeight = list.scrollHeight || list.offsetHeight;

    listContainer.style.height = listHeight > height ? height + "px" : "auto";
    list.style.height = listHeight > height ? height - extraHeight + "px" : "auto";
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
    } else {
        result = false;
    }

    return result;
}

function resolveValue(props) {
    const { data, defaultItem, value, index, valueField } = props;
    let dataItem;

    if (value) {
        dataItem = data.find(element => getter(element, valueField) === value);
        return {
            dataItem: dataItem,
            selected: data.indexOf(dataItem),
            focused: data.indexOf(dataItem)
        };
    } else if (index) {
        dataItem = data[index];
        return {
            dataItem: data[index],
            selected: index,
            focused: index
        };
    } else if (defaultItem) {
        dataItem = defaultItem;
        return {
            dataItem: dataItem,
            selected: dataItem ? -1 : null,
            focused: dataItem ? -1 : null
        };
    }
}

function itemIndex(text, data, textField = null) {
    let index;

    if (textField) {
        index = data.findIndex(item => getter(item, textField).search(new RegExp(text, "i")) === 0);
    } else {
        index = data.findIndex(item => item.search(new RegExp(text, "i")) === 0);
    }
    return index;
}

function sameCharsOnly(word, character) {
    for (let idx = 0; idx < word.length; idx++) {
        if (word.charAt(idx) !== character) {
            return false;
        }
    }
    return true;
}

function normalizeIndex(index, length) {
    let result = index;

    if (result >= length) {
        result -= length;
    }

    return result;
}

function shuffleData(data, splitIndex, defaultItem) {
    let result = data;

    if (defaultItem) {
        result = [ defaultItem ].concat(result);
    }

    return result.slice(splitIndex).concat(result.slice(0, splitIndex));
}

function matchText(text, word, ignoreCase) {
    if (text === undefined || text === null) {
        return false;
    }

    let temp = String(text);

    if (ignoreCase) {
        temp = temp.toLowerCase();
    }

    return temp.indexOf(word) === 0;
}

function getter(dataItem, field) {
    return field ? dataItem[field] : dataItem;
}

export {
    caretIndex,
    caretSelection,
    getter,
    getExtraHeight,
    hasSelection,
    indexOfWordAtCaret,
    moveToEndOfWord,
    matchText,
    normalizeIndex,
    textReduced,
    trim,
    wordAtCaret,
    selectEndOfWord,
    sameCharsOnly,
    shuffleData,
    replaceWordAtCaret,
    resizeList,
    resolveValue,
    endOfWordIndex,
    itemIndex
};
