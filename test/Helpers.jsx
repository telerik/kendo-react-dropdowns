function keyPress(shallowWrapper, key) {
    let charCode, keyCode;

    charCode = keyCode = String(key).charCodeAt(0);

    shallowWrapper.simulate("keyPress", { charCode: charCode, keyCode: keyCode, preventDefault: function() {} });
}

export {
    keyPress
};
