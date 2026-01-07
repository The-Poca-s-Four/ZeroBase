import 'react-native-gesture-handler/jestSetup';

// Mock Async Storage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo Router
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    useSearchParams: () => ({}),
    useSegments: () => [],
    Link: ({ children }) => children,
    Stack: {
        Screen: ({ children }) => children,
    },
    Tabs: {
        Screen: ({ children }) => children,
    },
}));

// Mock Safe Area Context
jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 };
    return {
        SafeAreaProvider: jest.fn(({ children }) => children),
        SafeAreaView: jest.fn(({ children }) => children),
        useSafeAreaInsets: jest.fn(() => inset),
    };
});

// Mock Vector Icons
jest.mock('@expo/vector-icons', () => {
    const { View } = require('react-native');
    return {
        Ionicons: (props) => {
            // Render a View with testID so we can inspect it if needed
            return <View {...props} testID={`icon-${props.name}`} />;
        },
        MaterialIcons: (props) => <View {...props} />,
        FontAwesome: (props) => <View {...props} />,
        MaterialCommunityIcons: (props) => <View {...props} />,
    };
});

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mock Expo Haptics
jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    selectionAsync: jest.fn(),
}));
