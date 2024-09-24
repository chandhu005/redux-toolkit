import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

// Fixing fetchHabits to return mockHabits
export const fetchHabits = createAsyncThunk("habits/fetchhabits", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits: Habit[] = [
    {
      id: "1",
      name: "Morning Exercise",
      frequency: "Daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Reading",
      frequency: "Daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Weekly Team Meeting",
      frequency: "Weekly",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Grocery Shopping",
      frequency: "Weekly",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Meditation",
      frequency: "Daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    }
  ];
  
  return mockHabits; // Return the mockHabits
});

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; frequency: "Daily" | "Weekly" }>) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      // Fixing the rejected case handler
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  }
});

export const { addHabit, toggleHabit, deleteHabit } = habitSlice.actions; // Corrected deleteHabit from deletehabit
export default habitSlice.reducer;
