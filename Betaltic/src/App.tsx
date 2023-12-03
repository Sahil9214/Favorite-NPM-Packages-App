// pages/index.tsx (for Next.js) or src/App.tsx (for React)
import React, { useState, useEffect } from "react";

import AllRouter from "./Routes/AllRouter";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  // ... (rest of the code remains the same)

  return (
    <div>
      <Navbar/>
      <AllRouter />
      <Footer/>
    </div>
  );
};

export default App;
