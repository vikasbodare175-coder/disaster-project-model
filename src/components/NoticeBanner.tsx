import React from 'react';
import { AlertTriangle, RefreshCw, X, Radio } from 'lucide-react';

interface NoticeBannerProps {
  isLiveMode: boolean;
  onToggleLiveMode: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({
  isLiveMode,
  onToggleLiveMode,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) {
    return (
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setDismissed(false)}
          className="text-xs text-amber-700 hover:underline flex items-center gap-1"
        >
          <AlertTriangle className="w-3 h-3" />
          <span>Show connection notice</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`mb-6 rounded-lg px-4 py-3 flex items-center justify-between gap-3 text-sm transition-colors border ${
      isLiveMode 
        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
        : 'bg-[#FEF9E7] border-[#FBE39A] text-[#8C6D1F]'
    }`}>
      <div className="flex items-center gap-2.5">
        {isLiveMode ? (
          <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
        ) : (
          <span className="text-base leading-none select-none shrink-0" role="img" aria-label="warning">
            ⚠️
          </span>
        )}
        <p className="font-medium text-xs md:text-sm">
          {isLiveMode 
            ? 'Live simulation mode is active. Real-time hazard sensors and incident ticks are streaming.' 
            : 'Demo data is displayed. Live disaster data is not connected.'}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onToggleLiveMode}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
            isLiveMode
              ? 'bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-100/50'
              : 'bg-white/80 hover:bg-white border-amber-300 text-amber-900 shadow-2xs'
          }`}
        >
          {isLiveMode ? 'Return to Demo Mode' : 'Enable Live Stream'}
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-amber-600 hover:text-amber-800 rounded-md"
          title="Dismiss notice"
          aria-label="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
