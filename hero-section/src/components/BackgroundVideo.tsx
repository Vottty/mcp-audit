import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop mouse scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let previousX: number | null = null;
    let targetTime = 0;
    let isSeeking = false;

    const handleSeeked = () => {
      isSeeking = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      if (previousX === null) {
        previousX = event.clientX;
        return;
      }

      const currentX = event.clientX;
      const delta = currentX - previousX;
      previousX = currentX;

      targetTime += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.min(Math.max(targetTime, 0), video.duration);

      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // Mobile autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyMobilePlayback = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.play().catch(() => {
          // autoplay can be rejected before user interaction; safe to ignore
        });
      }
    };

    applyMobilePlayback();
    window.addEventListener('resize', applyMobilePlayback);

    return () => window.removeEventListener('resize', applyMobilePlayback);
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
