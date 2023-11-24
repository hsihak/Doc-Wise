import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
          borderBottom: 1, // Add a border to create a divider line
          borderBottomColor: 'grey', // Set the color of the divider line
          '& .MuiTab-root': {
            flex: 1, // Make each tab take the whole screen width
            minWidth: 0,
          },
        }}
      >
        <Tab
          label="Similarity Comparison"
          sx={{
            color: value === 0 ? 'white' : 'black',
            backgroundColor: value === 0 ? '#E02B03' : 'inherit',
            '&:hover': {
              backgroundColor: value === 0 ? 'orange' : 'inherit',
            },
          }}
        />
        <Tab
          label="Difference Highlighter"
          sx={{
            color: value === 1 ? 'white' : 'black',
            backgroundColor: value === 1 ? '#E02B03' : 'inherit',
            '&:hover': {
              backgroundColor: value === 1 ? 'orange' : 'inherit',
            },
            borderLeft: '1px solid black', // Add a black border line to the left
            borderRight: '1px solid black', // Add a black border line to the right
          }}
        />
        <Tab
          label="Summaries Generator"
          sx={{
            color: value === 2 ? 'white' : 'black',
            backgroundColor: value === 2 ? '#E02B03' : 'inherit',
            '&:hover': {
              backgroundColor: value === 2 ? 'orange' : 'inherit',
            },
          }}
        />
      </Tabs>
    </AppBar>
  );
};

export default SubHeader;
