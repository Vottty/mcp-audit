import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

const serviceOptions = ['Brand', 'Digital', 'Campaign', 'Other'];

export function ServicePills() {
  const [services, setServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service],
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight mb-2">What sort of service?</h2>
      <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>

      <div className="flex flex-wrap gap-3">
        {serviceOptions.map((service) => {
          const isActive = services.includes(service);

          return (
            <motion.button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                  : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
              }`}
            >
              {service}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex"
                  >
                    <Check className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="italic text-xs mt-6"
          >
            Please click to select services above.
          </motion.p>
        ) : (
          <motion.div
            key="active"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden mt-6"
          >
            <div className="flex items-center justify-between gap-4 bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl px-6 py-4">
              <p className="text-sm text-[#1C2E1E]">
                Ready to inquire about: {services.join(', ')}
              </p>
              <button
                type="button"
                className="flex items-center gap-1 text-[#4D6D47] uppercase text-xs font-medium whitespace-nowrap"
              >
                Let's Go
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
