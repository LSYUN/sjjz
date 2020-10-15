
const spawn = require('child_process').spawn;
const uploadDir = require('./deploylib').UploadDir;


deploy('build');
function deploy(buildFolder) {
    console.log('buildFolder', buildFolder);
    const chmod = spawn('chmod', ['-R', '777', buildFolder + '/'])
    chmod.on('exit', function (code, signal) {
        console.log('auth success');
        var server = {
            // host: '192.168.60.189',
            // port: 22,
            // username: 'dev',
            // password: 'sendi123456'
            host: '120.79.30.239',
            port: '22',
            // username: 'root',
            // password: 'tobeno.1lsyun'
            username: 'developer',
            password: 'dev@123'
        }
        uploadDir(server, buildFolder + '/', '/data/app/sjjz', function (err) {
            if (err)
                throw err;
            console.log('success')
        });
    })

}
