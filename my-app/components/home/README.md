# HomeScreen Component

## Mô tả
HomeScreen là màn hình chính của ứng dụng quản lý chi tiêu ZeroBase. Màn hình này hiển thị:

- **Thông tin số dư**: Giới hạn hàng ngày và số dư chưa phân bổ
- **3 chức năng chính**:
  - 📉 **Outcome**: Thêm chi tiêuu
  - 📈 **Income**: Thêm thu nhập
  - 📊 **Allocate**: Phân bổ ngân sách cho các mục

- **Streak tracking**: Theo dõi chuỗi ngày hoàn thành mục tiêu
- **Danh mục chi tiêu**: Cuộn ngang để xem các mục chi tiêu (Transportation, Food, Entertainment, Shopping, etc.)

## Cấu trúc

```
components/
  home/
    HomeScreen.tsx    # Component chính
    index.ts          # Export file
```

## Features

### 1. Balance Card
Hiển thị:
- Today's Limit: 240.000 / 400.000
- Unallocated balance: 1.240.000

### 2. Action Tabs
3 tabs để thực hiện các thao tác:
- **Outcome (màu đỏ)**: Form thêm chi tiêu với category selector
- **Income (màu xanh)**: Form thêm thu nhập với allowance info
- **Allocate (màu vàng)**: Phân bổ ngân sách theo phần trăm

### 3. Streak Section
Hiển thị 7 ngày trong tuần với icons:
- ❄️ (chưa hoàn thành)
- 🛡️ (đã hoàn thành)
- 🔥 (streak đang tiếp diễn)
- ⚡ (có thể sử dụng)

### 4. Category Cards (Horizontal Scroll)
Các thẻ category có thể cuộn ngang, mỗi thẻ hiển thị:
- Icon của category
- Tên category
- Số tiền đã chi / Tổng ngân sách
- Progress bar

## Cách sử dụng

### Import
```tsx
import { HomeScreen } from '@/components/home';
```

### Sử dụng trong component
```tsx
<HomeScreen />
```

## Tùy chỉnh

### Thêm/sửa categories
Chỉnh sửa mảng `categories` trong HomeScreen.tsx:

```tsx
const categories: Category[] = [
  {
    id: '1',
    name: 'Transportation',
    icon: '🚗',
    amount: 1000000,
    total: 4000000,
    color: '#4A90E2',
  },
  // Thêm category mới...
];
```

### Thêm/sửa allocation items
Chỉnh sửa mảng `allocationData`:

```tsx
const allocationData: AllocationItem[] = [
  {
    id: '1',
    name: 'Food',
    currentAmount: 500000,
    percentage: 20,
    icon: '🍔',
    color: '#F4A460',
  },
  // Thêm item mới...
];
```

## Styling
Tất cả styles được định nghĩa trong `StyleSheet` ở cuối file. Màu sắc chính:
- Background: `#2B2B2B` (dark gray)
- Cards: `#FFFFFF` (white)
- Outcome tab: `#E57373` (red)
- Income tab: `#81C784` (green)
- Allocate tab: `#FFB74D` (orange)

## Tích hợp API (TODO)
Hiện tại dùng data tĩnh. Để tích hợp API:
1. Thay thế `categories`, `allocationData` bằng state từ API
2. Thêm functions để gọi API khi submit forms
3. Thêm loading states

## Testing
File test: `__tests__/HomeScreen-test.tsx`

Chạy test:
```bash
npm run test
```
