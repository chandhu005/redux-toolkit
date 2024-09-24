
import { Provider } from 'react-redux'
import './App.css'
import store from './app/store'
import { Container, Typography } from '@mui/material';
import AddHabitForm from './components/AddHabitForm';
import HabbitList from './components/HabbitList';
import HabitStatics from './components/HabitStatics';

function App() {
 

  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant='h2' align='center'>
         Habit tracker
        </Typography>
        <AddHabitForm/>
        <HabbitList/>
        <HabitStatics/>

      
      </Container>
   
    </Provider>
  )
}

export default App;
