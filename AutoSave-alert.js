function getClientInfo() {
    return {
        "name": "Autosave Helper",
        "category": "Utils",
        "author": "Github @leostudiooo",
        "versionNumber": 0.1,
        "minEditorVersion": 65536
    }
}

function main() {
    //    Looks like they don't provide a method to access files so it is just an alert ;(
    //    var absPath = getFileName();
    //    var backupPath = absPath.slice(0, absPath.lastIndexOf(".svp")) + ".svp";

    //    SV.showMessageBox("Auto-save is ON", "Start your creation without any concern and have fun!")
    var alertTime = 1000 * Number(
        SV.showInputBox(
            "Autosave Helper",
            "When do you want me to remind you to save the project? (In seconds, default 600)",
            600
        )
    );

    alrt(alertTime);
}

function alrt(t) {
    SV.showMessageBox(
        "Hi!",
        "It's time for a Ctrl+S!"
    )
    SV.setTimeout(
        t,
        function() {
            alrt(t);
        }
    );
}