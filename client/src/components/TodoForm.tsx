import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App"; // Asegúrate de que la ruta a tu BASE_URL sea correcta

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");

  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(BASE_URL + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to create todo");
        }
        setNewTodo("");
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      console.error("Error creating todo:", error); // Agrega un console.error para ver el error en la consola
      // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
    },
  });

  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          ref={(input) => input && input.focus()}
        />
        <Button
          mx={2}
          type="submit"
          isLoading={isCreating} // Usa el prop isLoading para mostrar el Spinner
          loadingText="Adding..."
          _active={{
            transform: "scale(.97)",
          }}
        >
          <IoMdAdd size={30} />
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;