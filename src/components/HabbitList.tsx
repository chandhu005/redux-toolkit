import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { RootState } from "../app/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletehabit, Habit, toggleHabit } from "../app/habit-slice";

const HabbitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch();
  const getStreek=(habit:Habit)=>{
    let streak=0;
    const currentDate= new Date();
    while(true){
        const dateString=currentDate.toISOString().split("T")[0];
        if(habit.completedDates.includes(dateString)){
            streak++;
            currentDate.setDate(currentDate.getDate()-1);
        }
        else{
            break;
        }
    }
       return streak;
  }
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
  color={habit.completedDates.includes(today) ? "success" : "primary"}
  startIcon={<CheckCircle />}
  onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}  // Wrap in an arrow function
>
  {habit.completedDates.includes(today) ? "Completed" : "Mark as completed"}
</Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatch(deletehabit({ id: habit.id }))}  
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{mt:2}}>
            <Typography variant="body2">
                currentStresk:{getStreek(habit)} days
            </Typography>
             <LinearProgress variant="determinate" value={(getStreek(habit)/30 *100)} sx={{mt:2}}/>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabbitList;
