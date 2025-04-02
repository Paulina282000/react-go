import {Container, Stack } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";


export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        <TodoForm />
        
      </Container>
    </Stack>
  );
}

export default App;

