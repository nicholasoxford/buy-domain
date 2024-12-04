import WaterWaveAnimation from "./water-wave-animation";

export default function New() {
  return (
    <div className="relative w-full h-screen flex">
      {/* Left side with dark theme */}
      <div className="w-1/2 bg-slate-900 flex items-center justify-center p-12">
        <div className="max-w-xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Domain Bobber
            </h1>
            <p className="text-xl md:text-2xl text-slate-400">
              Catch the perfect domain name
            </p>
          </div>

          <div className="space-y-6">
            {/* Feature points */}
            {[
              {
                title: "List Your Domains",
                description:
                  "Easily list your unused domains for sale in minutes",
                icon: "🎣",
              },
              {
                title: "Set Your Price",
                description:
                  "You're in control - set your own pricing and terms",
                icon: "💰",
              },
              {
                title: "Secure Transactions",
                description: "Safe and secure domain transfers, guaranteed",
                icon: "🔒",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-xl text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 
                     rounded-full text-lg font-medium transition-colors duration-200
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Start Selling Domains
          </button>
        </div>
      </div>

      {/* Right side with animation and search */}
      <div className="w-1/2 relative">
        <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 z-20 w-full max-w-lg">
          {/* Search Box */}
          <div className="relative px-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter your dream domain..."
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-sky-100/80 
                         focus:border-sky-400 focus:outline-none shadow-lg
                         placeholder:text-slate-400 bg-white/95 backdrop-blur-sm
                         transition-all duration-200 group-hover:shadow-xl"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2
                         bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full
                         transition-all duration-200 text-base font-medium
                         shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Search
              </button>
            </div>
          </div>

          {/* Popular TLDs */}
          <div className="flex gap-3 justify-center mt-4 px-6">
            {[".com", ".io", ".dev", ".app"].map((tld) => (
              <button
                key={tld}
                className="px-6 py-2 rounded-full bg-white/90 hover:bg-white 
                         text-slate-700 text-sm font-medium transition-all duration-200
                         shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm
                         border border-sky-100/50 hover:border-sky-200"
              >
                {tld}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute inset-0">
          <WaterWaveAnimation />
        </div>
      </div>
    </div>
  );
}
