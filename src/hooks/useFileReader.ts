export function useFileReader() {
    /**
     * Goal:
     * - Read file contents as ArrayBuffer or text
     * - Useful for WASM-based transcription
     */

    const readAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    return { readAsArrayBuffer };
}
