declare module SV {
	const QUARTER: number;
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

	

}