import { IconType } from "react-icons";

export type NavLinkType = {
    icons: IconType,
    name: string,
    route: string
}

export enum EnumTaskComponent {
    AllTask = 'All Task',
    Important = 'Important!',
    Completed = 'Completed',
    DoiItNow = 'Do It Now!',
}

export type SignInUserParams = {
    email: string,
    password: string,
}

export type SignUpUserBody = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    verifiedEmail: boolean,
    username: string,
    avatar: string
}

export type AddTaskParams = {
    title: string,
    description: string,
    deadline: Date,
    important: boolean,
    completed: boolean,
}

export type DataTaskParams = {
    id: string,
    title: string,
    description: string,
    deadline: Date,
    important: boolean,
    completed: boolean,
}