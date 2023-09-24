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
import { FakeParagraphs } from "@/components/helpers/FakeParagraphs";
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

function caseInsensitiveIncludes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}

export default function ItemList({ filter }: { filter: string }) {
  const categories: any[] | undefined = useQuery(api.data.allControlCategories);
  console.log(categories);
  return (
    <ScrollArea className="rounded-md border p-4">
      <div>
        {categories
          ?.filter(
            (item) =>
              filter === "" ||
              caseInsensitiveIncludes(item.title, filter) ||
              item.objectives?.some(
                (objective: any) =>
                  caseInsensitiveIncludes(objective.title, filter) ||
                  objective.controlReferences?.some((controlReference: any) =>
                    caseInsensitiveIncludes(controlReference.name, filter)
                  )
              )
          )
          .map((item) => {
            return (
              <div key={item!.id}>
                <div className="mt-2 font-medium">Category: {item!.title}</div>
                <div>
                  {item
                    .objectives!.filter(
                      (objective: any) =>
                        filter === "" ||
                        caseInsensitiveIncludes(objective.title, filter) ||
                        objective.controlReferences?.some(
                          (controlReference: any) =>
                            caseInsensitiveIncludes(
                              controlReference.name,
                              filter
                            )
                        )
                    )
                    .map((objective) => {
                      return (
                        <div key={objective!.id}>
                          <div className="pl-4 mt-2 font-medium">
                            Objective: {objective!.title}
                          </div>
                          <div>
                            {objective!
                              .controlReferences!.filter(
                                (controlReference: any) =>
                                  filter === "" ||
                                  caseInsensitiveIncludes(
                                    controlReference.name,
                                    filter
                                  )
                              )
                              .map((controlReference) => {
                                return (
                                  <div key={controlReference.id}>
                                    <div className="pl-8 mt-2 font-medium">
                                      Control: {controlReference!.name}
                                    </div>
                                    <div className="pl-12">
                                      <p>
                                        {
                                          controlReference.levels[0]
                                            .implementationExample
                                        }
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
}

// export default ItemList
