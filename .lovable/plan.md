

# Forgot Password Feature Implementation

## Overview

The "Forgot your password?" button on the login page currently has no click handler and does nothing when tapped. This plan implements a complete in-app forgot password flow with proper UI feedback.

## Current State

- The forgot password button exists but has no `onClick` handler
- The app uses localStorage-based authentication (no Supabase backend)
- User credentials are not actually stored (the app skips to onboarding on any login)

## What We Will Build

### New Component: ForgotPasswordSheet

A bottom sheet similar to the Terms of Service sheet that will:

1. **Email Input Screen**
   - Email input field with validation
   - "Send Reset Link" button
   - Clear instructions for the user

2. **Success Confirmation Screen**  
   - Confirmation message that a reset link has been sent
   - Instructions to check email (including spam folder)
   - "Back to Login" button to close the sheet

3. **Note for Demo Mode**
   - Since there's no backend, the sheet will show a simulated success message
   - A subtle note explaining this is a demo (can be removed when backend is added)

### Login Page Updates

- Add state for controlling the forgot password sheet
- Connect the "Forgot your password?" button to open the sheet

---

## Technical Details

### Files to Create

**`src/components/settings/ForgotPasswordSheet.tsx`**
- Props: `open`, `onOpenChange`
- Internal state for email input and submission status
- Email validation using regex pattern
- Two-step UI: input form, then success confirmation
- Uses existing Sheet and Input components

### Files to Modify

**`src/pages/Login.tsx`**
- Import the new ForgotPasswordSheet component
- Add state: `const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)`
- Add onClick handler to the forgot password button
- Render the ForgotPasswordSheet component

### Component Structure

```text
ForgotPasswordSheet
├── SheetContent (side="bottom")
│   ├── SheetHeader
│   │   └── Title + Description
│   ├── Email Input Form (shown when not submitted)
│   │   ├── Input field
│   │   ├── Error message (if validation fails)
│   │   └── Submit button
│   └── Success View (shown after submission)
│       ├── Success icon (CheckCircle)
│       ├── Confirmation message
│       └── Back to login button
```

### Validation Rules

- Email is required
- Must match standard email format
- Clear error messaging for invalid inputs

### User Flow

1. User taps "Forgot your password?"
2. Bottom sheet slides up with email input
3. User enters email and taps "Send Reset Link"
4. If valid: Shows success confirmation
5. If invalid: Shows error message
6. User taps "Back to Login" to close sheet

