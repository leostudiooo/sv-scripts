declare module SV {
	const QUARTER: number = 705600000;
	const blackKey: (k: number) => boolean;
	const blick2Quarter: (b: number) => number;
	const blick2Seconds: (b: number, bpm: number) => number;
	const blickRoundDiv: (dividend: number, divisor: number) => number;
	const blickRoundTo: (b: number, interval: number) => number;
	const create: (type: string) => object;
	const finish: () => void;
	const freq2Pitch: (f: number) => number;
	const getArrangement: () => ArrangementView;
	const getHostClipboard: () => string;
	const getHostInfo: () => object;
	const getMainEditor: () => MainEditorView;
	const getPhonemesForGroup: (group: NoteGroupReference) => Array<NoteGroupReference>;
	const getPlayback: () => PlayBackControl;
	const getProject: () => Project;
	const pitch2Freq: (p: number) => number;
	const quarter2Blick: (q: number) => number;
	const seconds2Blick: (s: number, bpm: number) => number;
	const setHostClipboard: (text: string) => void;
	const setTimeout: (timeOut: number, callback: () => any) => void;
	const showCustomDialog: (form: object) => object;
	const showCustomDialogAsync: (form: object, callback: () => any) => void;
	const showInputBox: (title: string, message: string, defaultText: string) => string;
	const showInputBoxAsync: (title: string, message: string, defaultText: string, callback: (ret: string) => any) => void;
	const showMessageBox: (title: string, message: string) => void;
	const showMessageBoxAsync: (title: string, message: string, callback?: () => any) => void;
	const showOkCancelBox: (title: string, message: string) => boolean;
	const showOkCancelBoxAsync: (title: string, message: string, callback: (ret: boolean) => any) => void;
	const showYesNoCancelBox: (title: string, message: string) => string;
	const showYesNoCancelBoxAsync: (title: string, message: string, callback: (ret: string) => any) => void;
	const T: (text: string) => string;

	class ArrangementSelectionState extends NestedObject, SelectionStateBase, GroupSelection {}

	class ArrangementView extends NestedObject {
		getNavigation: () => CoordinateSystem;
		getSelection: () => ArrangementSelectionState;
	}
	
	class Automation extends NestedObject {
		add: (b: number, v: number) => boolean;
		clone: () => Automation;
		get: (b: number) => number;
		getAllPoints: () => Array<Array<number>>;
		getDefinition: () => object;
		getInterpolationMethod: () => string;
		getLinear: (b: number) => number;
		getPoints: (begin: number, end: number) => Array<Array<number>>;
		remove: (b: number) => boolean;
		removeAll: () => void;
		simplify: (begin: number, end: number, threshold?: number) => boolean;
	}
	
	class CoordinateSystem extends NestedObject {
		getTimePxPerUnit: () => number;
		getTimeViewRange: () => Array<number>;
		getValuePxPerUnit: () => number;
		getValueViewRange: () => Array<number>;
		setTimeLeft: (time: number) => void;
		setTimeRight: (time: number) => void;
		setTimeScale: (scale: number) => void;
		setValueCenter: (v: number) => void;
		snap: (b: number) => void;
		t2x: (t: number) => void;
		v2y: (v: number) => void;
		x2t: (x: number) => void;
		y2v: (y: number) => void;
	}
	
	class GroupSelection {
		clearGroups: () => boolean;
		getSelectedGroups: () => Array<NoteGroupReference>;
		hasSelectedGroups: () => boolean;
		selectGroup: (reference: NoteGroupReference) => void;
		unselectGroup: (reference: NoteGroupReference) => boolean;
	}
	
	class MainEditorView extends NestedObject {
		getCurrentGroup: () => NoteGroupReference;
		getCurrentTrack: () => Track;
		getNavigation: () => CoordinateSystem;
		getSelection: () => TrackInnerSelectionState;
	}
	
	class NestedObject {
		getIndexInParent: () => number;
		getParent: () => NestedObject | undefined;
		isMemoryManaged: () => boolean;
	}
	
	class Note extends NestedObject {
		clone: () => Note;
		getAttributes: () => object;
		getDuration: () => number;
		getEnd: () => number;
		getLyrics: () => string;
		getOnset: () => number;
		getPhonemes: () => string;
		getPitch: () => number;
		setAttributes: (attributes: object) => void;
		setDuration: (t: number) => void;
		setLyrics: (lyrics: string) => void;
		setOnset: (t: number) => void;
		setPitch: (pitchNumber: number) => void;
		setTimeRange: (onset: number, duration: number) => void;
	}
	
	class NoteGroup extends NestedObject {
		addNote: (note: Note) => number;
		clone: () => NoteGroup;
		getName: () => string;
		getNote: (index: number) => Note;
		getNumNotes: () => number;
		getParameter: (type: string) => Automation;
		getUUID: () => string;
		removeNote: (index: number) => void;
		setName: (name: string) => void;
	}
	
	class NoteGroupReference extends NestedObject {
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
		setPitchOffset: (pitchOffset: number) => void;
		setTarget: (group: NoteGroup) => void;
		setVoice: (attributes: object) => void;
	}
	
	class SelectionStateBase {
		clearAll: () => boolean;
		hasSelectedContent: () => boolean;
		hasUnfinishedEdits: () => boolean;
	}
	
	class PlayBackControl extends NestedObject {
		getPlayhead: () => number;
		getStatus: () => string;
		loop: (beginSecond: number, endSecond: number) => void;
		pause: () => void;
		play: () => void;
		seek: (time: number) => void;
		stop: () => void;
	}
	
	class Project extends NestedObject {
		addNoteGroup: (group: NoteGroup, index?: number) => number;
		addTrack: (track: Track) => number;
		getDuration: () => number;
		getFileName: () => string;
		getNoteGroup: (id: number | string) => NoteGroup | undefined;
		getNumNoteGroupsInLibrary: () => number;
		getNumTracks: () => number;
		getTimeAxis: () => TimeAxis;
		getTrack: () => Track;
		newUndoRecord: () => void;
		removeNoteGroup: (index: number) => void;
		removeTrack: (index: number) => void;
	}
	

	class TimeAxis extends NestedObject {
		addMeasureMark: (measure: number, numerator: number, denominator: number) => void;
		addTempoMark: (b: number, bpm: number) => void;
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
	
	class Track extends NestedObject {
		addGroupReference: (group: NoteGroupReference) => number;
		clone: () => Track;
		getDisplayColor: () => string;
		getDisplayOrder: () => number;
		getDuration: () => number;
		getGroupReference: (index: number) => NoteGroupReference;
		getName: () => string;
		getNumGroups: () => string;
		isBounced: () => boolean;
		removeGroupReference: (index: number) => void;
		setBounced: (enabled: boolean) => void;
		setDisplayColor: (hexColor: string) => void;
		setName: (name: string) => void;
	}
	
	class TrackInnerSelectionState extends NestedObject, SelectionStateBase, GroupSelection {
		clearNotes: () => boolean;
		getSelectedNotes: () => Array<Note>;
		hasSelectedNotes: () => boolean;
		selectNote: (note: Note) => void;
		unselectNote: (note: Note) => boolean;
	}
}