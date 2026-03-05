import { useState } from "react";

/* ═══════════════════════ LAVENDER MIST PALETTE ═══════════════════════ */
const C = {
  bg: "#F8F5FF", bgWarm: "#FFFBF0", surface: "#FFFFFF",
  purple: "#8B6FC0", purpleDeep: "#5B3D8F", purpleSoft: "#E8DFF5", purplePale: "#F3EEFB",
  gold: "#C8A24E", goldWarm: "#E8C96A", goldSoft: "#FFF4D9", goldPale: "#FFFAEB",
  text: "#2D1B4E", textSec: "#7A6992", textTer: "#B5A8C8",
  green: "#4CAF50", greenSoft: "#EDF7ED",
  red: "#E57373", redSoft: "#FDEDED",
  blue: "#5C7AEA", blueSoft: "#EEF1FD",
  orange: "#F4A261", orangeSoft: "#FFF3E6",
  border: "#EDE6F5", borderLight: "#F3EEFB",
  shadow: "rgba(91,61,143,0.07)",
};

const TABS = [
  { id: "dash", icon: "📊", label: "Обзор" },
  { id: "finance", icon: "💰", label: "Финансы" },
  { id: "health", icon: "🏥", label: "Здоровье" },
  { id: "shows", icon: "🏆", label: "Выставки" },
  { id: "litters", icon: "🐾", label: "Помёты" },
  { id: "groom", icon: "✂️", label: "Груминг" },
  { id: "board", icon: "🏠", label: "Передержка" },
];

const MONTHS_SHORT = ["Я","Ф","М","А","М","И","И","А","С","О","Н","Д"];

/* ═══════════════════════ DEMO DATA ═══════════════════════ */
const DEMO_DOGS = [
  { id: 1, name: "Мелли", sex: "F", born: "2018-05-12", color: "Бленхейм", status: "Стерилизована", breeding: false },
  { id: 2, name: "Соня", sex: "F", born: "2021-03-08", color: "Триколор", status: "Племенная", breeding: true },
  { id: 3, name: "Карамель", sex: "F", born: "2020-11-20", color: "Бленхейм", status: "Племенная", breeding: true },
  { id: 4, name: "Дейзи", sex: "F", born: "2019-07-15", color: "Рубин", status: "Стерилизована", breeding: false },
  { id: 5, name: "Чарли", sex: "M", born: "2020-01-10", color: "Триколор", status: "Племенной", breeding: true, studFee: 65000 },
  { id: 6, name: "Оскар", sex: "M", born: "2022-06-03", color: "Бленхейм", status: "Нужен допуск", breeding: false, studFee: 50000 },
];
const DEMO_INCOME = [
  { id: 1, date: "2025-01-15", category: "Вязка", dog: "Чарли", amount: 65000, note: "Вязка с Лолой" },
  { id: 2, date: "2025-02-20", category: "Щенки", dog: "Соня", amount: 180000, note: "Продажа 2 щенков" },
  { id: 3, date: "2025-03-01", category: "Контент", dog: "-", amount: 15000, note: "Консультация" },
  { id: 4, date: "2025-03-10", category: "Вязка", dog: "Чарли", amount: 65000, note: "Вязка с Бетти" },
];
const DEMO_EXPENSES = [
  { id: 1, date: "2025-01-05", category: "Кормление", amount: 28000, note: "Мясо на месяц" },
  { id: 2, date: "2025-01-12", category: "Ветеринария", amount: 18500, note: "Кардиолог, 3 собаки" },
  { id: 3, date: "2025-02-01", category: "Кормление", amount: 32000, note: "Мясо + добавки" },
  { id: 4, date: "2025-02-15", category: "Выставки", amount: 12000, note: "Регистрация + хэндлер" },
  { id: 5, date: "2025-03-01", category: "Кормление", amount: 28000, note: "Мясо на месяц" },
  { id: 6, date: "2025-03-05", category: "Груминг", amount: 4500, note: "Средства для ухода" },
  { id: 7, date: "2025-03-10", category: "Помещение", amount: 15000, note: "Ремонт вольера" },
  { id: 8, date: "2025-01-20", category: "Ветеринария", amount: 8000, note: "Вакцинация" },
  { id: 9, date: "2025-02-28", category: "Разведение", amount: 9500, note: "УЗИ + прогестерон" },
];
const DEMO_HEALTH = [
  { id: 1, date: "2025-01-12", dog: "Мелли", type: "Кардиолог", result: "Норма, MVD 0", next: "2026-01-12" },
  { id: 2, date: "2025-01-12", dog: "Соня", type: "Кардиолог", result: "Норма, MVD 0", next: "2026-01-12" },
  { id: 3, date: "2025-01-12", dog: "Чарли", type: "Кардиолог", result: "Норма", next: "2026-01-12" },
  { id: 4, date: "2025-01-20", dog: "Мелли", type: "Вакцинация", result: "Нобивак DHPPi+L", next: "2026-01-20" },
  { id: 5, date: "2025-02-05", dog: "Карамель", type: "Стоматолог", result: "Чистка, всё ок", next: "2026-02-05" },
  { id: 6, date: "2025-02-10", dog: "Оскар", type: "МРТ", result: "СМ/СМ — чисто", next: "2027-02-10" },
];
const DEMO_SHOWS = [
  { id: 1, date: "2025-02-15", dog: "Оскар", show: "Золотой Ошейник", place: "Москва", result: "CW, BOB Puppy", handler: "Анна К.", cost: 12000, title: "" },
  { id: 2, date: "2025-03-22", dog: "Оскар", show: "Евразия-1", place: "Москва", result: "CW, JCAC", handler: "Анна К.", cost: 15000, title: "JCAC" },
  { id: 3, date: "2025-04-10", dog: "Карамель", show: "Кубок Кипра", place: "Лимассол", result: "CW, CACIB", handler: "Сама", cost: 35000, title: "CACIB" },
];
const DEMO_LITTERS = [
  { id: 1, mother: "Соня", father: "Чарли (внешний)", matingDate: "2024-12-12", birthDate: "2025-02-13", puppies: 4, sold: 2, reserved: 1, available: 1, revenue: 360000 },
];
const DEMO_GROOM = [
  { id: 1, date: "2025-03-01", dog: "Мелли", procedure: "Купание + сушка", notes: "Шампунь Crown Royale" },
  { id: 2, date: "2025-03-01", dog: "Чарли", procedure: "Стрижка лап + когти", notes: "" },
  { id: 3, date: "2025-03-05", dog: "Оскар", procedure: "Полный груминг", notes: "Подготовка к выставке" },
];
const DEMO_BOARDING = [
  { id: 1, dogName: "Бакс", breed: "Кавалер Кинг Чарльз", ownerName: "Елена Смирнова", ownerPhone: "+7 916 123-45-67", ownerTg: "@elena_smirnova", dateIn: "2025-03-10", dateOut: "2025-03-20", dailyRate: 2500, prepaid: 15000, notes: "Аллергия на курицу, давать Royal Canin Hypoallergenic. Гулять 2 раза в день.", status: "active" },
  { id: 2, dogName: "Лола", breed: "Кавалер Кинг Чарльз", ownerName: "Андрей Петров", ownerPhone: "+7 925 987-65-43", ownerTg: "@andrey_p", dateIn: "2025-02-25", dateOut: "2025-03-05", dailyRate: 2000, prepaid: 18000, notes: "Спокойная, ладит с другими собаками.", status: "completed" },
  { id: 3, dogName: "Тедди", breed: "Той-пудель", ownerName: "Мария Козлова", ownerPhone: "+7 903 555-12-34", ownerTg: "@masha_k", dateIn: "2025-03-25", dateOut: "2025-04-05", dailyRate: 2500, prepaid: 0, notes: "Первая передержка, может нервничать. Любимая игрушка — мячик.", status: "upcoming" },
];

const fmtRub = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

/* ═══════════════════════ SHARED UI ═══════════════════════ */
const Badge = ({ children, color = C.purpleDeep, bg = C.purplePale }) => (
  <span style={{ display: "inline-block", padding: "3px 11px", borderRadius: 20, fontSize: 11, fontWeight: 700, color, background: bg, whiteSpace: "nowrap" }}>{children}</span>
);

const Card = ({ children, onClick, accent }) => (
  <div onClick={onClick} style={{
    background: C.surface, borderRadius: 20, padding: "16px 18px", marginBottom: 10,
    boxShadow: `0 2px 12px ${C.shadow}`, cursor: onClick ? "pointer" : "default",
    borderLeft: accent ? `4px solid ${accent}` : "none", transition: "transform 0.15s",
  }}>{children}</div>
);

const StatCard = ({ icon, val, label, bg = C.purplePale, color = C.purpleDeep }) => (
  <div style={{ flex: 1, background: bg, borderRadius: 18, padding: "14px 8px", textAlign: "center", minWidth: 0 }}>
    <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
    <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{val}</div>
    <div style={{ fontSize: 10, color: C.textTer, fontWeight: 600, marginTop: 2 }}>{label}</div>
  </div>
);

const SectionHead = ({ children, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "22px 0 12px" }}>
    <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, margin: 0, fontFamily: "'Playfair Display', serif" }}>{children}</h3>
    {action && <button onClick={onAction} style={{ background: `linear-gradient(135deg, ${C.purpleDeep}, ${C.purple})`, color: "#fff", border: "none", borderRadius: 20, padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 2px 8px ${C.purple}40` }}>{action}</button>}
  </div>
);

const ProgressBar = ({ value, max, color = C.purple }) => (
  <div style={{ background: C.purplePale, borderRadius: 8, height: 8, overflow: "hidden", flex: 1 }}>
    <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${C.gold})`, borderRadius: 8, transition: "width 0.6s ease" }} />
  </div>
);

const EmptyState = ({ icon, text }) => (
  <div style={{ textAlign: "center", padding: "48px 20px", color: C.textTer }}>
    <div style={{ fontSize: 44, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontSize: 14, fontWeight: 500 }}>{text}</div>
  </div>
);

const MiniChart = ({ data, height = 65 }) => {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", maxWidth: 24, height: Math.max((v / max) * (height - 16), 4), background: `linear-gradient(to top, ${C.purple}, ${C.gold})`, borderRadius: 6, transition: "height 0.5s ease" }} />
          <span style={{ fontSize: 8, color: C.textTer, fontWeight: 600 }}>{MONTHS_SHORT[i]}</span>
        </div>
      ))}
    </div>
  );
};

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(45,27,78,0.35)", backdropFilter: "blur(8px)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", background: C.bg, borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 480, maxHeight: "88vh", overflow: "auto", padding: "20px 22px 36px", animation: "slideUp 0.3s ease" }}>
        <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 18px" }} />
        <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 18px", fontFamily: "'Playfair Display', serif" }}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

const FormField = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.textSec, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</label>
    {children}
  </div>
);

const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 14, border: `1.5px solid ${C.border}`, fontSize: 14, color: C.text, background: C.surface, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const btnPrimary = { width: "100%", padding: "15px", borderRadius: 16, border: "none", background: `linear-gradient(135deg, ${C.purpleDeep}, ${C.purple})`, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 16px ${C.purple}30` };

const ChipFilter = ({ options, active, onChange }) => (
  <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
    {options.map(o => (
      <button key={o.id} onClick={() => onChange(o.id)} style={{
        padding: "8px 14px", borderRadius: 20, border: "none", whiteSpace: "nowrap", fontFamily: "inherit",
        background: active === o.id ? `linear-gradient(135deg, ${C.purpleDeep}, ${C.purple})` : C.surface,
        color: active === o.id ? "#fff" : C.text, fontSize: 12, fontWeight: 600, cursor: "pointer",
        boxShadow: active === o.id ? `0 2px 8px ${C.purple}30` : `0 1px 4px ${C.shadow}`,
      }}>{o.label}</button>
    ))}
  </div>
);

/* ═══════════════════════ DASHBOARD ═══════════════════════ */
const DashTab = ({ dogs, income, expenses, health }) => {
  const totalInc = income.reduce((s, i) => s + i.amount, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = totalInc - totalExp;
  const upcoming = health.filter(h => { const d = (new Date(h.next) - new Date())/(1000*60*60*24); return d > 0 && d <= 90; });
  const mInc = Array(12).fill(0); income.forEach(i => { mInc[new Date(i.date).getMonth()] += i.amount; });

  return (
    <div>
      <div style={{ fontSize: 14, color: C.textSec, fontWeight: 600 }}>Привет! 👋</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.text, fontFamily: "'Playfair Display', serif", marginTop: 2 }}>Ваш питомник</div>

      <div style={{ background: `linear-gradient(135deg, ${C.purpleDeep}, ${C.purple})`, borderRadius: 24, padding: 22, marginTop: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -20, left: 30, width: 80, height: 80, borderRadius: "50%", background: `${C.gold}18` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Баланс питомника</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif", marginTop: 4 }}>{fmtRub(profit)}</div>
          <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
            <div><span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Доход </span><span style={{ fontSize: 14, fontWeight: 700, color: "#A5D6A7" }}>{fmtRub(totalInc)}</span></div>
            <div><span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Расход </span><span style={{ fontSize: 14, fontWeight: 700, color: "#EF9A9A" }}>{fmtRub(totalExp)}</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <StatCard icon="🐕" val={dogs.length} label="Собак" />
        <StatCard icon="🐾" val="1" label="Помёт" bg={C.goldPale} color={C.gold} />
        <StatCard icon="🏆" val="3" label="Выставки" bg={C.greenSoft} color={C.green} />
        <StatCard icon="🏠" val="1" label="Передержка" bg={C.blueSoft} color={C.blue} />
      </div>

      <SectionHead>Доходы по месяцам</SectionHead>
      <Card><MiniChart data={mInc} /></Card>

      {upcoming.length > 0 && <>
        <SectionHead>Напоминания 🔔</SectionHead>
        {upcoming.map(h => (
          <Card key={h.id} accent={C.gold}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.goldPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⏰</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{h.dog} — {h.type}</div>
                <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Следующий: {h.next}</div>
              </div>
            </div>
          </Card>
        ))}
      </>}

      <SectionHead>Наши собаки 🐶</SectionHead>
      {dogs.map(d => (
        <Card key={d.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: d.sex === "F" ? C.purplePale : C.goldPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: d.sex === "F" ? C.purple : C.gold }}>{d.sex === "F" ? "♀" : "♂"}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: C.textSec }}>{d.color} · {d.born}</div>
              </div>
            </div>
            <Badge color={d.breeding ? C.green : C.textSec} bg={d.breeding ? C.greenSoft : C.purplePale}>{d.status}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

/* ═══════════════════════ FINANCE ═══════════════════════ */
const FinanceTab = ({ income, expenses, setIncome, setExpenses }) => {
  const [tab, setTab] = useState("income");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ date: "", category: "", amount: "", note: "", dog: "-" });
  const incCats = ["Вязка","Щенки","Контент","Менторство","Другое"];
  const expCats = ["Кормление","Ветеринария","Выставки","Груминг","Помещение","Разведение","Хранение","Другое"];
  const cats = tab === "income" ? incCats : expCats;
  const data = tab === "income" ? income : expenses;
  const total = data.reduce((s, d) => s + d.amount, 0);
  const byCat = {}; data.forEach(d => { byCat[d.category] = (byCat[d.category]||0) + d.amount; });
  const handleAdd = () => { const it = { id: Date.now(), date: form.date, category: form.category, amount: parseInt(form.amount)||0, note: form.note, dog: form.dog }; if (tab === "income") setIncome(p => [it,...p]); else setExpenses(p => [it,...p]); setShowAdd(false); setForm({ date:"",category:"",amount:"",note:"",dog:"-" }); };

  return (<div>
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {["income","expenses"].map(t => (
        <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: 12, borderRadius: 16, border: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", background: tab === t ? `linear-gradient(135deg, ${C.purpleDeep}, ${C.purple})` : C.surface, color: tab === t ? "#fff" : C.text, boxShadow: tab === t ? `0 4px 12px ${C.purple}30` : `0 1px 4px ${C.shadow}` }}>{t === "income" ? "💰 Доходы" : "📉 Расходы"}</button>
      ))}
    </div>
    <div style={{ background: tab === "income" ? `linear-gradient(135deg, ${C.green}, #66BB6A)` : `linear-gradient(135deg, ${C.red}, #EF9A9A)`, borderRadius: 22, padding: 22, textAlign: "center", marginBottom: 18 }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Итого {tab === "income" ? "доход" : "расход"}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif", marginTop: 4 }}>{fmtRub(total)}</div>
    </div>
    <SectionHead>По категориям</SectionHead>
    <Card>{Object.entries(byCat).sort((a,b) => b[1]-a[1]).map(([cat,amt]) => (
      <div key={cat} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, minWidth: 85 }}>{cat}</span>
        <ProgressBar value={amt} max={total} color={tab === "income" ? C.green : C.red} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.textSec, minWidth: 72, textAlign: "right" }}>{fmtRub(amt)}</span>
      </div>
    ))}</Card>
    <SectionHead action="+ Добавить" onAction={() => setShowAdd(true)}>Записи</SectionHead>
    {data.sort((a,b) => new Date(b.date)-new Date(a.date)).map(d => (
      <Card key={d.id} accent={tab === "income" ? C.green : C.red}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><div style={{ fontWeight: 700, fontSize: 14 }}>{d.category}</div><div style={{ fontSize: 12, color: C.textTer, marginTop: 2 }}>{d.date}{d.dog && d.dog !== "-" ? ` · ${d.dog}` : ""}</div>{d.note && <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>{d.note}</div>}</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: tab === "income" ? C.green : C.red, fontFamily: "'Playfair Display', serif" }}>{fmtRub(d.amount)}</span>
        </div>
      </Card>
    ))}
    <Modal open={showAdd} onClose={() => setShowAdd(false)} title={tab === "income" ? "Новый доход" : "Новый расход"}>
      <FormField label="Дата"><input type="date" style={inputStyle} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></FormField>
      <FormField label="Категория"><select style={inputStyle} value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option value="">Выберите...</option>{cats.map(c => <option key={c}>{c}</option>)}</select></FormField>
      <FormField label="Сумма (₽)"><input type="number" style={inputStyle} value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="0" /></FormField>
      <FormField label="Примечание"><input style={inputStyle} value={form.note} onChange={e => setForm({...form, note: e.target.value})} /></FormField>
      <button onClick={handleAdd} style={btnPrimary}>Сохранить</button>
    </Modal>
  </div>);
};

/* ═══════════════════════ HEALTH ═══════════════════════ */
const HealthTab = ({ dogs, health, setHealth }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ date:"",dog:"",type:"",result:"",next:"" });
  const types = ["Кардиолог","Стоматолог","Вакцинация","МРТ","Офтальмолог","Анализы","Другое"];
  const filtered = filter === "all" ? health : health.filter(h => h.dog === filter);
  const icons = {"Кардиолог":"❤️","Стоматолог":"🦷","Вакцинация":"💉","МРТ":"🧠","Офтальмолог":"👁","Анализы":"🧪"};
  const handleAdd = () => { setHealth(p => [{id: Date.now(),...form},...p]); setShowAdd(false); setForm({date:"",dog:"",type:"",result:"",next:""}); };
  const filterOpts = [{id:"all",label:"Все"}, ...dogs.map(d => ({id: d.name, label: `${d.sex==="F"?"♀":"♂"} ${d.name}`}))];

  return (<div>
    <ChipFilter options={filterOpts} active={filter} onChange={setFilter} />
    <SectionHead action="+ Запись" onAction={() => setShowAdd(true)}>Вет. журнал</SectionHead>
    {filtered.sort((a,b) => new Date(b.date)-new Date(a.date)).map(h => (
      <Card key={h.id} accent={C.purple}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: C.purplePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icons[h.type]||"📋"}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: 15 }}>{h.dog}</span><Badge>{h.type}</Badge></div>
            <div style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>{h.result}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span style={{ fontSize: 11, color: C.textTer }}>📅 {h.date}</span>{h.next && <span style={{ fontSize: 11, color: C.orange, fontWeight: 600 }}>→ {h.next}</span>}</div>
          </div>
        </div>
      </Card>
    ))}
    <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Новая запись">
      <FormField label="Дата"><input type="date" style={inputStyle} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></FormField>
      <FormField label="Собака"><select style={inputStyle} value={form.dog} onChange={e => setForm({...form, dog: e.target.value})}><option value="">Выберите...</option>{dogs.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}</select></FormField>
      <FormField label="Тип"><select style={inputStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})}><option value="">Выберите...</option>{types.map(t => <option key={t}>{t}</option>)}</select></FormField>
      <FormField label="Результат"><input style={inputStyle} value={form.result} onChange={e => setForm({...form, result: e.target.value})} /></FormField>
      <FormField label="Следующий визит"><input type="date" style={inputStyle} value={form.next} onChange={e => setForm({...form, next: e.target.value})} /></FormField>
      <button onClick={handleAdd} style={btnPrimary}>Сохранить</button>
    </Modal>
  </div>);
};

/* ═══════════════════════ SHOWS ═══════════════════════ */
const ShowsTab = ({ dogs, shows, setShows }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({date:"",dog:"",show:"",place:"",result:"",handler:"",cost:"",title:""});
  const totalCost = shows.reduce((s,sh) => s + sh.cost, 0);
  const titles = shows.filter(s => s.title).length;
  const oscarT = shows.filter(s => s.dog === "Оскар" && s.title).length;
  const needed = 3;
  const handleAdd = () => { setShows(p => [{id: Date.now(),...form, cost: parseInt(form.cost)||0},...p]); setShowAdd(false); setForm({date:"",dog:"",show:"",place:"",result:"",handler:"",cost:"",title:""}); };

  return (<div>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <StatCard icon="🏆" val={shows.length} label="Выставки" />
      <StatCard icon="🎖" val={titles} label="Титулы" bg={C.goldPale} color={C.gold} />
      <StatCard icon="💸" val={fmtRub(totalCost)} label="Расходы" bg={C.redSoft} color={C.red} />
    </div>
    <Card accent={C.blue}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontWeight: 700, fontSize: 14 }}>♂ Оскар — допуск</span><Badge color={C.blue} bg={C.blueSoft}>{oscarT}/{needed}</Badge></div>
      <ProgressBar value={oscarT} max={needed} color={C.blue} />
      <div style={{ fontSize: 12, color: C.textSec, marginTop: 8 }}>{oscarT >= needed ? "✅ Готов!" : `Ещё ${needed - oscarT} титула → вязка 50 000 ₽`}</div>
    </Card>
    <SectionHead action="+ Выставка" onAction={() => setShowAdd(true)}>История</SectionHead>
    {shows.sort((a,b) => new Date(b.date)-new Date(a.date)).map(s => (
      <Card key={s.id} accent={s.title ? C.gold : undefined}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{s.show}</div>
            <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>{s.dog} · {s.place} · {s.date}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>{s.result}</div>
            {s.handler && <div style={{ fontSize: 11, color: C.textTer, marginTop: 2 }}>Хэндлер: {s.handler}</div>}
          </div>
          <div style={{ textAlign: "right", minWidth: 70 }}>
            {s.title && <Badge color={C.gold} bg={C.goldPale}>{s.title}</Badge>}
            <div style={{ fontSize: 12, color: C.red, fontWeight: 700, marginTop: 4 }}>{fmtRub(s.cost)}</div>
          </div>
        </div>
      </Card>
    ))}
    <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Новая выставка">
      <FormField label="Дата"><input type="date" style={inputStyle} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></FormField>
      <FormField label="Собака"><select style={inputStyle} value={form.dog} onChange={e => setForm({...form, dog: e.target.value})}><option value="">Выберите...</option>{dogs.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}</select></FormField>
      <FormField label="Название"><input style={inputStyle} value={form.show} onChange={e => setForm({...form, show: e.target.value})} /></FormField>
      <FormField label="Место"><input style={inputStyle} value={form.place} onChange={e => setForm({...form, place: e.target.value})} /></FormField>
      <FormField label="Результат"><input style={inputStyle} value={form.result} onChange={e => setForm({...form, result: e.target.value})} /></FormField>
      <FormField label="Хэндлер"><input style={inputStyle} value={form.handler} onChange={e => setForm({...form, handler: e.target.value})} /></FormField>
      <FormField label="Титул"><input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="JCAC, CACIB..." /></FormField>
      <FormField label="Расходы (₽)"><input type="number" style={inputStyle} value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} /></FormField>
      <button onClick={handleAdd} style={btnPrimary}>Сохранить</button>
    </Modal>
  </div>);
};

/* ═══════════════════════ LITTERS ═══════════════════════ */
const LittersTab = ({ litters, setLitters }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({mother:"",father:"",matingDate:"",birthDate:"",puppies:"",sold:"0",reserved:"0",available:"0",revenue:"0"});
  const totalP = litters.reduce((s,l) => s+l.puppies,0), totalS = litters.reduce((s,l) => s+l.sold,0), totalR = litters.reduce((s,l) => s+l.revenue,0);
  const handleAdd = () => { setLitters(p => [...p, {id: Date.now(),...form, puppies:parseInt(form.puppies)||0, sold:parseInt(form.sold)||0, reserved:parseInt(form.reserved)||0, available:parseInt(form.available)||0, revenue:parseInt(form.revenue)||0}]); setShowAdd(false); };

  return (<div>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <StatCard icon="🐾" val={totalP} label="Щенков" />
      <StatCard icon="✅" val={totalS} label="Продано" bg={C.greenSoft} color={C.green} />
      <StatCard icon="💰" val={fmtRub(totalR)} label="Выручка" bg={C.goldPale} color={C.gold} />
    </div>
    <SectionHead action="+ Помёт" onAction={() => setShowAdd(true)}>Помёты</SectionHead>
    {litters.map(l => {
      const days = l.birthDate ? Math.floor((new Date()-new Date(l.birthDate))/(1000*60*60*24)) : 0;
      return (
        <Card key={l.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>♀ {l.mother} × ♂ {l.father}</span>
            {days > 0 && <Badge>{days} дн.</Badge>}
          </div>
          <div style={{ fontSize: 12, color: C.textTer, marginBottom: 12 }}>Вязка: {l.matingDate} · Рождение: {l.birthDate}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{v:l.puppies,l:"всего",bg:C.purplePale,c:C.purpleDeep},{v:l.sold,l:"продано",bg:C.greenSoft,c:C.green},{v:l.reserved,l:"бронь",bg:C.goldPale,c:C.gold},{v:l.available,l:"свободно",bg:C.blueSoft,c:C.blue}].map((s,i) => (
              <div key={i} style={{ flex: 1, background: s.bg, borderRadius: 14, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.c, fontFamily: "'Playfair Display', serif" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: C.textTer, fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, color: C.textSec }}>Выручка</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: C.green, fontFamily: "'Playfair Display', serif" }}>{fmtRub(l.revenue)}</span>
          </div>
        </Card>
      );
    })}
    <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Новый помёт">
      <FormField label="Мать"><input style={inputStyle} value={form.mother} onChange={e => setForm({...form, mother: e.target.value})} /></FormField>
      <FormField label="Отец"><input style={inputStyle} value={form.father} onChange={e => setForm({...form, father: e.target.value})} /></FormField>
      <FormField label="Дата вязки"><input type="date" style={inputStyle} value={form.matingDate} onChange={e => setForm({...form, matingDate: e.target.value})} /></FormField>
      <FormField label="Дата рождения"><input type="date" style={inputStyle} value={form.birthDate} onChange={e => setForm({...form, birthDate: e.target.value})} /></FormField>
      <FormField label="Щенков"><input type="number" style={inputStyle} value={form.puppies} onChange={e => setForm({...form, puppies: e.target.value})} /></FormField>
      <button onClick={handleAdd} style={btnPrimary}>Сохранить</button>
    </Modal>
  </div>);
};

/* ═══════════════════════ GROOMING ═══════════════════════ */
const GroomTab = ({ dogs, groom, setGroom }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({date:"",dog:"",procedure:"",notes:""});
  const procs = ["Купание + сушка","Стрижка лап + когти","Полный груминг","Чистка ушей","Расчёсывание","Стрижка когтей","Другое"];
  const pIcons = {"Купание + сушка":"🛁","Стрижка лап + когти":"✂️","Полный груминг":"💇","Чистка ушей":"👂","Расчёсывание":"🪮","Стрижка когтей":"💅"};
  const handleAdd = () => { setGroom(p => [{id: Date.now(),...form},...p]); setShowAdd(false); setForm({date:"",dog:"",procedure:"",notes:""}); };

  return (<div>
    <SectionHead action="+ Процедура" onAction={() => setShowAdd(true)}>Журнал груминга</SectionHead>
    {groom.sort((a,b) => new Date(b.date)-new Date(a.date)).map(g => (
      <Card key={g.id}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: C.purplePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{pIcons[g.procedure]||"✨"}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700, fontSize: 14 }}>{g.dog}</span><span style={{ fontSize: 11, color: C.textTer }}>{g.date}</span></div>
            <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>{g.procedure}</div>
            {g.notes && <div style={{ fontSize: 12, color: C.textTer, marginTop: 2 }}>{g.notes}</div>}
          </div>
        </div>
      </Card>
    ))}
    {groom.length === 0 && <EmptyState icon="✂️" text="Записей пока нет" />}
    <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Новая процедура">
      <FormField label="Дата"><input type="date" style={inputStyle} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></FormField>
      <FormField label="Собака"><select style={inputStyle} value={form.dog} onChange={e => setForm({...form, dog: e.target.value})}><option value="">Выберите...</option>{dogs.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}</select></FormField>
      <FormField label="Процедура"><select style={inputStyle} value={form.procedure} onChange={e => setForm({...form, procedure: e.target.value})}><option value="">Выберите...</option>{procs.map(p => <option key={p}>{p}</option>)}</select></FormField>
      <FormField label="Заметки"><input style={inputStyle} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></FormField>
      <button onClick={handleAdd} style={btnPrimary}>Сохранить</button>
    </Modal>
  </div>);
};

/* ═══════════════════════ BOARDING ═══════════════════════ */
const BoardingTab = ({ boarding, setBoarding }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({dogName:"",breed:"",ownerName:"",ownerPhone:"",ownerTg:"",dateIn:"",dateOut:"",dailyRate:"",prepaid:"0",notes:"",status:"upcoming"});

  const filtered = filter === "all" ? boarding : boarding.filter(b => b.status === filter);
  const getDays = (a,b) => Math.max(Math.ceil((new Date(b)-new Date(a))/(1000*60*60*24)),0);
  const getDaysLeft = b => Math.ceil((new Date(b.dateOut)-new Date())/(1000*60*60*24));
  const stMap = { active:{label:"Сейчас",color:C.green,bg:C.greenSoft}, upcoming:{label:"Ожидает",color:C.blue,bg:C.blueSoft}, completed:{label:"Завершено",color:C.textSec,bg:C.purplePale} };
  const aN = boarding.filter(b => b.status==="active").length, uN = boarding.filter(b => b.status==="upcoming").length;
  const totalRev = boarding.reduce((s,b) => s + getDays(b.dateIn,b.dateOut)*b.dailyRate, 0);
  const handleAdd = () => { setBoarding(p => [{id:Date.now(),...form,dailyRate:parseInt(form.dailyRate)||0,prepaid:parseInt(form.prepaid)||0},...p]); setShowAdd(false); setForm({dogName:"",breed:"",ownerName:"",ownerPhone:"",ownerTg:"",dateIn:"",dateOut:"",dailyRate:"",prepaid:"0",notes:"",status:"upcoming"}); };
  const updSt = (id,st) => { setBoarding(p => p.map(b => b.id===id?{...b,status:st}:b)); setDetail(null); };

  return (<div>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <StatCard icon="🟢" val={aN} label="Сейчас" bg={C.greenSoft} color={C.green} />
      <StatCard icon="🔵" val={uN} label="Ожидают" bg={C.blueSoft} color={C.blue} />
      <StatCard icon="💰" val={fmtRub(totalRev)} label="Выручка" bg={C.goldPale} color={C.gold} />
    </div>
    <ChipFilter options={[{id:"all",label:"Все"},{id:"active",label:"🟢 Сейчас"},{id:"upcoming",label:"🔵 Ожидают"},{id:"completed",label:"⚪ Завершено"}]} active={filter} onChange={setFilter} />
    <SectionHead action="+ Запись" onAction={() => setShowAdd(true)}>Передержки</SectionHead>

    {filtered.sort((a,b) => {const o={active:0,upcoming:1,completed:2}; return (o[a.status]??9)-(o[b.status]??9)||new Date(b.dateIn)-new Date(a.dateIn);}).map(b => {
      const st = stMap[b.status]||stMap.upcoming, days = getDays(b.dateIn,b.dateOut), total = days*b.dailyRate, left = getDaysLeft(b);
      return (
        <Card key={b.id} onClick={() => setDetail(b)} accent={st.color}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>🐕 {b.dogName}</span>
            <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
          </div>
          <div style={{ fontSize: 12, color: C.textTer, marginBottom: 10 }}>{b.breed} · {b.ownerName}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {[{l:"Заезд",v:b.dateIn},{l:"Выезд",v:b.dateOut},{l:"Дней",v:days}].map((x,i) => (
              <div key={i} style={{ flex: 1, background: C.purplePale, borderRadius: 12, padding: "8px", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.textTer, fontWeight: 600 }}>{x.l}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: i===2 ? C.purpleDeep : C.text, marginTop: 2 }}>{x.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: C.textSec }}>{fmtRub(b.dailyRate)}/день</span>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontWeight: 800, fontSize: 15, color: C.green, fontFamily: "'Playfair Display', serif" }}>{fmtRub(total)}</span>
              {b.status==="active" && left > 0 && <div style={{ fontSize: 11, color: C.orange, fontWeight: 600, marginTop: 2 }}>Осталось {left} дн.</div>}
            </div>
          </div>
          {b.notes && <div style={{ marginTop: 10, padding: "8px 12px", background: C.orangeSoft, borderRadius: 10, fontSize: 12, color: C.orange }}>⚠️ {b.notes.length > 80 ? b.notes.slice(0,80)+"..." : b.notes}</div>}
        </Card>
      );
    })}
    {filtered.length === 0 && <EmptyState icon="🏠" text="Нет записей" />}

    {/* Detail */}
    <Modal open={!!detail} onClose={() => setDetail(null)} title={detail ? `🐕 ${detail.dogName}` : ""}>
      {detail && (() => { const b=detail, days=getDays(b.dateIn,b.dateOut), total=days*b.dailyRate, debt=total-b.prepaid, st=stMap[b.status]; return (<div>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}><Badge color={st.color} bg={st.bg}>{st.label}</Badge><Badge color={C.gold} bg={C.goldPale}>{b.breed}</Badge></div>
        <div style={{ background:C.purplePale,borderRadius:16,padding:16,marginBottom:14 }}>
          <div style={{ fontSize:13,fontWeight:700,marginBottom:8 }}>👤 Владелец</div>
          <div style={{ fontSize:14,marginBottom:4 }}>{b.ownerName}</div>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            <a href={`tel:${b.ownerPhone}`} style={{ fontSize:13,color:C.blue,textDecoration:"none" }}>📞 {b.ownerPhone}</a>
            {b.ownerTg && <span style={{ fontSize:13,color:C.blue }}>✈️ {b.ownerTg}</span>}
          </div>
        </div>
        <div style={{ background:C.purplePale,borderRadius:16,padding:16,marginBottom:14 }}>
          <div style={{ fontSize:13,fontWeight:700,marginBottom:8 }}>📅 Сроки</div>
          {[["Заезд",b.dateIn],["Выезд",b.dateOut],["Дней",days]].map(([l,v],i) => (
            <div key={i} style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4 }}><span style={{color:C.textSec}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
        </div>
        <div style={{ background:C.greenSoft,borderRadius:16,padding:16,marginBottom:14 }}>
          <div style={{ fontSize:13,fontWeight:700,marginBottom:8 }}>💰 Оплата</div>
          {[["Тариф",fmtRub(b.dailyRate)+"/день"],["Итого",fmtRub(total)],["Предоплата",fmtRub(b.prepaid)]].map(([l,v],i) => (
            <div key={i} style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4 }}><span style={{color:C.textSec}}>{l}</span><span style={{fontWeight:i===1?700:600,color:i===1?C.green:C.text}}>{v}</span></div>
          ))}
          {debt > 0 && <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginTop:6,paddingTop:8,borderTop:`1px dashed ${C.border}` }}><span style={{fontWeight:700,color:C.red}}>Долг</span><span style={{fontWeight:700,color:C.red}}>{fmtRub(debt)}</span></div>}
        </div>
        {b.notes && <div style={{ background:C.orangeSoft,borderRadius:16,padding:16,marginBottom:14 }}><div style={{fontSize:13,fontWeight:700,marginBottom:6}}>📝 Особенности</div><div style={{fontSize:13,lineHeight:1.5}}>{b.notes}</div></div>}
        <div style={{ display:"flex",gap:8,marginTop:16 }}>
          {b.status==="upcoming" && <button onClick={() => updSt(b.id,"active")} style={{...btnPrimary,background:`linear-gradient(135deg, ${C.green}, #66BB6A)`}}>Принять собаку</button>}
          {b.status==="active" && <button onClick={() => updSt(b.id,"completed")} style={btnPrimary}>Завершить</button>}
        </div>
      </div>); })()}
    </Modal>

    {/* Add */}
    <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Новая передержка">
      <FormField label="Кличка"><input style={inputStyle} value={form.dogName} onChange={e => setForm({...form,dogName:e.target.value})} /></FormField>
      <FormField label="Порода"><input style={inputStyle} value={form.breed} onChange={e => setForm({...form,breed:e.target.value})} placeholder="Кавалер Кинг Чарльз" /></FormField>
      <div style={{ background:C.purplePale,borderRadius:16,padding:16,marginBottom:14 }}>
        <div style={{ fontSize:11,fontWeight:700,color:C.textSec,marginBottom:10,textTransform:"uppercase",letterSpacing:0.8 }}>👤 Контакты владельца</div>
        <FormField label="ФИО"><input style={inputStyle} value={form.ownerName} onChange={e => setForm({...form,ownerName:e.target.value})} /></FormField>
        <FormField label="Телефон"><input type="tel" style={inputStyle} value={form.ownerPhone} onChange={e => setForm({...form,ownerPhone:e.target.value})} placeholder="+7 ..." /></FormField>
        <FormField label="Telegram"><input style={inputStyle} value={form.ownerTg} onChange={e => setForm({...form,ownerTg:e.target.value})} placeholder="@username" /></FormField>
      </div>
      <FormField label="Заезд"><input type="date" style={inputStyle} value={form.dateIn} onChange={e => setForm({...form,dateIn:e.target.value})} /></FormField>
      <FormField label="Выезд"><input type="date" style={inputStyle} value={form.dateOut} onChange={e => setForm({...form,dateOut:e.target.value})} /></FormField>
      <FormField label="₽/день"><input type="number" style={inputStyle} value={form.dailyRate} onChange={e => setForm({...form,dailyRate:e.target.value})} placeholder="2500" /></FormField>
      <FormField label="Предоплата"><input type="number" style={inputStyle} value={form.prepaid} onChange={e => setForm({...form,prepaid:e.target.value})} placeholder="0" /></FormField>
      <FormField label="Особенности"><textarea style={{...inputStyle,minHeight:80,resize:"vertical"}} value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} placeholder="Аллергии, корм, привычки..." /></FormField>
      <button onClick={handleAdd} style={btnPrimary}>Сохранить</button>
    </Modal>
  </div>);
};

/* ═══════════════════════ MAIN APP ═══════════════════════ */
export default function BreederProApp() {
  const [activeTab, setActiveTab] = useState("dash");
  const [dogs] = useState(DEMO_DOGS);
  const [income, setIncome] = useState(DEMO_INCOME);
  const [expenses, setExpenses] = useState(DEMO_EXPENSES);
  const [health, setHealth] = useState(DEMO_HEALTH);
  const [shows, setShows] = useState(DEMO_SHOWS);
  const [litters, setLitters] = useState(DEMO_LITTERS);
  const [groom, setGroom] = useState(DEMO_GROOM);
  const [boarding, setBoarding] = useState(DEMO_BOARDING);

  const renderTab = () => {
    switch (activeTab) {
      case "dash": return <DashTab dogs={dogs} income={income} expenses={expenses} health={health} />;
      case "finance": return <FinanceTab income={income} expenses={expenses} setIncome={setIncome} setExpenses={setExpenses} />;
      case "health": return <HealthTab dogs={dogs} health={health} setHealth={setHealth} />;
      case "shows": return <ShowsTab dogs={dogs} shows={shows} setShows={setShows} />;
      case "litters": return <LittersTab litters={litters} setLitters={setLitters} />;
      case "groom": return <GroomTab dogs={dogs} groom={groom} setGroom={setGroom} />;
      case "board": return <BoardingTab boarding={boarding} setBoarding={setBoarding} />;
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        input, select, button, textarea { font-family: inherit; }
        input:focus, select:focus, textarea:focus { border-color: ${C.purple} !important; box-shadow: 0 0 0 3px ${C.purpleSoft}; }
      `}</style>

      <div style={{ position: "fixed", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: C.purpleSoft, opacity: 0.5, filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: 120, left: -60, width: 160, height: 160, borderRadius: "50%", background: C.goldSoft, opacity: 0.6, filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ padding: "24px 22px 16px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.purpleDeep, fontFamily: "'Playfair Display', serif" }}>BreederPro</div>
            <div style={{ fontSize: 11, color: C.textTer, fontWeight: 600 }}>Управление питомником</div>
          </div>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(140deg, ${C.purpleSoft}, ${C.goldSoft})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: `2px solid ${C.surface}`, boxShadow: `0 4px 14px ${C.shadow}` }}>🐾</div>
        </div>
      </div>

      <div style={{ padding: "0 18px 110px", position: "relative", zIndex: 1 }}>{renderTab()}</div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: `${C.surface}F5`, backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "6px 2px", paddingBottom: "max(6px, env(safe-area-inset-bottom))", zIndex: 100, boxShadow: `0 -4px 24px ${C.shadow}` }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 5px", border: "none", background: activeTab === t.id ? C.purplePale : "none", cursor: "pointer", minWidth: 44, borderRadius: 12, fontFamily: "inherit", transition: "all 0.2s" }}>
            <span style={{ fontSize: 17, opacity: activeTab === t.id ? 1 : 0.4, transition: "all 0.2s" }}>{t.icon}</span>
            <span style={{ fontSize: 8, color: activeTab === t.id ? C.purpleDeep : C.textTer, fontWeight: activeTab === t.id ? 800 : 500 }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
