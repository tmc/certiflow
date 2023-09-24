import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import { ControlCategory } from '../../../src/gql/graphql.ts'

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
  const categories: any[] | undefined = useQuery(api.data.allControlCategories);
  console.log(categories);
  return (
    <ScrollArea className="h-[100%] rounded-md border p-4">
      <Accordion type="multiple">
        {categories?.map((item) => {
          return (
            <AccordionItem key={item!.id} value={item!.id}>
              <AccordionTrigger>Category: {item!.title}</AccordionTrigger>
              <AccordionContent>
                {item.objectives!.map((objective) => {
                  return (
                    <AccordionItem key={objective!.id} value={objective!.id}>
                      <AccordionTrigger className="pl-4">
                        Objective: {objective!.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        {objective!.controlReferences!.map(
                          (controlReference) => {
                            return (
                              <AccordionItem
                                key={controlReference.id}
                                value={controlReference!.id}
                              >
                                <AccordionTrigger className="pl-8">
                                  Control: {controlReference!.name}
                                </AccordionTrigger>
                                <AccordionContent className="pl-8">
                                  <p>Content</p>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          }
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ScrollArea>
  );
}

// export default ItemList
