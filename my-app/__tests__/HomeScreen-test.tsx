import { FlatList } from "react-native";
import { HomeScreen } from "@/components/home";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    Ionicons: ({ name, ...props }: any) => (
      <View testID={`ionicon-${name}`} {...props} />
    ),
  };
});

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("render greeting text đúng", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Hey, Poca")).toBeTruthy();
  });

  it("hiển thị balance card với số dư đúng", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("240.000")).toBeTruthy();
    expect(getByText("1.240.000")).toBeTruthy();
    expect(getByText("Today's Limit")).toBeTruthy();
    expect(getByText("Unallocated balance")).toBeTruthy();
  });

  it("hiển thị 3 action tabs", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("− Outcome")).toBeTruthy();
    expect(getByText("+ Income")).toBeTruthy();
    expect(getByText("% Allocate")).toBeTruthy();
  });

  it("chuyển tab sang Income khi bấm Income tab", () => {
    const { getByText } = render(<HomeScreen />);
    const incomeTab = getByText("+ Income");
    
    fireEvent.press(incomeTab);
    
    expect(getByText("Allowance")).toBeTruthy();
    expect(getByText("Income")).toBeTruthy();
  });

  it("chuyển tab sang Outcome khi bấm Outcome tab", () => {
    const { getByText } = render(<HomeScreen />);
    const outcomeTab = getByText("− Outcome");
    
    fireEvent.press(outcomeTab);
    
    expect(getByText("Food")).toBeTruthy();
    expect(getByText("Outcome")).toBeTruthy();
  });

  it("chuyển tab sang Allocate khi bấm Allocate tab", () => {
    const { getByText } = render(<HomeScreen />);
    const allocateTab = getByText("% Allocate");
    
    fireEvent.press(allocateTab);
    
    expect(getByText("Unallocated balance")).toBeTruthy();
    expect(getByText("Skincare")).toBeTruthy();
    expect(getByText("Allocated")).toBeTruthy();
  });

  it("hiển thị streak section với đúng thông tin", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("4-day streak")).toBeTruthy();
    expect(getByText("❄️ 4 available")).toBeTruthy();
  });

  it("hiển thị danh sách categories trong FlatList", () => {
    const { getByText, UNSAFE_getByType } = render(<HomeScreen />);
    
    const flatList = UNSAFE_getByType(FlatList);
    expect(flatList).toBeTruthy();
    
    expect(getByText("Transportation")).toBeTruthy();
    expect(getByText("Food")).toBeTruthy();
    expect(getByText("Entertainment")).toBeTruthy();
    expect(getByText("Shopping")).toBeTruthy();
  });

  it("render category cards với progress bar", () => {
    const { getAllByText } = render(<HomeScreen />);
    
    const paidTexts = getAllByText(/paid/);
    expect(paidTexts.length).toBeGreaterThan(0);
  });
});
