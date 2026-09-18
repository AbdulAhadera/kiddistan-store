export default function TrustSection() {
  return (
    <section className="w-full px-4 md:px-8 py-16 bg-store-bg rounded-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-400 rounded-none items-stretch overflow-hidden w-full">
        
        {/* 1. LEFT TALL COLUMN */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-300 bg-amber-400/80 rounded-none min-h-[540px] lg:min-h-[640px]" />

        {/* 2. MIDDLE TALL COLUMN */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-400 bg-emerald-800/80 rounded-none min-h-[540px] lg:min-h-[640px]" />

        {/* 3. VERTICAL STRIP */}
        <div className="hidden lg:flex lg:col-span-1 border-r border-slate-300 bg-rose-800/90 rounded-none items-center justify-center">
          <span 
            className="text-white text-3xl font-serif font-bold tracking-wider uppercase whitespace-nowrap rotate-180"
            style={{ writingMode: 'vertical-rl' }}
          >
            Trusted by Parents, Loved by Kids
          </span>
        </div>

        {/* 4. RIGHT STACKED COLUMN (3 TILES) */}
        <div className="lg:col-span-3 flex flex-col gap-0 justify-between rounded-none">
          <div className="bg-slate-400 rounded-none h-[200px] lg:h-[213px] border-b border-slate-300" />
          <div className="bg-indigo-400 rounded-none h-[200px] lg:h-[213px] border-b border-slate-300" />
          <div className="bg-teal-400 rounded-none h-[200px] lg:h-[214px]" />
        </div>

      </div>
    </section>
  );
}