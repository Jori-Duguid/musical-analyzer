import React, { useEffect, useRef } from "react";

interface WaveformProps {
    fileUrl: string | null;
}

export function Waveform({ fileUrl }: WaveformProps) {
    /**
     * Lightweight waveform preview using canvas + Web Audio API.
     * It decodes the audio and draws a simple waveform. This is intentionally
     * small and dependency-free so you can replace it with Wavesurfer.js later.
     */

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!fileUrl) return;
        let canceled = false;

        async function draw() {
            try {
                const resp = await fetch(fileUrl!); //janky fix !
                const ab = await resp.arrayBuffer();
                const ctx = new (window.AudioContext ||
                    (window as any).webkitAudioContext)();
                const audioBuffer = await ctx.decodeAudioData(ab);
                if (canceled) return;

                const raw = audioBuffer.getChannelData(0);
                const canvas = canvasRef.current!;
                const width = (canvas.width =
                    canvas.clientWidth * devicePixelRatio);
                const height = (canvas.height = 100 * devicePixelRatio);
                const offs = height / 2;
                const step = Math.ceil(raw.length / width);
                const amp = height / 2;
                const c = canvas.getContext("2d")!;
                c.clearRect(0, 0, width, height);
                c.lineWidth = 1;
                c.beginPath();

                for (let i = 0; i < width; i++) {
                    let minVal = 1.0;
                    let maxVal = -1.0;
                    const start = i * step;
                    const end = Math.min(start + step, raw.length);
                    for (let j = start; j < end; j++) {
                        const val = raw[j];
                        if (val < minVal) minVal = val;
                        if (val > maxVal) maxVal = val;
                    }
                    const y1 = offs + minVal * amp;
                    const y2 = offs + maxVal * amp;
                    c.moveTo(i, y1);
                    c.lineTo(i, y2);
                }
                c.stroke();
            } catch (err) {
                // If decode fails (CORS or unsupported), we silently ignore
                console.warn("Waveform draw failed", err);
            }
        }

        draw();
        return () => {
            canceled = true;
        };
    }, [fileUrl]);

    return (
        <div className="waveform-canvas">
            <canvas ref={canvasRef} style={{ width: "100%", height: 100 }} />
        </div>
    );
}
