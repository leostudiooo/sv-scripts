function getClientInfo() {
    return {
        "name": "Delete 0-Duration Notes",
        "category": "Utils",
        "author": "Github @leostudiooo",
        "versionNumber": 0.1,
        "minEditorVersion": 65536
    }
}

function main() {
    var count = 0;
    var noteGroup = SV.getMainEditor().getCurrentGroup().getTarget()

    for (var index = 0; index < noteGroup.getNumNotes(); index++) {
        if (noteGroup.getNote(index).getDuration() == 0) {
            noteGroup.removeNote(index);
            count++;
        }
    }

    SV.showMessageBox(
        "Cleaning Process Complete.",
        "Removed " + count + " 0-Duration Note(s)."
    )
}