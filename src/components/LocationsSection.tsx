import React, { useState } from 'react';
import { Search, MapPin, Clock, Phone, Navigation, Check, ExternalLink, Building2 } from 'lucide-react';
import { GYM_LOCATIONS } from '../data/gymData.ts';
import { GymLocation } from '../types.ts';

interface LocationsSectionProps {
  onJoinClub: (location: GymLocation) => void;
  onViewClubDetails: (location: GymLocation) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onJoinClub,
  onViewClubDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [activeLocationId, setActiveLocationId] = useState<string>(GYM_LOCATIONS[0].id);

  const amenities = [
    'All',
    'Olympic Weightlifting',
    'Sauna',
    'Turf Track',
    'Cycling Studio',
    'Free Parking',
  ];

  const filteredLocations = GYM_LOCATIONS.filter((loc) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      loc.city.toLowerCase().includes(query) ||
      loc.state.toLowerCase().includes(query) ||
      loc.zip.includes(query) ||
      loc.name.toLowerCase().includes(query);

    const matchesAmenity =
      selectedAmenity === 'All' ||
      loc.facilities.some((f) =>
        f.toLowerCase().includes(selectedAmenity.toLowerCase())
      );

    return matchesQuery && matchesAmenity;
  });

  const activeLocation =
    GYM_LOCATIONS.find((l) => l.id === activeLocationId) || GYM_LOCATIONS[0];

  return (
    <section id="locations" className="py-24 bg-[#0F1116] border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
            NATIONWIDE CLUB NETWORK
          </p>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            FIND YOUR NEAREST GYM
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            Search 45+ premier clubs across the United States. State-of-the-art free weights, dedicated turf tracks, and spa recovery suites.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto flex items-center bg-[#14171F] border border-neutral-700 rounded-lg p-1.5 focus-within:border-[#D2F800] transition-colors shadow-xl">
            <div className="pl-3 text-neutral-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter ZIP code, City (e.g. Austin, 10012, Chicago)..."
              className="w-full px-3 py-2 bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-neutral-500 hover:text-white px-2 text-xs"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {}}
              className="px-5 py-2.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Amenity Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap">
            <span className="text-xs text-neutral-500 mr-2">Filter by Amenity:</span>
            {amenities.map((amenity) => (
              <button
                key={amenity}
                onClick={() => setSelectedAmenity(amenity)}
                className={`px-3 py-1 text-xs rounded transition-all cursor-pointer font-medium ${
                  selectedAmenity === amenity
                    ? 'bg-neutral-800 text-[#D2F800] border border-[#D2F800]/40 font-bold'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* Locations Grid with Interactive Map Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location Cards List (Left Column) */}
          <div className="lg:col-span-7 space-y-4 max-h-[720px] overflow-y-auto pr-1">
            {filteredLocations.length === 0 ? (
              <div className="bg-[#14171F] border border-neutral-800 rounded-lg p-10 text-center text-neutral-400">
                <MapPin className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
                <p className="text-base font-bold text-white mb-1">
                  No clubs found matching "{searchQuery}"
                </p>
                <p className="text-xs text-neutral-500 mb-4">
                  Try searching for another major metro: Austin, New York, Chicago, Miami, Santa Monica, or Dallas.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedAmenity('All');
                  }}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-xs text-white rounded font-athletic uppercase"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setActiveLocationId(loc.id)}
                  className={`p-6 rounded-lg border transition-all cursor-pointer ${
                    activeLocationId === loc.id
                      ? 'bg-[#161A23] border-[#D2F800] shadow-lg shadow-[#D2F800]/5'
                      : 'bg-[#14171F] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-athletic text-2xl font-bold text-white tracking-tight uppercase">
                          {loc.name}
                        </h3>
                        {loc.isFlagship && (
                          <span className="text-[10px] bg-[#D2F800] text-black font-black uppercase px-2 py-0.5 rounded font-athletic">
                            USA FLAGSHIP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#D2F800] font-medium flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{loc.address}, {loc.city}, {loc.state} {loc.zip}</span>
                      </p>
                    </div>

                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1 rounded shrink-0 self-start">
                      {loc.currentStatus}
                    </span>
                  </div>

                  {/* Hours & Phone Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 py-3 border-t border-b border-neutral-800/80 my-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Mon–Fri: <strong className="text-neutral-300 font-normal">{loc.hoursWeekday}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      <a href={`tel:${loc.phone}`} className="text-neutral-300 hover:text-[#D2F800] transition-colors">
                        {loc.phone}
                      </a>
                    </div>
                  </div>

                  {/* Amenities List */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {loc.facilities.slice(0, 4).map((facility, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800"
                      >
                        {facility}
                      </span>
                    ))}
                    {loc.facilities.length > 4 && (
                      <span className="text-[11px] text-neutral-500 px-1 py-0.5">
                        +{loc.facilities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#D2F800]" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewClubDetails(loc);
                        }}
                        className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white rounded uppercase tracking-wider cursor-pointer"
                      >
                        View Club Details
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinClub(loc);
                        }}
                        className="px-4 py-1.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        Join This Club
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Interactive Map Visualizer Panel (Right Column) */}
          <div className="lg:col-span-5 bg-[#14171F] border border-neutral-800 rounded-xl p-6 shadow-2xl sticky top-24">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D2F800]" />
                <h4 className="font-athletic text-xl font-bold text-white uppercase tracking-tight">
                  INTERACTIVE CLUB MAP
                </h4>
              </div>
              <span className="text-xs text-neutral-500 font-mono">USA NETWORK</span>
            </div>

            {/* Stylized Vector Map representation */}
            <div className="relative w-full h-[280px] bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800 mb-6 flex items-center justify-center">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f242d_1px,transparent_1px),linear-gradient(to_bottom,#1f242d_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

              {/* USA Regional Silhouette Outline / Decorative SVG */}
              <svg className="w-full h-full opacity-30 p-6" viewBox="0 0 500 300" fill="none" stroke="#4a5568" strokeWidth="1.5">
                {/* Simplified USA Coastline polygon */}
                <path d="M 50,60 L 110,65 L 180,80 L 250,75 L 340,65 L 420,70 L 460,95 L 440,160 L 460,200 L 420,240 L 370,250 L 320,220 L 250,260 L 190,240 L 130,220 L 60,190 L 40,110 Z" />
              </svg>

              {/* Club Location Pins positioned relatively */}
              {GYM_LOCATIONS.map((loc) => {
                // Approximate relative US x/y coordinates
                const positions: { [key: string]: { top: string; left: string } } = {
                  'austin-downtown': { top: '70%', left: '46%' },
                  'nyc-soho': { top: '35%', left: '84%' },
                  'chicago-westloop': { top: '40%', left: '58%' },
                  'miami-brickell': { top: '82%', left: '80%' },
                  'la-santamonica': { top: '56%', left: '16%' },
                  'dallas-uptown': { top: '65%', left: '48%' },
                };
                const pos = positions[loc.id] || { top: '50%', left: '50%' };
                const isSelected = loc.id === activeLocationId;

                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform cursor-pointer group ${
                      isSelected ? 'scale-125 z-20' : 'scale-100 z-10'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#D2F800] text-black ring-4 ring-[#D2F800]/30'
                          : 'bg-white text-black hover:bg-[#D2F800]'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                    {/* Tooltip on pin */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 text-[10px] font-bold rounded whitespace-nowrap uppercase font-athletic transition-opacity ${
                        isSelected
                          ? 'bg-white text-black opacity-100'
                          : 'bg-neutral-900 text-neutral-300 opacity-0 group-hover:opacity-100 border border-neutral-700'
                      }`}
                    >
                      {loc.city}
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-500 bg-black/60 px-2 py-1 rounded">
                Click map pins to inspect club
              </div>
            </div>

            {/* Currently Selected Location Showcase */}
            <div className="bg-neutral-900 p-5 rounded-lg border border-neutral-800">
              <span className="text-[11px] font-mono text-[#D2F800] uppercase block mb-1">
                Selected Club Overview
              </span>
              <h5 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight">
                {activeLocation.name}
              </h5>
              <p className="text-xs text-neutral-400 mt-1 mb-4">
                {activeLocation.address}, {activeLocation.city}, {activeLocation.state} {activeLocation.zip}
              </p>

              <div className="space-y-2 text-xs text-neutral-300 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Club Manager:</span>
                  <a href={`mailto:${activeLocation.email}`} className="text-[#D2F800] hover:underline font-mono">
                    {activeLocation.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Phone:</span>
                  <span className="font-mono">{activeLocation.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Weekend Hours:</span>
                  <span>{activeLocation.hoursWeekend}</span>
                </div>
              </div>

              <button
                onClick={() => onJoinClub(activeLocation)}
                className="w-full py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Enroll at {activeLocation.city} Club
              </button>
            </div>

            {/* Sample Data Disclaimer (Honest & Transparent) */}
            <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed">
              * Note: Sample USA location profiles displayed for demonstration. Integration with Google Maps API or real-time club roster can be toggled via backend credentials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
