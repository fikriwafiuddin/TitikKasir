## Next.js 16 Frontend Development Guidelines

### Tech Stack

- Framework: Next.js 16 with App Router
- Form Management: react-hook-form, @hookform/resolvers, zod
- Data Fetching: @tanstack/react-query, axios
- State Management: zustand
- UI Components: shadcn/ui
- Tables: @tanstack/react-table

### Project Structure

src/
├── app/ # Next.js App Router entry point
│ ├── auth/ # Authentication pages (public)
│ ├── (protected)/ # Protected routes (requires authentication)
│ └── page.tsx # landing page
├── components/ # Reusable components
│ ├── ui/ # shadcn/ui components
│ ├── layout/ # Layout components (Header, Footer, etc.)
│ └── [feature]/ # Feature-specific components (e.g., product/)
├── services/ # Data fetching layer
│ ├── api/ # Axios API functions
│ └── hooks/ # TanStack Query hooks
├── hooks/ # General-purpose custom hooks
├── validations/ # Zod validation schemas
├── store/ # Zustand store hooks
├── types/ # TypeScript type definitions
│ ├── index.ts # General types
│ └── form.ts # Form value types
└── lib/ # Utility functions and configurations

### Folder Guidelines

1.  /components
    Reusable UI components organized by purpose.
    Structure:
    - /ui: shadcn/ui components only
    - /layout: Layout components (Header, Sidebar, Footer, etc.)
    - /[feature]: Feature-specific components (e.g., /product for ProductCard, ProductForm, etc.)

    Example:
    components/
    ├── ui/
    │ ├── button.tsx
    │ └── input.tsx
    ├── layout/
    │ ├── header.tsx
    │ └── footer.tsx
    └── product/
    │ ├── product-card.tsx
    │ └── product-form.tsx

2.  /services
    Data fetching layer organized by feature.
    Structure:
    1. /api: Axios API functions organized by feature (e.g., /api/product.ts)

    File Naming: [feature]Api.ts (e.g., productApi.ts)
    Function Naming for CRUD:
    - create - Create new resource
    - getAll - Fetch all resources
    - update - Update existing resource
    - remove - Delete resource

    example:

    ```ts
    // services/api/productApi.ts

    import { axiosInstance } from "@/lib/axios"
    import { Product } from "@/types"

    const create = async (data: Partial<Product>) => {
      const response = await axiosInstance.post("products", data)
      return response.data
    }

    const getAll = async () => {
      const response = await axiosInstance.get("/products")
      return response.data
    }

    const update = async (id: string, data: Partial<Product>) => {
      const response = await axiosInstance.put(`/products/${id}`, data)
      return response.data
    }

    const remove = async (id: string) => {
      const response = await axiosInstance.delete(`/products/${id}`)
      return response.data
    }

    const productApi = {
      create,
      getAll,
      update,
      remove,
    }
    export default productApi
    ```

    Rules:
    - Always use the axios instance from /lib/axios.ts
    - Object name must match the file name (e.g., productApi for productApi.ts)
    - Export the object as default
    2. /hooks: TanStack Query hooks organized by feature (e.g., /hooks/useProducts.ts)

    example:

    ```ts
    // services/hooks/productHook.ts
    import {
      useMutation,
      useQuery,
      useQueryClient,
    } from "@tanstack/react-query"
    import productApi from "@/services/api/productApi"
    import { Product } from "@/types"

    export const queryKeyProducts = (filters: object = {}) => {
      return ["products", filters]
    }

    export const useGetProducts = () => {
      return useQuery({
        queryKey: queryKeyProducts(),
        queryFn: productApi.getAll,
      })
    }

    export const useCreateProduct = () => {
      const queryClient = useQueryClient()

      return useMutation({
        mutationFn: productApi.create,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeyProducts() })
        },
      })
    }

    export const useUpdateProduct = () => {
      const queryClient = useQueryClient()

      return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
          productApi.update(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeyProducts() })
        },
      })
    }

    export const useRemoveProduct = () => {
      const queryClient = useQueryClient()

      return useMutation({
        mutationFn: productApi.remove,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeyProducts() })
        },
      })
    }
    ```

    Rules:
    - Always use the axios instance from /lib/axios.ts
    - Object name must match the file name (e.g., productApi for productApi.ts)
    - Export the object as default
    - Export the query key function

3.  /hooks
    General-purpose custom hooks.

    Example:
    hooks/
    ├── useDebounce.ts
    └── useLocalStorage.ts

4.  /validations
    Zod validation schemas organized by feature.

    Example:
    validations/
    ├── productValidation.ts
    └── authValidation.ts

    Example:

    ```ts
    import { z } from "zod"

    const add = z.object({})

    const productValidation = {
      add,
    }

    export default productValidation
    ```

    Rules:
    - Always use zod for validation

5.  /store
    Zustand store hooks organized by feature.

    Example:
    store/
    ├── useCartStore.ts
    └── etc...

6.  /types
    TypeScript type definitions organized by feature.

    Example:
    types/
    ├── index.ts
    └── form.ts

7.  /app

Next.js App Router entry point.

#### Structure:

- **`/auth`**: Public authentication pages (login, register, etc.)
- **`/(protected)`**: Protected routes (requires authentication)
- **`/_components`**: Page-specific components (when `page.tsx` becomes too long)

#### Example:

```
app/
├── auth/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (protected)/
│   └── products/
│   │   ├── _components/
│   │   │   └── ProductTable.tsx
│   │   └── page.tsx
└── page.tsx
```

### Naming Convention

Files containing components must be named using Pascal case. If they are not components, they must be named using camel case.

### Notes

- Do not use any type
