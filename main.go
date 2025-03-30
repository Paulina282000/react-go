package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type ToDo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

var todos []ToDo // Definición global de todos, no es necesario redeclararla dentro de main

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()

	// Definir la ruta raíz '/'
	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	// Ruta POST para crear un nuevo ToDo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &ToDo{} // Se usa 'ToDo' en lugar de 'Todo'

		// Analiza el cuerpo de la solicitud y lo almacena en la variable 'todo'
		if err := c.BodyParser(todo); err != nil {
			return err
		}

		// Verificar que el campo 'Body' no esté vacío
		if todo.Body == "" { // Usar 'Body' con mayúscula
			return c.Status(400).JSON(fiber.Map{"error": "todo body is required"})
		}

		// Asignar un ID único al nuevo ToDo
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		// Responder con el ToDo recién creado
		return c.Status(201).JSON(todo)
	})

	// Ruta PATCH para actualizar un ToDo por ID
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id") // Obtener el ID del parámetro en la URL
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid ID"})
		}

		// Buscar el ToDo por ID
		for i, todo := range todos {
			if todo.ID == id { // Comparar ID
				// Actualizar el ToDo (marcarlo como completado)
				todos[i].Completed = true
				return c.Status(200).JSON(todos[i]) // Retornar el ToDo actualizado
			}
		}

		// Si no se encuentra el ToDo
		return c.Status(404).JSON(fiber.Map{"error": "todo not found"})
	})

	//Delete a Todo

	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"success": "True"})
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	})

	// Iniciar el servidor en el puerto 4000
	log.Fatal(app.Listen(":4000"))
}
