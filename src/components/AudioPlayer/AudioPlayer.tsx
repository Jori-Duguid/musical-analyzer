interface AudioPlayerProps {
    fileUrl: string | null;
}

export function AudioPlayer({ fileUrl }: AudioPlayerProps) {
    /**
     * Goal:
     * - Display audio controls
     * - Show current playback time + duration later
     */

    if (!fileUrl) return <p>No audio loaded.</p>;

    return <audio controls src={fileUrl} />;
}
