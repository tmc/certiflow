import { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { ControlCategory } from '../../../src/gql/graphql.ts'
import { graphql } from "../../../src/gql";


// Sample Query-- the codegen does not create code that compiles if there are
// no queries registered via the 'graphql' function
const allControlCategoriesDocument = graphql(`
  query allControlCategories {
    allControlCategories {
      id
    }
  }
`);

// const mockHierarchy: ControlCategory[] = [{
//     id: '1',
//     title: 'Control Category 1',
//     objectives: [{
//         id: '1.1',
//         title: 'Control Objective 1.1',
//         controlReferences: [{
//             id: '1.1.1',
//             name: 'Control Reference 1.1.1',
//             specification: 'Control Specification 1.1.1',
//         },
//         {
//             id: '1.1.2',
//             name: 'Control Reference 1.1.2',
//             specification: 'Control Specification 1.1.2',
//         }]
//     }]
// },
// {
//     id: '1',
//     title: 'Control Category 2',
//     objectives: [{
//         id: '2.1',
//         title: 'Control Objective 2.1',
//         controlReferences: [{
//             id: '2.1.1',
//             name: 'Control Reference 2.1.1',
//             specification: 'Control Specification 2.1.1',
//         }]
//     },
//     {
//         id: '2.2',
//         title: 'Control Objective 2.2',
//         controlReferences: [{
//             id: '2.2.1',
//             name: 'Control Reference 2.2.1',
//             specification: 'Control Specification 2.2.1',
//         }]
//     }]
// }]

export default function ItemList() {
    const { data } = useQuery(allControlCategoriesDocument);
    console.log(data)
    return (
        <ScrollArea className="h-[100%] w-[350px] rounded-md border p-4">
            {/* <Accordion type="multiple">
                {data!.map((item) => {
                    return (
                        <AccordionItem value={item!.id}>
                            <AccordionTrigger>{item!.title}</AccordionTrigger>
                            <AccordionContent>
                                {item.objectives!.map((objective) => {
                                    return (
                                        <AccordionItem value={objective!.id}>
                                            <AccordionTrigger>{objective!.title}</AccordionTrigger>
                                            <AccordionContent>
                                                {objective!.controlReferences!.map((controlReference) => {
                                                    return (
                                                        <AccordionItem value={controlReference!.id}>
                                                            <AccordionTrigger>{controlReference!.name}</AccordionTrigger>
                                                            <AccordionContent>
                                                                <p>Content</p>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    )
                                                })}
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })} */}
            {/* </Accordion> */}
        </ScrollArea >
    )
}

// export default ItemList