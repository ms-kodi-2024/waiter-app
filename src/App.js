import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import EditTable from './components/pages/EditTable';
import NotFound from './components/pages/NotFound';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/edit/:id" element={<EditTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
