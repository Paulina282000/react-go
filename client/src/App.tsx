import { Stack, Container } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export const BASE_URL = "https://react-go-production-ed0e.up.railway.app/api";
function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
         <TodoForm /> 
        <TodoList /> 
      </Container>
    </Stack>
  );
}

export default App;

