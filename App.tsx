import {MainApp} from '@/router';
import React from 'react';
import '@/translations';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>
        <MainApp />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;
