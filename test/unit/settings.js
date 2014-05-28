describe('settings', function(){
	beforeEach(function() {
		runs(function() {
			ready = false;
			testModule({ name: "settings", requires: ['plugins.settings'] }).defines(function() {
				ready = true;
			});
		});

		waitsFor(function() {
			return ready;
		}, "Waiting for module", 500);
	});

	describe('initialize', function(){
		it('should be', function(){
			expect(ig.settings).toBeUndefined();
		});
	});
});