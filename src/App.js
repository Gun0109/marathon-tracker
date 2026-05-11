import { useState } from "react";

const RACE_DATE = new Date("2026-11-01T08:00:00+0900");
const PLAN_START = new Date("2026-04-28T00:00:00+0900");

const PHASES = [
  { id:1, name:"기초 체력",   start:"4/28", end:"6/21",  weeks:[1,8],  color:"#22c55e", bg:"#052e16" },
  { id:2, name:"스피드 개발", start:"6/22", end:"9/13",  weeks:[9,20], color:"#f97316", bg:"#1c0a00" },
  { id:3, name:"레이스 준비", start:"9/14", end:"10/18", weeks:[21,25],color:"#3b82f6", bg:"#0c1a2e" },
  { id:4, name:"테이퍼",      start:"10/19",end:"11/1",  weeks:[26,27],color:"#a855f7", bg:"#1a0a2e" },
];

function generateWeeklyPlan() {
  const weeks = [];
  for (let w = 1; w <= 27; w++) {
    const startDate = new Date(PLAN_START);
    startDate.setDate(startDate.getDate() + (w - 1) * 7);
    let phase, sessions, weeklyKm;
    if (w <= 8) {
      phase = 1;
      const easyKm = Math.min(10 + Math.floor((w-1)*0.5), 12);
      const tempoKm = 6;
      const longKm = Math.min(18 + Math.floor((w-1)*1.5), 28);
      weeklyKm = easyKm + tempoKm + longKm;
      sessions = [
        { day:"화", type:"E", label:"쉬운 달리기", km:easyKm, pace:"6:30–7:00", hr:"140↓", icon:"🐢" },
        { day:"목", type:"T", label:"템포런",      km:tempoKm, pace:"5:30–5:45", hr:"155–165", icon:"🔥" },
        { day:"토", type:"L", label:"롱런",        km:longKm,  pace:"6:00–6:30", hr:"160↓", icon:"🏃" },
      ];
    } else if (w <= 20) {
      phase = 2;
      const intervals = `1km × ${Math.min(6 + Math.floor((w-9)/3), 8)}회`;
      const mpKm = Math.min(10 + Math.floor((w-9)*0.4), 14);
      const longKm = Math.min(25 + Math.floor((w-9)*0.8), 32);
      weeklyKm = 8 + mpKm + longKm;
      sessions = [
        { day:"화", type:"I", label:"인터벌",  km:8,     pace:"4:40–4:50", hr:"170+", icon:"⚡", detail:intervals },
        { day:"목", type:"M", label:"MP 런",   km:mpKm,  pace:"4:58",      hr:"160–168", icon:"🎯" },
        { day:"토", type:"L", label:"롱런",    km:longKm,pace:"5:20–5:40", hr:"163↓", icon:"🏃" },
      ];
    } else if (w <= 25) {
      phase = 3;
      const longKm = w <= 23 ? 32 : 35;
      weeklyKm = 8 + 10 + longKm;
      sessions = [
        { day:"화", type:"T", label:"페이스런",   km:8,      pace:"4:58", hr:"160–168", icon:"🎯" },
        { day:"목", type:"S", label:"스트라이드", km:10,     pace:"6:00+가속", hr:"150–160", icon:"💨" },
        { day:"토", type:"L", label:"시뮬레이션", km:longKm, pace:"5:10", hr:"165↓", icon:"🏅" },
      ];
    } else {
      phase = 4;
      const longKm = w === 26 ? 16 : 10;
      weeklyKm = 6 + 4 + longKm;
      sessions = [
        { day:"화", type:"E", label:"가벼운 달리기", km:6,      pace:"6:00–6:30", hr:"140↓", icon:"🌿" },
        { day:"목", type:"M", label:"페이스 터치",  km:4,      pace:"4:58",      hr:"155–160", icon:"🎯" },
        { day:"토", type:"E", label:"마지막 롱런",  km:longKm, pace:"6:00–6:30", hr:"155↓", icon:"🌿" },
      ];
    }
    const dateStr = `${startDate.getMonth()+1}/${startDate.getDate()}`;
    weeks.push({ week:w, phase, sessions, weeklyKm, dateStr });
  }
  return weeks;
}

const ALL_WEEKS = generateWeeklyPlan();

const MONTHLY_KM = [
  { month:"1월", km:139.5 }, { month:"2월", km:91.5 },
  { month:"3월", km:87.9 },  { month:"4월", km:114.8 },
];
const WEEKLY_KM_DATA = [
  {w:"2/9",km:14.7},{w:"2/16",km:49.2},
  {w:"3/2",km:21.1},{w:"3/9",km:22.0},{w:"3/16",km:29.7},
  {w:"3/23",km:15.1},{w:"3/30",km:20.0},{w:"4/6",km:31.1},{w:"4/27",km:43.0},{w:"5/5",km:22.8},
];
const HR_TREND = [
  { date:"4/6",  km:10.0, pace:6.15, hr:156, label:"4/6"  },
  { date:"4/12", km:10.3, pace:5.62, hr:161, label:"4/12" },
  { date:"4/19", km:20.6, pace:5.25, hr:173, label:"4/19" },
  { date:"4/23", km:8.0,  pace:6.55, hr:142, label:"4/23" },
  { date:"4/26", km:18.0, pace:5.75, hr:150, label:"4/26" },
  { date:"4/29", km:6.0,  pace:6.97, hr:137, label:"4/29" },
  { date:"4/30", km:6.0,  pace:5.25, hr:159, label:"4/30" },
  { date:"5/1",  km:18.1, pace:6.60, hr:155, label:"5/1"  },
  { date:"5/2",  km:10.0, pace:5.77, hr:150, label:"5/2"  },
  { date:"5/5",  km:10.0, pace:6.68, hr:136, label:"5/5"  },
  { date:"5/8",  km:10.0, pace:5.33, hr:152, label:"5/8"  },
];
const INSIGHTS = [
  { icon:"⚠️", color:"#f97316", title:"주간 km 편차 큼",      desc:"14–49km 들쭉날쭉 → 35–45km 꾸준히 유지가 핵심" },
  { icon:"❤️", color:"#ef4444", title:"롱런 심박수 173bpm",   desc:"목표 165↓ — 더 느리게 = 나중에 더 빠르게" },
  { icon:"✅", color:"#22c55e", title:"지구력 이미 충분",      desc:"43km 완주 경험 — 스피드·페이스 절제가 관건" },
  { icon:"🎯", color:"#6366f1", title:"현재 3:51 → 목표 3:29",desc:"페이스 –16초/km 개선. 27주면 충분히 가능" },
];
const PACE_TABLE = [
  { label:"목표 완주",   value:"3:29:59", color:"#6366f1", big:true },
  { label:"필요 페이스", value:"4:58/km", color:"#e2e8f0" },
  { label:"현재 예측",   value:"3:51",    color:"#f97316" },
  { label:"5km 통과",    value:"24:50",   color:"#94a3b8" },
  { label:"하프 통과",   value:"1:44:30", color:"#94a3b8" },
  { label:"30km 통과",   value:"2:29:00", color:"#94a3b8" },
  { label:"35km 통과",   value:"2:54:10", color:"#94a3b8" },
];

function getDaysLeft() {
  return Math.max(0, Math.ceil((RACE_DATE - new Date()) / 86400000));
}
function getCurrentWeek() {
  const diff = new Date() - PLAN_START;
  if (diff < 0) return 1;
  return Math.min(27, Math.floor(diff / (7 * 86400000)) + 1);
}
function getPhaseInfo(phaseId) {
  return PHASES.find(p => p.id === phaseId);
}
function initChecks() {
  const obj = {};
  for (let w = 1; w <= 27; w++) obj[w] = { 화:false, 목:false, 토:false };
  return obj;
}

export default function App() {
  const [tab, setTab] = useState("weekly");
  const [checks, setChecks] = useState(initChecks);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const daysLeft = getDaysLeft();
  const currentWeek = getCurrentWeek();
  const progress = Math.min(100, Math.round(((193 - daysLeft) / 193) * 100));

  const weekData = ALL_WEEKS[selectedWeek - 1];
  const phaseInfo = getPhaseInfo(weekData.phase);
  const weekChecks = checks[selectedWeek];
  const doneCount = Object.values(weekChecks).filter(Boolean).length;

  function toggleCheck(day) {
    setChecks(prev => ({
      ...prev,
      [selectedWeek]: { ...prev[selectedWeek], [day]: !prev[selectedWeek][day] }
    }));
  }

  const TABS = [
    { key:"weekly", label:"주간 훈련" },
    { key:"data",   label:"내 데이터" },
    { key:"pace",   label:"페이스" },
  ];
  const typeColors = { E:"#22c55e", T:"#f97316", I:"#ef4444", M:"#3b82f6", L:"#8b5cf6", S:"#06b6d4" };

  return (
    <div style={{
      minHeight:"100vh", background:"#f8fafc",
      fontFamily:"'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      color:"#0f172a", maxWidth:480, margin:"0 auto",
    }}>
      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)", padding:"24px 20px 20px", color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div style={{ background:"#ffffff15", border:"1px solid #ffffff25", borderRadius:20, padding:"5px 12px", fontSize:13, color:"#a5b4fc", letterSpacing:0.5, fontWeight:600 }}>
            🏆 JTBC 서울마라톤 2026.11.01
          </div>
          <div style={{ fontSize:13, color:"#64748b" }}>주 3회 훈련</div>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:16 }}>
          <span style={{ fontSize:42, fontWeight:900, letterSpacing:-2, lineHeight:1 }}>SUB 3:30</span>
          <span style={{ fontSize:14, color:"#94a3b8", fontWeight:500 }}>4:58/km</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {[
            { label:"D-DAY", val:`-${daysLeft}`, sub:"일 남음", accent:"#818cf8" },
            { label:"현재 주차", val:`${currentWeek}주`, sub:"/ 27주", accent:"#34d399" },
            { label:"현재 예측", val:"3:51", sub:"목표 -21분", accent:"#fb923c" },
          ].map((s,i) => (
            <div key={i} style={{ background:"#ffffff0d", borderRadius:12, padding:"12px 10px", border:"1px solid #ffffff12" }}>
              <div style={{ fontSize:11, color:"#64748b", marginBottom:4, fontWeight:600, letterSpacing:0.5 }}>{s.label}</div>
              <div style={{ fontSize:22, fontWeight:800, color:s.accent, lineHeight:1, marginBottom:2 }}>{s.val}</div>
              <div style={{ fontSize:11, color:"#475569" }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:12, color:"#64748b", fontWeight:600 }}>플랜 진행률</span>
            <span style={{ fontSize:12, color:"#94a3b8" }}>{progress}%</span>
          </div>
          <div style={{ background:"#ffffff15", borderRadius:99, height:5, overflow:"hidden" }}>
            <div style={{ width:`${progress}%`, height:"100%", borderRadius:99, background:"linear-gradient(90deg,#6366f1,#a78bfa)" }} />
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div style={{ display:"flex", background:"#fff", borderBottom:"2px solid #f1f5f9", position:"sticky", top:0, zIndex:10 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex:1, background:"none", border:"none", cursor:"pointer",
            fontFamily:"inherit", fontSize:14, fontWeight:700, padding:"14px 8px",
            color: tab === t.key ? "#6366f1" : "#94a3b8",
            borderBottom: tab === t.key ? "2px solid #6366f1" : "2px solid transparent",
            marginBottom:-2, transition:"all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"16px 16px 32px" }}>

        {/* 주간 훈련 탭 */}
        {tab === "weekly" && (<>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#374151" }}>주차 선택</span>
              <button onClick={() => setSelectedWeek(currentWeek)} style={{
                background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8,
                padding:"4px 10px", fontSize:12, color:"#3b82f6", fontWeight:700, cursor:"pointer", fontFamily:"inherit",
              }}>현재 주차</button>
            </div>
            {PHASES.map(ph => (
              <div key={ph.id} style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:ph.color, marginBottom:5, letterSpacing:0.5 }}>
                  Phase {ph.id} · {ph.name} ({ph.start}–{ph.end})
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {ALL_WEEKS.filter(w => w.phase === ph.id).map(w => {
                    const wc = checks[w.week];
                    const done = Object.values(wc).filter(Boolean).length;
                    const isCurrent = w.week === currentWeek;
                    const isSelected = w.week === selectedWeek;
                    return (
                      <button key={w.week} onClick={() => setSelectedWeek(w.week)} style={{
                        width:36, height:36, borderRadius:10, border:"none", cursor:"pointer",
                        fontFamily:"inherit", fontSize:13, fontWeight:700,
                        background: isSelected ? ph.color : isCurrent ? ph.color+"22" : "#f8fafc",
                        color: isSelected ? "#fff" : isCurrent ? ph.color : "#64748b",
                        outline: isSelected ? `2px solid ${ph.color}` : isCurrent ? `2px solid ${ph.color}55` : "none",
                        outlineOffset:1, position:"relative",
                      }}>
                        {w.week}
                        {done > 0 && (
                          <div style={{
                            position:"absolute", top:2, right:2, width:7, height:7, borderRadius:"50%",
                            background: done === 3 ? "#22c55e" : "#f97316",
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", border:"1px solid #e2e8f0", boxShadow:"0 4px 24px #0000000a" }}>
            <div style={{ background:`linear-gradient(135deg,${phaseInfo.bg},#0f172a)`, padding:"16px 18px", borderBottom:`2px solid ${phaseInfo.color}33` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontSize:11, color:phaseInfo.color, fontWeight:700, letterSpacing:1, marginBottom:4 }}>
                    PHASE {weekData.phase} · {weekData.dateStr} 주차시작
                  </div>
                  <div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>{selectedWeek}주차</div>
                  <div style={{ fontSize:13, color:"#94a3b8", marginTop:2 }}>{phaseInfo.name}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:"#64748b", marginBottom:2 }}>주간 목표</div>
                  <div style={{ fontSize:24, fontWeight:800, color:phaseInfo.color }}>{weekData.weeklyKm}km</div>
                  <div style={{ display:"flex", gap:4, marginTop:6, justifyContent:"flex-end" }}>
                    {["화","목","토"].map(d => (
                      <div key={d} style={{
                        width:20, height:20, borderRadius:6,
                        background: checks[selectedWeek][d] ? phaseInfo.color : "#ffffff15",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:11, color: checks[selectedWeek][d] ? "#fff" : "#64748b", fontWeight:700,
                      }}>{d}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding:"12px 0" }}>
              {weekData.sessions.map((s, i) => (
                <div key={i} style={{
                  padding:"14px 18px", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none",
                  display:"flex", gap:12, alignItems:"center",
                  background: checks[selectedWeek][s.day] ? "#f0fdf4" : "#fff", transition:"background 0.2s",
                }}>
                  <button onClick={() => toggleCheck(s.day)} style={{
                    width:28, height:28, borderRadius:8, border:"none", cursor:"pointer",
                    background: checks[selectedWeek][s.day] ? "#22c55e" : "#f1f5f9",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, flexShrink:0, transition:"all 0.15s",
                  }}>{checks[selectedWeek][s.day] ? "✓" : ""}</button>
                  <div style={{
                    width:32, height:32, borderRadius:8, flexShrink:0,
                    background:(typeColors[s.type]||"#6366f1")+"18",
                    border:`1px solid ${(typeColors[s.type]||"#6366f1")}33`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
                  }}>{s.icon}</div>
                  <div style={{ flex:1, opacity: checks[selectedWeek][s.day] ? 0.5 : 1, transition:"opacity 0.2s" }}>
                    <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:3 }}>
                      <span style={{ fontSize:12, fontWeight:800, color:phaseInfo.color, background:phaseInfo.color+"15", borderRadius:5, padding:"2px 7px" }}>{s.day}요일</span>
                      <span style={{ fontSize:14, fontWeight:700, color:"#1e293b" }}>{s.label}</span>
                    </div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      <span style={{ fontSize:13, color:"#475569", fontWeight:600 }}>{s.km}km</span>
                      <span style={{ fontSize:13, color:"#94a3b8" }}>·</span>
                      <span style={{ fontSize:13, color:"#475569" }}>{s.pace}/km</span>
                      <span style={{ fontSize:13, color:"#94a3b8" }}>·</span>
                      <span style={{ fontSize:13, color: s.hr.includes("170") ? "#ef4444" : s.hr.includes("160") ? "#f97316" : "#64748b" }}>HR {s.hr}</span>
                    </div>
                    {s.detail && <div style={{ fontSize:12, color:"#6366f1", marginTop:3, fontWeight:600 }}>{s.detail}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding:"12px 18px", background: doneCount === 3 ? "#f0fdf4" : "#fafafa",
              borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:10,
            }}>
              <div style={{ fontSize:13, fontWeight:700, color: doneCount === 3 ? "#16a34a" : doneCount > 0 ? "#f97316" : "#94a3b8" }}>
                {doneCount === 3 ? "✅ 이번 주 완료!" : doneCount > 0 ? `${doneCount}/3 완료` : "훈련을 시작해보세요"}
              </div>
              {doneCount === 3 && <div style={{ fontSize:13, color:"#86efac" }}>훌륭해요! 다음 주도 화이팅 💪</div>}
            </div>
          </div>

          <div style={{ marginTop:12, background:"#fff", borderRadius:12, padding:"14px 16px", border:`1px solid ${phaseInfo.color}30` }}>
            <div style={{ fontSize:12, fontWeight:700, color:phaseInfo.color, marginBottom:8, letterSpacing:0.5 }}>Phase {weekData.phase} 핵심 원칙</div>
            {weekData.phase === 1 && ["심박수 165↓ 유지 (롱런 173 → 개선 포인트)", "쉬운 날은 정말 쉽게: 6:30+/km", "주간 km 10% 이상 늘리지 않기"].map((t,i)=>(
              <div key={i} style={{ fontSize:13, color:"#64748b", paddingLeft:10, borderLeft:"2px solid #22c55e40", marginBottom:5, lineHeight:1.6 }}>{t}</div>
            ))}
            {weekData.phase === 2 && ["목표 페이스 4:58/km 몸에 각인", "43km 지구력 경험 믿을 것", "격주 10km 페이스 테스트"].map((t,i)=>(
              <div key={i} style={{ fontSize:13, color:"#64748b", paddingLeft:10, borderLeft:"2px solid #f9731640", marginBottom:5, lineHeight:1.6 }}>{t}</div>
            ))}
            {weekData.phase === 3 && ["에너지젤 5km마다 보급 연습", "신발·복장 최종 확정", "10/19 테이퍼 시작"].map((t,i)=>(
              <div key={i} style={{ fontSize:13, color:"#64748b", paddingLeft:10, borderLeft:"2px solid #3b82f640", marginBottom:5, lineHeight:1.6 }}>{t}</div>
            ))}
            {weekData.phase === 4 && ["새 훈련 절대 금지", "D-2 완전 휴식", "D-3부터 카보로딩"].map((t,i)=>(
              <div key={i} style={{ fontSize:13, color:"#64748b", paddingLeft:10, borderLeft:"2px solid #a855f740", marginBottom:5, lineHeight:1.6 }}>{t}</div>
            ))}
          </div>
        </>)}

        {/* 내 데이터 탭 */}
        {tab === "data" && (<>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
            {[
              { label:"최고 페이스",    val:"4:56/km", sub:"25/11 9.6km 🔥", color:"#22c55e" },
              { label:"최장 거리",      val:"43.1km",  sub:"지구력 충분 ✅",  color:"#3b82f6" },
              { label:"총 거리 (4월)",  val:"114.8km", sub:"48회 달리기",     color:"#8b5cf6" },
              { label:"현재 기록 예측", val:"3:51",    sub:"목표까지 –21분",  color:"#f97316" },
            ].map((s,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:14, padding:"16px 14px", border:"1px solid #e2e8f0", boxShadow:"0 2px 8px #0000000a" }}>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, marginBottom:6 }}>{s.label}</div>
                <div style={{ fontSize:22, fontWeight:800, color:s.color, lineHeight:1, marginBottom:4 }}>{s.val}</div>
                <div style={{ fontSize:11, color:"#94a3b8" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"16px", marginBottom:12, border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:14 }}>월별 달린 거리</div>
            {MONTHLY_KM.map((m,i)=>{
              const colors = ["#22c55e","#f97316","#3b82f6","#8b5cf6"];
              const pct = (m.km / 140) * 100;
              return (
                <div key={i} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:13, color:"#475569", fontWeight:600 }}>{m.month}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:"#1e293b" }}>{m.km}km</span>
                  </div>
                  <div style={{ background:"#f1f5f9", borderRadius:99, height:8, overflow:"hidden" }}>
                    <div style={{ width:`${pct}%`, height:"100%", borderRadius:99, background:colors[i] }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"16px", marginBottom:12, border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:14 }}>주간 km (최근 10주)</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:90 }}>
              {WEEKLY_KM_DATA.map((w,i)=>{
                const h = (w.km / 50) * 75;
                const isHigh = w.km >= 40;
                const isLast = i === WEEKLY_KM_DATA.length - 1;
                return (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                    <div style={{ fontSize:10, color: isHigh ? "#22c55e" : "#94a3b8", fontWeight:700 }}>{w.km}</div>
                    <div style={{ width:"100%", height:h, borderRadius:"4px 4px 0 0", background: isHigh ? "#22c55e" : isLast ? "#6366f1" : "#e2e8f0" }} />
                    <div style={{ fontSize:9, color:"#cbd5e1", textAlign:"center" }}>{w.w}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:12, marginTop:10 }}>
              {[["#22c55e","40km+ 목표"],["#6366f1","최근 주"],["#e2e8f0","일반"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:c }} />
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"16px", marginBottom:12, border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:4 }}>❤️ 심박수 효율 트렌드</div>
            <div style={{ fontSize:11, color:"#94a3b8", marginBottom:14 }}>같은 페이스에서 심박수가 낮아질수록 효율 ↑</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {HR_TREND.map((r,i)=>{
                const isLatest = i === HR_TREND.length - 1;
                const hrColor = r.hr >= 170 ? "#ef4444" : r.hr >= 160 ? "#f97316" : r.hr >= 150 ? "#eab308" : "#22c55e";
                const hrPct = ((r.hr - 130) / (180 - 130)) * 100;
                const paceStr = `${Math.floor(r.pace)}:${String(Math.round((r.pace%1)*60)).padStart(2,"0")}`;
                return (
                  <div key={i}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, alignItems:"center" }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontSize:12, color: isLatest ? "#6366f1" : "#64748b", fontWeight: isLatest ? 700 : 500, width:32 }}>{r.label}</span>
                        <span style={{ fontSize:11, color:"#94a3b8" }}>{r.km}km @ {paceStr}/km</span>
                      </div>
                      <span style={{ fontSize:13, fontWeight:700, color:hrColor }}>{r.hr}♥</span>
                    </div>
                    <div style={{ background:"#f1f5f9", borderRadius:99, height:7, overflow:"hidden" }}>
                      <div style={{ width:`${hrPct}%`, height:"100%", borderRadius:99, background: isLatest ? `linear-gradient(90deg,#6366f1,${hrColor})` : hrColor, opacity: isLatest ? 1 : 0.6 }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:12, flexWrap:"wrap" }}>
              {[["#22c55e","~149 😊"],["#eab308","150~159 😐"],["#f97316","160~169 😅"],["#ef4444","170+ 🔥"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:12, background:"#f0fdf4", borderRadius:10, padding:"10px 12px", border:"1px solid #bbf7d0" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#16a34a", marginBottom:3 }}>📉 HR 효율 계속 개선 중!</div>
              <div style={{ fontSize:11, color:"#166534", lineHeight:1.6 }}>5/5 10km @ HR 136 — 역대 10km 최저 심박수! 4/19 HR 173에서 꾸준히 낮아지고 있어요. 유산소 기반이 탄탄하게 쌓이고 있어요 💪</div>
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:14 }}>데이터가 말하는 것</div>
            {INSIGHTS.map((item,i)=>(
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"12px 0", borderBottom: i<3 ? "1px solid #f8fafc" : "none" }}>
                <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:item.color+"15", border:`1px solid ${item.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:item.color, marginBottom:3 }}>{item.title}</div>
                  <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* 페이스 탭 */}
        {tab === "pace" && (<>
          <div style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid #e2e8f0", marginBottom:12, boxShadow:"0 2px 8px #0000000a" }}>
            <div style={{ background:"linear-gradient(135deg,#1e1b4b,#0f172a)", padding:"16px 18px" }}>
              <div style={{ fontSize:12, color:"#818cf8", fontWeight:700, marginBottom:4 }}>레이스 페이스 차트</div>
              <div style={{ fontSize:30, fontWeight:900, color:"#6366f1", letterSpacing:-1 }}>3:29:59</div>
              <div style={{ fontSize:13, color:"#94a3b8", marginTop:2 }}>@ 4:58/km · 42.195km</div>
            </div>
            <div style={{ padding:"4px 0" }}>
              {PACE_TABLE.map((row,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 18px", borderBottom: i<PACE_TABLE.length-1 ? "1px solid #f8fafc" : "none", background: row.big ? "#f5f3ff" : "#fff" }}>
                  <span style={{ fontSize:13, color: row.big ? "#6366f1" : "#64748b", fontWeight: row.big ? 700 : 500 }}>{row.label}</span>
                  <span style={{ fontSize: row.big ? 20 : 14, fontWeight:800, color:row.color }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #e2e8f0", marginBottom:12 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:14 }}>🎯 레이스 페이스 전략</div>
            {[
              { km:"0–10km",  pace:"5:05–5:10", note:"보수적 스타트. 무조건 참기", color:"#3b82f6" },
              { km:"10–30km", pace:"4:58",      note:"목표 페이스 정속 유지",      color:"#22c55e" },
              { km:"30–35km", pace:"4:58",      note:"버티기 구간. 페이스 지키기", color:"#f97316" },
              { km:"35–42km", pace:"4:55↑",     note:"여력 있으면 올려도 OK",      color:"#8b5cf6" },
            ].map((r,i)=>(
              <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom: i<3 ? "1px solid #f8fafc" : "none" }}>
                <div style={{ width:60, flexShrink:0, fontSize:12, fontWeight:700, color:r.color, background:r.color+"12", borderRadius:6, padding:"4px 6px", textAlign:"center" }}>{r.km}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:"#1e293b" }}>{r.pace}/km</div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:1 }}>{r.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius:14, padding:"16px", border:"1px solid #bbf7d0" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#16a34a", marginBottom:10 }}>✅ 내 데이터 기반 자신감</div>
            {[
              "5/1 롱런 18km @ HR 155, 5/2 친구랑 10km @ HR 150 — 1주차 완벽 완주 🎉",
              "43km 울트라 완주 경험 → 거리 자체는 문제없음",
              "최고 페이스 4:56/km 기록 (25/11) → 몸은 이미 알고 있다",
            ].map((t,i)=>(
              <div key={i} style={{ fontSize:13, color:"#166534", paddingLeft:10, borderLeft:"2px solid #86efac", marginBottom:5, lineHeight:1.6 }}>{t}</div>
            ))}
          </div>
        </>)}
      </div>

      <div style={{ height:20, textAlign:"center" }}>
        <span style={{ fontSize:11, color:"#e2e8f0" }}>JTBC SEOUL 2026 · TRUST THE PROCESS</span>
      </div>
    </div>
  );
}