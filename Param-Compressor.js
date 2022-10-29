function getClientInfo() {
    return {
        "name": "Param Compressor",
        "category": "Utils",
        "author": "Github @leostudiooo",
        "versionNumber": 0.1,
        "minEditorVersion": 65536
    }
}

function getCompParam() {
    var myForm = {
        "title": "Param Compressor",
        "message": "This is a parameter compressor used for controlling the \"dynamics\" of your parameters.",
        "widgets": [
            {
                "name": "parameter",
                "type": "ComboBox",
                "label": "Parameter",
                "choices": [
                    "Pitch Deviation",
                    "Loudness",
                    "Tension",
                    "Breathiness",
                    "Gender",
                    "Tone Shift"
                ],
                "default": 0
            },
            {
                "name": "polarity",
                "type": "ComboBox",
                "label": "Polarity",
                "choices": [
                    "Positive",
                    "Negative",
                    "Both"
                ],
                // when "Positive", compress the parameter from the top to the middle and vice versa; when "Both", compress the parameter from both sides to the middle.
                "default": 0
            },
            {
                "name": "threshold",
                "type": "Slider",
                "label": "Threshold (Mapping to 0~4096)",
                "format" : "%1.0f",
                "minValue": 1,
                "maxValue": 4096,
                // for convenience in the pitchDelta param, since its range is 0~8192, and will translate the param to -4096~4096 for polarity; in other params the threshold will be translated to 0~1.
                // [To-Do] develop another program to get the value(-4096~4096) of the selected control point.
                "interval": 1,
                "default": 2048
            },
            {
                "name": "rate",
                "type": "Slider",
                "label": "Rate",
                "format" : "%1.0f",
                "minValue": 1,
                "maxValue": 100,
                "interval": 1,
                "default": 10
            },
            {
                "name": "attack",
                "type": "Slider",
                "label": "Attack (in Semibreves)",
                "format" : "%1.2f",
                "minValue": 0,
                "maxValue": 1,
                // in semibreves
                "interval": 0.01,
                "default": 0
            },
            {
                "name": "release",
                "type": "Slider",
                "label": "Release (in Semibreves)",
                "format" : "%1.2f",
                "minValue": 0,
                "maxValue": 1,
                "interval": 0.01,
                "default": 0
            }
        ],
        "buttons": "OkCancel"
    }
    var result = SV.showCustomDialog(myForm);
    return result;
}

function convertParamName(paramType) {
    typeNames = ["pitchDelta", "loudness", "tension", "breathiness", "gender", "toneShift"];
    displayNames = ["Pitch Deviation", "Loudness", "Tension", "Breathiness", "Gender", "Tone Shift"];
    for (var i = 0; i < displayNames.length; i++) {
        if (paramType == displayNames[i]) {
            paramType = typeNames[i];
        }
    }
    return paramType;
}

function translate(paramType, value) {
    if (paramType != "pitchDelta") {
        return value / 4096;
    }
    else {
        return value;
    }

}

function convertPolarityMode(polarityMode) {
    if (polarityMode == "Positive") {
        return 1;
    }
    else if (polarityMode == "Negative") {
        return -1;
    }
    else {
        return 0;
    }
}

function compress(paramType, polarityMode, threshold, rate, attack, release) {
    paramType = convertParamName(paramType);
    var b = 0;
    var b1 = 0;
    var v = 0;
    var count = 0;
    var compressed = false;
    var selectedNotes = SV.getMainEditor().getSelection().getSelectedNotes()
    // b for Blicks, v for Value
    var area = [selectedNotes[1].getOnSet(), selectedNotes[selectedNotes.length - 1].getEnd()];
    var parameter = selectedNotes[1].getParent().getParameter(paramType)
    var ctrlPts = parameter.getPoints(area[0], area[1]);
    threshold = convertParamName(paramType, threshold);

    switch (polarityMode) {
        case 1:
            for (var i = 0; i < ctrlPts.length; i++) {
                if (ctrlPts[i][1] > threshold) {
                    if (compressed == false) {
                        b = ctrlPts[i][0];
                    }
                    // when the value is higher than the threshold and the next value is lower than the threshold, compress.
                    // when the value is higher than the threshold and it is the last control point, compress.
                    // when the value is higher than the threshold and the time difference between the current and the first point that is higher than the threshold is more than the attack time, compress.
                    if (((i + 1 < ctrlPts.length || i == ctrlPts.length) || ctrlPts[i][0] - b > attack) && (ctrlPts[i][1] > threshold)) {
                        v = (ctrlPts[i][1] - threshold) / rate + threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                        b1 = ctrlPts[i][0];
                        compressed = true;
                    }
                }
                else {
                    // when the time is higher than the release time, stop compressing.
                    if (compressed == true && ctrlPts[i][0] - b1 < release) {
                        v = (ctrlPts[i][1] - threshold) / rate + threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                    }
                    else if (compressed == true && ctrlPts[i][0] - b1 >= release) {
                        compressed = false;
                    }
                }
                if (compressed) {
                    count++;
                }
            }
            break;

        case -1:
            for (var i = 0; i < ctrlPts.length; i++) {
                if (0 - ctrlPts[i][1] > threshold) {
                    if (compressed == false) {
                        b = ctrlPts[i][0];
                    }
                    // when the value is higher than the threshold and the next value is lower than the threshold, compress.
                    // when the value is higher than the threshold and it is the last control point, compress.
                    // when the value is higher than the threshold and the time difference between the current and the first point that is higher than the threshold is more than the attack time, compress.
                    if (((i + 1 < ctrlPts.length || i == ctrlPts.length) || ctrlPts[i][0] - b > attack) && (ctrlPts[i][1] > threshold)) {
                        v = (0 - ctrlPts[i][1] + threshold) / rate - threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                        b1 = ctrlPts[i][0];
                        compressed = true;
                    }
                }
                else {
                    // when the time is higher than the release time, stop compressing.
                    if (compressed == true && ctrlPts[i][0] - b1 < release) {
                        v = (0 - ctrlPts[i][1] + threshold) / rate - threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                    }
                    else if (compressed == true && ctrlPts[i][0] - b1 >= release) {
                        compressed = false;
                    }
                }
            }
            if (compressed) {
                count++;
            }
            break;

        case 0:
            for (var i = 0; i < ctrlPts.length; i++) {
                if (ctrlPts[i][1] > threshold) {
                    if (compressed == false) {
                        b = ctrlPts[i][0];
                    }
                    // when the value is higher than the threshold and the next value is lower than the threshold, compress.
                    // when the value is higher than the threshold and it is the last control point, compress.
                    // when the value is higher than the threshold and the time difference between the current and the first point that is higher than the threshold is more than the attack time, compress.
                    if (((i + 1 < ctrlPts.length || i == ctrlPts.length) || ctrlPts[i][0] - b > attack) && (ctrlPts[i][1] > threshold)) {
                        v = (ctrlPts[i][1] - threshold) / rate + threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                        b1 = ctrlPts[i][0];
                        compressed = true;
                    }
                }
                else {
                    // when the time is higher than the release time, stop compressing.
                    if (compressed == true && ctrlPts[i][0] - b1 < release) {
                        v = (ctrlPts[i][1] - threshold) / rate + threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                    }
                    else if (compressed == true && ctrlPts[i][0] - b1 >= release) {
                        compressed = false;
                    }
                }
                if (compressed) {
                    count++;
                }
            }
            for (var i = 0; i < ctrlPts.length; i++) {
                if (0 - ctrlPts[i][1] > threshold) {
                    if (compressed == false) {
                        b = ctrlPts[i][0];
                    }
                    // when the value is higher than the threshold and the next value is lower than the threshold, compress.
                    // when the value is higher than the threshold and it is the last control point, compress.
                    // when the value is higher than the threshold and the time difference between the current and the first point that is higher than the threshold is more than the attack time, compress.
                    if (((i + 1 < ctrlPts.length || i == ctrlPts.length) || ctrlPts[i][0] - b > attack) && (ctrlPts[i][1] > threshold)) {
                        v = (0 - ctrlPts[i][1] + threshold) / rate - threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                        b1 = ctrlPts[i][0];
                        compressed = true;
                    }
                }
                else {
                    // when the time is higher than the release time, stop compressing.
                    if (compressed == true && ctrlPts[i][0] - b1 < release) {
                        v = (0 - ctrlPts[i][1] + threshold) / rate - threshold;
                        parameter.addPoint(ctrlPts[i][0], v);
                    }
                    else if (compressed == true && ctrlPts[i][0] - b1 >= release) {
                        compressed = false;
                    }
                }
                if (compressed) {
                    count++;
                }
            }
            break;

        default:
            break;
    }
}

function main() {
    var result = getCompParam();
    if (result.status == true) {
        compressedCtrlPt = compress(result.answers.parameter, convertPolarityMode(result.answers.polarity), result.answers.threshold, result.answers.rate, result.answers.attack * 4 * SV.QUARTER, result.answers.release * 4 * SV.QUARTER);
        SV.showMessageBox("Param Compressor", "Compressed" + compressedCtrlPt + "control points.");
    }
    else if (result.status == false) {
        SV.showMessageBox("Param Compressor", "Compression cancelled.");
    }
    SV.finish();
}