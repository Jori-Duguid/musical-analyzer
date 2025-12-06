import type { TranscriptionResult } from "../types/transcription";

/**
 * speechToText(file)
 * ------------------
 * This module provides a single exported function that returns a TranscriptionResult.
 * The shipped implementation is a "mock" (returns a sampled result after a short delay)
 * because running Whisper or other STT models in-browser is non-trivial and/or
 * requires server-side credentials.
 *
 * I include two options below:
 *  - MOCK mode (default): works offline and lets the UI be exercised.
 *  - TEMPLATE server-side call (commented): shows how you'd POST the file to a server
 *    endpoint that then calls OpenAI / Whisper or another STT service. Do NOT put API
 *    keys in frontend code.
 */

const MOCK = true;

export async function speechToText(file: File): Promise<TranscriptionResult> {
    if (MOCK) {
        // Fake delay so UI shows loading state
        await new Promise((r) => setTimeout(r, 1000));
        // Very naive "word extraction" — not real transcription.
        const fakeText = `Mock transcription for ${file.name}. This is a placeholder.`;
        const words = fakeText
            .split(/\s+/)
            .map((w, i) => ({
                word: w.replace(/[^\w]/g, ""),
                start: i * 0.5,
                end: i * 0.5 + 0.4,
            }));
        return { text: fakeText, words };
    }

    // SERVER-SIDE PATTERN (recommended)
    // ---------------------------------
    // The safe way is to upload `file` to your server and let the server call OpenAI
    // or another STT service with your secret key. Example (server endpoint: /api/transcribe):
    //
    // const fd = new FormData();
    // fd.append('file', file);
    // const res = await fetch('/api/transcribe', { method: 'POST', body: fd });
    // if (!res.ok) throw new Error('Transcription failed');
    // return res.json();
    //
    // (Server code then calls OpenAI's /v1/audio/transcriptions or other model and returns JSON.)

    throw new Error(
        "Non-mock transcription not implemented. See comments in this file."
    );
}
