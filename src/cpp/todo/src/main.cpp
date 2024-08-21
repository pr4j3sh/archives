#include <iostream>
#include <vector>

using namespace std;

// A class that represents a simple Todo list
class Todo {
  vector<string> todos;  // A vector to store the list of todos

public:
  // Adds a new todo item to the list
  void add_todo(string todo) { 
    todos.push_back(todo); 
  }

  // Lists all the todo items
  void list_todos() const {
    if (todos.empty()) {
      cout << "Nothing to display." << endl;
    } else {
      for (int i=0;i<todos.size(); i++) {
        cout <<i+1<<". " << todos[i] << endl;
      }
    }
    cout<<"------------------------------"<<endl;
  }

  void delete_todo(int idx){
    todos.erase(todos.begin()+idx-1);
  }
};

int main() {
  Todo todo;  // Create an instance of the Todo class

  // Display the list of todos, initially empty
  todo.list_todos();

  // Add new todo items
  todo.add_todo("Bake cakes");
  todo.add_todo("Make video");

  // Display the list of todos after adding items
  todo.list_todos();

  todo.delete_todo(1);

  todo.list_todos();

  return 0;
}
