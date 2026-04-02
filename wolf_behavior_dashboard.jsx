import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";

const COLORS = {
  Resting: "#60a5fa",
  Foraging: "#34d399",
  Traveling: "#f87171",
};

const WOLF_COLORS = ["#f97316","#a78bfa","#34d399","#f87171","#fbbf24","#60a5fa"];

const sampleTracks = [{"animal_id":"Wolf_1","lat":44.195676,"lon":-110.183705,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.127119,"lon":-110.247229,"behavior":"Foraging"},{"animal_id":"Wolf_1","lat":44.121978,"lon":-110.278072,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.12198,"lon":-110.278026,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.122549,"lon":-110.281261,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.136257,"lon":-110.400498,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.259935,"lon":-110.637145,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.353794,"lon":-110.822006,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.079835,"lon":-111.060145,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.059437,"lon":-111.204153,"behavior":"Foraging"},{"animal_id":"Wolf_1","lat":44.055028,"lon":-111.214701,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.065501,"lon":-111.224851,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.069189,"lon":-111.227531,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.598168,"lon":-110.733212,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.90204,"lon":-110.576492,"behavior":"Traveling"},{"animal_id":"Wolf_1","lat":44.904683,"lon":-110.57749,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.904643,"lon":-110.577566,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.905123,"lon":-110.587697,"behavior":"Resting"},{"animal_id":"Wolf_1","lat":44.844987,"lon":-110.664371,"behavior":"Foraging"},{"animal_id":"Wolf_1","lat":44.882984,"lon":-110.767139,"behavior":"Foraging"},{"animal_id":"Wolf_2","lat":44.382141,"lon":-110.630083,"behavior":"Resting"},{"animal_id":"Wolf_2","lat":44.38326,"lon":-110.627713,"behavior":"Resting"},{"animal_id":"Wolf_2","lat":44.382615,"lon":-110.625553,"behavior":"Resting"},{"animal_id":"Wolf_2","lat":44.440913,"lon":-109.774561,"behavior":"Traveling"},{"animal_id":"Wolf_2","lat":44.433974,"lon":-109.749172,"behavior":"Foraging"},{"animal_id":"Wolf_2","lat":44.437269,"lon":-109.744693,"behavior":"Foraging"},{"animal_id":"Wolf_2","lat":44.445711,"lon":-109.720506,"behavior":"Foraging"},{"animal_id":"Wolf_2","lat":44.457774,"lon":-109.632087,"behavior":"Foraging"},{"animal_id":"Wolf_2","lat":44.433008,"lon":-109.520009,"behavior":"Foraging"},{"animal_id":"Wolf_2","lat":44.424173,"lon":-109.45499,"behavior":"Foraging"},{"animal_id":"Wolf_3","lat":45.020695,"lon":-110.745273,"behavior":"Traveling"},{"animal_id":"Wolf_3","lat":45.031743,"lon":-110.768951,"behavior":"Traveling"},{"animal_id":"Wolf_3","lat":45.093271,"lon":-110.851123,"behavior":"Foraging"},{"animal_id":"Wolf_3","lat":45.084051,"lon":-110.842621,"behavior":"Resting"},{"animal_id":"Wolf_3","lat":45.084064,"lon":-110.842407,"behavior":"Resting"},{"animal_id":"Wolf_3","lat":45.091146,"lon":-110.837671,"behavior":"Resting"},{"animal_id":"Wolf_3","lat":45.09144,"lon":-110.8364,"behavior":"Resting"},{"animal_id":"Wolf_3","lat":45.089211,"lon":-110.832732,"behavior":"Resting"},{"animal_id":"Wolf_3","lat":45.083088,"lon":-110.833271,"behavior":"Resting"},{"animal_id":"Wolf_3","lat":45.069628,"lon":-110.856536,"behavior":"Foraging"},{"animal_id":"Wolf_4","lat":44.054776,"lon":-110.176085,"behavior":"Foraging"},{"animal_id":"Wolf_4","lat":43.965991,"lon":-110.143016,"behavior":"Foraging"},{"animal_id":"Wolf_4","lat":43.963863,"lon":-110.184732,"behavior":"Foraging"},{"animal_id":"Wolf_4","lat":43.96108,"lon":-110.020518,"behavior":"Foraging"},{"animal_id":"Wolf_4","lat":43.959808,"lon":-110.021603,"behavior":"Resting"},{"animal_id":"Wolf_4","lat":43.957832,"lon":-110.025626,"behavior":"Resting"},{"animal_id":"Wolf_4","lat":43.960899,"lon":-110.026918,"behavior":"Resting"},{"animal_id":"Wolf_4","lat":43.962602,"lon":-110.025946,"behavior":"Resting"},{"animal_id":"Wolf_4","lat":43.960188,"lon":-110.024731,"behavior":"Resting"},{"animal_id":"Wolf_4","lat":43.962739,"lon":-110.025205,"behavior":"Resting"},{"animal_id":"Wolf_5","lat":45.051409,"lon":-110.980387,"behavior":"Traveling"},{"animal_id":"Wolf_5","lat":44.970788,"lon":-111.227926,"behavior":"Traveling"},{"animal_id":"Wolf_5","lat":44.789309,"lon":-111.353799,"behavior":"Traveling"},{"animal_id":"Wolf_5","lat":44.382019,"lon":-111.519559,"behavior":"Traveling"},{"animal_id":"Wolf_5","lat":44.388566,"lon":-111.524009,"behavior":"Resting"},{"animal_id":"Wolf_5","lat":44.388298,"lon":-111.525318,"behavior":"Resting"},{"animal_id":"Wolf_5","lat":44.373452,"lon":-111.519836,"behavior":"Resting"},{"animal_id":"Wolf_5","lat":44.373383,"lon":-111.516075,"behavior":"Resting"},{"animal_id":"Wolf_5","lat":44.373033,"lon":-111.51623,"behavior":"Resting"},{"animal_id":"Wolf_5","lat":44.377721,"lon":-111.510447,"behavior":"Resting"},{"animal_id":"Wolf_6","lat":44.309919,"lon":-110.607597,"behavior":"Resting"},{"animal_id":"Wolf_6","lat":43.810045,"lon":-111.057774,"behavior":"Traveling"},{"animal_id":"Wolf_6","lat":43.618415,"lon":-111.491619,"behavior":"Traveling"},{"animal_id":"Wolf_6","lat":43.627964,"lon":-111.499426,"behavior":"Foraging"},{"animal_id":"Wolf_6","lat":43.647463,"lon":-111.489675,"behavior":"Foraging"},{"animal_id":"Wolf_6","lat":43.650239,"lon":-111.475423,"behavior":"Resting"},{"animal_id":"Wolf_6","lat":43.650232,"lon":-111.475408,"behavior":"Resting"},{"animal_id":"Wolf_6","lat":43.647502,"lon":-111.478941,"behavior":"Resting"},{"animal_id":"Wolf_6","lat":43.641431,"lon":-111.46906,"behavior":"Resting"},{"animal_id":"Wolf_6","lat":43.640957,"lon":-111.470187,"behavior":"Resting"}];

const confMatrix = [[302,1,0],[6,206,0],[0,0,205]];
const labels = ["Resting","Foraging","Traveling"];
const featureImportance = [
  {name:"Speed (km/h)",value:30.35},
  {name:"Log Speed",value:28.16},
  {name:"Step Length",value:17.71},
  {name:"Log Step Length",value:14.21},
  {name:"|Turning Angle|",value:4.50},
  {name:"Turning Angle",value:2.17},
  {name:"Sin(Hour)",value:1.41},
  {name:"Cos(Hour)",value:1.39},
  {name:"Is Night",value:0.09},
];
const behaviorStats = {
  Resting: {count:1515,speed:0.0101,step:0.0051,turning:1.5567,night:43.2},
  Foraging: {count:1062,speed:0.2301,step:0.0767,turning:1.1181,night:38.3},
  Traveling: {count:1023,speed:1.701,step:0.3402,turning:0.4573,night:41.2},
};
const pieData = [
  {name:"Resting",value:1515},{name:"Foraging",value:1062},{name:"Traveling",value:1023}
];
const radarData = [
  {subject:"Speed",Resting:2,Foraging:35,Traveling:100},
  {subject:"Step Length",Resting:1,Foraging:22,Traveling:100},
  {subject:"Turning |angle|",Resting:100,Foraging:72,Traveling:29},
  {subject:"Night Activity",Resting:55,Foraging:49,Traveling:53},
  {subject:"Regularity",Resting:100,Foraging:60,Traveling:30},
];

const StatCard = ({label,value,sub,color}) => (
  <div style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${color}44`,borderRadius:12,padding:"18px 22px",flex:1,minWidth:130}}>
    <div style={{color,fontSize:28,fontWeight:700}}>{value}</div>
    <div style={{color:"#e2e8f0",fontSize:14,marginTop:2,fontWeight:600}}>{label}</div>
    {sub && <div style={{color:"#94a3b8",fontSize:12,marginTop:2}}>{sub}</div>}
  </div>
);

const SectionTitle = ({children,sub}) => (
  <div style={{marginBottom:20}}>
    <h2 style={{color:"#f1f5f9",fontSize:20,fontWeight:700,margin:0}}>{children}</h2>
    {sub && <p style={{color:"#94a3b8",fontSize:13,margin:"4px 0 0"}}>{sub}</p>}
  </div>
);

const Section = ({children,style={}}) => (
  <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:24,border:"1px solid rgba(255,255,255,0.08)",...style}}>
    {children}
  </div>
);

const CUSTOM_TOOLTIP = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return <div style={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"10px 14px",fontSize:13}}>
    <div style={{color:"#94a3b8",marginBottom:4}}>{label}</div>
    {payload.map((p,i)=><div key={i} style={{color:p.fill||p.color||"#fff"}}>{p.name}: <b>{typeof p.value==="number"?p.value.toFixed?p.value.toFixed(2):p.value:p.value}</b></div>)}
  </div>;
};

// Normalize GPS to SVG coords
function toSVG(lat, lon, minLat, maxLat, minLon, maxLon, w, h) {
  const x = ((lon - minLon) / (maxLon - minLon)) * w;
  const y = h - ((lat - minLat) / (maxLat - minLat)) * h;
  return [x, y];
}

function TrackMap() {
  const wolves = ["Wolf_1","Wolf_2","Wolf_3","Wolf_4","Wolf_5","Wolf_6"];
  const lats = sampleTracks.map(d=>d.lat);
  const lons = sampleTracks.map(d=>d.lon);
  const minLat=Math.min(...lats), maxLat=Math.max(...lats);
  const minLon=Math.min(...lons), maxLon=Math.max(...lons);
  const W=420, H=300;
  const pad=20;
  const [hover,setHover] = useState(null);

  return (
    <div>
      <SectionTitle sub="GPS fix locations colored by inferred behavioral state">Movement Trajectories</SectionTitle>
      <div style={{display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"}}>
        <svg width={W} height={H} style={{background:"#0f172a",borderRadius:10,border:"1px solid #1e293b",flex:"0 0 auto"}}>
          {/* grid lines */}
          {[0,1,2,3].map(i=><line key={i} x1={pad} x2={W-pad} y1={pad+(H-2*pad)*i/3} y2={pad+(H-2*pad)*i/3} stroke="#1e293b" strokeWidth={1}/>)}
          {[0,1,2,3].map(i=><line key={i} x1={pad+(W-2*pad)*i/3} x2={pad+(W-2*pad)*i/3} y1={pad} y2={H-pad} stroke="#1e293b" strokeWidth={1}/>)}
          {sampleTracks.map((d,i)=>{
            const [x,y] = toSVG(d.lat,d.lon,minLat,maxLat,minLon,maxLon,W-2*pad,H-2*pad);
            return <circle key={i} cx={x+pad} cy={y+pad} r={hover===d.animal_id?5:3.5}
              fill={COLORS[d.behavior]} opacity={hover&&hover!==d.animal_id?0.2:0.85}
              onMouseEnter={()=>setHover(d.animal_id)} onMouseLeave={()=>setHover(null)}
              style={{cursor:"pointer", transition:"all 0.15s"}}/>;
          })}
          <text x={pad} y={H-4} fill="#475569" fontSize={10}>W</text>
          <text x={W-pad-4} y={H-4} fill="#475569" fontSize={10}>E</text>
          <text x={2} y={pad+8} fill="#475569" fontSize={10}>N</text>
          <text x={2} y={H-pad} fill="#475569" fontSize={10}>S</text>
        </svg>
        <div style={{flex:1,minWidth:160}}>
          <div style={{fontSize:13,color:"#94a3b8",marginBottom:10,fontWeight:600}}>Legend</div>
          {Object.entries(COLORS).map(([k,v])=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:v,flexShrink:0}}/>
              <span style={{color:"#e2e8f0",fontSize:13}}>{k}</span>
            </div>
          ))}
          <div style={{marginTop:16,fontSize:13,color:"#94a3b8",fontWeight:600}}>Wolves</div>
          {["Wolf_1","Wolf_2","Wolf_3","Wolf_4","Wolf_5","Wolf_6"].map((w,i)=>(
            <div key={w} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer",opacity:hover&&hover!==w?0.4:1,transition:"opacity 0.15s"}}
              onMouseEnter={()=>setHover(w)} onMouseLeave={()=>setHover(null)}>
              <div style={{width:10,height:10,borderRadius:2,background:WOLF_COLORS[i],flexShrink:0}}/>
              <span style={{color:"#e2e8f0",fontSize:12}}>{w}</span>
            </div>
          ))}
          <p style={{color:"#64748b",fontSize:11,marginTop:12,lineHeight:1.5}}>Each dot = one GPS fix every 30 min. Wolves ranged across the Greater Yellowstone region.</p>
        </div>
      </div>
    </div>
  );
}

function ConfusionMatrix() {
  const maxVal = Math.max(...confMatrix.flat().filter((_,i)=>Math.floor(i/3)===i%3?false:true), 1);
  const total = confMatrix.flat().reduce((a,b)=>a+b,0);
  return (
    <div>
      <SectionTitle sub="Random Forest on held-out test set (720 samples)">Confusion Matrix</SectionTitle>
      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        <div style={{display:"flex",gap:2,paddingLeft:80}}>
          {labels.map(l=><div key={l} style={{width:70,textAlign:"center",fontSize:12,color:"#94a3b8",fontWeight:600}}>{l}</div>)}
        </div>
        {confMatrix.map((row,i)=>(
          <div key={i} style={{display:"flex",gap:2,alignItems:"center"}}>
            <div style={{width:76,fontSize:12,color:"#94a3b8",textAlign:"right",paddingRight:8,fontWeight:600}}>{labels[i]}</div>
            {row.map((val,j)=>{
              const isDiag = i===j;
              const intensity = isDiag ? 1 : Math.min(val/maxVal, 1);
              const bg = isDiag
                ? `rgba(52,211,153,${0.3+intensity*0.65})`
                : val>0 ? `rgba(248,113,113,${0.2+intensity*0.7})` : "rgba(255,255,255,0.03)";
              return <div key={j} style={{width:70,height:56,borderRadius:8,background:bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,0.06)"}}>
                <span style={{color:"#f1f5f9",fontWeight:700,fontSize:18}}>{val}</span>
                <span style={{color:"#94a3b8",fontSize:10}}>{((val/row.reduce((a,b)=>a+b,0))*100).toFixed(1)}%</span>
              </div>;
            })}
          </div>
        ))}
        <div style={{display:"flex",gap:2,paddingLeft:80,marginTop:4}}>
          {labels.map(l=><div key={l} style={{width:70,textAlign:"center",fontSize:10,color:"#475569"}}>{l[0]}</div>)}
        </div>
        <p style={{color:"#64748b",fontSize:11,marginTop:8}}>Rows = True label · Columns = Predicted label</p>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("overview");
  const tabs = [
    {id:"overview",label:"📊 Overview"},
    {id:"tracks",label:"🗺 Movement"},
    {id:"features",label:"⚙️ Features"},
    {id:"model",label:"🤖 Model"},
    {id:"findings",label:"💡 Findings"},
  ];

  const behaviorBarData = ["Resting","Foraging","Traveling"].map(b=>({
    name:b,
    "Avg Speed (km/h)":behaviorStats[b].speed,
    "Avg Step (km)":behaviorStats[b].step,
    "Avg |Turning| (rad)":behaviorStats[b].turning,
  }));

  return (
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:"#0a0f1e",minHeight:"100vh",padding:"24px 20px",color:"#f1f5f9"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{display:"inline-block",background:"rgba(96,165,250,0.12)",border:"1px solid rgba(96,165,250,0.3)",borderRadius:20,padding:"4px 14px",fontSize:12,color:"#60a5fa",marginBottom:12,fontWeight:600,letterSpacing:1}}>
          ANIMAL BEHAVIOR · CLASSIFICATION · ML
        </div>
        <h1 style={{fontSize:30,fontWeight:800,margin:"0 0 8px",background:"linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          🐺 Wolf Behavior Classification
        </h1>
        <p style={{color:"#94a3b8",fontSize:14,maxWidth:520,margin:"0 auto"}}>
          Predicting behavioral states (Resting · Foraging · Traveling) from GPS tracking data using Random Forest & Gradient Boosting
        </p>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:24,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:6,border:"1px solid rgba(255,255,255,0.06)",flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{flex:1,padding:"9px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all 0.2s",
              background:tab===t.id?"rgba(96,165,250,0.2)":"transparent",
              color:tab===t.id?"#60a5fa":"#94a3b8",
              outline:tab===t.id?"1px solid rgba(96,165,250,0.4)":"none"}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab==="overview" && <div style={{display:"flex",flexDirection:"column",gap:20}}>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <StatCard label="GPS Fixes" value="3,600" sub="6 wolves × 600 steps" color="#60a5fa"/>
          <StatCard label="RF Accuracy" value="99.0%" sub="Cross-val: 97.6%" color="#34d399"/>
          <StatCard label="GB Accuracy" value="98.9%" sub="Cross-val: 98.2%" color="#a78bfa"/>
          <StatCard label="Behaviors" value="3" sub="Resting · Foraging · Traveling" color="#f97316"/>
        </div>

        <Section>
          <SectionTitle sub="Distribution of behavioral states across all 6 wolves">Behavior Distribution</SectionTitle>
          <div style={{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((entry,i)=><Cell key={i} fill={COLORS[entry.name]}/>)}
                </Pie>
                <Tooltip formatter={(v)=>`${v} fixes`} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:13}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{flex:1,minWidth:140}}>
              {pieData.map(({name,value})=>(
                <div key={name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:COLORS[name],flexShrink:0}}/>
                  <div>
                    <div style={{color:"#e2e8f0",fontWeight:700,fontSize:14}}>{name}</div>
                    <div style={{color:"#94a3b8",fontSize:12}}>{value} fixes · {((value/3600)*100).toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <SectionTitle sub="How the dataset was built">Dataset & Pipeline</SectionTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
            {[
              {icon:"📍",title:"GPS Simulation",desc:"Realistic wolf tracking data generated using Correlated Random Walks & Hidden Markov Model transitions (Yellowstone region)"},
              {icon:"🔧",title:"Feature Engineering",desc:"Extracted step length, speed, turning angle, log-transforms, and circular time features (sin/cos of hour)"},
              {icon:"🌲",title:"Random Forest",desc:"150 trees, stratified 80/20 train-test split, 5-fold cross-validation"},
              {icon:"📈",title:"Gradient Boosting",desc:"150 estimators, same split — used as comparison model"},
            ].map(({icon,title,desc})=>(
              <div key={title} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:14,border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
                <div style={{color:"#e2e8f0",fontWeight:600,fontSize:13,marginBottom:4}}>{title}</div>
                <div style={{color:"#64748b",fontSize:12,lineHeight:1.5}}>{desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>}

      {/* TRACKS TAB */}
      {tab==="tracks" && <Section>
        <TrackMap/>
        <div style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
          {["Resting","Foraging","Traveling"].map(b=>(
            <div key={b} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:14,border:`1px solid ${COLORS[b]}33`}}>
              <div style={{color:COLORS[b],fontWeight:700,fontSize:15,marginBottom:8}}>{b}</div>
              <div style={{color:"#94a3b8",fontSize:12,lineHeight:1.6}}>
                <div>⚡ Speed: <b style={{color:"#e2e8f0"}}>{behaviorStats[b].speed} km/h</b></div>
                <div>📏 Step: <b style={{color:"#e2e8f0"}}>{behaviorStats[b].step} km</b></div>
                <div>🔄 Turning: <b style={{color:"#e2e8f0"}}>{behaviorStats[b].turning} rad</b></div>
                <div>🌙 Night: <b style={{color:"#e2e8f0"}}>{behaviorStats[b].night}%</b></div>
              </div>
            </div>
          ))}
        </div>
      </Section>}

      {/* FEATURES TAB */}
      {tab==="features" && <div style={{display:"flex",flexDirection:"column",gap:20}}>
        <Section>
          <SectionTitle sub="How each feature varies across behavioral states">Feature Distributions by Behavior</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={behaviorBarData} margin={{top:5,right:10,left:-10,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
              <XAxis dataKey="name" tick={{fill:"#94a3b8",fontSize:12}} axisLine={false}/>
              <YAxis tick={{fill:"#94a3b8",fontSize:11}} axisLine={false}/>
              <Tooltip content={<CUSTOM_TOOLTIP/>}/>
              <Legend wrapperStyle={{color:"#94a3b8",fontSize:12}}/>
              <Bar dataKey="Avg Speed (km/h)" fill="#60a5fa" radius={[4,4,0,0]}/>
              <Bar dataKey="Avg Step (km)" fill="#34d399" radius={[4,4,0,0]}/>
              <Bar dataKey="Avg |Turning| (rad)" fill="#f97316" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
            {[
              {color:"#60a5fa",insight:"Speed cleanly separates Traveling (1.7 km/h) from Resting (0.01 km/h) — the model's top predictor."},
              {color:"#34d399",insight:"Step length follows the same pattern: Traveling wolves cover 340m per fix vs 5m when resting."},
              {color:"#f97316",insight:"Turning angle distinguishes Foraging (random search, high turning) from Traveling (directed movement, low turning)."},
            ].map(({color,insight})=>(
              <div key={insight} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:color,flexShrink:0,marginTop:3}}/>
                <span style={{color:"#94a3b8",fontSize:12,lineHeight:1.5}}>{insight}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionTitle sub="Behavioral fingerprints across key dimensions (normalized to 0–100)">Behavioral Radar Profile</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e293b"/>
              <PolarAngleAxis dataKey="subject" tick={{fill:"#94a3b8",fontSize:11}}/>
              <Radar name="Resting" dataKey="Resting" stroke={COLORS.Resting} fill={COLORS.Resting} fillOpacity={0.25}/>
              <Radar name="Foraging" dataKey="Foraging" stroke={COLORS.Foraging} fill={COLORS.Foraging} fillOpacity={0.25}/>
              <Radar name="Traveling" dataKey="Traveling" stroke={COLORS.Traveling} fill={COLORS.Traveling} fillOpacity={0.25}/>
              <Legend wrapperStyle={{color:"#94a3b8",fontSize:12}}/>
              <Tooltip content={<CUSTOM_TOOLTIP/>}/>
            </RadarChart>
          </ResponsiveContainer>
        </Section>
      </div>}

      {/* MODEL TAB */}
      {tab==="model" && <div style={{display:"flex",flexDirection:"column",gap:20}}>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {[
            {model:"Random Forest",acc:"99.0%",cv:"97.6%",color:"#60a5fa",
             metrics:{Resting:{p:0.981,r:0.997,f1:0.989},Foraging:{p:0.995,r:0.972,f1:0.983},Traveling:{p:1.000,r:1.000,f1:1.000}}},
            {model:"Gradient Boosting",acc:"98.9%",cv:"98.2%",color:"#a78bfa",
             metrics:{Resting:{p:0.981,r:1.000,f1:0.990},Foraging:{p:0.990,r:0.972,f1:0.981},Traveling:{p:1.000,r:0.990,f1:0.995}}},
          ].map(({model,acc,cv,color,metrics})=>(
            <Section key={model} style={{flex:1,minWidth:200}}>
              <div style={{color,fontWeight:700,fontSize:16,marginBottom:4}}>{model}</div>
              <div style={{display:"flex",gap:16,marginBottom:14}}>
                <div><div style={{color:"#94a3b8",fontSize:11}}>Test Accuracy</div><div style={{color:"#f1f5f9",fontSize:22,fontWeight:700}}>{acc}</div></div>
                <div><div style={{color:"#94a3b8",fontSize:11}}>CV Accuracy</div><div style={{color:"#f1f5f9",fontSize:22,fontWeight:700}}>{cv}</div></div>
              </div>
              {Object.entries(metrics).map(([cls,m])=>(
                <div key={cls} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:COLORS[cls],fontSize:12,fontWeight:600}}>{cls}</span>
                    <span style={{color:"#64748b",fontSize:11}}>F1: {m.f1.toFixed(3)}</span>
                  </div>
                  <div style={{display:"flex",gap:1}}>
                    {[["P",m.p],["R",m.r],["F1",m.f1]].map(([lbl,val])=>(
                      <div key={lbl} style={{flex:1,background:`rgba(255,255,255,0.05)`,borderRadius:4,padding:"3px 6px",textAlign:"center"}}>
                        <div style={{color:"#475569",fontSize:9}}>{lbl}</div>
                        <div style={{color:"#e2e8f0",fontSize:12,fontWeight:600}}>{val.toFixed(3)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Section>
          ))}
        </div>

        <Section>
          <ConfusionMatrix/>
        </Section>

        <Section>
          <SectionTitle sub="Which features matter most for predicting behavior? (Random Forest)">Feature Importance</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={featureImportance} layout="vertical" margin={{top:5,right:30,left:10,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false}/>
              <XAxis type="number" tick={{fill:"#94a3b8",fontSize:11}} tickFormatter={v=>`${v}%`} axisLine={false}/>
              <YAxis type="category" dataKey="name" tick={{fill:"#94a3b8",fontSize:11}} width={110} axisLine={false}/>
              <Tooltip formatter={(v)=>`${v.toFixed(2)}%`} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:13}}/>
              <Bar dataKey="value" radius={[0,6,6,0]}>
                {featureImportance.map((entry,i)=>{
                  const c = i<2?"#60a5fa":i<4?"#34d399":i<6?"#f97316":"#475569";
                  return <Cell key={i} fill={c}/>;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{color:"#64748b",fontSize:12,marginTop:4}}>Speed-based features account for ~58% of total importance. Time of day contributes only ~3%.</p>
        </Section>
      </div>}

      {/* FINDINGS TAB */}
      {tab==="findings" && <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {[
          {icon:"🎯",title:"Near-Perfect Classification",color:"#34d399",
           body:"Both Random Forest (99.0%) and Gradient Boosting (98.9%) achieved exceptional accuracy. Traveling was classified with 100% precision and recall — its extreme speed values make it trivially separable from the other states."},
          {icon:"⚡",title:"Speed Is King",color:"#60a5fa",
           body:"Speed and log-speed together account for 58.5% of total feature importance. The speed difference between behavioral states spans 3 orders of magnitude: Resting wolves move ~0.01 km/h, Foraging ~0.23 km/h, and Traveling ~1.7 km/h."},
          {icon:"🔄",title:"Turning Angle Separates Foraging from Traveling",color:"#f97316",
           body:"The most interesting distinction: Foraging wolves show high turning angles (1.12 rad average) due to area-restricted search behavior, while Traveling wolves move directionally (0.46 rad). This is the key feature for discriminating these two active states."},
          {icon:"🌙",title:"Time of Day Has Minimal Effect",color:"#a78bfa",
           body:"Surprisingly, time-of-day features (sin/cos of hour, is_night) collectively contribute less than 3% of importance. Wolves in this simulation are active across all hours — behavioral state is driven by locomotion metrics, not diel patterns."},
          {icon:"🐺",title:"What This Enables in Real Research",color:"#fbbf24",
           body:"With a trained classifier like this, ecologists can automatically label millions of GPS fixes from deployed collars, enabling population-scale studies of habitat use, energy budgets, predator-prey dynamics, and human disturbance effects — all without costly direct observation."},
          {icon:"🚀",title:"Next Steps",color:"#fb7185",
           body:"Try adding accelerometer data (ODBA) for even higher accuracy. Explore Hidden Markov Models for sequential behavior inference. Test transfer learning: can a model trained on one pack generalize to another population?"},
        ].map(({icon,title,color,body})=>(
          <Section key={title} style={{borderLeft:`3px solid ${color}`,paddingLeft:20}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:20}}>{icon}</span>
              <h3 style={{color,margin:0,fontSize:16,fontWeight:700}}>{title}</h3>
            </div>
            <p style={{color:"#94a3b8",fontSize:13,lineHeight:1.65,margin:0}}>{body}</p>
          </Section>
        ))}
      </div>}
    </div>
  );
}
