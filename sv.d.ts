/*
Synthesizer V Studio API Definition for Typescript and Javascript
Written by Li Lingfeng on October 29, 2022
Under GNU License
*/
export interface ArrangementSelectionState extends NestedObject, SelectionStateBase, GroupSelection { }

export interface ArrangementView extends NestedObject {
	getNavigation: () => CoordinateSystem;
	getSelection: () => ArrangementSelectionState;
}

export interface Automation extends NestedObject {
	add: (b: number, v: number) => boolean;
	clone: () => Automation;
	get: (b: number) => number;
	getAllPoints: () => Array<Array<number>>;
	getDefinition: () => object;
	getInterpolationMethod: () => string;
	getLinear: (b: number) => number;
	getPoints: (begin: number, end: number) => Array<Array<number>>;
	remove: (b: number) => boolean;
	removeAll: () => undefined;
	simplify: (begin: number, end: number, threshold?: number) => boolean;
}

export interface CoordinateSystem extends NestedObject {
	getTimePxPerUnit: () => number;
	getTimeViewRange: () => Array<number>;
	getValuePxPerUnit: () => number;
	getValueViewRange: () => Array<number>;
	setTimeLeft: (time: number) => undefined;
	setTimeRight: (time: number) => undefined;
	setTimeScale: (scale: number) => undefined;
	setValueCenter: (v: number) => undefined;
	snap: (b: number) => undefined;
	t2x: (t: number) => undefined;
	v2y: (v: number) => undefined;
	x2t: (x: number) => undefined;
	y2v: (y: number) => undefined;
}

export interface GroupSelection {
	clearGroups: () => boolean;
	getSelectedGroups: () => Array<NoteGroupReference>;
	hasSelectedGroups: () => boolean;
	selectGroup: (reference: NoteGroupReference) => undefined;
	unselectGroup: (reference: NoteGroupReference) => boolean;
}

export interface MainEditorView extends NestedObject {
	getCurrentGroup: () => NoteGroupReference;
	getCurrentTrack: () => Track;
	getNavigation: () => CoordinateSystem;
	getSelection: () => TrackInnerSelectionState;
}

export interface NestedObject {
	getIndexInParent: () => number;
	getParent: () => NestedObject | undefined;
	isMemoryManaged: () => boolean;
}

export interface Note extends NestedObject {
	clone: () => Note;
	getAttributes: () => object;
	getDuration: () => number;
	getEnd: () => number;
	getLyrics: () => string;
	getOnset: () => number;
	getPhonemes: () => string;
	getPitch: () => number;
	setAttributes: (attributes: object) => undefined;
	setDuration: (t: number) => undefined;
	setLyrics: (lyrics: string) => undefined;
	setOnset: (t: number) => undefined;
	setPitch: (pitchNumber: number) => undefined;
	setTimeRange: (onset: number, duration: number) => undefined;
}

export interface NoteGroup extends NestedObject {
	addNote: (note: Note) => number;
	clone: () => NoteGroup;
	getName: () => string;
	getNote: (index: number) => Note;
	getNumNotes: () => number;
	getParameter: (type: string) => Automation;
	getUUID: () => string;
	removeNote: (index: number) => undefined;
	setName: (name: string) => undefined;
}

export interface NoteGroupReference extends NestedObject {
	clone: () => NoteGroupReference;
	getDuration: () => number;
	getEnd: () => number;
	getOnset: () => number;
	getPitchOffset: () => number;
	getTarget: () => NoteGroup;
	getTimeOffset: () => number;
	getVoice: () => object;
	isInstrumental: () => boolean;
	isMain: () => boolean;
	setPitchOffset: (pitchOffset: number) => undefined;
	setTarget: (group: NoteGroup) => undefined;
	setVoice: (attributes: object) => undefined;
}

export interface SelectionStateBase {
	clearAll: () => boolean;
	hasSelectedContent: () => boolean;
	hasUnfinishedEdits: () => boolean;
}

export interface PlayBackControl extends NestedObject {
	getPlayhead: () => number;
	getStatus: () => string;
	loop: (beginSecond: number, endSecond: number) => undefined;
	pause: () => undefined;
	play: () => undefined;
	seek: (time: number) => undefined;
	stop: () => undefined;
}

export interface Project extends NestedObject {
	addNoteGroup: (group: NoteGroup, index?: number) => number;
	addTrack: (track: Track) => number;
	getDuration: () => number;
	getFileName: () => string;
	getNoteGroup: (id: number | string) => NoteGroup | undefined;
	getNumNoteGroupsInLibrary: () => number;
	getNumTracks: () => number;
	getTimeAxis: () => TimeAxis;
	getTrack: () => Track;
	newUndoRecord: () => undefined;
	removeNoteGroup: (index: number) => undefined;
	removeTrack: (index: number) => undefined;
}

export interface SV {
	QUARTER: number;
	blackKey: (k: number) => boolean;
	blick2Quarter: (b: number) => number;
	blick2Seconds: (b: number, bpm: number) => number;
	blickRoundDiv: (dividend: number, divisor: number) => number;
	blickRoundTo: (b: number, interval: number) => number;
	create: (type: string) => object;
	finish: () => undefined;
	freq2Pitch: (f: number) => number;
	getArrangement: () => ArrangementView;
	getHostClipboard: () => string;
	getHostInfo: () => object;
	getMainEditor: () => MainEditorView;
	getPhonemesForGroup: (group: NoteGroupReference) => Array<NoteGroupReference>;
	getPlayback: () => PlayBackControl;
	getProject: () => Project;
	pitch2Freq: (p: number) => number;
	quarter2Blick: (q: number) => number;
	seconds2Blick: (s: number, bpm: number) => number;
	setHostClipboard: (text: string) => undefined;
	setTimeout: (timeOut: number, callback: () => any) => undefined;
	showCustomDialog: (form: object) => object;
	showCustomDialogAsync: (form: object, callback: () => any) => undefined;
	showInputBox: (title: string, message: string, defaultText: string) => string;
	showInputBoxAsync: (title: string, message: string, defaultText: string, callback: (ret: string) => any) => undefined;
	showMessageBox: (title: string, message: string) => undefined;
	showMessageBoxAsync: (title: string, message: string, callback?: () => any) => undefined;
	showOkCancelBox: (title: string, message: string) => boolean;
	showOkCancelBoxAsync: (title: string, message: string, callback: (ret: boolean) => any) => undefined;
	showYesNoCancelBox: (title: string, message: string) => string;
	showYesNoCancelBoxAsync: (title: string, message: string, callback: (ret: string) => any) => undefined;
	T: (text: string) => string;
}

export interface TimeAxis extends NestedObject {
	addMeasureMark: (measure: number, numerator: number, denominator: number) => undefined;
	addTempoMark: (b: number, bpm: number) => undefined;
	clone: () => TimeAxis;
	getAllMeasureMarks: () => Array<object>;
	getAllTempoMarks: () => Array<object>;
	getBlickFromSeconds: (t: number) => number;
	getMeasureAt: (b: number) => number;
	getMeasureMarkAt: (measureNumber: number) => object;
	getMeasureMarkAtBlick: (b: number) => object;
	getSecondsFromBlick: (b: number) => number;
	getTempoMarkAt: (b: number) => number;
	removeMeasureMark: (measure: number) => boolean;
	removeTempoMark: (b: number) => boolean;
}

export interface Track extends NestedObject {
	addGroupReference: (group: NoteGroupReference) => number;
	clone: () => Track;
	getDisplayColor: () => string;
	getDisplayOrder: () => number;
	getDuration: () => number;
	getGroupReference: (index: number) => NoteGroupReference;
	getName: () => string;
	getNumGroups: () => string;
	isBounced: () => boolean;
	removeGroupReference: (index: number) => undefined;
	setBounced: (enabled: boolean) => undefined;
	setDisplayColor: (hexColor: string) => undefined;
	setName: (name: string) => undefined;
}

export interface TrackInnerSelectionState extends NestedObject, SelectionStateBase, GroupSelection {
	clearNotes: () => boolean;
	getSelectedNotes: () => Array<Note>;
	hasSelectedNotes: () => boolean;
	selectNote: (note: Note) => undefined;
	unselectNote: (note: Note) => boolean;
}