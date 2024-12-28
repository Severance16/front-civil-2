import { boolean, number, z } from "zod";

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
  isIngResident: z.boolean().optional()
});

type Project = z.infer<typeof projectsSchema>;
export type DashBoardProject = Pick<
  Project,
  "id" | "name" | "owner" | "address" | "workType"
>;
export type ProjectData = Pick<Project, "id" | "isIngResident" | "address" | "authorizedLevels" | "createdAt" | "endDate" | "ingResidentId" | "license" | "name" | "owner" | "photo" | "startDate" | "totalArea" | "workType">

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

export const itemValorsSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.number(),
  incidence: z.number(),
  valors: z.object({
    total: z.number(),
    incidence: z.number()
  }).optional()
})

export const itemsSchema = z.array(
  itemSchema.pick({
    id: true,
    description: true,
    amount: true,
    incidence: true
  })
)

export const itemsValorsSchema = z.array(
  itemValorsSchema.pick({
    id: true,
    description: true,
    amount: true,
    incidence: true,
    valors: true
  })
)

type Item = z.infer<typeof itemSchema>
type ItemValor = z.infer<typeof itemValorsSchema>

export type ItemData = Pick<Item, "id" | "description" | "amount" | "incidence">
export type ItemDataValor = Pick<ItemValor, "amount" | "description" | "id" | "incidence" | "valors">

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
  unit: z.string(),
  quantity: z.number(),
  purchaseDate: z.string(),
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

export const notesInputSchema = z.array(
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

export const noteInputCreateSchema = z.object({
  input: inputSchema.pick({
    id: true,
    numberArticle: true,
    description: true,
    unit: true,
    quantity: true,
    purchaseDate: true,
    unitValue: true,
    createdAt: true
  }),
  note: noteInputSchema.pick({
    id: true,
    date: true,
    type: true,
    description: true,
    quantity: true,
    createdAt: true,
    inputId: true
  })
})

type NoteInput = z.infer<typeof noteInputSchema>
export type NoteInputData = Pick<NoteInput, "createdAt" | "date" | "description" | "id" | "inputId" | "quantity" | "type">

export const noteToolSchema = noteSchema.pick({
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

export const noteToolCreateSchema = z.object({
  tool: toolSchema.pick({
    condition: true,
    createdAt: true,
    description: true,
    id: true,
    numberArticle: true,
    place: true,
    purchaseDate: true,
    quantity: true,
    serviceTime: true,
    unitValue: true
  }),
  note: noteToolSchema.pick({
    id: true,
    date: true,
    type: true,
    description: true,
    quantity: true,
    createdAt: true,
    toolId: true
  })
})

type NoteTool = z.infer<typeof noteToolSchema>
export type NoteTooltData = Pick<NoteTool, "createdAt" | "date" | "description" | "id" | "toolId" | "quantity" | "type">

export type NoteCreate = {
  date: string,
  description: string,
  quantity: string,
  type: string
}

export const informationSchema = z.object({
  id: z.number().optional(),
  // state: z.string(),
  date: z.string(),
  time: z.string().optional().nullable(),
  precipitation: z.string().optional().nullable(),
  temperature: z.string().optional().nullable(),
  humidity: z.string().optional().nullable(),
  wind: z.string().optional().nullable(),
  createdAt: z.string().optional()
})

export const informationDashboardSchema = z.array(
  informationSchema.pick({
    id: true,
    // state: true,
    date: true,
    time: true,
    precipitation: true,
    temperature: true,
    humidity: true,
    wind: true,
    createdAt: true
  })
)

type Information = z.infer<typeof informationSchema>
export type InformationData = Pick<Information, "createdAt" | "date" | "humidity" | "id" | "precipitation" | "temperature" | "time" | "wind">

export const apiMeterologicalSchema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
    relative_humidity_2m: z.number()
  }),
  daily: z.object({
    precipitation_probability_max: z.array(z.number())
  })
})

export const assistSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  area: z.string().optional(),
  work: z.string().optional(),
  contractor: z.enum(["Interno", "Contratista"])
})

export const assistsSchema = z.array(
  assistSchema.pick({
    id: true,
    name: true,
    area: true,
    work: true,
    contractor: true
  })
)

type Assit = z.infer<typeof assistSchema>
export type AssistData = Pick<Assit, "area" | "contractor" | "id" | "name" | "work">