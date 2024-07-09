package main

// Imports
import (
	"errors"
	"fmt"
)

// Main function
func main() {

	// Print Message Function
	const message string = "Hello, World!"
	printMe(message)

	// Error Handling

}

func printMe(epicval string) {
	fmt.Println(epicval)
}

func sendError() error {
	return errors.New("This is an error")
}
