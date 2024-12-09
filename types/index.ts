import { boolean, z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  position: z.string(),
  address: z.string(),
  phone: z.string(),
  createdAt: z.string(),
});
type User = z.infer<typeof userSchema>;

export type UserLoginForm = Pick<User, "email" | "password">;
export type UserRegisterForm = Pick<
  User,
  "name" | "lastname" | "email" | "password" | "position" | "address" | "phone"
>;

export const workType = z.enum([
  "Residencial",
  "Institucional",
  "Urbana",
  "Comercial",
  "Industrial",
  "Vial",
  "Hidrahulica",
])

export const projectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  owner: z.string(),
  license: z.string(),
  address: z.string(),
  totalArea: z.string(),
  authorizedLevels: z.number(),
  photo: z.string(),
  workType: workType,
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string(),
  ingResidentId: z.number(),
});

// {"address": "calle 6", "authorizedLevels": 10, "createdAt": "2024-10-25T00:59:25.419Z", "endDate": "2024-10-31T19:59:10.000Z", "id": 1, "ingResidentId": 2, "license": "No tiene", "name": "Edificio", "owner": "Sergio", "photo": "no registra", "startDate": "2024-10-24T19:59:05.000Z", "totalArea": "300m2", "workType": "Residencial"}
type Project = z.infer<typeof projectsSchema>;
export type DashBoardProject = Pick<
  Project,
  "id" | "name" | "owner" | "address" | "workType"
>;
export type ProjectData = Pick<Project, "id" | "address" | "authorizedLevels" | "createdAt" | "endDate" | "ingResidentId" | "license" | "name" | "owner" | "photo" | "startDate" | "totalArea" | "workType">
// export type ProjectCreate = Pick<Project, "address" | "authorizedLevels" | "endDate" | "license" | "name" | "owner" | "photo" | "startDate" | "totalArea" | "workType">

export const dashboardProjectSchema = z.array(
  projectsSchema.pick({
    id: true,
    name: true,
    owner: true,
    address: true,
    workType: true,
  })
);

export const createProjectSchema = projectsSchema.pick({
  id: true,
  name: true,
  owner: true,
  address: true,
  workType: true,
})

export const budgetSchema = z.object({
  id: z.number(),
  prjectId: z.number(),
  type: z.enum(["Inicial", "Final"])
})

export const dashboardBudgetSchema = z.object({
  Inicial: z.object({
    id: z.number().nullable(),
    exist: z.boolean()
  }),
  Final: z.object({
    id: z.number().nullable(),
    exist: z.boolean()
  }),
})

type Budget = z.infer<typeof budgetSchema>;
type BudgetDashBoard = z.infer<typeof dashboardBudgetSchema>;
export type BudgetData = Pick<Budget, "id" | "prjectId" | "type">
export type BudgetDashBoardData = Pick<BudgetDashBoard, "Inicial" | "Final">

export const itemSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.number(),
  incidence: z.number()
})

export const itemsSchema = z.array(
  itemSchema.pick({
    id: true,
    description: true,
    amount: true,
    incidence: true
  })
)

type Item = z.infer<typeof itemSchema>

export type ItemData = Pick<Item, "id" | "description" | "amount" | "incidence">

export const subItemSchema = z.object({
  id: z.number(),
  description: z.string(),
  unit: z.string().nullable(),
  quantity: z.number().nullable(),
  amount: z.number(),
  incidence: z.number()
})

export const subItemsSchema = z.array(
  subItemSchema.pick({
    id: true,
    description: true,
    unit: true,
    quantity: true,
    amount: true,
    incidence: true
  })
)

type SubItem = z.infer<typeof subItemSchema>

export type SubItemData = Pick<SubItem, "id" | "description" | "unit" | "quantity" | "amount" | "incidence">

export const progressSchema = z.object({
  id: z.number(),
  consecutive: z.string(),
  activity: z.string(),
  description: z.string(),
  evidence: z.string(),
  createdAt: z.string()
})

export const progressListSchema = z.array(
  progressSchema.pick({
    id: true,
    consecutive: true,
    activity: true,
    description: true,
    evidence: true,
    createdAt: true
  })
)

type Progress = z.infer<typeof progressSchema>
export type ProgressData = Pick<Progress, "id" | "description" | "consecutive" | "activity" | "evidence" | "createdAt">

export const mishapSchema = z.object({
  id: z.number(),
  consecutive: z.string(),
  activity: z.string(),
  description: z.string(),
  evidence: z.string(),
  createdAt: z.string(),
})

export const mishapsSchema = z.array(
  mishapSchema.pick({
    id: true,
    consecutive: true,
    activity: true,
    description: true,
    evidence: true,
    createdAt: true
  })
)

type Mishap = z.infer<typeof mishapSchema>
export type MishapData = Pick<Mishap, "id" | "description" | "consecutive" | "activity" | "evidence" | "createdAt">

export const reportSchema = z.object({
  id: z.number(),
  consecutive: z.string(),
  activity: z.string(),
  description: z.string(),
  evidence: z.string(),
  createdAt: z.string()
})

type Report = z.infer<typeof reportSchema>
export type ReportData = Pick<Report, "id" | "activity" | "consecutive" | "description" | "evidence" | "createdAt">
export type ReportType = "mishap" | "progress"

export const toolSchema = z.object({
  id: z.number(),
  numberArticle: z.string(),
  description: z.string(),
  quantity: z.number(),
  place: z.string().nullable(),
  condition: z.string(),
  serviceTime: z.number().nullable(),
  purchaseDate: z.string(),
  unitValue: z.number(),
  createdAt: z.string()
})

export const toolsSchema = z.array(
  toolSchema.pick({
    id: true,
    numberArticle: true,
    description: true,
    quantity: true,
    place: true,
    condition: true,
    serviceTime: true,
    purchaseDate: true,
    unitValue: true,
    createdAt: true
  })
)

type Tool = z.infer<typeof toolSchema>
export type ToolData = Pick<Tool, "id" | "numberArticle" | "description" | "unitValue" | "purchaseDate" | "quantity" | "place" | "condition" | "serviceTime" | "createdAt">

export const inputSchema = z.object({
  id: z.number(),
  numberArticle: z.string(),
  description: z.string(),
  unit: z.string().nullable(),
  quantity: z.number(),
  purchaseDate: z.string().nullable(),
  unitValue: z.number(),
  createdAt: z.string()
})

export const inputsSchema = z.array(
  inputSchema.pick({
    id: true,
    numberArticle: true,
    description: true,
    unit: true,
    quantity: true,
    purchaseDate: true,
    unitValue: true,
    createdAt: true
  })
)

type Input = z.infer<typeof inputSchema>
export type InputData = Pick<Input, "id" | "numberArticle" | "description" | "purchaseDate" | "unitValue" | "quantity" | "unit" | "createdAt">

export const inventoryData = z.object({
  id: z.number(),
  projectId: projectsSchema.shape.id,
  inputs: inputsSchema,
  tools: toolsSchema
})

export type InventoryType = "input" | "tool"

export type NoteType = "Ingreso" | "Egreso"

const noteSchema = z.object({
  id: z.number(),
  date: z.string(),
  type: z.enum(["Ingreso", "Egreso"]),
  description: z.string(),
  quantity: z.number(),
  createdAt: z.string()
})

type Note = z.infer<typeof noteSchema>
export type NoteData = Pick<Note, "createdAt" | "date" | "description" | "id" | "quantity" | "type">

const noteInputSchema = noteSchema.pick({
  id: true,
  date: true,
  type: true,
  description: true,
  quantity: true,
  createdAt: true
}).extend({
  inputId: z.number()
})

export const nostesInputSchema = z.array(
  noteInputSchema.pick({
    id: true,
    date: true,
    type: true,
    description: true,
    quantity: true,
    createdAt: true,
    inputId: true
  })
)

type NoteInput = z.infer<typeof noteInputSchema>
export type NoteInputData = Pick<NoteInput, "createdAt" | "date" | "description" | "id" | "inputId" | "quantity" | "type">

const noteToolSchema = noteSchema.pick({
  id: true,
  date: true,
  type: true,
  description: true,
  quantity: true,
  createdAt: true
}).extend({
  toolId: z.number()
})

export const notesToolSchema = z.array(
  noteToolSchema.pick({
    id: true,
    date: true,
    type: true,
    description: true,
    quantity: true,
    createdAt: true,
    toolId: true
  })
)

type NoteTool = z.infer<typeof noteToolSchema>
export type NoteTooltData = Pick<NoteTool, "createdAt" | "date" | "description" | "id" | "toolId" | "quantity" | "type">
