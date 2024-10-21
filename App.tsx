import {MainApp} from '@/router';
import React from 'react';
import '@/translations';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {clientPersister} from '@/utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Toaster} from 'sonner-native';

const queryClient = new QueryClient();

const App = () => {
  return (
    <PersistQueryClientProvider
      persistOptions={{persister: clientPersister}}
      client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <KeyboardProvider>
            <MainApp />
            <Toaster swipeToDismissDirection="left" />
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
};

export default App;
