# Copilot Instructions for the Project

These instructions define how GitHub Copilot should generate code for this Nuxt project.

## 1. Principles

- Act as a senior software engineer adhering to clean code architecture and modern Vue 3 best practices.
- Keep generated code minimal, readable, type-safe, and performant.
- Prefer using the Composition API over the Options API for better type inference and code organization.
- Always prefer type-safe solutions and avoid using `any` unless absolutely necessary.
- Match existing formatting style in this repo:
	- no semicolons
	- trailing commas
	- concise section comments only when they improve readability

## 2. Vue 3 & Composition API Guidelines

### Single-File Components (SFC)
- Always use Single-File Components with `<script setup lang="ts">` unless a file already uses a different style.
- Use `.vapor.vue` for all Vue Single-File Components in this project.
- Use `.vue` for all other Vue Single-File Components in this project.
- Block order inside `.vue` and `.vapor.vue` files MUST follow:
  1. `<script setup lang="ts">`
  2. `<template>`
  3. `<style>` (Only if Tailwind utilities are insufficient; prefer scoped)

## 3. Code Formatting & Style Guidelines

All generated code MUST strictly conform to the project's formatting configuration (`.prettierrc` / `.eslintrc`) and follow the established style guidelines.

### Import and Section Ordering for Vue Page Files

When generating Vue page files, keep this structure if necessary.

1. Third-party imports
2. Shared UI component imports from `~/components/shared/**`
3. Interfaces
4. Nuxt composables
5. Stores
6. Project composables
7. Props / Emits
8. Models
9. Constants Data
10. Helpers / Utility Functions
11. Template Ref /Refs
12. Handlers
13. Computed properties
14. Watchers
15. Lifecycle hooks

Use lightweight section headers in script blocks (for example: Components, Stores, Composables, Ref Properties, API, Computed Properties).

Example:
```ts
<script setup lang="ts">
import { ref, computed } from 'vue'
/** Components */
import SharedComponent from '~/components/shared/SharedComponent.vue'

/** Interfaces */
interface ExampleInterface {
  id: number
  name: string
}
type ExampleType = 'example'

/** Nuxt Composables */
const route = useRoute()
const router = useRouter()

/** Stores */
const exampleStore = useExampleStore()

/** Composables */
const example = useExample()

/** Props */
interface Props {
  example: string
  showExample: boolean
  exampleFn?: () => void
}
const props = withDefaults(defineProps<Props>(), {
  example: '',
  showExample: false,
})

/** Emits */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/** Models */
const model = defineModel<T>({
  default: () => [],
})

/** Data */
const TEST_EXAMPLE = 'test_example'

/** Helpers / Utility Functions */
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

/** Template Ref Properties */
const templateRefExample = useTemplateRef<HTMLElement | null>('example')

/** Ref Properties */
const refExample = ref<T | null>(null)

/**
 * { Docs for handleExample function }
 */
const handleExample = () => {
  // Handle the example action here
}

/**
 * { Docs for updateExample function }
 */
const updateExample = () => {
  // Update the example action here
}

/** Computed Properties */
const computedExample = computed(() => { return ...})

/** Watchers */
watch(refExample, (newValue, oldValue) => {
  // Do something
});

/** onMounted Hook */
onMounted(() => {
  // Perform any necessary setup when the component is mounted
})
</script>

<template>
  ...
</template>
```

### Reactive State and Naming Conventions

- Prefix template refs with `templateRef` (example: `const templateRefForm = useTemplateRef<HTMLElement | null>('form')`).
- Prefix reactive refs with `ref` (example: `const refData = ref<T | null>(null)`, `const refIsOpen = ref<boolean>(false)`).
- Prefix computed properties with `computed` (example: `const computedFullName = computed(() => ...)`, `const computedTotalPrice = computed(() => { return ... })`).
- Prefix event and action handlers with `handle` (example: `handleSubmit`, `handleDelete`).
- Use `init...` naming for initialization/reset helpers.

### CSS

- use Tailwind CSS for styling components and pages.
- Follow the theme and utility classes provided by Tailwind CSS for consistent styling.
- Use responsive utility classes to ensure components and pages are mobile-friendly.

### Function Naming Conventions

When generating function names, follow the conventions outlined below to maintain consistency and readability within the codebase.

- Use action name as the base for function names (example: `handleExample` for handling an example action, `updateExample` for updating an example action). Examples include:
  - Use `handle...` for event and action handlers (example: `handleSubmit`, `handleDelete`).
  - Use `init...` for initialization/reset helpers (example: `initForm`).
  - Use `update...` for update actions (example: `updateExample`).
  - Use `fetch...` for data fetching actions (example: `fetchUserData`).
  - Use `delete...` for data deletion actions (example: `deleteUserData`).