// spec.js
describe('AutoComplete basic usage example', function() {
    "use strict";

    let autoComplete;

    beforeEach(function() {
        browser.get('http://localhost:8888/examples/basic.html');
        autoComplete = element(by.tagName('input'));
    });

    it('should type a letter and assert autofill', function() {
        autoComplete.sendKeys('f');
        expect(autoComplete.getAttribute('value')).toEqual('Finland');
    });

    it('should filter and assert corresponding options', function() {
        const optionItem = element(by.css('.k-item'));
        autoComplete.sendKeys('albania');
        expect(optionItem.getText()).toEqual('Albania');
        expect(optionItem.getText()).not.toEqual('Germany');
    });

    it('should assert selection of suggested part of the word', function() {
        const script = `
            const input = arguments[0];
            return input.value.substring(input.selectionStart, input.selectionEnd);
        `;

        autoComplete.sendKeys('b');
        expect(browser.executeScript(script, autoComplete.getWebElement())).toEqual("elarus");
    });

    it('should delete suggested text selection on backspace', function() {
        const script = `
            const input = arguments[0];
            return input.value.substring(input.selectionStart, input.selectionEnd);
        `;

        autoComplete.sendKeys('ge');
        autoComplete.sendKeys(protractor.Key.BACK_SPACE);

        expect(autoComplete.getAttribute('value')).toEqual('Ge');
        expect(browser.executeScript(script, autoComplete.getWebElement())).toEqual("");
    });
});
