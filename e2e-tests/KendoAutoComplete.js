// spec.js
describe('Protractor Demo App', function() {
    it('should add one and two', function() {
        browser.get('http://localhost:3000/examples/basic.html');
        const autoComplete = element(by.tagName('input'));
        autoComplete.sendKeys('f');
        expect(autoComplete.getAttribute('value')).toEqual('foo1');
    });
});
