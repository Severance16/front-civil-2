import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  position: z.string(),
  address: z.string(),
  phone: z.string(),
  createdAt: z.date(),
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
