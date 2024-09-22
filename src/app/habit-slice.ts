import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState { // Corrected from HabbitState to HabitState
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; frequency: "Daily" | "Weekly" }>) => { // Corrected from addHabbit to addHabit
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit:(state,action:PayloadAction<{id:string,date:string}>)=>{

        const habit=state.habits.find((h)=>(h.id===action.payload.id));
        if(habit){
            const index=habit.completedDates.indexOf(action.payload.date);
            if(index>-1){
                habit.completedDates.splice(index,1);

            }
            else{
                habit.completedDates.push(action.payload.date)
            }
        }

    },
    deletehabit:(state,action:PayloadAction<{id:string}>)=>{
        state.habits=state.habits.filter((h)=>(h.id!==action.payload.id));
        
    }
  },
});

export const { addHabit,toggleHabit,deletehabit } = habitSlice.actions; // Corrected from addHabbit to addHabit
export default habitSlice.reducer;
