import { Link } from "react-router-dom";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MasarifPage from "./pages/MasarifPage";
import { AddMasrofPage } from "./pages/AddMasrofPage";
import SelectMonthBudget from "./pages/SelectMonthBudget";
import { MonthChartPage } from "./pages/MonthChartPage";
import { EditMonthBudgetPage } from "./pages/EditMonthBudgetPage";
import { RecordProvider } from "./context/RecordContext";
import { ItemProvider } from "./context/ItemContext";
import { BasicsChartPage } from "./pages/BasicsChartPage";
import { OthersChartPage } from "./pages/OthersChartPage";

function App() {
  return (
    <RecordProvider>
      <ItemProvider>
        <Router>
          <div>
            <nav>
              <Link to="/" />
            </nav>
            <Routes>
              <Route path="/masrofDetails" element={<HomePage />} />
              <Route path="/masarif" element={<MasarifPage />} />
              <Route path="/addMasrof" element={<AddMasrofPage />} />
              <Route path="/" element={<SelectMonthBudget />} />
              <Route path="/monthChart" element={<MonthChartPage />} />
              <Route path="/basicsChart" element={<BasicsChartPage />} />
              <Route path="/OthersChart" element={<OthersChartPage />} />
              <Route
                path="/editMonthBudget"
                element={<EditMonthBudgetPage />}
              />
            </Routes>
          </div>
        </Router>
      </ItemProvider>
    </RecordProvider>
  );
}

export default App;
