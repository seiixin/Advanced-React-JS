# Advanced React JS — Student Demo Guide

Helo! 👋 Ito ang gabay mo sa lahat ng demo folders sa course na ito.

Ang bawat folder ay isang **tumatakbong React app** na direktang nagpapakita ng code mula sa slides. Hindi mo na kailangang mag-type from scratch — buksan mo lang ang folder, i-run mo, at basahin mo itong README para maintindihan kung bakit ganoon ang code.

---

## 🚀 Paano i-run ang kahit anong demo

```bash
# 1. Pumunta sa folder ng demo na gusto mo
cd 01_Routes-and-Navigation

# 2. I-install ang dependencies (gawin ISANG BESES lang per folder)
npm install

# 3. I-run ang dev server
npm run dev
# Magbubukas ito sa http://localhost:5173
```

> **Para sa `10_Vitest` demo** — gamitin ang `npm test` para patakbuhin ang tests, hindi `npm run dev`.

---

## 📁 Listahan ng lahat ng demos

| Folder | Slides | Ano ang matututunan |
|--------|--------|---------------------|
| `00_initialize` | 8 | Paano mag-set up ng bagong Vite + React project |
| `01_Routes-and-Navigation` | 8–9 | Paano mag-navigate sa pagitan ng pages gamit ang React Router |
| `02_Dynamic-route-params` | 10 | Paano magbasa ng ID mula sa URL gamit ang `useParams` |
| `03_useReducer` | 11 | Paano pamahalaan ang complex na state gamit ang `useReducer` |
| `04_fetch-useCourses` | 14 | Paano mag-fetch ng data mula sa API nang ligtas |
| `05_context-useReducer` | 12 | Paano mag-share ng state sa buong app nang walang prop-drilling |
| `06_Custom-hooks-useDebouce` | 15 | Paano gumawa ng sariling custom hook |
| `07_Forms-controlled-with-validation` | 17 | Paano gumawa ng form na may tamang validation |
| `08_useMemo-Callback` | 18 | Paano mapabilis ang React app gamit ang memoization |
| `09_Lazy-load` | 19 | Paano i-split ang bundle para mas mabilis mag-load ang app |
| `10_Vitest` | 21 | Paano sumulat ng automated tests para sa components |
| `11_Project-Sample-Dataset` | 24 | Buong mini-dashboard na pinagsama-sama ang lahat |

---

## 📖 Detalyadong Gabay sa Bawat Demo

---

## 00 · Initialize

> **Slides 8 — Router: Install & Initialize**

### Ano ang itinuturo nito?

Ito ang **simula ng lahat**. Dito mo makikita kung ano ang mayroon ka pagkatapos mong mag-run ng `npm create vite@latest` — isang blank Vite + React project. Wala pang routing, wala pang multiple pages, puro default template lang.

Ang tanging pagbabago mula sa default template ay nasa `src/main.jsx` — doon mo idadagdag ang `<BrowserRouter>` para ma-enable ang routing sa buong app.

### Bakit mahalaga ang `<BrowserRouter>`?

Isipin mo ang `<BrowserRouter>` bilang isang "provider" — ibinibigay nito sa lahat ng components sa loob nito ang kakayahang mag-routing. Kung wala ito, hindi gagana ang `<NavLink>`, `<Link>`, `useParams()`, `useNavigate()`, at lahat ng ibang routing hooks.

**Simpleng rule:** `<BrowserRouter>` → ilagay sa pinaka-labas, isang beses lang, sa `main.jsx`.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | Nagdi-display ng terminal commands at ng BrowserRouter code snippet para sa reference |

### Terminal commands mula sa Slide 8

```bash
npm create vite@latest course-dashboard -- --template react
cd course-dashboard
npm install
npm install react-router
npm run dev
```

### Ang pinakamahalagang code

```jsx
// src/main.jsx — ang TANGING pagbabago mo mula sa default template
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>   {/* ← ilagay ito para gumana ang routing */}
    <App />
  </BrowserRouter>
)
```

---

## 01 · Routes and Navigation

> **Slides 8–9 — Router: Routes + Navigation**

### Ano ang itinuturo nito?

Pagkatapos i-set up ang `<BrowserRouter>` sa `main.jsx`, ang susunod na hakbang ay ang **mag-declare ng routes** — kung anong component ang ipapakita kapag pumunta ang user sa `/`, kapag pumunta sa `/courses`, at kung ano ang mangyayari kapag pumunta sa URL na hindi naka-define.

### Ang konsepto ng routing sa React

Sa tradisyonal na website, kapag nag-click ka ng link, nag-re-reload ang buong page. Sa React Router, **hindi** nagre-reload ang page — ang React lang ang nagpapalit ng component na ipinapakita. Kaya ang navigation ay mas mabilis at mas smooth.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/main.jsx` | `<BrowserRouter>` wrap — **ito ang pundasyon**, wala itong magagawa ang routing kung wala ito |
| `src/App.jsx` | `<Routes>`, `<Route>`, `<NavLink>` — dito mo idedeklarar kung aling component ang nasa aling URL |

### Ang pinakamahalagang code

```jsx
// src/main.jsx — BrowserRouter: isang beses lang, sa labas
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

```jsx
// src/App.jsx — Route table + NavLink
import { Routes, Route, NavLink } from 'react-router'

export default function App() {
  return (
    <>
      <nav>
        {/* NavLink ay awtomatikong nagdadagdag ng class="active"
            kapag ang URL nito ay katugma sa kasalukuyang URL */}
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>

      <Routes>
        <Route path="/"        element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="*"        element={<NotFoundPage />} /> {/* catch-all 404 */}
      </Routes>
    </>
  )
}
```

### Key concepts na tandaan

- **Ang mga page ay ordinary React components** — ang `DashboardPage` at `CoursesPage` ay plain na function components lang. Ang router ang bahala kung kailan sila ipapakita.
- **`<NavLink>` vs `<Link>`** — pareho silang ginagawang link, pero ang `NavLink` ay awtomatikong nagdadagdag ng `class="active"` kapag ang link ay naka-match sa current URL. Useful para sa navigation menus.
- **`path="*"`** — ito ang catch-all route. Kung hindi match ang kahit anong route sa itaas niya, ito ang ipapakita — perpekto para sa 404 pages.

---

## 02 · Dynamic Route Params

> **Slide 10 — Router: Dynamic Route Params**

### Ano ang itinuturo nito?

Paano mo gagamitin ang URL para mag-identify ng **specific na item**? Halimbawa, paano mo ipapakita ang detalye ng `r101` course kapag pumunta ang user sa `/courses/r101`, at ibang details naman kapag `/courses/r201`?

Ang sagot: **dynamic route params** — ginagamit ang `:paramName` sa route path at binabasa gamit ang `useParams()` hook.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | `<Route path="/courses/:courseId">` — paano i-declare ang dynamic route, at `useParams()` sa loob ng `CourseDetailsPage` — paano basahin ang value |

### Ang pinakamahalagang code

```jsx
// src/App.jsx

// 1. Declare ang dynamic route gamit ang :courseId
<Routes>
  <Route path="/courses"            element={<CoursesPage />} />
  <Route path="/courses/:courseId"  element={<CourseDetailsPage />} />
  {/* Ang :courseId ay lalabas sa anumang value — r101, r201, kahit ano */}
</Routes>

// 2. Basahin ang :courseId gamit ang useParams()
function CourseDetailsPage() {
  const { courseId } = useParams() // ← kinukuha ang "r101" mula sa URL

  const course = COURSES.find((c) => c.id === courseId)

  if (!course) return <h1>Course not found</h1>

  return <h1>{course.title}</h1>
}
```

### Key concepts na tandaan

- **Ang params ay palaging STRING** — kahit na `123` ang hitsura ng URL, ang makukuha mo sa `useParams()` ay `"123"` (may quotes), hindi `123` (number). Kaya lagi mag-validate bago gamitin.
- **Isang route component, maraming values** — ang `CourseDetailsPage` ay isang component lang, pero kaya nitong mag-handle ng `/courses/r101`, `/courses/r201`, at lahat ng iba pa. Ang `courseId` ang nagdidistinguish sa kanila.
- **I-validate lagi** — bago mag-fetch ng data gamit ang param, i-check muna kung valid ang value: `const course = COURSES.find((c) => c.id === courseId)`.

---

## 03 · useReducer

> **Slide 11 — State: useReducer**

### Ano ang itinuturo nito?

Kilala mo na ang `useState`. Pero kapag marami kang related na state changes — add course, remove course, at search — nagiging masalimuot ang maraming `setState` calls na magkakaugnay. Dito pumapasok ang `useReducer`.

Ang `useReducer` ay nagtatago ng lahat ng state logic sa **isang function** — ang **reducer**. Para itong traffic controller: lahat ng "gustong mangyari" sa state ay dumadaan sa kanya, at siya ang mag-de-decide kung paano mag-a-update ang state.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | Ang buong pattern: `initialState`, `reducer` function, at `dispatch` calls |

### Ang pinakamahalagang code

```jsx
// src/App.jsx

// 1. Ang initial state — isang object na naglalaman ng lahat
const initialState = { courses: [], search: '' }

// 2. Ang reducer — PURE FUNCTION na nagde-decide kung paano magbabago ang state
//    Pure = walang side effects, palaging nagre-return ng BAGONG object
function reducer(state, action) {
  switch (action.type) {
    case 'course/added':
      // Huwag gawin: state.courses.push(...)  ← MALI, nag-mu-mutate
      // Gawin ito:
      return { ...state, courses: [...state.courses, action.course] }

    case 'course/removed':
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.id),
      }

    case 'search/changed':
      return { ...state, search: action.value }

    default:
      return state // palaging may default na nagre-return ng state
  }
}

// 3. Gamitin ang useReducer sa component
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Para mag-add ng course:
  dispatch({ type: 'course/added', course: { id: '1', title: 'React' } })

  // Para mag-remove:
  dispatch({ type: 'course/removed', id: '1' })

  // Para mag-search:
  dispatch({ type: 'search/changed', value: 'react' })
}
```

### Key concepts na tandaan

- **Pure function ang reducer** — ibig sabihin: (1) walang side effects tulad ng API calls, (2) palaging nagre-return ng bagong object gamit ang spread operator `{...state}`, at (3) hindi nag-mu-mutate ng original na `state`.
- **`action.type` ay string** — ang convention ay `'noun/verb'` format tulad ng `'course/added'`, `'course/removed'`. Mas readable kaysa `'ADD_COURSE'`.
- **Gamitin ang `useReducer` kapag:** maraming related state fields, maraming actions ang nag-a-affect sa iisang state, o kapag ang susunod na state ay depende sa nakaraang state.

---

## 04 · Fetch with useCourses

> **Slide 14 — Effects: Fetch na may Loading / Error / Cleanup**

### Ano ang itinuturo nito?

Paano mag-fetch ng data mula sa API **nang ligtas** — ibig sabihin, may maayos na loading state habang hinihintay ang data, may error handling kapag may problema, at may cleanup para hindi mag-crash ang app.

### Ang problema na nireresolba nito

Kapag nag-fetch ka ng data at nag-click ang user papunta sa ibang page HABANG nag-lo-load pa ang data, may posibilidad na mag-update ng state ang component kahit **wala na siya sa DOM**. Ito ay nagdudulot ng warning at possible memory leak. Ang `AbortController` ang solusyon.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | Ang `useCourses()` custom hook na naglalaman ng lahat ng fetch logic, at ang component na gumagamit nito |

### Ang pinakamahalagang code

```jsx
// src/App.jsx

function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    // 1. Gumawa ng AbortController para makapag-cancel ng request
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/courses', {
          signal: controller.signal // ← ikonekta ang controller sa fetch
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setCourses(data)
      } catch (err) {
        // 2. Huwag i-handle ang AbortError — normal ito kapag na-cleanup
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()

    // 3. Ang cleanup function — tinatawag ng React kapag nag-unmount
    //    ang component o kapag mag-re-run ang effect
    return () => controller.abort()

  }, []) // empty array = isang beses lang mag-run, sa mount

  return { courses, loading, error }
}

// Sa component, gamitin ang hook at i-render ang lahat ng states:
export default function App() {
  const { courses, loading, error } = useCourses()

  if (loading) return <p>Loading...</p>           // State 1: Loading
  if (error)   return <p>Error: {error}</p>       // State 2: Error
  if (courses.length === 0) return <p>Wala.</p>   // State 3: Empty
  return <ul>...</ul>                             // State 4: Success
}
```

### Key concepts na tandaan

- **Laging may cleanup** — ang `return () => controller.abort()` ay ang cleanup function ng `useEffect`. Tinatawag ito ng React awtomatiko kapag nag-unmount ang component.
- **Huwag kalimutan ang AbortError check** — kapag na-cancel ang fetch dahil sa cleanup, mag-te-throw ito ng `AbortError`. Normal ito — huwag i-treat bilang error.
- **Palaging hawakan ang apat na states** — loading, error, empty, at success. Huwag mag-render ng blankong screen.

---

## 05 · Context + useReducer

> **Slide 12 — State: Context + useReducer**

### Ano ang itinuturo nito?

**Prop-drilling** ang tawag sa problema kung saan kailangan mong ipasa ang props sa bawat level ng component tree kahit hindi kailangan ng ilang components ang props na iyon — kailangan lang nila ito i-pass papunta sa susunod.

Ang **Context API** ang solusyon: pwede kang mag-lagay ng data sa "global na lugar" na pwedeng ma-access ng kahit anong component sa loob ng provider — walang props na kailangang ipasa mano-mano.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/CourseContext.jsx` | **Pinaka-importante sa demo na ito** — dito naglalaman ng tatlong bagay: (1) ang context object, (2) ang Provider component, at (3) ang custom hook para safe na mag-access |
| `src/App.jsx` | Paano gamitin ang pattern sa practice — `<CourseProvider>` sa labas, `useCourseContext()` sa loob |

### Ang pinakamahalagang code

```jsx
// src/CourseContext.jsx

import { createContext, useContext, useReducer } from 'react'

// 1. Gumawa ng Context — starts as null (walang laman)
const CourseContext = createContext(null)

// 2. Provider — ito ang "lalagyan" ng state + dispatch
export function CourseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    // Lahat ng components sa loob ng value prop ay makaka-access
    // ng state at dispatch nang direkta
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  )
}

// 3. Custom hook para safe na mag-access ng context
export function useCourseContext() {
  const value = useContext(CourseContext)
  // Kapag ginamit nang wala ang <CourseProvider>, malinaw ang error
  if (!value) throw new Error('Wrap your component in <CourseProvider>')
  return value
}
```

```jsx
// src/App.jsx — paano gamitin ang pattern

// Bawat sub-component ay direktang kumukuha ng state — walang props!
function CourseSearch() {
  const { state, dispatch } = useCourseContext() // ← direkta, walang props
  return <input value={state.search} onChange={...} />
}

function CourseList() {
  const { state, dispatch } = useCourseContext() // ← direkta rin
  return <ul>...</ul>
}

// I-wrap ang lahat sa Provider
export default function App() {
  return (
    <CourseProvider>      {/* ← ito ang nagbibigay ng access sa lahat */}
      <CourseSearch />
      <CourseList />
      <AddCourseForm />
    </CourseProvider>
  )
}
```

### Key concepts na tandaan

- **Context ay hindi para sa lahat ng state** — gamitin para sa state na kailangan ng maraming components sa iba't ibang level. Para sa local state (tulad ng `isOpen` ng isang modal), `useState` pa rin ang tamang gamitin.
- **Ang custom hook (`useCourseContext`) ay nagpoprotekta** — kapag ginamit ang hook nang wala ang Provider, malinaw ang error message. Mas mahirap ma-debug ang `Cannot read property of undefined`.
- **Component tree ng demo:** `CourseProvider` → `App` → `CourseSearch` / `CourseList` / `AddCourseForm` — lahat ng tatlong components ay direktang nag-a-access ng context nang hindi nag-iinvolve ng props.

---

## 06 · Custom Hooks — useDebouncedValue

> **Slide 15 — Hooks: Custom Hooks**

### Ano ang itinuturo nito?

Ang **custom hook** ay isang paraan para kunin ang stateful logic mula sa loob ng isang component at gawing **reusable**. Ang naming convention ay laging nagsisimula sa `use` (tulad ng `useState`, `useEffect`) para malaman ng React na ito ay isang hook.

Ang `useDebouncedValue` ay isang klasikong halimbawa: ayaw mong mag-filter ng listahan sa bawat keystroke ng user (matagal iyon kapag malaki ang data). Gusto mong hintayin nang ilang milliseconds pagkatapos tumigil ng pag-type bago mag-update.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | Ang `useDebouncedValue` hook at ang `SearchCourses` component na gumagamit nito |

### Ang pinakamahalagang code

```jsx
// src/App.jsx

// Ang custom hook — logic lang, walang JSX
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Gumawa ng timer na mag-u-update ng debounced value
    const id = setTimeout(() => setDebounced(value), delay)

    // CLEANUP: kapag nagbago ang value BAGO matapos ang timer,
    // cancel ang nakaraang timer at magsimula ulit
    return () => clearTimeout(id)

  }, [value, delay]) // re-run kapag nagbago ang value o delay

  return debounced // ibalik ang "delayed" version ng value
}

// Ang component — malinis, walang timer logic
function SearchCourses({ courses }) {
  const [query, setQuery] = useState('')

  // slowQuery ay hindi mag-u-update hanggang 400ms pagkatapos tumigil ng pag-type
  const slowQuery = useDebouncedValue(query, 400)

  const results = courses.filter((c) =>
    c.title.toLowerCase().includes(slowQuery.toLowerCase())
  )

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />

      {/* Sa UI, makikita mo ang pagkakaiba ng dalawa */}
      <p>Live: {query} | Debounced: {slowQuery}</p>

      <ul>{results.map(...)}</ul>
    </>
  )
}
```

### Key concepts na tandaan

- **Ang cleanup function ang "heart" ng debounce** — sa bawat keystroke, naka-cancel ang dating timer at nagsisimula ng bago. Kung tumigil ka ng 400ms, iyon lang ang oras na mag-u-update ang `slowQuery`.
- **Custom hook = logic na may state** — kahit anong combination ng `useState`, `useEffect`, at iba pang hooks ay pwedeng i-extract sa isang custom hook. Ang rule lang: nagsisimula sa `use`.
- **Sa browser, makikita mo ang demo** — mayroon itong dalawang labels: "Live value" na nagbabago sa bawat keystroke, at "Debounced" na nagbabago lang pagkatapos tumigil ng pag-type. Subukan mong mag-type nang mabilis!

---

## 07 · Forms — Controlled with Validation

> **Slide 17 — Forms: Controlled Forms**

### Ano ang itinuturo nito?

Sa React, ang **controlled form** ay ibig sabihin ang **value ng bawat input ay nanggagaling sa React state** — hindi sa DOM mismo. Ito ang pinakamalaking pagkakaiba ng React forms sa regular na HTML forms.

At ang validation? Hindi lang sapat ang HTML attributes tulad ng `required` o `min` — kailangang mag-validate ka rin sa JavaScript dahil **pwedeng ma-bypass ang HTML validation** (halimbawa sa pamamagitan ng DevTools o mga bots).

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | `form` state object, `handleChange` generic handler, at `handleSubmit` na may JavaScript validation |

### Ang pinakamahalagang code

```jsx
// src/App.jsx

export default function App() {
  // 1. Ang form state — isang object para sa lahat ng fields
  const [form, setForm] = useState({ title: '', capacity: '' })
  const [message, setMessage] = useState('')

  // 2. Generic change handler — gumagamit ng [e.target.name]
  //    para hindi kailangan ng hiwalay na handler sa bawat field
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setMessage('') // clear ang error habang nag-e-edit
  }

  // 3. Validation sa submit — hindi sa HTML attributes
  function handleSubmit(e) {
    e.preventDefault() // ← pigilan ang browser na mag-reload

    const title    = form.title.trim()
    const capacity = Number(form.capacity)

    // Validate sa JS — mas ligtas kaysa HTML attributes lang
    if (!title) {
      setMessage('Title is required.')
      return // ← lumabas agad, huwag ituloy
    }
    if (!Number.isInteger(capacity) || capacity < 1) {
      setMessage('Capacity must be a positive whole number.')
      return
    }

    // Success path — pwede na mag-save
    onSave({ title, capacity })
    setForm({ title: '', capacity: '' }) // ← i-reset ang form
    setMessage('✓ Course added!')
  }

  return (
    <form onSubmit={handleSubmit} noValidate> {/* noValidate = disable HTML validation */}
      <input name="title"    value={form.title}    onChange={handleChange} />
      <input name="capacity" value={form.capacity} onChange={handleChange} type="number" />

      {/* role="alert" = ipababatid sa screen readers kapag nagbago ito */}
      {message && <p role="alert">{message}</p>}

      <button type="submit">Add course</button>
    </form>
  )
}
```

### Key concepts na tandaan

- **`e.preventDefault()`** — PALAGI itong gamitin sa `onSubmit`. Kung wala ito, mag-re-reload ang page at mawawala ang state mo.
- **`noValidate` sa form** — ini-disable nito ang browser's built-in HTML validation para ikaw ang maging in-charge ng validation logic sa JS.
- **`[e.target.name]`** — ito ang paraan para gumamit ng iisang change handler para sa maraming fields. Ang `name` attribute ng input ay dapat tumugma sa key sa state object.
- **`role="alert"`** — para sa accessibility. Kapag nagbago ang laman ng elemento na may `role="alert"`, awtomatiko itong binabasa ng screen readers.

---

## 08 · useMemo + useCallback + React.memo

> **Slide 18 — Performance: Render Smarter**

### Ano ang itinuturo nito?

Hindi lahat ng re-render ay masama — normal ito sa React. Pero kapag sobrang laki na ng app at may malinaw na bottleneck (halimbawa, mabagal na filter sa libu-libong items), may tatlong tools kang magagamit.

> ⚠️ **Mahalagang babala:** Huwag gamitin ang mga tools na ito NANG WALA pang nasusukat na performance issue. Nagdadagdag sila ng complexity. Measure first, optimize second.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/App.jsx` | `useMemo` para sa filtered list, `useCallback` para sa remove function, `React.memo` sa `CourseItem` component |

### Ang tatlong tools — at kung kailan gamitin

#### `useMemo` — memoize ang computed value

```jsx
// Ang PROBLEMA kapag walang useMemo:
// Sa bawat re-render (kahit hindi nagbago ang search at removed),
// ire-recompute ang filter — sayang kapag malaki ang listahan.

// Ang SOLUSYON:
const filteredCourses = useMemo(() => {
  console.log('recomputing...') // i-open ang console, panoorin kung kailan ito nag-log
  return ALL_COURSES
    .filter((c) => !removed.has(c.id))
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
}, [search, removed]) // ← re-compute LANG kapag nagbago ang search o removed
```

#### `useCallback` — memoize ang function reference

```jsx
// Ang PROBLEMA kapag walang useCallback:
// Sa bawat re-render, bagong function object ang nalilikha para sa handleRemove.
// Kahit parehong logic, iba ang reference — breaks ang React.memo.

// Ang SOLUSYON:
const handleRemove = useCallback((id) => {
  setRemoved((prev) => new Set([...prev, id]))
}, []) // ← walang dependencies, iisang beses lang nalilikha
```

#### `React.memo` — memoize ang component

```jsx
// Ang PROBLEMA kapag walang React.memo:
// Kahit hindi nagbago ang props ng CourseItem, nagre-render siya
// tuwing nagre-render ang parent component.

// Ang SOLUSYON:
const CourseItem = memo(function CourseItem({ course, onRemove }) {
  console.log(`render: ${course.title}`) // panoorin sa console
  return <li>...</li>
}) // ← hindi magre-render kapag pareho ang course at onRemove
```

### 🔬 Paano i-observe ang demo

1. I-run ang app at **buksan ang browser console** (F12 → Console)
2. Mag-type sa search box — makikita mong nag-log ang `useMemo: recomputing` at `render: <course name>`
3. I-click ang **"Unrelated re-render"** button — pansinin na HINDI nag-log ang recompute at hindi nagre-render ang CourseItems
4. Iyon ang punto — ang unrelated state change ay hindi nagti-trigger ng unnecessary work

### Key concepts na tandaan

- **`useMemo`** — para sa mga computation na mahal. Hindi para sa lahat ng value.
- **`useCallback`** — kailangan ito kapag ipinasa mo ang function bilang prop sa isang `React.memo` component. Kung wala ito, palaging bagong function reference = palaging re-render.
- **`React.memo`** — gumagana lang nang maayos kapag ang mga props ay stable (hindi nagbabago nang walang dahilan). Kaya kailangan ng `useCallback` para sa functions.
- **Palaging measure muna** — gamitin ang React DevTools Profiler para malaman kung saan talaga ang bottleneck bago mag-optimize.

---

## 09 · Lazy Load Pages

> **Slide 19 — Performance: Code Splitting**

### Ano ang itinuturo nito?

Sa default, ang Vite ay nag-bu-bundle ng lahat ng iyong code sa **iisang JS file** na dino-download ng browser sa unang pagkakataon. Kapag malaki na ang app, matagal ito.

Ang solusyon: **code splitting** gamit ang `React.lazy()` + `<Suspense>`. Sinasabi mo sa Vite kung aling pages ang pwedeng i-split sa sariling file at i-download lang kapag kailangan.

### Files na dapat basahin — lahat ng 5

| File | Role | Bakit mahalaga |
|------|------|----------------|
| `src/main.jsx` | Entry point | I-set up ang `<BrowserRouter>` — katulad sa `01_Routes-and-Navigation` |
| `src/App.jsx` | **Pinaka-crucial** | Dito nakalagay ang `lazy()` calls at ang `<Suspense>` — ito ang nagde-declare ng code split points |
| `src/pages/DashboardPage.jsx` | Normal na page | **Hindi** lazy-loaded — kasama sa main bundle (regular import sa App.jsx) |
| `src/pages/ReportsPage.jsx` | **Lazy-loaded page** | Ito ang pangunahing halimbawa — separate JS chunk ang ginagawa nito ni Vite |
| `src/pages/CoursesPage.jsx` | Lazy-loaded page rin | Pangalawang halimbawa — kahit maraming pages, pwedeng lahat ay lazy |

### Ang pinakamahalagang code

```jsx
// src/App.jsx

import { lazy, Suspense } from 'react'
import DashboardPage from './pages/DashboardPage.jsx' // ← NORMAL import = kasama sa main bundle

// lazy() import = SEPARATE chunk = hindi dino-download hanggang kailangan
const ReportsPage = lazy(() => import('./pages/ReportsPage.jsx'))
const CoursesPage = lazy(() => import('./pages/CoursesPage.jsx'))

export default function App() {
  return (
    <>
      <nav>...</nav>

      {/*
        Ang <Suspense> ay nagbi-bigay ng fallback UI habang dino-download
        ang lazy chunk. Pwedeng spinner, skeleton, o simpleng text.
        KAILANGAN ito — kung wala, mag-eError ang React.
      */}
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/"        element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />  {/* lazy */}
          <Route path="/courses" element={<CoursesPage />} />  {/* lazy */}
        </Routes>
      </Suspense>
    </>
  )
}
```

### Paano makita ang code splitting sa action

1. I-run: `npm run build` sa loob ng `09_Lazy-load` folder
2. Buksan ang `dist/assets/` folder
3. Makikita mo ang **hiwalay na JS files** para sa ReportsPage at CoursesPage
4. Ang main bundle ay mas maliit kaysa kung kasama sila doon

O kaya naman:

1. I-run ang `npm run dev`
2. Buksan ang browser DevTools → Network tab
3. I-click ang "Reports" link sa nav
4. Makikita mo sa Network tab na nag-download ng **bagong JS file** — iyon ang lazy chunk

### Key concepts na tandaan

- **Normal import vs lazy import** — ang pagkakaiba ay kung saan naka-bundle ang code. Normal = main bundle. Lazy = sariling chunk.
- **`<Suspense>` ay required** — kapag gumagamit ng `lazy()`, kailangan palaging may `<Suspense>` somewhere above sa tree.
- **Ang `DashboardPage` ay hindi lazy** — ito ang landing page, kaya normal na i-load ito nang maaga. Hindi mo gustong mag-loading flicker ang home page.

---

## 10 · Vitest + React Testing Library

> **Slide 21 — Testing**

### Ano ang itinuturo nito?

Ang automated tests ay code na nagsusuri kung tama ang behavior ng iyong components. Ang **Vitest** ang test runner (katulad ng Jest), at ang **React Testing Library** ang nagbibigay ng tools para mag-render ng React components sa loob ng tests at mag-query ng kung ano ang makikita ng user.

**Ang pilosopiya:** Test ang **behavior** — ang nakikita at nagagawa ng user — hindi ang internal implementation. Kung nagbago ang class names o ang HTML structure pero pareho pa rin ang nakikita ng user, dapat pasado pa rin ang test.

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `vite.config.js` | `test: { environment: 'jsdom' }` — ito ang nagsasabi sa Vitest na gumamit ng simulated browser DOM |
| `src/components/CourseCard.jsx` | Ang component na sinusubok — simple lang: tumatanggap ng `course` prop, nag-re-render ng title at capacity |
| `src/components/CourseCard.test.jsx` | **Pinaka-importante** — tatlong tests na nagde-demonstrate ng tamang paraan ng pag-test |

### Ang pinakamahalagang code

```jsx
// vite.config.js — kailangan ang test config para gumana ang Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ← simulate ang browser sa Node.js
    globals: true,        // ← pwede nang gamitin ang describe/test/expect nang walang import
  },
})
```

```jsx
// src/components/CourseCard.test.jsx

import { render, screen } from '@testing-library/react'
import { test, expect, describe } from 'vitest'
import CourseCard from './CourseCard.jsx'

describe('CourseCard', () => {

  // Test 1: Simpleng check kung nagre-render ang title
  test('shows course title', () => {
    render(<CourseCard course={{ id: '1', title: 'React', capacity: 30 }} />)

    // screen.getByText — naghahanap ng text na NAKIKITA ng user
    // Mas maganda ito kaysa querySelector('.course-title') dahil
    // kahit magbago ang class name, pasado pa rin ang test
    expect(screen.getByText('React')).toBeTruthy()
  })

  // Test 2: Check ng capacity — gumagamit ng regex
  test('shows capacity', () => {
    render(<CourseCard course={{ id: '2', title: 'Hooks', capacity: 25 }} />)
    // /capacity:\s*25/i = mag-match kahit may extra space, case-insensitive
    expect(screen.getByText(/capacity:\s*25/i)).toBeTruthy()
  })

  // Test 3: Check ng semantic HTML — gumagamit ng role
  test('title is in a heading', () => {
    render(<CourseCard course={{ id: '3', title: 'Router', capacity: 10 }} />)
    // getByRole ay nag-che-check ng semantics — mas malakas kaysa getByText
    // dahil kino-confirm nito na nasa tamang HTML element ang title
    const heading = screen.getByRole('heading', { name: /router/i })
    expect(heading).toBeTruthy()
  })

})
```

### Paano i-run ang tests

```bash
cd 10_Vitest
npm install  # kailangan muna ito (may disk space issue noong setup)
npm test     # isang beses lang mag-run
```

### Key concepts na tandaan

- **`render()`** — nag-re-render ng component sa virtual DOM (jsdom)
- **`screen.getByText()`** — naghahanap ng text na nakikita ng user — ito ang tamang paraan, hindi `document.querySelector`
- **`screen.getByRole()`** — naghahanap gamit ang semantic HTML role (`heading`, `button`, `textbox`, etc.) — pinaka-resilient na query
- **Hindi magandang gawin:** `document.querySelector('.my-class')` — kapag nagbago ang class name, mabibigo ang test kahit tama pa rin ang behavior
- **`describe()`** — para mag-group ng related na tests

---

## 11 · Project — Sample Dataset

> **Slide 24 — Student Course Dashboard**

### Ano ang itinuturo nito?

Ito ang **pinagsama-samang lahat** — isang gumaganang mini-dashboard na gumagamit ng lahat ng patterns na natutunan mo sa buong course:

- Mock data bago mag-connect ng real API (Slide 24)
- `useReducer` para sa add/remove actions (Slide 11)
- Search nang hindi nino-modify ang source array (Slide 15)
- Controlled form na may validation (Slide 17)

### Files na dapat basahin

| File | Ano ang makikita mo |
|------|---------------------|
| `src/data/sampleCourses.js` | **Ang mock dataset** — tatlong courses na may `id`, `title`, `capacity`. Ito ang placeholder bago ang real API. |
| `src/App.jsx` | Pinagsama-sama ang lahat ng patterns |

### Ang pinakamahalagang code

```jsx
// src/data/sampleCourses.js — gamitin muna ito bago mag-connect ng real API
export const sampleCourses = [
  { id: 'r101', title: 'React Fundamentals', capacity: 30 },
  { id: 'r201', title: 'React Router',        capacity: 25 },
  { id: 'r301', title: 'React Hooks',          capacity: 20 },
]

// Kapag may real API na, palitan lang ang line na ito:
// const data = await fetch('/api/courses').then(r => r.json())
// At gamitin ang useCourses hook mula sa 04_fetch-useCourses
```

```jsx
// src/App.jsx — lahat ng patterns pinagsama

// 1. useReducer para sa state management
const [state, dispatch] = useReducer(reducer, {
  courses: sampleCourses, // ← sinimulan nang may data
  search: ''
})

// 2. Search nang walang mutation
// HINDI: state.courses.filter(...) at i-assign sa state.courses
// TAMA:  gumawa ng bagong variable
const filtered = state.courses.filter((c) =>
  c.title.toLowerCase().includes(state.search.toLowerCase())
)

// 3. Form na may validation
function handleSubmit(e) {
  e.preventDefault()
  const title    = form.title.trim()
  const capacity = Number(form.capacity)

  // Validate bago mag-dispatch
  if (!title || !Number.isInteger(capacity) || capacity < 1) {
    setMsg('Provide a title and a positive capacity.')
    return
  }

  dispatch({ type: 'course/added', course: { id: crypto.randomUUID(), title, capacity } })
}
```

### Mga susunod na hakbang (Challenges mula sa Slide 24)

Kapag naiintindihan mo na ang demo, subukan mong dagdagan ito:

1. **I-connect sa real API** — palitan ang `sampleCourses` ng `useCourses()` hook mula sa `04_fetch-useCourses`
2. **Mag-add ng detail page** — gamitin ang `react-router` at `useParams` mula sa `02_Dynamic-route-params` para may `/courses/:id` route
3. **I-wrap sa Context** — ilipat ang state sa `CourseProvider` mula sa `05_context-useReducer` para pwedeng ma-access ng nested components
4. **Mag-add ng test** — sumulat ng test para sa `CourseCard` component gamit ang pattern mula sa `10_Vitest`

---

## 💡 Tips para sa Students

**Kung hindi ka sure kung saan magsimula:** Basahin ang section na ito nang sunud-sunod mula `00` hanggang `11`. Bawat demo ay nagtitiwala sa concepts ng nauna.

**Kapag may hindi ka maintindihan sa code:** Hanapin ang linya na may comment na `← CRUCIAL` — iyon ang pinaka-importanteng linya sa file na iyon.

**Para mas maintindihan ang demo:** Buksan ang browser DevTools (F12) habang nagra-run ang demo. Para sa `08_useMemo-Callback`, buksan ang Console tab. Para sa `09_Lazy-load`, buksan ang Network tab.

**Kung hindi mag-run ang app:** Siguraduhing na-run mo ang `npm install` sa loob ng folder bago ang `npm run dev`. Ang `node_modules` ay hindi kasama sa repository.
