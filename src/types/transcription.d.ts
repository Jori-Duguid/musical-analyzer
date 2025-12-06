export interface TranscriptionResult {
    text: string;
    words?: { word: string; start: number; end: number }[];
}
