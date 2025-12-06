export function getFileExtension(filename: string) {
    /** Goal: Basic helper for file extension parsing */
    return filename.split(".").pop();
}
