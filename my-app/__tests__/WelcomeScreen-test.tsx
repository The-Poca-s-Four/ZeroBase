import { WelcomeScreen } from "@/components/auth";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

// Mock the dependencies used in WelcomeScreen
jest.mock("@/components/Reuse", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  return {
    __esModule: true,
    MenuIcon: () => <View testID="menu-icon" />,
    // Simulate AppButton as a simple touchable
    AppButton: ({ text, onPress }: { text: string; onPress?: () => void }) => (
      <TouchableOpacity testID={`app-button-${text}`} onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
    AppLogo: () => <View testID="app-logo" />,
    SocialButtons: () => <View testID="social-buttons" />,
  };
});

describe("WelcomeScreen", () => {
  const mockOnLogin = jest.fn();
  const mockOnSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome message", () => {
    const { getByText } = render(
        <WelcomeScreen onLogin={mockOnLogin} onSignup={mockOnSignup} />
    );
    // Updated text matcher to be more flexible or exact based on actual component
    // Assuming the component renders these separately or in a specific way
    expect(getByText(/Know your limit/i)).toBeTruthy();
  });

  it("calls onLogin when sign in button is pressed", () => {
    const { getByTestId } = render(
        <WelcomeScreen onLogin={mockOnLogin} onSignup={mockOnSignup} />
    );
    const button = getByTestId("app-button-Sign in");
    fireEvent.press(button);
    expect(mockOnLogin).toHaveBeenCalled();
  });

  it("calls onSignup when sign up button is pressed", () => {
    const { getByTestId } = render(
        <WelcomeScreen onLogin={mockOnLogin} onSignup={mockOnSignup} />
    );
    const button = getByTestId("app-button-Sign up");
    fireEvent.press(button);
    expect(mockOnSignup).toHaveBeenCalled();
  });
});
