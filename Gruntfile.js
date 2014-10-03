module.exports = function(grunt) {

	grunt.initConfig({

		uglify: {
			options: {
				compress: {
					warnings: true
				},
				banner: '/* AngularJS directives for double horizontal (top & bottom) or double vertical (left & rigth) scroll bars by @przno (Martin Praznovsky), v0.1.2, MIT License */'
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