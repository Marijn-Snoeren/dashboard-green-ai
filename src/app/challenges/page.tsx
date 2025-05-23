import React from "react";

export default function ChallengesPage() {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
      {/* Sidebar (leeg, want layout.tsx zal de echte sidebar bevatten) */}
      <main className="flex-1 p-12">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-black text-3xl font-bold">Challenges</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>
        <div className="flex gap-8">
          {/* Actieve Challenges */}
          <div className="flex-1">
            <h2 className="text-xl font-medium mb-4">Actieve Challenges</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Challenge cards */}
              {[{
                title: 'Bespaar Water', desc: 'Zet de kraan uit tijdens het tandenpoetsen.', count: 10
              }, {
                title: 'Stoep Veger', desc: 'Houd jouw straat schoon en bladvrij.', count: 27
              }, {
                title: 'Douche Tekort', desc: 'Douche maximaal 5 minuten per dag, een week lang.', count: 27
              }, {
                title: 'Draag Groener', desc: 'Trek drie dagen op rij tweedehands of duurzame kleding aan.', count: 10
              }, {
                title: 'Plastic Skip', desc: 'Gebruik deze week geen wegwerpplastic.', count: 10
              }, {
                title: 'Wandelen Maar', desc: 'Laat de auto staan en doe drie korte ritjes te voet.', count: 27
              }, {
                title: 'Stekjes Deel', desc: 'Deel een plantje of stekje met iemand in je buurt.', count: 27
              }, {
                title: 'Afvalheld', desc: 'Scheid je afval deze week 100% correct.', count: 10
              }].map((c, i) => (
                <div key={i} className="rounded-2xl p-6 bg-[#44743A] text-white flex flex-col gap-2 min-h-[160px]">
                  <span className="text-lg font-semibold">{c.title}</span>
                  <span className="text-sm mb-2">{c.desc}</span>
                  <span className="text-5xl font-bold leading-none">{c.count}</span>
                  <span className="text-xs mt-2">Status: Actief<br />Aantal keren voltooid</span>
                </div>
              ))}
            </div>
          </div>
          {/* AI Challenges */}
          <div className="w-[340px] flex flex-col gap-6">
            <h2 className="text-xl font-medium mb-4">AI Challenges</h2>
            {[{
              title: 'Restafval Reducer', desc: 'Jouw wijk produceert 12% meer restafval dan gemiddeld. Daag jezelf uit om deze week afval beter te scheiden.'
            }, {
              title: 'Stille Straat Loop', desc: 'In de Pastoorstraat is deze maand nauwelijks bewogen. Ga vandaag 1 km wandelen in je straat.'
            }, {
              title: 'Laag Licht Verbruik', desc: 'In jouw buurt relatief veel energieverbruik na 22:00. Probeer vanavond alle lampen uit te doen vóór je naar bed gaat.'
            }, {
              title: 'Buurboom Bonus', desc: 'Er zijn nog 4 dode/gedroogde boomspiegels open in jouw wijk. Kies er één en maak hem groen!'
            }, {
              title: 'Recycle Reminder', desc: 'Vorige maand werd plastic in jouw wijk 30% minder gescheiden. Zet vandaag je plasticzak buiten of help je buren herinneren.'
            }].map((ai, i) => (
              <div key={i} className="rounded-2xl p-6 bg-[#44743A] text-white flex flex-col gap-2">
                <span className="text-lg font-semibold">{ai.title}</span>
                <span className="text-sm mb-2">{ai.desc}</span>
                <div className="flex gap-4 mt-2">
                  <button className="flex items-center gap-1 text-xs"><span className="text-white">Accepteer</span></button>
                  <button className="flex items-center gap-1 text-xs"><span className="text-white">✗ Afkeuren</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 