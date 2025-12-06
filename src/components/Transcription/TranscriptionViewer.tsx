interface TranscriptionViewerProps {
    text: string;
}

export function TranscriptionViewer({ text }: TranscriptionViewerProps) {
    /**
     * Goal:
     * - Display transcription text
     * - Later: highlight words, show timestamps, allow interaction
     */
    return (
        <div>
            <h2>Transcription</h2>
            <p>{text || "Transcription will appear here..."}</p>
        </div>
    );
}
