'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  /** Accessible name for the player, e.g. the film title. */
  title: string;
  className?: string;
  /** Start playback as soon as the player mounts (used by the film modal). */
  autoPlay?: boolean;
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Video player with custom controls matching the premium theme.
 *
 * The file is not fetched until the viewer presses play (or `autoPlay` is set),
 * so a grid of films costs one poster image each instead of several megabytes
 * of video. Seek and volume use range inputs, which are keyboard operable for
 * free; space, arrows, M and F work anywhere in the player.
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  className,
  autoPlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      // `play()` rejects when the browser blocks autoplay; surface it rather
      // than leaving the button looking stuck.
      video.play().catch((error: unknown) => {
        console.error(`Unable to play video "${title}":`, error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [title]);

  const seekBy = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void video.parentElement?.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    if (autoPlay) togglePlay();
    // Only on mount: re-running would restart playback mid-view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Let the range inputs handle their own arrow keys.
    if ((event.target as HTMLElement).tagName === 'INPUT') return;

    switch (event.key) {
      case ' ':
      case 'k':
        event.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        seekBy(-5);
        break;
      case 'ArrowRight':
        event.preventDefault();
        seekBy(5);
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        toggleFullscreen();
        break;
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn('group relative overflow-hidden bg-black', className)}
      onKeyDown={handleKeyDown}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload={autoPlay ? 'metadata' : 'none'}
        className="h-full w-full object-contain"
        aria-label={title}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsWaiting(true)}
        onPlaying={() => setIsWaiting(false)}
        onCanPlay={() => setIsWaiting(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setIsMuted(event.currentTarget.muted);
        }}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Centre play button, shown while paused */}
      {!isPlaying && !isWaiting && (
        <button
          onClick={togglePlay}
          aria-label={`Play ${title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-premium hover:bg-black/40"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent shadow-premium-lg transition-transform duration-200 group-hover:scale-110">
            <Play className="ml-1 h-7 w-7" fill="currentColor" />
          </span>
        </button>
      )}

      {isWaiting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40" role="status">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
          <span className="sr-only">Loading video</span>
        </div>
      )}

      {/* Control bar */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100',
          isPlaying ? 'opacity-0' : 'opacity-100'
        )}
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(event) => {
            const video = videoRef.current;
            if (!video) return;
            video.currentTime = Number(event.target.value);
            setCurrentTime(Number(event.target.value));
          }}
          aria-label={`Seek ${title}`}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30 accent-accent"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${progress}%, rgba(255,255,255,0.25) ${progress}%)`,
          }}
        />

        <div className="flex items-center gap-3 text-white">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-premium hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>

          <span className="font-mono text-xs tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-premium hover:bg-white/20"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(event) => {
                const video = videoRef.current;
                if (!video) return;
                const next = Number(event.target.value);
                video.volume = next;
                video.muted = next === 0;
              }}
              aria-label="Volume"
              className="hidden h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30 accent-accent sm:block"
            />
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-premium hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
