import { useState } from "react";
import { speechToText } from "../services/speechToText";
import type { TranscriptionResult } from "../types/transcription";

export function useTranscription() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TranscriptionResult>({
        text: "",
        words: [],
    });

    const transcribe = async (file: File) => {
        setLoading(true);
        try {
            const res = await speechToText(file);
            setResult(res);
            return res;
        } finally {
            setLoading(false);
        }
    };

    return { transcribe, loading, result };
}
