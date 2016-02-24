exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    multiCapabilities: [
        { 'browserName': 'firefox' }
    ],
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },
    framework: 'jasmine',
    specs: [ 'KendoAutoComplete.js' ]
};
