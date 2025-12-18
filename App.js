// App.js

// Importamos React y el hook useState para manejar estado en componentes funcionales
import React, { useState } from 'react';

// Importamos componentes nativos desde React Native
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from 'react-native';

// Importamos nuestros componentes propios
import Header from './components/Header';
import TaskItem from './components/TaskItem';

// Componente principal de la aplicación
export default function App() {
  // Estado para el texto del input (lo que el usuario está escribiendo)
  const [taskText, setTaskText] = useState('');
  // Estado para la lista de tareas, inicialmente un array vacío
  const [tasks, setTasks] = useState([]);

  // Función que añade una nueva tarea a la lista
  const handleAddTask = () => {
    // Evita añadir tareas vacías o solo con espacios
    if (!taskText.trim()) return;

    // Creamos un objeto tarea con id, texto y si está hecha o no
    const newTask = {
      id: Date.now().toString(), // id basada en la marca de tiempo actual
      text: taskText.trim(),
      done: false,
    };

    // Actualizamos el estado de tareas:
    // - colocamos la nueva tarea al principio
    // - dejamos el resto de tareas después
    setTasks([newTask, ...tasks]);

    // Limpiamos el input después de añadir
    setTaskText('');
  };

  // Función que alterna (marca/desmarca) una tarea como completada
  const handleToggleTask = (id) => {
    // Usamos la versión funcional de setTasks, recibiendo el estado anterior (prev)
    setTasks((prev) =>
      // Recorremos todas las tareas
      prev.map((t) =>
        // Si la id coincide, devolvemos una copia con done invertido
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };
}