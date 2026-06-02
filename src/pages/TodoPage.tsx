import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const todoState = useTodos();

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Header />
        <StatsBar stats={todoState.stats} />
        <AddTodoForm onAdd={todoState.addTodo} />
        <FilterBar
          filter={todoState.filter}
          setFilter={todoState.setFilter}
          search={todoState.search}
          setSearch={todoState.setSearch}
          categories={todoState.categories}
          selectedCategory={todoState.selectedCategory}
          setSelectedCategory={todoState.setSelectedCategory}
          clearCompleted={todoState.clearCompleted}
          hasCompleted={todoState.stats.completed > 0}
        />
        <TodoList
          todos={todoState.todos}
          onToggle={todoState.toggleTodo}
          onDelete={todoState.deleteTodo}
          onEdit={todoState.editTodo}
        />
      </div>
    </div>
  );
}
