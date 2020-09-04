module.exports = function(grunt) {

  var config = require('./.screeps.json')
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var token = grunt.option('token') || config.token;

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
      screeps: {
          options: {
            email,
            token,
            serverUrl: "https://screeps.com",
            branch,
            ptr: false
          },
          dist: {
              src: ['dist/*.js']
          }

      },
      clean: {
        'dist': ['dist']
      },

      // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
      copy: {
        // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
        screeps: {
          files: [{
            expand: true,
            cwd: 'jssrc/',
            src: '**',
            dest: 'dist/',
            filter: 'isFile',
            flatten: true
          }],
        }
      },
  });
  grunt.registerTask('default',  ['clean', 'copy:screeps', 'screeps']);
}
