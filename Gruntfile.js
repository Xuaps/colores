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
	grunt.loadNpmTasks('grunt-file-creator');

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
			build: {
				command: 
					'xcodebuild -configuration Debug -sdk iphonesimulator7.1 -project ejecta/Colors.xcodeproj -arch i386 clean build',
				options: {
					stdout: true
				}
			},
			emulate: {
				command: 
					'ios-sim launch ejecta/build/Debug-iphonesimulator/Colors.app --family ipad --stderr stderr.log --stdout stderr.log --exit'
				,
				options: {
					failOnError: true,
					stdout: true
				}
			}
		},
		mkdir: {
			tmp: { options: { create: ['builds/tmp', 'builds/tmp/js'] } }
		},
		clean: {
			builds: ['builds/**/*'],
			ejecta: ['ejecta/App/**/*'],
			lib: ['builds/tmp/lib'],
			tmp: ['builds/tmp']
		},
		replace: {
			game_path: {
				src: ['builds/tmp/index.html'],
				dest: 'builds/tmp/index.html',
				replacements: [{
					from: 'lib/game/main.js',
					to: 'js/game.min.js'
				}, {
					from: '<script type="text/javascript" src="lib/impact/impact.js"></script>',
					to: ''
				}, {
					from: '<script src="lib/game/globals.js"></script>',
					to: ''
				}],
			},
			debug_info: {
				src: ['builds/tmp/lib/game/main.js'],
				dest: 'builds/tmp/lib/game/main.js',
				replacements: [{
					from: '\'impact.debug.debug\',',
					to: ''
				},
				{
					from: '\'plugins.debug\',',
					to: ''
				}],
			},
			ej_impact_debug: {
				src: ['ejecta/App/lib/game/main.js'],
				dest: 'ejecta/App/lib/game/main.js',
				replacements: [{
					from: '\'impact.debug.debug\',',
					to: ''
				}],
			},
			build_info: {
				src: ['builds/tmp/index.html'],
				dest: 'builds/tmp/index.html',
				replacements: [{
					from: '<!-- BUILD INFO -->',
					to: function() {
						// Take a fresh copy in case the version has been bumped
						var pkg = grunt.file.readJSON('package.json');
						return '<p class="build-info"><%= pkg.name %> (' + pkg.version + ')<br><%= grunt.template.today("UTC:dddd, dd/mm/yyyy") %><br><%= grunt.template.today("UTC:HH:MM:ss Z") %></p>';
					}
				}],
			},
			impact_links: {
				src: ['builds/tmp/index.html'],
				dest: 'builds/tmp/index.html',
				replacements: [{
					from: /^.*IMPACT LINKS START[\s\S]*?IMPACT LINKS END.*$/gm,
					to: ''
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
					{ expand: true, cwd: 'builds/tmp', src: ['**'], dest: 'builds/web/', dot: true }
				]
			},
			ejecta: {
				files: [
					{ expand: true, cwd: 'builds/tmp', src: ['**', '!index.html'], dest: 'ejecta/App/', dot: true }
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
		},
		'file-creator': {
		    "ejecta_debug": {
		      "ejecta/App/index.js": function(fs, fd, done) {
		        fs.writeSync(fd, "ejecta.include('lib/impact/impact.js');\nejecta.include('lib/game/main.js');");
		        done();
		      }
		    },
		    "ejecta_release": {
		      "ejecta/App/index.js": function(fs, fd, done) {
		        fs.writeSync(fd, "ejecta.include('js/game.min.js');");
		        done();
		      }
		    }
		  }
	});

	// Helper tasks, not intended to be run alone
	grunt.registerTask('build-tmp', ['clean:builds', 'mkdir:tmp', 'copy:tmp', 'replace:build_info', 'replace:impact_links']);
	grunt.registerTask('bake-tmp', ['build-tmp', 'replace:game_path', 'replace:debug_info', 'shell:game', 'clean:lib', 'uglify:game']);
	grunt.registerTask('build-platforms', ['copy:web']);
	grunt.registerTask('build-debug-ejecta', ['clean:ejecta','copy:ejecta', 'file-creator:ejecta_debug','replace:ej_impact_debug']);
	grunt.registerTask('build-release-ejecta', ['clean:ejecta','copy:ejecta', 'file-creator:ejecta_release']);

	// Build types
	grunt.registerTask('debug', ['jshint', 'build-tmp', 'build-platforms', 'build-debug-ejecta','clean:tmp']);
	grunt.registerTask('release', ['jshint', 'bake-tmp', 'build-platforms', 'build-release-ejecta','clean:tmp']);

	// Dev tasks
	grunt.registerTask('doc', ['jshint', 'jsduck']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('clean-builds', ['clean:builds']);
	grunt.registerTask('test', ['debug', 'karma:unit', 'clean:tmp']);
	grunt.registerTask('emulate_ios', ['debug',  'shell:build', 'shell:emulate'])
};