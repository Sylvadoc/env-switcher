const { exec } = require('sudo-prompt')

module.exports.getHostsPath = () => {
    if (process.platform === 'win32') {
        return 'dont know th e path'
    }

    return '/etc/hosts'
}

module.exports.execSudo = (cmd) => {

}