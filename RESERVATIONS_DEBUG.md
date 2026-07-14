# Reservations Data Loading - Debug Report & Fix

## Summary

The reservations page loads successfully but displays no data because **Row Level Security (RLS) INSERT policy is blocking form submissions**. The table itself is empty because the INSERT operations are failing.

---

## Root Cause Analysis

### Test Results:
```
✅ SELECT Operations: WORKING
   → Query succeeds, returns 0 rows (table is empty)
   
❌ INSERT Operations: BLOCKED BY RLS
   → Error Code: 42501
   → Error Message: "new row violates row-level security policy for table reservations"
```

### Why the page shows no data:
1. Users try to submit reservations via the form
2. Supabase rejects INSERT due to missing RLS permission
3. Form shows error (hidden in some cases)
4. No data is stored → admin table stays empty

---

## How to Fix (Supabase Configuration)

### Step 1: Navigate to RLS Policies
1. Go to: **Supabase Dashboard** → Your Project
2. Navigate to: **Authentication** → **Policies** (in sidebar)
3. Select table: **reservations**

### Step 2: Add SELECT Policy
1. Click **New Policy** → **For full customization**
2. Fill in:
   - **Policy Name:** `Allow anonymous to SELECT reservations`
   - **Target Roles:** Check `anon`
   - **Command:** SELECT
   - **Check:** `true`
3. Click **Review** → **Save Policy**

### Step 3: Add INSERT Policy
1. Click **New Policy** → **For full customization**
2. Fill in:
   - **Policy Name:** `Allow anonymous to INSERT reservations`
   - **Target Roles:** Check `anon`
   - **Command:** INSERT
   - **Check:** `true`
3. Click **Review** → **Save Policy**

### Step 4: (Optional) Add UPDATE Policy for Status Changes
If you want to enable admin status updates later:
1. Click **New Policy** → **For full customization**
2. Fill in:
   - **Policy Name:** `Allow authenticated UPDATE reservations`
   - **Target Roles:** Check `authenticated`
   - **Command:** UPDATE
   - **Check:** `true`
3. Click **Review** → **Save Policy**

---

## Verification

After adding the RLS policies:

### Test 1: Browser Console
1. Open admin page: `http://localhost:3000/admin?section=reservations`
2. Open **Developer Tools** (F12) → **Console** tab
3. Look for console logs starting with: `🔍 Reservations Fetch Debug`
4. Verify:
   - ✅ "Query executed"
   - ✅ "Success! Reservations fetched"
   - ✅ Row count shows > 0

### Test 2: Submit a Test Reservation
1. Go to: `http://localhost:3000`
2. Click "Make a Reservation" button
3. Fill in the form and submit
4. You should see: "Reservation submitted successfully! Booking code: CG-YYMMDD-XXXX"
5. Go back to admin page → reservations should appear

---

## Enhanced Error Messages

I've updated both components to provide better debugging information:

### ReservationModal (Form):
- Now logs detailed Supabase errors to browser console
- Shows user-friendly error messages
- Detects RLS permission errors (code 42501) specifically
- Console shows: `🔍 Reservations Fetch Debug` group with full details

### AdminReservationsSection (Admin Table):
- Shows expanded error message with helpful tip
- Includes hint about RLS policies if permission error occurs
- Console logs query details, results, and any errors

---

## Browser Console Debugging

When you load the reservations page, you'll see:

```
🔍 Reservations Fetch Debug
⏱️ Timestamp: 2026-07-14T...
📍 Supabase Project: https://fdbzsxflmudjftoqvgtj.supabase.co
🔑 Auth Key exists: true
📋 Query Details:
  - Table: reservations
  - Select: *
  - Order: reservation_date, reservation_time (ascending)
✅ Query executed
📦 Data returned: [...]
❌ Error returned: null
✨ Success! Reservations fetched: { count: N, firstItem: {...} }
```

**If you see errors:**
- Look for `❌ Error returned:` in console
- Full error details logged with message, code, details, hint
- Use these to debug issues

---

## Testing Checklist

After implementing RLS policies:

- [ ] Admin page loads without errors
- [ ] Console shows "Success! Reservations fetched"
- [ ] Can submit a test reservation via home page form
- [ ] Reservation appears in admin table
- [ ] Booking code is generated correctly (format: CG-YYMMDD-XXXX)
- [ ] Reservation status shows as "Pending"
- [ ] Summary cards show correct counts

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Still showing 0 rows after RLS setup | Table is empty | Submit a test reservation through the form |
| Form submission fails with permission error | INSERT policy not added | Follow Step 3 above |
| Admin page shows error message | SELECT policy missing or RLS blocking | Follow Step 2 above and check console |
| Console shows "undefined" URL/key | Environment variables not loaded | Verify .env.local has correct values |

---

## Files Modified for Debugging

1. **AdminReservationsSection.tsx**
   - Enhanced logging in fetchReservations
   - Better error message display
   - Console group for organized debug output

2. **ReservationModal.tsx**
   - Better error detection (RLS code 42501)
   - User-friendly error messages
   - Detailed console logging

3. **test-supabase.mjs** (created for debugging)
   - Test file to verify Supabase connectivity
   - Tests both SELECT and INSERT operations
   - Shows exactly what RLS policies are needed

---

## Next Steps

1. **Add the RLS policies** as described above
2. **Refresh the admin page** (hard refresh with Cmd+Shift+R on Mac)
3. **Check the browser console** for the "Success!" message
4. **Submit a test reservation** to verify the full flow
5. **Verify data appears** in the admin table

If issues persist after adding RLS policies, check the browser console for detailed error logs.
