/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

systems({
  retryExample: {

    // Dependent systems
    depends: [],

    // More images:  http://images.azk.io
    image: { docker: 'azukiapp/node:0.10' },

    // Steps to execute before running instances
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      '/azk/#{manifest.dir}/node_modules': persistent('node-modules-#{system.name}')
    },
    scalable: {default: 0},
    http: false
  }
});
