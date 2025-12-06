export async function extractMetadata(file: File) {
    /**
     * Goal:
     * - Use Web Audio API for deeper metadata analysis (sample rate, channels, etc.)
     */

    const arrayBuffer = await file.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    return {
        duration: audioBuffer.duration,
        sampleRate: audioBuffer.sampleRate,
        channels: audioBuffer.numberOfChannels,
    };
}
