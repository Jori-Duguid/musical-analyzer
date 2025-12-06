import React from "react";

interface Props {
    onFileSelected: (file: File) => void;
}

export default function AudioUploader({ onFileSelected }: Props) {
    /**
     * Provides file input and basic validation.
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("audio/")) {
            alert("Please upload a valid audio file.");
            return;
        }
        onFileSelected(file);
    };

    return (
        <div className="audio-uploader">
            <label htmlFor="audio-input" className="btn">
                Select audio file
            </label>
            <input
                id="audio-input"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </div>
    );
}
