const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', bindButtonsActions)

function bindButtonsActions() {
    document.querySelectorAll('.env-switch')
        .forEach(envSwitch =>
            envSwitch.addEventListener('click', setEnv)
        )
}

function resetOthers(envName) {
    document.querySelectorAll('.env-switch')
        .forEach(envSwitch => {
            if (envSwitch.dataset.env !== envName) {
                envSwitch.checked = false
            }
        })
}

function setEnv(e) {
    const elem = e.target
    const envName = elem.dataset.env
    resetOthers(envName)

    copyHostsFile(envName)
}

function copyHostsFile(envName) {
    console.log('sendng', envName)
    ipcRenderer.send('copyHosts', envName);
}