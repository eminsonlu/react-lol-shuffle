import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Group from './Pages/Group';

import Layout from './Components/Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path="group" element={<Group />} />
      </Route>
    </Routes>
  );
}

export default App;
