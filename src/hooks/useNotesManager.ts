import { useState, useEffect } from "react";

interface Note {
  id: number;
  text: string;
}

export function useNotesManager(storageKey: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setNotes(JSON.parse(saved));
    } catch (error) {
      console.error(`Erro ao carregar dados (${storageKey})`, error);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      if (notes.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(notes));
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.error(`Erro ao salvar dados (${storageKey})`, error);
    }
  }, [notes, storageKey]);

  const addNote = () => {
    if (!newText.trim()) return;
    const newItem = { id: Date.now(), text: newText.trim() };
    setNotes([...notes, newItem]);
    setNewText("");
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = (id: number) => {
    if (!editedText.trim()) return;
    setNotes(notes.map(note =>
      note.id === id ? { ...note, text: editedText } : note
    ));
    setEditingId(null);
    setEditedText("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: number
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (editingId !== null && id !== undefined) {
        saveEdit(id);
      } else {
        addNote();
      }
    }
  };

  const updateNote = (id: number, updatedData: Partial<{ text: string }>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updatedData } : n))
    );
  };

  return {
    notes,
    newText,
    setNewText,
    editingId,
    editedText,
    setEditedText,
    addNote,
    removeNote,
    startEditing,
    saveEdit,
    handleKeyDown,
    updateNote,
  };
}
