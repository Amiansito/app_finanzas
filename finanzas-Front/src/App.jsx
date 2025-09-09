import React, { useState, useEffect, createContext, useContext } from "react";

// Monarch - single-file prototype
// Tailwind required. Assumes Tailwind is configured in the project.

// Theme colors (Tailwind should have violet-300 and violet-700 available)

const AppContext = createContext();

function useLocalState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default function MonarchApp() {
  const [user, setUser] = useLocalState("monarch_user", null);
  const [users, setUsers] = useLocalState("monarch_users", []);
  const [entries, setEntries] = useLocalState("monarch_entries", []); // incomes & expenses
  const [categories, setCategories] = useLocalState("monarch_categories", [
    { id: "salario", name: "Salario" },
    { id: "comida", name: "Comida" },
    { id: "transporte", name: "Transporte" },
    { id: "ocio", name: "Ocio" },
  ]);
  const [budget, setBudget] = useLocalState("monarch_budget", { month: currentMonthKey(), amount: 0 });

  function register(values) {
    if (users.find(u => u.email === values.email)) return { ok: false, msg: "Usuario ya existe" };
    const newUser = { id: Date.now(), ...values };
    setUsers([...users, newUser]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { ok: true };
  }
  function login(email, password) {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email });
      return { ok: true };
    }
    return { ok: false, msg: "Credenciales inválidas" };
  }
  function logout() {
    setUser(null);
  }

  function addEntry(entry) {
    const e = { id: Date.now().toString(), ...entry };
    setEntries([e, ...entries]);
  }
  function addCategory(cat) {
    if (!cat || categories.find(c => c.id === slugify(cat))) return;
    const newCat = { id: slugify(cat), name: cat };
    setCategories([newCat, ...categories]);
  }

  const ctx = { user, register, login, logout, entries, addEntry, categories, addCategory, budget, setBudget };

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen bg-white text-gray-800">
        <div className="max-w-4xl mx-auto p-6">
          <Header />

          {!user ? (
            <AuthShell />
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}

function Header() {
  const { user, logout } = useContext(AppContext);
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white font-bold">M</div>
        <div>
          <h1 className="text-2xl font-semibold">Monarch</h1>
          <p className="text-sm text-gray-500">Gestión financiera personal</p>
        </div>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Hola, <span className="font-medium">{user.name}</span></div>
            <button onClick={logout} className="px-3 py-1 rounded-md bg-violet-100 text-violet-800 text-sm">Salir</button>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Inicia sesión o regístrate</div>
        )}
      </div>
    </header>
  );
}

function AuthShell() {
  const [mode, setMode] = useState("login");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">{mode === "login" ? "Iniciar sesión" : "Registrarse"}</h2>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
      <div className="p-6 rounded-2xl bg-violet-50">
        <h3 className="font-semibold mb-2">Sobre Monarch</h3>
        <p className="text-sm text-gray-600">Monarch te ayuda a registrar ingresos y gastos, organizarlos por categorías y planificar tu presupuesto mensual.</p>
        <div className="mt-6 flex gap-2">
          <button onClick={() => setMode("login")} className={`px-3 py-1 rounded-md ${mode==="login"?"bg-violet-700 text-white":"bg-white text-violet-700 border border-violet-200"}`}>Login</button>
          <button onClick={() => setMode("register")} className={`px-3 py-1 rounded-md ${mode==="register"?"bg-violet-700 text-white":"bg-white text-violet-700 border border-violet-200"}`}>Registro</button>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState(null);
  function submit(e) {
    e.preventDefault();
    const res = login(email.trim(), pass);
    if (!res.ok) setMsg(res.msg || "Error");
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      {msg && <div className="text-sm text-red-600">{msg}</div>}
      <input type="email" required placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
      <input type="password" required placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
      <button className="w-full py-2 rounded-md bg-gradient-to-r from-violet-400 to-violet-700 text-white">Entrar</button>
    </form>
  );
}

function RegisterForm() {
  const { register } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState(null);
  function submit(e) {
    e.preventDefault();
    const res = register({ name: name.trim(), email: email.trim(), password: pass });
    if (!res.ok) setMsg(res.msg || "Error");
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      {msg && <div className="text-sm text-red-600">{msg}</div>}
      <input required placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
      <input type="email" required placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
      <input type="password" required placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
      <button className="w-full py-2 rounded-md bg-gradient-to-r from-violet-400 to-violet-700 text-white">Crear cuenta</button>
    </form>
  );
}

function Dashboard() {
  const { entries, addEntry, categories, addCategory, budget, setBudget } = useContext(AppContext);
  const [view, setView] = useState("overview");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <nav className="flex gap-2">
          <button onClick={()=>setView('overview')} className={`px-3 py-1 rounded-md ${view==='overview'?'bg-violet-700 text-white':'bg-gray-50'}`}>Resumen</button>
          <button onClick={()=>setView('add')} className={`px-3 py-1 rounded-md ${view==='add'?'bg-violet-700 text-white':'bg-gray-50'}`}>Agregar</button>
          <button onClick={()=>setView('list')} className={`px-3 py-1 rounded-md ${view==='list'?'bg-violet-700 text-white':'bg-gray-50'}`}>Movimientos</button>
        </nav>

        {view === 'overview' && <Overview />}
        {view === 'add' && <AddEntryForm addEntry={addEntry} categories={categories} addCategory={addCategory} />}
        {view === 'list' && <EntriesList entries={entries} />}
      </div>

      <aside className="space-y-4 p-4 rounded-2xl border bg-violet-50">
        <BudgetPanel budget={budget} setBudget={setBudget} />
        <CategoryPanel categories={categories} addCategory={addCategory} />
      </aside>
    </div>
  );
}

function Overview() {
  const { entries } = useContext(AppContext);
  const monthKey = currentMonthKey();
  const monthEntries = entries.filter(e => e.month === monthKey);
  const income = monthEntries.filter(e=>e.type==='income').reduce((s,i)=>s+Number(i.amount||0),0);
  const expense = monthEntries.filter(e=>e.type==='expense').reduce((s,i)=>s+Number(i.amount||0),0);
  return (
    <div className="p-6 rounded-2xl border">
      <h3 className="font-semibold mb-4">Resumen de {readableMonth()}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-white shadow-sm">
          <div className="text-sm text-gray-500">Ingresos</div>
          <div className="text-xl font-bold">${income.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-lg bg-white shadow-sm">
          <div className="text-sm text-gray-500">Gastos</div>
          <div className="text-xl font-bold">${expense.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Últimos movimientos</h4>
        <EntriesList entries={monthEntries.slice(0,6)} />
      </div>
    </div>
  );
}

function EntriesList({ entries }) {
  if (!entries || entries.length === 0) return <div className="p-4 text-sm text-gray-500">Sin movimientos</div>;
  return (
    <div className="space-y-2">
      {entries.map(e => (
        <div key={e.id} className="flex items-center justify-between p-3 rounded-lg bg-white border">
          <div>
            <div className="font-medium">{e.title}</div>
            <div className="text-sm text-gray-500">{e.category} • {e.date}</div>
          </div>
          <div className={`font-semibold ${e.type==='income'? 'text-green-600':'text-red-600'}`}>${Number(e.amount).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}

function AddEntryForm({ addEntry, categories, addCategory }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categories[0]?.id || "");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [newCat, setNewCat] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title || !amount) return;
    addEntry({ title, amount: Number(amount), type, category: category || newCat, date, month: monthKeyFromDate(date) });
    setTitle(''); setAmount('');
  }
  return (
    <form onSubmit={submit} className="p-4 rounded-lg border bg-white space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} className="px-3 py-2 rounded-md border col-span-2" />
        <input placeholder="Monto" value={amount} onChange={e=>setAmount(e.target.value)} className="px-3 py-2 rounded-md border" />
        <select value={type} onChange={e=>setType(e.target.value)} className="px-3 py-2 rounded-md border">
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 rounded-md border col-span-2">
          <option value="">-- Categoría --</option>
          {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-3 py-2 rounded-md border" />
      </div>

      <div className="flex gap-2">
        <input placeholder="Agregar categoría" value={newCat} onChange={e=>setNewCat(e.target.value)} className="px-3 py-2 rounded-md border flex-1" />
        <button type="button" onClick={()=>{addCategory(newCat); setNewCat('');}} className="px-3 py-2 rounded-md bg-violet-100 text-violet-800">Añadir</button>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-400 to-violet-700 text-white">Guardar</button>
      </div>
    </form>
  );
}

function BudgetPanel({ budget, setBudget }) {
  const [amount, setAmount] = useState(budget?.amount || 0);
  function save() {
    setBudget({ month: currentMonthKey(), amount: Number(amount) });
  }
  return (
    <div>
      <h4 className="font-semibold mb-2">Presupuesto mensual</h4>
      <div className="text-sm text-gray-600 mb-2">Mes: {readableMonth()}</div>
      <div className="flex gap-2">
        <input value={amount} onChange={e=>setAmount(e.target.value)} className="px-3 py-2 rounded-md border flex-1" />
        <button onClick={save} className="px-3 py-2 rounded-md bg-violet-700 text-white">Guardar</button>
      </div>
    </div>
  );
}

function CategoryPanel({ categories, addCategory }) {
  const [newC, setNewC] = useState("");
  return (
    <div>
      <h4 className="font-semibold mb-2">Categorías</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map(c=> <span key={c.id} className="px-3 py-1 rounded-full bg-white border text-sm">{c.name}</span>)}
      </div>
      <div className="flex gap-2">
        <input value={newC} onChange={e=>setNewC(e.target.value)} placeholder="Nueva categoría" className="px-3 py-2 rounded-md border flex-1" />
        <button onClick={()=>{addCategory(newC); setNewC('');}} className="px-3 py-2 rounded-md bg-violet-100 text-violet-800">Añadir</button>
      </div>
    </div>
  );
}

// --- Helpers ---
function slugify(s){ return s ? s.toString().toLowerCase().trim().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'') : '' }
function currentMonthKey(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}` }
function monthKeyFromDate(date){ const d=new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}` }
function readableMonth(){ const d=new Date(); return d.toLocaleString('es-AR',{month:'long', year:'numeric'}) }

