// Borrows heavily from: https://gist.github.com/jessefreeman/6280967

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-version');
	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-exec');

	var pkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				compress: {
					global_defs: {
						DEBUG: false
					}
				},
				mangle: true,
				report: 'min'
			},
			game: { files: { 'builds/tmp/js/game.min.js': ['builds/tmp/js/game.min.js'] } }
		},
		karma: {
			unit:{
				configFile: "karma.conf.js"
			}
		},
		shell: {
			game: {
				command: [
					'cd builds/tmp',
					'php ../../tools/bake.php lib/impact/impact.js lib/game/main.js js/game.min.js'
				].join('&&'),
				options: {
					stdout: true
				}
			},
		},
		mkdir: {
			tmp: { options: { create: ['builds/tmp', 'builds/tmp/js'] } }
		},
		clean: {
			builds: ['builds/web/**/*', 'ejecta/App/**/*', 'cordova/www/**/*', '!builds/web/index.html', '!cordova/www/index.html', '!cordova/www/FastCanvas.js', '!ejecta/App/index.js'],
			lib: ['builds/tmp/lib'],
			tmp: ['builds/tmp']
		},
		replace: {
			debug_info: {
				src: ['builds/tmp/lib/game/main.js'],
				dest: 'builds/tmp/lib/game/main.js',
				replacements: [{
					from: '\'impact.debug.debug\',',
					to: ''
				}],
			},
			canvas_name: {
				src: ['cordova/www/js/game.min.js'],
				dest: 'cordova/www/js/game.min.js',
				replacements: [{
					from: '\"#canvas\"',
					to: '\"#fastCanvas\"'
				}],
			}
		},
		copy: {
			tmp: {
				files: [
					{ expand: true, src: ['*', '.htaccess', '!weltmeister.html', '!deploy.sh', '!Gruntfile.js', '!karma.conf.js', '!package.json'], dest: 'builds/tmp/', filter: 'isFile' },
					{ expand: true, src: ['css/**', 'js/**', 'media/**', 'lib/game/**', 'lib/impact/**', 'lib/plugins/**', 'cms/**'], dest: 'builds/tmp/' }
				]
			},
			web: {
				files: [
					{ expand: true, cwd: 'builds/tmp', src: ['**', '!index.html', '!media/*@2x.*', '!media/*.caf', '!media/**/*.caf'], dest: 'builds/web/', dot: true }
				]
			},
			ejecta: {
				files: [
					{ expand: true, cwd: 'builds/tmp', src: ['**', '!index.html', '!media/*.ogg', '!media/**/*.ogg'], dest: 'ejecta/App/', dot: true }
				]
			},
			cordova: {
				files: [
					{ expand: true, cwd: 'builds/tmp', src: ['**', '!index.html', '!media/*@2x.*', '!media/*.caf', '!media/**/*.caf'], dest: 'cordova/www/', dot: true }
				]
			}
		},
		jsduck: {
			main: {
				src: ['lib/game'],
				dest: 'doc/game',
				options: {
					external: ['Image', 'Event', 'CanvasPattern'],
					'local-storage-db': 'jsduck-gamegurus',
					title: function() { return pkg.name + ' Documentation'; },
					warnings: ['-global']
				}
			}
		},
		jshint: {
			options: { trailing: true },
			target: { src: ['lib/game/**/*.js'] }
		}
	});

	// Helper tasks, not intended to be run alone
	grunt.registerTask('build-tmp', ['clean:builds', 'clean:tmp', 'mkdir:tmp', 'copy:tmp']);
	grunt.registerTask('commons-changes', ['replace:debug_info', 'shell:game', 'clean:lib', 'uglify:game'])
	grunt.registerTask('build-cordova', ['copy:cordova', 'replace:canvas_name']);

	grunt.registerTask('build', ['jshint', 'build-tmp', 'commons-changes', 'copy:web', 'copy:ejecta', 'build-cordova']);
	grunt.registerTask('doc', ['jshint', 'jsduck']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('clean-builds', ['clean:builds']);
	grunt.registerTask('test', ['debug', 'karma:unit', 'clean:tmp']);
};
