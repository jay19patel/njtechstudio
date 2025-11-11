"use client";

const companiesLogo = [
  { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" },
  { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" },
  { name: "Instagram", logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" },
  { name: "Microsoft", logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" },
  { name: "Walmart", logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" }
];

export default function TrustedClients() {
        return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll 15s linear infinite;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <section className="py-8 lg:py-12 w-full">
        <h3 className="text-base text-center text-slate-400 pb-8 lg:pb-14 font-medium w-full">
          Trusted by leading brands, including —
        </h3>
        <div className="overflow-hidden w-full relative select-none">
          <div className="absolute left-0 top-0 h-full w-32 md:w-48 lg:w-64 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="flex marquee-inner will-change-transform">
            {[...companiesLogo, ...companiesLogo].map((company, index) => (
              <img 
                key={index} 
                className="mx-8 lg:mx-11 h-8 lg:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" 
                src={company.logo} 
                alt={company.name} 
              />
            ))}
                        </div>
          <div className="absolute right-0 top-0 h-full w-32 md:w-48 lg:w-64 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />
                </div>
            </section>
    </>
        );
    }
