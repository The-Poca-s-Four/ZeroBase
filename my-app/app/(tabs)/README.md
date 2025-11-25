# Bottom Tab Navigation

## Cấu trúc

Ứng dụng có 4 tabs chính ở thanh navigation dưới cùng:

### 1. 🏠 Home (index.tsx)
- Màn hình chính với:
  - Balance card
  - Action tabs (Outcome, Income, Allocate)
  - Streak tracking
  - Categories carousel

### 2. 🕐 History (history.tsx)
- Màn hình lịch sử giao dịch
- Hiển thị danh sách các transactions
- Placeholder: "Transaction history will appear here"

### 3. 📊 Reports (reports.tsx)
- Màn hình báo cáo và thống kê
- Hiển thị biểu đồ chi tiêu
- Placeholder: "Financial reports and analytics will appear here"

### 4. 👤 Profile (profile.tsx)
- Màn hình profile người dùng
- Avatar và thông tin cá nhân
- Menu settings:
  - Settings
  - Notifications
  - Privacy
  - Help & Support
  - About
- Nút Logout (đăng xuất về WelcomeScreen)

## Tab Bar Configuration

File: `app/(tabs)/_layout.tsx`

### Styling
```tsx
tabBarStyle: {
  backgroundColor: '#1E1E1E',  // Dark background
  borderTopWidth: 0,            // No border
  height: 60,                   // Fixed height
  paddingBottom: 8,
  paddingTop: 8,
}
```

### Colors
- Active: `#FFFFFF` (white)
- Inactive: `#888888` (gray)

### Icons
Sử dụng Ionicons từ `@expo/vector-icons`:
- Home: `home` / `home-outline`
- History: `time` / `time-outline`
- Reports: `stats-chart` / `stats-chart-outline`
- Profile: `person` / `person-outline`

## Navigation Flow

```
Splash Screen
    ↓
Onboarding Screen (first time)
    ↓
Welcome Screen
    ↓
Login/Signup
    ↓
[Tab Navigation]
    ├─ Home
    ├─ History
    ├─ Reports
    └─ Profile → Logout → Welcome Screen
```

## Tính năng

### Haptic Feedback
- Sử dụng `HapticTab` component
- Cung cấp phản hồi rung khi chạm vào tab

### Active State
- Tab đang active có icon đậm hơn (filled)
- Tab không active có icon outline
- Màu thay đổi theo state

## Development Tasks

### TODO cho History Screen:
- [ ] Fetch transaction history từ API
- [ ] Hiển thị list transactions
- [ ] Filter by date/category
- [ ] Search functionality

### TODO cho Reports Screen:
- [ ] Tích hợp chart library (react-native-chart-kit)
- [ ] Hiển thị biểu đồ chi tiêu theo category
- [ ] Biểu đồ dòng thời gian
- [ ] Export báo cáo PDF

### TODO cho Profile Screen:
- [ ] Load thông tin user từ API
- [ ] Edit profile
- [ ] Change password
- [ ] Notifications settings
- [ ] Language selection
- [ ] Theme toggle (Dark/Light)

## Testing

Tạo test files cho mỗi screen:
- `__tests__/HistoryScreen-test.tsx`
- `__tests__/ReportsScreen-test.tsx`
- `__tests__/ProfileScreen-test.tsx`
