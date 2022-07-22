import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./routes";

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div
            className="flex items-center flex-col 
                    min-h-screen justify-center"
          >
            <span className="text-gray-500 text-2xl mt-4">Loading...</span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
