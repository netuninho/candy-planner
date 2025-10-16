import { useEffect, useState } from "react";

export function useNotesManager<T extends { id: number; text: string }>(storageKey: string) {
  const [notes, setNotes] = useState<T[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const addNote = () => {
    if (!newText.trim()) return;
    const newNote = { id: Date.now(), text: newText } as T;
    setNotes((prev) => [...prev, newNote]);
    setNewText("");
  };

  const removeNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = () => {
    if (editingId === null) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingId ? { ...n, text: editedText } : n
      )
    );
    setEditingId(null);
    setEditedText("");
  };

  const updateNote = (id: number, updatedFields: Partial<T>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...updatedFields } : n
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, id?: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (id !== undefined) saveEdit();
      else addNote();
    }
  };

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes, storageKey]);

  return {
    notes,
    setNotes,
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
