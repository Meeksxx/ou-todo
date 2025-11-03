import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Modal,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  crimson: '#841617',
  cream: '#FDF9F2',
  ink: '#111111',
  card: '#FFFFFF',
  accent: '#B31B1B',
};

type Todo = { id: string; title: string };

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newTask, setNewTask] = React.useState('');
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const handleAdd = () => {
    const title = newTask.trim();
    if (!title) return;
    setTodos(prev => [{ id: Date.now().toString(), title }, ...prev]);
    setNewTask('');
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoRow}>
      <Text style={styles.todoText}>{item.title}</Text>
      <Pressable
        onPress={() => handleDelete(item.id)}
        style={({ pressed }) => [styles.deleteButton, pressed && { opacity: 0.8 }]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/ou-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>TO DO LIST</Text>
      </View>

      
      <View style={styles.bgWrap}>
        <Image
          source={require('../../assets/images/ou-campus.jpg')}
          style={styles.bgImg}
          blurRadius={1.5}
        />

          <View style={styles.overlay}>
          

          {/* Add Task button */}
          <Pressable
            onPress={() => setModalVisible(true)}
            android_ripple={{ color: '#a93a3a' }}
            style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </Pressable>

          {/* Task card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tasks To Complete</Text>

            {todos.length === 0 ? (
              <Text style={styles.cardHint}>
                No tasks yet. Tap <Text style={styles.bold}>+ Add Task</Text> to create one.
              </Text>
            ) : (
              <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingVertical: 4 }}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>
        </View>
      </View>

      {/* Modal for adding tasks */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task..."
              value={newTask}
              onChangeText={setNewTask}
              returnKeyType="done"
              onSubmitEditing={handleAdd}
            />
            <View style={styles.modalButtons}>
              <Text style={styles.modalButton} onPress={() => setModalVisible(false)}>
                Cancel
              </Text>
              <Text style={[styles.modalButton, styles.modalAdd]} onPress={handleAdd}>
                Add
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.crimson },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 8,
    backgroundColor: COLORS.crimson,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logo: { width: 52, height: 52, borderRadius: 8 },
  title: {
    color: COLORS.cream,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Background and overlay
  bgWrap: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '200%', // Shows left half of photo
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: 'rgba(253, 249, 242, 0.65)',
  },

  // Subtitle box
  subtitleBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  subtitle: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '500',
  },

  // Add task button
  addButton: {
    marginTop: 10,
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: COLORS.cream, fontSize: 16, fontWeight: '700' },

  // Task card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: COLORS.ink, marginBottom: 10 },
  cardHint: { fontSize: 14, color: '#333', lineHeight: 20 },
  bold: { fontWeight: '700' },
  separator: { height: 8 },

  // Todo row
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    padding: 10,
    borderRadius: 8,
  },
  todoText: { fontSize: 16, color: COLORS.ink, flex: 1 },
  deleteButton: {
    marginLeft: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.accent,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: COLORS.cream,
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: COLORS.ink },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16 },
  modalButton: { fontSize: 16, color: COLORS.ink, fontWeight: '600' },
  modalAdd: { color: COLORS.accent },
});
