module.exports = function(grunt) {

  // ========================================================================
  // High level variables

  var config = {
    webroot : 'data',
    styleguide : 'passbolt-styleguide',
    modules_path : 'node_modules'
  };

  // ========================================================================
  // Configure task options

  grunt.initConfig({
    config : config,
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      css: [
        '<%= config.webroot %>/css/*.css'
      ]
    },
    shell: {
      updatestyleguide: {
        options: {
          stderr: false
        },
        command: 'rm -rf <%= config.modules_path %>/<%= config.styleguide %>; npm install'
      }

    },
    copy: {
      styleguide : {
        files: [{
          // Icons
          nonull: true,
          cwd: '<%= config.modules_path %>/<%= config.styleguide %>/src/img/logo',
          src: ['icon-19.png','icon-128.png'],
          dest: './skin',
          expand: true
        },
        {
          // Images
          nonull: true,
          cwd: '<%= config.modules_path %>/<%= config.styleguide %>/src/img',
          src: ['logo/**','third_party/**'],
          dest: '<%= config.webroot %>/img',
          expand: true
        },{
          // Less
          cwd: '<%= config.modules_path %>/<%= config.styleguide %>/build/css',
          src: ['config_debug_ff.min.css', 'external.min.css', 'login.min.css', 'main_ff.min.css','setup_ff.min.css'],
          dest: '<%= config.webroot %>/css',
          expand: true
        }]
      },
    },
    watch: {
      js: {
        files: [
          'data/**/*.js',
          'lib/**/*.js',
        ],
        tasks: [
          'chrome-extensions-reloaded'
        ]
      }
    }
  });

  // ========================================================================
  // Initialise
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-chrome-extensions-reloaded');

  // ========================================================================
  // Register Tasks

  // Styleguide update
  grunt.registerTask('styleguide-update', ['shell:updatestyleguide','copy:styleguide']);

};
