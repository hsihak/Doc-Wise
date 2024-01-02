import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

const SubHeader = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        centered
        sx={{
          background: 'white',
          width: '100%',
          display: 'flex',
          borderBottom: 1, 
          borderBottomColor: 'grey', 
          '& .MuiTab-root': {
            flex: 1, 
            minWidth: 0,
          },
        }}
      >
        <Tab
          component={Link} 
          to="/phase-one"
          label="Similarity Comparison"
          sx={{
            color: value === 0 ? 'white' : 'black',
            backgroundColor: value === 0 ? '#F29229' : 'inherit',
            '&:hover': {
              backgroundColor: value === 0 ? '#F2A829' : 'inherit',
            },
          }}
        />
        <Tab
          component={Link}
          to="/phase-two"
          label="Difference Highlighter"
          sx={{
            color: value === 1 ? 'white' : 'black',
            backgroundColor: value === 1 ? '#F29229' : 'inherit',
            '&:hover': {
              backgroundColor: value === 1 ? '#F2A829' : 'inherit',
            },
            borderLeft: '1px solid black', 
            borderRight: '1px solid black', 
          }}
        />
        <Tab
          component={Link}
          to="/phase-three"
          label="Summaries Generator"
          sx={{
            color: value === 2 ? 'white' : 'black',
            backgroundColor: value === 2 ? '#F29229' : 'inherit',
            '&:hover': {
              backgroundColor: value === 2 ? '#F2A829' : 'inherit',
            },
          }}
        />
      </Tabs>
    </AppBar>
  );
};

export default SubHeader;
