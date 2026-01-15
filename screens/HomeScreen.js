// App.js
// ------------------------------------------------------------
// Componente principal de una app React Native tipo "ToDo".
// Aquí se gestiona el estado global (texto del input y tareas),
// y se definen las funciones para añadir y marcar tareas.
// ------------------------------------------------------------

// Importamos React (necesario para JSX) y el hook useState
// useState permite guardar "estado" en componentes funcionales
import React, { useState } from 'react';

// Importamos componentes nativos de React Native
import {
  StyleSheet,   // Para definir estilos (similar a CSS pero en JS)
  View,         // Contenedor tipo <div>
  Text,         // Texto visible en pantalla
  TextInput,    // Campo de entrada de texto
  Button,       // Botón nativo simple
  FlatList,     // Lista optimizada para muchos elementos (mejor que map)
  StatusBar,    // Controla apariencia de la barra superior (hora, batería, etc.)
} from 'react-native';

// Importamos componentes propios (hechos por ti)
// Header: normalmente el título o cabecera de la app
// TaskItem: componente para representar una tarea individual en la lista
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';

// ------------------------------------------------------------
// Componente principal exportado por defecto.
// En React Native, App() suele ser el "punto de entrada" de la UI.
// ------------------------------------------------------------
export default function HomeScreen({ navigation } ) {

  // Estado que guarda lo que el usuario está escribiendo en el input
  // taskText = valor actual
  // setTaskText = función para actualizarlo
  const [taskText, setTaskText] = useState('');

  // Estado que guarda el array de tareas
  // Cada tarea será un objeto: { id, text, done }
  const [tasks, setTasks] = useState([]);

  // ------------------------------------------------------------
  // Añadir tarea
  // ------------------------------------------------------------
  const handleAddTask = () => {

    // trim() quita espacios al inicio/fin
    // Si después de trim queda vacío, no añadimos nada
    if (!taskText.trim()) return;

    // Creamos el objeto de tarea
    const newTask = {
      // Date.now() devuelve milisegundos desde 1970 -> número único "casi siempre"
      // lo pasamos a string porque FlatList suele usar keys como string
      id: Date.now().toString(),

      // Guardamos el texto limpio (sin espacios sobrantes)
      text: taskText.trim(),

      // done indica si la tarea está completada
      done: false,
    };

    // Actualizamos el estado de tareas:
    // Ponemos la nueva tarea al principio para que aparezca arriba
    // Si hubiera muchas actualizaciones seguidas, una versión más robusta sería:
    // setTasks(prev => [newTask, ...prev])
    setTasks([newTask, ...tasks]);

    // Limpiamos el input para que el usuario pueda escribir otra tarea
    setTaskText('');
  };

  // ------------------------------------------------------------
  // Marcar / desmarcar tarea como hecha
  // Recibe el id de la tarea pulsada
  // ------------------------------------------------------------
  const handleToggleTask = (id) => {

    // Usamos la forma funcional de setTasks:
    // prev es el estado anterior más fiable (evita problemas por asincronía)
    setTasks((prev) =>
      // map recorre todo el array y devuelve otro array nuevo
      prev.map((t) =>
        // Si esta tarea tiene el id recibido:
        // devolvemos una COPIA del objeto, cambiando done a su contrario
        // (inmutabilidad: no se modifica el objeto original)
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // ------------------------------------------------------------
  // Render (JSX)
  // ------------------------------------------------------------
  return (
    // Contenedor principal (parece que actúa como "safe area" manual)
    <View style={styles.safe}>

      {/* StatusBar controla el color del texto/iconos de la barra superior */}
      <StatusBar barStyle="dark-content" />

      {/* Contenedor principal con padding/márgenes */}
      <View style={styles.container}>

        {/* Cabecera de la app (título, logo, etc.) */}
        <Header />

        {/* Bloque horizontal: input + botón */}
        <View style={styles.inputContainer}>

          <TextInput
            // Estilos del campo
            style={styles.input}

            // Texto que aparece cuando el input está vacío
            placeholder="Escribe una tarea..."

            // value enlaza el input con el estado (componente controlado)
            value={taskText}

            // Cada vez que el usuario escribe, actualizamos taskText
            // setTaskText recibe directamente el texto
            onChangeText={setTaskText}

            // Permite que al pulsar "Enter/Done" en el teclado se añada la tarea
            onSubmitEditing={handleAddTask}
          />

          {/* Botón para añadir usando la función anterior */}
          <Button title="Añadir" onPress={handleAddTask} />

        </View>
        
          <Text style={styles.counter}>
            Tareas totales: {tasks.length}  Completadas:{' '} 
            {tasks.filter((t) => t.done).length}
          </Text>

          <FlatList

             data={tasks}

             keyExtractor={(item) => item.id}

             renderItem={ ( { item }) => (

                    <TaskItem item={ item } onToggle={handleToggleTask} />
             )}

             ListEmptyComponent={
              <Text style={styles.empty}>
                  No hay tareas herman@!
              </Text>
             }
          
             contentContainerStyle={
              tasks.length === 0 && styles.emptyContainer
             }

           
          />
        
      </View>
    </View>
  );
}


// Definición de estilos usando StyleSheet
const styles = StyleSheet.create({
  // Estilo del contenedor general (SafeAreaView)
  safe: {
    flex: 1, // ocupa toda la pantalla
    backgroundColor: '#f2f2f2', // gris claro de fondo
  },
  // Estilo del contenedor principal interno
  container: {
    flex: 1,
    paddingHorizontal: 16, // margen lateral
  },
  // Contenedor del input y del botón
  inputContainer: {
    flexDirection: 'row', // colocamos los elementos en fila (horizontal)
    gap: 8, // separación entre input y botón
    marginBottom: 8, // espacio bajo el bloque
  },
  // Estilo del campo de texto
  input: {
    flex: 1, // ocupa todo el espacio disponible antes del botón
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  // Estilo del texto del contador
  counter: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  // Estilo aplicado al contenedor de FlatList cuando está vacío
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center', // centrado vertical
  },
  // Estilo del texto de "no hay tareas"
  empty: {
    textAlign: 'center',
    color: '#777',
  },
});
