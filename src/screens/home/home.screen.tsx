import * as React from 'react';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Text variant="displayLarge" style={{ color: theme.colors.primary }}>
        Display Large
      </Text>
      <Text variant="displayMedium" style={{ color: theme.colors.secondary }}>
        Display Medium
      </Text>
    </>
  );
};
