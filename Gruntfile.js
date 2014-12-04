module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		uglify: {
			options: {
				compress: {
					warnings: true
				},
				banner: '/* <%= pkg.description %> by @<%= pkg.author %>, v<%= pkg.version %>, <%= pkg.homepage %>, <%= pkg.license %> license */'
			},
			my_target: {
				files: {
					'double-scroll-bars.min.js': ['double-scroll-bars.js']
				}
			}
		},

		jshint: {
			my_target: [
				'*.json',
				'*.js, !*.min.js'
			]
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', 'hint js and min', ['jshint', 'uglify']);

};