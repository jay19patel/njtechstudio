import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pt-12 lg:pb-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Simple and Better
            <br />
            <span className="block mt-2">Move to Digitalization</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-ibm-plex-sans-condensed), sans-serif' }}>
            We provide comprehensive digital solutions to transform
            your business with cutting-edge technology and innovation.
          </p>

        </div>

        {/* Right Content - Placeholder for Image/Video */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
                <div className="text-sm font-semibold text-gray-600 mb-3">
                  NJ Tech Studio Updates status
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-xs text-gray-500">Successful</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-xs text-gray-500">Failed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">32</div>
                    <div className="text-xs text-gray-500">No updates</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">2</div>
                    <div className="text-xs text-gray-500">Excluded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

