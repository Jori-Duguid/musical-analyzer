import { useEffect, useState } from "react";

export function useAudio() {
    /**
     * Loads a File into an object URL and extracts duration (via HTMLAudioElement)
     */
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        return () => {
            if (fileUrl) URL.revokeObjectURL(fileUrl);
        };
    }, [fileUrl]);

    const loadAudio = (f: File) => {
        if (!f) return;
        setFile(f);
        const url = URL.createObjectURL(f);
        setFileUrl(url);

        // Use audio element for quick duration reading
        const audio = new Audio(url);
        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration);
        });
    };

    return { fileUrl, duration, loadAudio, file };
}
