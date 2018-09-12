import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import TargetsList from './views/TargetsList'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <TargetsList />
      </MuiThemeProvider>
    )
  }
}

export default App;
