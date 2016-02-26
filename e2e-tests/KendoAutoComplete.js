// spec.js
describe('AutoComplete basic usage example', function() {
    it('should type a letter and assert autofill', function() {
        browser.get('http://localhost:8888/examples/basic.html');
        const autoComplete = element(by.tagName('input'));
        autoComplete.sendKeys('f');
        expect(autoComplete.getAttribute('value')).toEqual('foo1');
    });
	
	it('should filter and assert corresponding options', function() {
        browser.get('http://localhost:8888/examples/basic.html');
        const autoComplete = element(by.tagName('input'));
		const optionItem = element(by.css('.k-item'));
        autoComplete.sendKeys('dsa');
        expect(optionItem.getText()).toEqual('dsa');
		expect(optionItem.getText()).not.toEqual('foo6');
    });
	
});
