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

	describe('initialize first time', function(){
		it('should load default values', function(){
			expect(ig.settings).toBeDefined();
			expect(ig.settings.narration).toBe(true);
			expect(ig.settings.music).toBe(true);
			expect(ig.settings.language).toEqual('es');
			expect(ig.settings.uuid).toBeDefined();
		});
	});

	describe('initialize after first time', function(){
		it('should load saved values', function(){
			localStorage.setItem('narration', 'false');
			localStorage.setItem('music', 'false');
			localStorage.setItem('language', 'en');
			localStorage.setItem('uuid','92bf24a5-20e5-4181-9778-2835f28c52d8')
			ig.settings.init();

			expect(ig.settings.narration).toBe(false);
			expect(ig.settings.music).toBe(false);
			expect(ig.settings.language).toEqual('en');
			expect(ig.settings.uuid).toEqual('92bf24a5-20e5-4181-9778-2835f28c52d8');
		});
	});

	describe('save', function(){
		it('should save settings values', function(){
			ig.settings.narration=false;
			ig.settings.music=true;
			ig.settings.language='en';
			ig.settings.save();

			expect(localStorage.getItem('narration')).toBe('false');
			expect(localStorage.getItem('music')).toBe('true');
			expect(localStorage.getItem('language')).toEqual('en');
		});
	});
});