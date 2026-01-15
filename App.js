// App.js
// ------------------------------------------------------------
// App de tareas (ToDo) en React Native.
// - Guarda estado: texto del input (taskText) y lista de tareas (tasks)
// - Permite: añadir tareas y marcar/desmarcar como completadas
// - Renderiza: contador + lista optimizada (FlatList)
// ------------------------------------------------------------

import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from 'react-native';

import Header from './components/Header';
import TaskItem from './components/TaskItem';

export default function App() {
  // taskText: texto actual del input
  // setTaskText: función que actualiza ese texto y provoca re-render
  const [taskText, setTaskText] = useState('');

  // tasks: array de tareas -> { id, text, done }
  // setTasks: actualiza el array y provoca re-render
  const [tasks, setTasks] = useState([]);

  // ------------------------------------------------------------
  // handleAddTask: crea una nueva tarea y la añade al array
  // ------------------------------------------------------------
  const handleAddTask = () => {
    // Evitar tareas vacías (solo espacios)
    if (!taskText.trim()) return;

    const newTask = {
      // id único basado en tiempo (suficiente para un ejemplo de clase)
      id: Date.now().toString(),
      // texto limpio
      text: taskText.trim(),
      // por defecto no completada
      done: false,
    };

    // Añadimos al principio para que aparezca arriba
    setTasks([newTask, ...tasks]);

    // Limpiamos el input
    setTaskText('');
  };

  // ------------------------------------------------------------
  // handleToggleTask: cambia done true/false para una tarea concreta
  // ------------------------------------------------------------
  const handleToggleTask = (id) => {
    // Usamos forma funcional: prev = estado anterior fiable
    setTasks((prev) =>
      prev.map((t) =>
        // Si coincide la tarea, devolvemos copia con done invertido
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // Contador de completadas (lo calculamos una vez por render)
  const doneCount = tasks.filter((t) => t.done).length;

  // ------------------------------------------------------------
  // Render (JSX)
  // ------------------------------------------------------------
  return (
    <View style={styles.safe}>
      {/* StatusBar: iconos oscuros para fondo claro */}
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Cabecera reutilizable */}
        <Header />

        {/* Input + botón en horizontal (flexDirection: 'row') */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe una tarea..."
            // Input controlado: lo que se ve depende del estado
            value={taskText}
            // Actualiza estado en cada tecla
            onChangeText={setTaskText}
            // Permite añadir con Enter/Done del teclado
            onSubmitEditing={handleAddTask}
          />
          <Button title="Añadir" onPress={handleAddTask} />
        </View>

        {/* Contador: total y completadas */}
        <Text style={styles.counter}>
          Tareas totales: {tasks.length} · Completadas: {doneCount}
        </Text>

        {/* FlatList:
            - data: lista a renderizar
            - keyExtractor: clave única por item (mejor id que index)
            - renderItem: cómo dibujar cada item
            - ListEmptyComponent: qué mostrar si no hay tareas
            - contentContainerStyle: centrado vertical cuando está vacío
        */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem item={item} onToggle={handleToggleTask} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay tareas herman@!</Text>
          }
          contentContainerStyle={
            tasks.length === 0 ? styles.emptyContainer : null
          }
        />
      </View>
    </View>
  );
}

// ------------------------------------------------------------
// Estilos
// ------------------------------------------------------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  counter: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
  },
});
