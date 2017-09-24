const webpackConfig = require('./webpack.config');
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015']
			},
			dist: {
				files: [{
						expand: true,
						cwd: 'src/',
						src: ['**/*.js', '!**/lib/**'],
						dest: 'dist/'
					}
				]
			}
        },
        webpack: {
            options: {
              stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
          },
          copy: {
			css: {
				files: [{
					cwd: 'src/assets/css', // set working folder / root to copy
					src: ['**/*'], // copy all files and subfolders
					dest: 'dist/assets/css', // destination folder
					expand: true // required when using cwd
				}]
            },
            fonts: {
				files: [{
					cwd: 'src/assets/fonts', // set working folder / root to copy
					src: ['**/*'], // copy all files and subfolders
					dest: 'dist/assets/fonts', // destination folder
					expand: true // required when using cwd
				}]
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-babel');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-openui5');
    // grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-webpack');

	

	// Default task(s).
	//'copy','babel', 'uglify', 'watch'
	grunt.registerTask('default',
		[
            'copy',
			'webpack'
		]);
};
