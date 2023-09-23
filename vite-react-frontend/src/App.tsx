import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from '@apollo/client'

import { ScrollArea } from "@/components/ui/scroll-area"
import ItemList from "./components/csf-item-list/item-list"


import { graphql } from "../src/gql";
import './App.css'

// // Sample Query-- the codegen does not create code that compiles if there are
// // no queries registered via the 'graphql' function
// const getControlCategory = graphql(`
//   query getControlCategory($id: ID!) {
//     getControlCategory(id: $id) {
//       id
//     }
//   }
// `);

// // Sample Query-- the codegen does not create code that compiles if there are
// // no queries registered via the 'graphql' function
// const allControlCategoriesDocument = graphql(`
//   query allControlCategories {
//     allControlCategories {
//       id
//     }
//   }
// `);

function App() {
  // const { data } = useQuery(getControlCategory, {
  //   variables: { id: '1' }
  // })
  const [count, setCount] = useState(0)

  return (
    <>
      <ItemList />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
