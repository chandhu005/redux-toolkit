````markdown
# React + TypeScript + Vite Setup

This guide walks you through setting up a React application using TypeScript and Vite, integrating Redux for state management, and creating a simple habit-tracking UI component.

## Table of Contents

- [Project Setup](#project-setup)
- [Redux Integration](#redux-integration)
  - [Step 1: Create Store](#step-1-create-store)
  - [Step 2: Wrap App with Provider](#step-2-wrap-app-with-provider)
  - [Step 3: Create Slice](#step-3-create-slice)
  - [Step 4: Add Slice to Store](#step-4-add-slice-to-store)
- [TypeScript Types](#typescript-types)
- [Creating UI Components](#creating-ui-components)
  - [AddHabitForm Component](#addhabitform-component)
  - [HabbitList Component](#habbitlist-component)
- [Conclusion](#conclusion)

## Project Setup

1. **Create Vite Project**

   ```bash
   npm create vite@latest
   ```
````

2. **Install Dependencies**

   ```bash
   npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material
   ```

   Install all other required dependencies as needed.

## Redux Integration

### Step 1: Create Store

Create a Redux store in `app/store.ts`:

```ts
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
});
```

### Step 2: Wrap App with Provider

Wrap your application with the Redux `Provider` in `App.tsx`:

```ts
import { Provider } from "react-redux";
import "./App.css";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div>chandhu</div>
    </Provider>
  );
}

export default App;
```

### Step 3: Create Slice

Create a slice for managing habits in `app/habit-slice.ts`:

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "Daily" | "Weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
  },
});

export const { addHabit } = habitSlice.actions;
export default habitSlice.reducer;
```

### Step 4: Add Slice to Store

Add the habit slice to the store in `app/store.ts`:

```ts
import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit-slice";

export default configureStore({
  reducer: { habits: habitReducer },
});
```

## TypeScript Types

Define types for state and dispatch in `app/store.ts`:

1. **State Type**

   ```ts
   export type RootState = ReturnType<typeof store.getState>;
   ```

2. **Dispatch Type**

   ```ts
   export type AppDispatch = ReturnType<typeof store.dispatch>;
   ```

## Creating UI Components

### AddHabitForm Component

Create a form component to add new habits in `components/AddHabitForm.tsx`:

```ts
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../app/habit-slice";
import { AppDispatch } from "../app/store";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleFormEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName(""); // Clear the form input
    }
  };

  return (
    <form onSubmit={handleFormEvent}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <TextField
          label="Habit Name"
          placeholder="Enter Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "Daily" | "Weekly")}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
```

### Habbit slice Component

Let's break down both of the functions you provided—`addHabit` and `toggleHabit`—to understand how they work in your Redux slice.

### 1. `addHabit` Reducer

```ts
addHabit: (
  state,
  action: PayloadAction<{ name: string; frequency: "Daily" | "Weekly" }>
) => {
  const newHabit: Habit = {
    id: Date.now().toString(),
    name: action.payload.name,
    frequency: action.payload.frequency,
    completedDates: [],
    createdAt: new Date().toISOString(),
  };
  state.habits.push(newHabit);
};
```

#### **What it does:**

- This function **adds a new habit** to the `habits` array in your Redux state.

#### **How it works:**

- **Parameters:**
  - The `action.payload` contains an object with `name` (the name of the habit) and `frequency` (either "Daily" or "Weekly").
- **New Habit Creation:**
  - A new `Habit` object is created with:
    - `id`: A unique identifier generated using `Date.now()`. It returns the current timestamp in milliseconds, ensuring a unique ID.
    - `name`: The name of the habit, passed from the action payload.
    - `frequency`: The frequency of the habit (either "Daily" or "Weekly"), also passed from the action payload.
    - `completedDates`: An empty array initially, which will later store dates on which the habit is marked as completed.
    - `createdAt`: The timestamp of when the habit was created, stored in ISO string format.
- **Updating the State:**
  - `state.habits.push(newHabit)`: The new habit is added to the `habits` array in the Redux state.

### 2. `toggleHabit` Reducer

```ts
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
};
```

#### **What it does:**

- This function **toggles the completion status** of a habit for a specific date.

#### **How it works:**

- **Parameters:**
  - `action.payload` contains two properties:
    - `id`: The unique ID of the habit to be toggled.
    - `date`: The date (in ISO string format) for which the habit completion is being toggled.
- **Find the habit:**
  - `state.habits.find((h) => h.id === action.payload.id)`: Searches for the habit in the `habits` array that matches the provided `id`.
- **Check if the habit exists:**
  - The `if (habit)` block checks whether the habit exists. If it exists, the function proceeds; otherwise, nothing happens.
- **Toggling the completion:**
  - `const index = habit.completedDates.indexOf(action.payload.date)`: Looks for the date in the `completedDates` array.
  - If the date is found (`index > -1`), it means the habit was already marked as completed on this date. So, it **removes the date** from `completedDates` using `splice(index, 1)`, effectively "unmarking" it.
  - If the date is **not found** (`index === -1`), it means the habit has not been completed for this date yet. So, the function **adds the date** to `completedDates` using `push(action.payload.date)`, marking it as completed.

### **Summary:**

- The `addHabit` function adds a new habit with details like `id`, `name`, `frequency`, and `createdAt` to the `habits` list.
- The `toggleHabit` function toggles the completion of a habit for a specific date. If the habit is already completed for that date, it removes the date from the `completedDates` list. Otherwise, it adds the date to mark it as completed.

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  // Corrected from HabbitState to HabitState
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "Daily" | "Weekly" }>
    ) => {
      // Corrected from addHabbit to addHabit
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
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
    deletehabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload.id);
    },
  },
});

export const { addHabit, toggleHabit, deletehabit } = habitSlice.actions; // Corrected from addHabbit to addHabit
export default habitSlice.reducer;
```

### HabbitList Component

Create a component to display and manage habits in `components/HabbitList.tsx`:

```ts
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteHabit, toggleHabit } from "../app/habit-slice";

const HabbitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={4} sx={{ p: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text-secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle />}
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark as completed"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatch(deleteHabit({ id: habit.id }))}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default HabbitList;
```

## Conclusion
