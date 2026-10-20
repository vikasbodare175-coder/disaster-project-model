import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Radio, 
  Send, 
  CheckCircle2, 
  Volume2, 
  Smartphone, 
  Tv, 
  ShieldAlert 
} from 'lucide-react';
import { RegionData } from '../types/disaster';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: RegionData;
  onBroadcastSent: (message: string) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  currentRegion,
  onBroadcastSent,
}) => {
  const [headline, setHeadline] = useState(`URGENT: Disaster Threat Advisory for ${currentRegion.name}`);
  const [severity, setSeverity] = useState<'Extreme' | 'Severe' | 'Moderate'>('Extreme');
  const [instructions, setInstructions] = useState(
    'Seek reinforced higher ground immediately. Keep communication lines clear for emergency responders. Monitor official DisasterMonitor bulletin.'
  );
  const [channels, setChannels] = useState({
    sirens: true,
    cellBroadcast: true,
    localTvRadio: true,
    socialAlert: true,
  });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSent(true);
    onBroadcastSent(headline);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-base font-bold leading-tight">Public Emergency Broadcast (CAP)</h3>
              <p className="text-xs text-red-100">Common Alerting Protocol Warning Generator</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-red-200 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSent ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Broadcast Transmitted Successfully</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Emergency message relayed through civil sirens, cell broadcast gateways, and local disaster response nodes.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Administrative Sector
              </label>
              <input
                type="text"
                disabled
                value={`${currentRegion.name}, ${currentRegion.country}`}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Alert Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs md:text-sm font-medium focus:ring-2 focus:ring-red-500/20 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Severity Tier
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="Extreme">Extreme (Life Threat)</option>
                  <option value="Severe">Severe (Action Needed)</option>
                  <option value="Moderate">Moderate (Advisory)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Validity Window
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800">
                  <option>Next 6 Hours</option>
                  <option>Next 12 Hours</option>
                  <option>Next 24 Hours</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Immediate Public Instruction
              </label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-red-500/20 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Channels */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Active Relay Transmitters
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={channels.sirens}
                    onChange={(e) => setChannels({ ...channels, sirens: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500/20"
                  />
                  <Volume2 className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-slate-800">Civil Defense Sirens</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={channels.cellBroadcast}
                    onChange={(e) => setChannels({ ...channels, cellBroadcast: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500/20"
                  />
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-slate-800">Cell Broadcast SMS</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={channels.localTvRadio}
                    onChange={(e) => setChannels({ ...channels, localTvRadio: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500/20"
                  />
                  <Tv className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-slate-800">Radio & TV Override</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={channels.socialAlert}
                    onChange={(e) => setChannels({ ...channels, socialAlert: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500/20"
                  />
                  <Radio className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">App Push Relay</span>
                </label>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Transmit Broadcast</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
