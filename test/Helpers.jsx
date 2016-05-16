function click(shallowWrapper, args) {
    shallowWrapper.simulate('click', { preventDefault: function() {}, ...args });
}

function compareState(state, expected) {
    Object.keys(expected).forEach(function(key, index) {
        expect(state[key]).toEqual(expected[key], key);
    });
}

function keyPress(shallowWrapper, key) {
    let charCode, keyCode;
    charCode = keyCode = String(key).charCodeAt(0);
    shallowWrapper.simulate("keyPress", { charCode: charCode, keyCode: keyCode, preventDefault: function() {} });
}

function lastCallArgs(spy) {
    return spy.calls.mostRecent().args[0];
}

export {
    click,
    keyPress,
    lastCallArgs,
    compareState
};
