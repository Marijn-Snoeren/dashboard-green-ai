import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">

      {/* Sidebar */}
      <aside className="w-20 bg-[#44743A] rounded-tr-3xl rounded-br-3xl min-h-screen flex flex-col items-center justify-center">
        <nav className="flex flex-col gap-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <button key={item} className="p-2 rounded-lg hover:bg-[#5A8C4A] transition-colors">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fff"/></svg>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-8 w-[90vw]">

        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <h1 className="text-black text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>

        {/* Stats & Ranking */}
        <div className="text-black flex flex-row gap-8 w-full min-w-[1000px]">
          {/* Left: Stats, Sponsors, Feedback (70vw) */}
          <div className="flex flex-col gap-8 w-[70vw] min-w-[700px] max-w-[1100px]">
            {/* Algemene Statistieken */}
            <section className="w-full">
              <h2 className="text-lg font-semibold mb-4">Algemene Statistieken</h2>
              <div className="flex flex-wrap gap-6 items-stretch w-full">
                {/* Nieuwe Challenges */}
                <div className="bg-[#44743A] text-white rounded-2xl p-8 flex flex-col justify-between min-w-[220px] min-h-[140px] flex-1 w-full">
                  <span className="text-lg mb-2">Nieuwe Challenges</span>
                  <span className="text-5xl font-bold leading-none">10</span>
                  <span className="text-xs mt-2">Challenges wachtend op goedkeuring</span>
                </div>
                {/* Nieuwe Gebruikers */}
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-between min-w-[220px] min-h-[140px] flex-1 shadow-sm w-full">
                  <span className="text-lg mb-2 text-black">Nieuwe Gebruikers</span>
                  <span className="text-5xl font-bold text-black leading-none">37</span>
                  <span className="text-xs mt-2 text-black">Nieuwe gebruikers deze week</span>
                </div>
              </div>
            </section>
            {/* Sponsors */}
            <section className="w-full">
              <h2 className="text-lg font-semibold mb-4">Uitgelichte Sponsors</h2>
              <div className="flex gap-4 w-full">
                <button className="bg-[#44743A] text-white rounded-full px-8 py-2 font-medium w-full max-w-[200px]">Mercure Hotel</button>
                <button className="bg-white text-black rounded-full px-8 py-2 font-medium border border-[#eee] w-full max-w-[200px]">Albert Heijn</button>
                <button className="bg-white text-black rounded-full px-8 py-2 font-medium border border-[#eee] w-full max-w-[200px]">Van Bastianen</button>
              </div>
            </section>
            {/* Feedback */}
            <section className="w-full">
              <h2 className="text-lg font-semibold mb-4">Feedback</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm w-full">
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
                        <td className="py-3"><span className="bg-[#eee] text-black px-3 py-1 rounded-full text-xs">To Do</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          {/* Right: Ranking & Events (30vw) */}
          <div className="flex flex-col gap-8 w-[30vw] min-w-[320px] max-w-[500px]">
            {/* Wijk Ranking */}
            <section className="bg-white rounded-2xl p-6 shadow-sm w-full">
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
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 12l4-4 4 4" stroke="#44743A" strokeWidth="2" strokeLinecap="round"/></svg>
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
            <section className="bg-white rounded-2xl p-6 shadow-sm w-full">
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
