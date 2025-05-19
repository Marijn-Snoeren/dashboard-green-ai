import React from "react";

// Untitled UI SVG icons (inline for demo)
const SidebarIcons = [
  // Home/Logo
  <svg key="logo" width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M16 7l5.5 9.5H10.5L16 7zm0 2.236L12.202 15h7.596L16 9.236zM10 18h12v2H10v-2z" fill="#44743A"/></svg>,
  // Challenges
  <svg key="challenge" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#44743A"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>,
  // Table/Stats
  <svg key="stats" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#44743A"/><path d="M7 17V7m5 10V7m5 10V7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>,
  // Calendar
  <svg key="calendar" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#44743A"/><rect x="6" y="8" width="12" height="10" rx="2" fill="#fff"/><path d="M8 6v2m8-2v2" stroke="#44743A" strokeWidth="2" strokeLinecap="round"/></svg>,
  // Users
  <svg key="users" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#44743A"/><circle cx="12" cy="10" r="3" fill="#fff"/><path d="M7 18v-1a5 5 0 0110 0v1" stroke="#fff" strokeWidth="2"/></svg>,
  // Feedback
  <svg key="feedback" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#44743A"/><path d="M8 10h8M8 14h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="10" stroke="#44743A" strokeWidth="2"/></svg>,
  // Logout
  <svg key="logout" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#44743A"/><path d="M16 12H8m0 0l3-3m-3 3l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>,
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6]">
      {/* Sidebar */}
      <aside className="w-20 bg-[#44743A] flex flex-col items-center py-8 gap-8 rounded-tr-3xl rounded-br-3xl">
        <div className="mb-8">{SidebarIcons[0]}</div>
        <nav className="flex flex-col gap-8 flex-1">
          {SidebarIcons.slice(1, 6).map((icon, i) => (
            <button key={i} className="p-2 rounded-lg hover:bg-[#5A8C4A] transition-colors">{icon}</button>
          ))}
        </nav>
        <div className="mt-auto mb-2">{SidebarIcons[6]}</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 text-[#222]">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>
        {/* Stats & Ranking */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
          {/* Left: Stats, Sponsors, Feedback */}
          <div className="flex flex-col gap-8">
            {/* Algemene Statistieken */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Algemene Statistieken</h2>
              <div className="flex flex-wrap gap-6 items-stretch">
                {/* Nieuwe Challenges */}
                <div className="bg-[#44743A] text-white rounded-2xl p-8 flex flex-col justify-between min-w-[220px] min-h-[140px] flex-1">
                  <span className="text-lg mb-2">Nieuwe Challenges</span>
                  <span className="text-5xl font-bold leading-none">10</span>
                  <span className="text-xs mt-2">Challenges wachtend op goedkeuring</span>
                </div>
                {/* Nieuwe Gebruikers */}
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-between min-w-[220px] min-h-[140px] flex-1 shadow-sm">
                  <span className="text-lg mb-2 text-[#222]">Nieuwe Gebruikers</span>
                  <span className="text-5xl font-bold text-[#222] leading-none">37</span>
                  <span className="text-xs mt-2 text-[#888]">Nieuwe gebruikers deze week</span>
                </div>
              </div>
            </section>
            {/* Sponsors */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Uitgelichte Sponsors</h2>
              <div className="flex gap-4">
                <button className="bg-[#44743A] text-white rounded-full px-8 py-2 font-medium">Mercure Hotel</button>
                <button className="bg-white text-[#222] rounded-full px-8 py-2 font-medium border border-[#eee]">Albert Heijn</button>
                <button className="bg-white text-[#222] rounded-full px-8 py-2 font-medium border border-[#eee]">Van Bastianen</button>
              </div>
            </section>
            {/* Feedback */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Feedback</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[#888] text-sm">
                      <th className="font-normal pb-2">Afzender</th>
                      <th className="font-normal pb-2">Datum</th>
                      <th className="font-normal pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3].map((_, i) => (
                      <tr key={i} className="border-t last:border-b border-[#eee]">
                        <td className="py-3 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#44743A] inline-block" />
                          Lars Vermeulen
                        </td>
                        <td className="py-3">15 Mei, 2025</td>
                        <td className="py-3"><span className="bg-[#eee] text-[#222] px-3 py-1 rounded-full text-xs">To Do</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          {/* Right: Ranking & Events */}
          <div className="flex flex-col gap-8">
            {/* Wijk Ranking */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Wijk Ranking</h2>
              <ul className="flex flex-col gap-3">
                {[
                  {name: 'Centrum', up: true},
                  {name: 'Oud-Noord', up: false},
                  {name: 'West', up: true},
                  {name: 'Berkel-Enschot', up: true},
                  {name: 'Reeshof', up: true},
                  {name: 'Udenhout', up: false},
                  {name: 'Noord-Oost', up: false},
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="bg-[#44743A] rounded-lg p-2">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" rx="6" fill="#fff"/><path d="M6 12l4-4 4 4" stroke="#44743A" strokeWidth="2" strokeLinecap="round"/></svg>
                    </span>
                    <span className="flex-1">{item.name}</span>
                    {item.up ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 11V5m0 0l-3 3m3-3l3 3" stroke="#44743A" strokeWidth="2" strokeLinecap="round"/></svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 5v6m0 0l-3-3m3 3l3-3" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round"/></svg>
                    )}
                  </li>
                ))}
              </ul>
            </section>
            {/* Opkomende Evenementen */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Opkomende Evenementen</h2>
              <ul className="flex flex-col gap-2">
                {[
                  {name: 'Evenement 1', date: '15 Mei', time: '20:00'},
                  {name: 'Evenement 2', date: '15 Mei', time: '20:00'},
                ].map((event, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-4 h-4 rounded-full bg-[#44743A] inline-block" />
                    <span className="flex-1">{event.name}</span>
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
