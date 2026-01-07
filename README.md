# ZeroBase Mobile App

[![React Native CI - Test, Report & SonarCloud](https://github.com/The-Poca-s-Four/ZeroBase/actions/workflows/ci.yml/badge.svg)](https://github.com/The-Poca-s-Four/ZeroBase/actions/workflows/ci.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=The-Poca-s-Four_ZeroBase&metric=coverage)](https://sonarcloud.io/summary/new_code?id=The-Poca-s-Four_ZeroBase)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=The-Poca-s-Four_ZeroBase&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=The-Poca-s-Four_ZeroBase)

A React Native mobile application built with Expo, featuring comprehensive testing and continuous integration.

## 🚀 Project Setup Guide

Follow the steps below to set up and run this project.

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn
- Expo CLI

### 1. Check Node.js and npm Versions

Before starting, make sure you have **Node.js** and **npm** installed on your machine.

Run the following commands to check their versions:

```bash
node -v
npm -v
```

If either of them is **not installed**, download and install Node.js (which includes npm) from the official website:

👉 [https://nodejs.org/](https://nodejs.org/)

### 2. Navigate to the Project Directory

After installation, move into your project folder:

```bash
cd my-app
```

### 3. Install Dependencies

Install all required dependencies:

```bash
npm install
```

### 4. Start the Project

Use **Expo** to start the development server:

```bash
npx expo start
```

This command will launch Expo and give you options to run the app on a simulator, physical device, or web browser.

✅ You're all set! Your project should now be running successfully.

## 🧪 Testing Guide

### Running Tests Locally

#### Run all tests:
```bash
cd my-app
npm test
```

#### Run tests with coverage:
```bash
npm run test:coverage
```

#### Run specific test:
```bash
npm run test:onboarding
```

#### Update snapshots (if needed):
```bash
npx jest --updateSnapshot
```

### Test Structure

- `__tests__/` - Contains all test files
- `__tests__/__snapshots__/` - Snapshot files (auto-generated) 
- `coverage/` - Coverage reports (auto-generated, not tracked in git)

### Available Test Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:onboarding` | Run specific onboarding tests |

### Viewing Coverage Reports

After running tests with coverage, open the HTML report:

```bash
# Windows
start coverage/lcov-report/index.html

# macOS  
open coverage/lcov-report/index.html

# Linux
xdg-open coverage/lcov-report/index.html
```

## 📊 Code Quality & CI/CD

### SonarCloud Integration

This project uses SonarCloud for continuous code quality analysis:

- **Quality Gate**: Ensures code meets quality standards
- **Coverage**: Tracks test coverage metrics (current: 34.71%)
- **Code Smells**: Identifies maintainability issues
- **Security**: Scans for security vulnerabilities

View detailed reports on [SonarCloud Dashboard](https://sonarcloud.io/project/overview?id=The-Poca-s-Four_ZeroBase)

### GitHub Actions CI/CD

Automated pipeline runs on every push and pull request:

1. **Setup**: Install Node.js 20 and dependencies
2. **Test**: Run Jest tests with coverage
3. **Report**: Generate coverage reports  
4. **Artifacts**: Upload test reports
5. **Analysis**: Send results to SonarCloud

Check workflow status: [GitHub Actions](https://github.com/The-Poca-s-Four/ZeroBase/actions)

## 🛠️ Development

### Project Structure

```
ZeroBase/
├── my-app/                 # React Native app
│   ├── app/               # Main app screens (Expo Router)
│   │   └── (tabs)/        # Tab navigation screens
│   ├── components/        # Reusable components
│   │   ├── auth/          # Authentication components
│   │   ├── home/          # Home screen components  
│   │   ├── Reuse/         # Shared UI components
│   │   └── ui/            # UI utility components
│   ├── __tests__/         # Test files
│   ├── coverage/          # Coverage reports (auto-generated)
│   └── package.json       # Dependencies
├── .github/workflows/     # CI/CD configuration
├── sonar-project.properties # SonarCloud config
└── README.md
```

### Writing Tests

All components should have corresponding test files:

```javascript
// Example: components/auth/LoginScreen.jsx
// Test: __tests__/LoginScreen-test.tsx

import { render } from '@testing-library/react-native';
import LoginScreen from '../components/auth/LoginScreen';

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText('Login')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
```

## 📱 Available Scripts

In the `my-app` directory:

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator  
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing with snapshot mismatch**:
   ```bash
   npx jest --updateSnapshot
   ```

2. **Coverage files appearing in git**:
   Coverage files are automatically ignored via `.gitignore`

3. **CI/CD failing**:
   - Check GitHub Actions logs
   - Ensure all tests pass locally first
   - Verify `SONAR_TOKEN` is set in repository secrets

4. **Dependencies issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📈 Quality Metrics

Current project status:

- **Test Coverage**: 34.71%
- **Test Suites**: 3 passed  
- **Tests**: 16 passed
- **Quality Gate**: Passing
- **Code Smells**: Monitored via SonarCloud

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests locally: `npm run test:coverage`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Pull Request Guidelines

- Ensure all tests pass and coverage is maintained
- Follow existing code style and conventions
- Add tests for new features
- Update documentation if needed
- Wait for CI/CD pipeline to complete

---

## 👥 Team

**The Poca's Four** - Development Team

For more information, visit our [GitHub repository](https://github.com/The-Poca-s-Four/ZeroBase) or check the [SonarCloud dashboard](https://sonarcloud.io/project/overview?id=The-Poca-s-Four_ZeroBase).
