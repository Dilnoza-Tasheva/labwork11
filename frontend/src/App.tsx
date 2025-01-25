import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Items from './features/items/containers/Items.tsx';
import NewItem from './features/items/containers/NewItem.tsx';
import ItemDetails from './features/items/components/ItemDetails.tsx';


const App = () => {


  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<NewItem />} />
            <Route path="/items/:id" element={<ItemDetails />} />
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App;
