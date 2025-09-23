import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";

export default function Dashboard() {
  const ingresos = 1000000.0;
  const gastos = 152399.0;

  const movimientos = [
    { id: 1, desc: "gasto de neri", categoria: "comida", fecha: "2025-09-12", monto: -152399 },
    { id: 2, desc: "Plata de neri", categoria: "salario", fecha: "2025-09-08", monto: 1000000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex max-w-6xl mx-auto mt-8 gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Resumen de septiembre de 2025</h2>
            <div className="grid grid-cols-2 gap-4">
              <SummaryCard title="Ingresos" value={`$${ingresos.toFixed(2)}`} type="ingreso" />
              <SummaryCard title="Gastos" value={`$${gastos.toFixed(2)}`} type="gasto" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Últimos movimientos</h2>
            <div className="space-y-3">
              {movimientos.map((m) => (
                <TransactionItem key={m.id} movimiento={m} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
