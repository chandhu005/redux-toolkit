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
  import { AppDispatch } from "../app/store";
  import { addHabit } from "../app/habit-slice";
  
  const AddHabitForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");
    const dispatch = useDispatch<AppDispatch>();
  
    const handleFormEvent = (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim()) {
        dispatch(addHabit({ name, frequency }));
      }
      setName("");
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
  