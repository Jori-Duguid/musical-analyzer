import React, { useState } from "react";
import AudioUploader from "./components/AudioUploader/AudioUploader";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { Waveform } from "./components/Waveform/Waveform";
import { TranscriptionViewer } from "./components/Transcription/TranscriptionViewer";
import { useAudio } from "./hooks/useAudio";
import { useTranscription } from "./hooks/useTranscription";
import { formatTime } from "./utils/timeFormatter";
import styled from "styled-components";

export default function App() {
    const { fileUrl, duration, loadAudio, file } = useAudio();
    const { transcribe, loading: transcribing, result } = useTranscription();
    const [transcript, setTranscript] = useState<string>("");

    const handleFile = (file: File) => {
        loadAudio(file);
    };

    const handleTranscribe = async () => {
        if (!file) return;
        const res = await transcribe(file);
        setTranscript(res.text);
    };

    return (
        <DivMain>
            <header>
                <h1>Musical Analyzer — Audio → Transcription</h1>
            </header>

            <main>
                <section className="uploader">
                    <AudioUploader onFileSelected={handleFile} />
                </section>

                <section className="player">
                    <AudioPlayer fileUrl={fileUrl} />
                    <div className="metadata">
                        <strong>Duration:</strong>
                        <span>{duration ? formatTime(duration) : "—"}</span>
                    </div>
                </section>

                <section className="waveform">
                    <Waveform fileUrl={fileUrl} />
                </section>

                <section className="transcription">
                    <button
                        onClick={handleTranscribe}
                        disabled={!file || transcribing}
                    >
                        {transcribing ? "Transcribing…" : "Transcribe Audio"}
                    </button>

                    <TranscriptionViewer text={transcript || result.text} />
                </section>
            </main>

            <footer>
                <p>
                    Note: transcription in this starter is a mock. To use a real
                    model, swap the service in{" "}
                    <code>src/services/speechToText.ts</code> with a server-side
                    endpoint.
                </p>
            </footer>
        </DivMain>
    );
}

const DivMain = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
`;
