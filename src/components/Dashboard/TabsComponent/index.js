import React,{useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider, createTheme } from '@mui/material';
import Grid from '../Grid';
import './style.css';

export default function TabComponent({coins}) {
  const [value, setValue] = useState('Grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const theme = createTheme({
    palette:{
        primary:{
            main: '#3a80e9'
        },
    }
  })


  return (
    <ThemeProvider theme={theme} >
      <TabContext value={value}>
          <TabList onChange={handleChange} variant='fullWidth'>
            <Tab label="Grid" value="Grid" sx={{color: 'var(--white)'}} />
            <Tab label="List" value="List" sx={{color: 'var(--white)'}} />
          </TabList>
        <TabPanel value="Grid">
          <div className='grid-flex'>
          {coins.map((coin,i) =>{
                return (
                    <Grid coin={coin} key={i} />  
                )
            })}
          </div>
        </TabPanel>
        <TabPanel value="List">List</TabPanel>
      </TabContext>
    </ThemeProvider >
  );
}