# Admin Dashboard Reservations - Debug Report

## Issue Summary

**Symptom:** Reservations section in PIN-protected Admin Dashboard shows "No reservations found"

**Expected:** Should display 3 reservation records that exist in Supabase `public.reservations` table

**Root Cause:** Row Level Security (RLS) policies are **silently filtering SELECT results**, returning empty array without errors

---

## Diagnosis Results

### Test 1: Supabase Query Test
```
✅ Query executed: SELECT * FROM reservations
📊 Results: 0 rows returned
❌ Error: None (no error, but empty result)
```

**Finding:** Query succeeds but returns no rows. This indicates RLS is active and filtering out all results for anonymous users.

### Test 2: Insert Operation (From Form)
```
❌ Error Code: 42501
❌ Error Message: "new row violates row-level security policy"
```

**Finding:** RLS is also blocking INSERT operations for anonymous users.

### Test 3: Browser Console Logging
Enhanced logging added to ReservationsSection in admin/page.tsx shows:
```
🔍 ADMIN DASHBOARD - Reservations Fetch Debug
✅ Query executed
📦 Data returned: []
📊 Data length: 0
❌ Error returned: null
```

**Finding:** No error is thrown, but data array is empty. Classic RLS silent filtering.

---

## Root Cause: Missing RLS Policies

The `public.reservations` table has Row Level Security enabled, but **no policies allow anonymous users** to SELECT or INSERT data.

This causes:
1. ✅ Query succeeds (no permission error thrown)
2. ❌ Results are silently filtered to empty array
3. ❌ Admin sees "No reservations found"
4. ❌ Form submissions fail with 42501 error

---

## How to Fix: Add RLS Policies to Supabase

### Step 1: Open Supabase Dashboard
1. Go to: https://app.supabase.com
2. Select your project
3. Navigate to: **Authentication** → **Policies** (left sidebar)
4. Select table: **reservations**

### Step 2: Create SELECT Policy
1. Click **New Policy** → **For full customization**
2. Configure:
   - **Policy Name:** `Allow anonymous SELECT`
   - **Target Roles:** Select `anon` checkbox
   - **Command:** SELECT
   - **Check:** `true`
3. Click **Review** → **Save Policy**

**SQL Equivalent:**
```sql
CREATE POLICY "Allow anonymous SELECT" ON public.reservations
FOR SELECT
TO anon
USING (true);
```

### Step 3: Create INSERT Policy
1. Click **New Policy** → **For full customization**
2. Configure:
   - **Policy Name:** `Allow anonymous INSERT`
   - **Target Roles:** Select `anon` checkbox
   - **Command:** INSERT
   - **Check:** `true`
3. Click **Review** → **Save Policy**

**SQL Equivalent:**
```sql
CREATE POLICY "Allow anonymous INSERT" ON public.reservations
FOR INSERT
TO anon
WITH CHECK (true);
```

### Step 4: (Optional) Create UPDATE Policy for Future Features
If you plan to add status changes in admin:
```sql
CREATE POLICY "Allow anonymous UPDATE" ON public.reservations
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
```

---

## After Adding Policies

### Expected Behavior:
✅ Admin dashboard shows all reservations in table  
✅ Summary cards display correct status counts  
✅ Form submissions work without 42501 error  
✅ Booking codes generate and reservations save  
✅ Refresh button loads new data  

### Browser Console Output Should Show:
```
🔍 ADMIN DASHBOARD - Reservations Fetch Debug
✅ Query executed
📦 Data returned: [
    { id: 1, booking_code: "CG-260714-...", name: "John Doe", ... },
    ...
]
📊 Data length: 3
❌ Error returned: null
✨ Success! Reservations fetched
```

---

## Testing Steps

### Before Fix:
1. Open Admin Dashboard (PIN: 5092)
2. Click "Reservations" in sidebar
3. Result: "No reservations found" ❌

### After Adding RLS Policies:
1. Hard refresh browser (Cmd+Shift+R on Mac)
2. Open Developer Tools (F12) → Console tab
3. Click "Reservations" in sidebar
4. Look for `🔍 ADMIN DASHBOARD - Reservations Fetch Debug` logs
5. Verify `Data returned: [...]` shows 3 rows
6. Table should display all 3 reservations ✅

---

## Files Modified for Debugging

| File | Changes |
|------|---------|
| `src/app/admin/page.tsx` | Enhanced `fetchReservations()` with detailed console logging; Updated error/empty messages with RLS hints |
| `src/components/ReservationModal.tsx` | Improved error detection for RLS code 42501; Better error messages |
| `debug-admin-reservations.mjs` | Created test script to verify SELECT query results |
| `test-supabase.mjs` | Created test script for connection verification |

---

## Implementation Architecture

### ReservationsSection (Admin Dashboard)
- **Location:** `src/app/admin/page.tsx` lines 1257+
- **Type:** Inline React component function
- **Data Flow:** 
  1. useEffect → fetchReservations()
  2. supabase.from("reservations").select("*")
  3. setReservations(data || [])
  4. Render reservations.map() in table
- **Logging:** Console group "🔍 ADMIN DASHBOARD - Reservations Fetch Debug" with detailed output

### AdminReservationsSection (Standalone Page)
- **Location:** `src/components/AdminReservationsSection.tsx`
- **Type:** Exported named component
- **Used By:** `src/app/admin/reservations/page.tsx`
- **Same Logic:** Uses same Supabase query and state management

### ReservationModal (Home Page Form)
- **Location:** `src/components/ReservationModal.tsx`
- **Type:** Modal dialog component
- **Operation:** INSERT to same "reservations" table
- **Failure Mode:** Code 42501 when RLS INSERT policy missing

---

## Key Configuration

### Supabase Project
- **URL:** https://fdbzsxflmudjftoqvgtj.supabase.co
- **Table:** public.reservations
- **RLS Status:** Enabled (requires policies for access)

### Access Method
- **Type:** Anonymous (no authentication)
- **Client:** `supabase` instance from `@/lib/supabase`
- **Auth Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Troubleshooting

| Symptom | Cause | Solution |
|---------|-------|----------|
| Still "No reservations found" after adding policies | Browser cache | Hard refresh (Cmd+Shift+R) |
| Form submissions still fail with 42501 | INSERT policy missing | Add "Allow anonymous INSERT" policy |
| Records visible on /admin/reservations but not /admin | Different component issue | Check AdminReservationsSection separately |
| Console shows error (not empty result) | Different RLS policy issue | Check specific error message in console |
| Data was deleted | Not an RLS issue | Check Supabase table directly |

---

## Success Criteria

✅ Admin Dashboard loads without errors  
✅ Reservations section accessible via sidebar  
✅ All 3 reservations display in table  
✅ Summary cards show correct counts  
✅ Console logs show "Success! Reservations fetched"  
✅ Refresh button works  
✅ Form submissions succeed with 42501 error cleared  
