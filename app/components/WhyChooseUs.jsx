// Updated WhyChooseUs Component (new layout: left-aligned title, subtitle, 4 cards in 2 rows)
"use client";
export default function WhyChooseUs() {
  return (
    <section class="team-section py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">

        {/* Heading Section */}
        <div class="mb-10 text-left">
          <h2 class="text-5xl font-extrabold text-gray-900 leading-tight">
            Wins from teams just like yours
          </h2>
          <p class="text-lg text-gray-600 mt-2 max-w-xl">
            Real stories from real teams achieving massive results using our platform.
          </p>
        </div>

        {/* Cards Grid — 4 cards, 2 rows of 2 */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div class="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 p-8">
            <div class="flex justify-between items-center mb-6">
              <div>
                <div class="text-3xl font-bold text-gray-900">+26%</div>
                <div class="text-gray-500 text-lg font-medium">Reply Rate</div>
              </div>
              <img src="https://cdn.prod.website-files.com/5de921a1902d8d8b7a99f774/68270cebaafece348310b086_irev.svg" class="w-14 h-14" />
            </div>

            <p class="text-lg text-gray-700 italic mb-6">
              “We chose lemlist for its seamless email and LinkedIn outreach combo. The interface saves us time and the support team is always helpful.”
            </p>

            <div class="flex items-center gap-4">
              <img src="https://cdn.prod.website-files.com/5de921a1902d8d8b7a99f774/6827145849d9c20ad87b2da2_Deborah_Strougo.png" class="w-14 h-14 rounded-full" />
              <div>
                <div class="text-sm font-semibold text-gray-900">Deborah Strougo</div>
                <div class="text-sm text-gray-500">Business Growth Manager at IREV</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div class="rounded-2xl border border-purple-300 bg-gradient-to-br from-purple-50 to-white shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-8">
            <div class="flex justify-between items-center mb-6">
              <div>
                <div class="text-3xl font-bold text-gray-900">10x</div>
                <div class="text-gray-500 text-lg font-medium">Meetings Booked</div>
              </div>
              <img src="https://cdn.prod.website-files.com/5de921a1902d8d8b7a99f774/68271e2eff22e128f42a83be_rightmarket.svg" class="w-14 h-14" />
            </div>

            <p class="text-lg text-gray-700 italic mb-6">
              “Dropping a profile visit, following up with an email, and sending a connection request adds a human touch at scale.”
            </p>

            <div class="flex items-center gap-4">
              <img src="https://cdn.prod.website-files.com/5de921a1902d8d8b7a99f774/68271c21c24b3f9cee3f9863_Dave_Shillingford.png" class="w-14 h-14 rounded-full" />
              <div>
                <div class="text-sm font-semibold text-gray-900">Dave Shillingford</div>
                <div class="text-sm text-gray-500">Sales Manager at RightMarket</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div class="rounded-2xl border border-purple-300 bg-gradient-to-br from-purple-50 to-white shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-8">
            <div class="flex justify-between items-center mb-6">
              <div>
                <div class="text-3xl font-bold text-gray-900">3x</div>
                <div class="text-gray-500 text-lg font-medium">Sales Productivity</div>
              </div>
              <img src="https://cdn.prod.website-files.com/5de921a1902d8d8b7a99f774/68271fed709f6fa49708abb7_secret.svg" class="w-14 h-14" />
            </div>

            <p class="text-lg text-gray-700 italic mb-6">
              “Staying organized is key in sales, and this platform helps me manage outreach effectively and personally.”
            </p>

            <div class="flex items-center gap-4">
              <img src="https://cdn.prod.website-files.com/5de921a1902d8d8b7a99f774/6827204ca20b2756d67297bc_Khushi_Mehta.png" class="w-14 h-14 rounded-full" />
              <div>
                <div class="text-sm font-semibold text-gray-900">Khushi Mehta</div>
                <div class="text-sm text-gray-500">Partnerships Manager at Secret</div>
              </div>
            </div>
          </div>

          {/* Card 4 — Dummy */}
          <div class="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 p-8">
            <div class="flex justify-between items-center mb-6">
              <div>
                <div class="text-3xl font-bold text-gray-900">+42%</div>
                <div class="text-gray-500 text-lg font-medium">Lead Quality</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" class="w-14 h-14" />
            </div>

            <p class="text-lg text-gray-700 italic mb-6">
              "Our team improved lead targeting massively, bringing in more qualified prospects and better conversion rates."
            </p>

            <div class="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="w-14 h-14 rounded-full" />
              <div>
                <div class="text-sm font-semibold text-gray-900">Alex Carter</div>
                <div class="text-sm text-gray-500">Head of Sales at NovaTech</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
