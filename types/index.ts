export interface IUser {
    username: string
    first_name: string
    last_name: string
    org: string
    department: string
    position: string
    role: "admin" | "head"
    token: string
}

export interface IResponse {
    status: "success" | "error"
    code: string
    data: string
}

export interface IBranch {
    id: string
    name: string
}

export interface IDepartment {
    id: string
    name: string
    employees: number
}

export interface IWorkingTime {
    id: string
    name: string
    start: string
    end: string
}

export interface IEmployee {
    id: string
    uuid: string
    username: string
    first_name: string
    last_name: string
    middle_name: string
    branch: IBranch
    department: IDepartment
    position: string
    gender: string
    working_time: IWorkingTime
    birth_date: string
    image: string
    country: string
    city: string
    town: string
    address: string
    phone: string 
}

export interface IReports {
    username: string
    first_name: string
    last_name: string
    branch: IBranch
    department: IDepartment
    input_status: "created" | "arrived" | "didnotcome" | "late" | "failed" | "crash"
    input_area: string | null
    input_time: string | null
    output_status: "created" | "gone" | "crash" | "failed"
    output_area: string | null
    output_time: string | null
}

export interface IReport {
    [date: string]: {
        first_name: string
        last_name: string
        input_status: "created" | "arrived" | "didnotcome" | "late" | "failed" | "crash" | "rest"
        input_time: string | null
    }[]
}

export interface IQuestion {
    id: string
    question: string
    answer_a: string
    answer_b: string
    answer_c: string
    answer_d: string
    correct_answer: string
    score: number
}

export interface ISet {
    id: string
    name: string
}

export interface ITest {
    id: string
    name: string
    set: ISet
    user: IEmployee
    questions_count: number
    passing_score: number
    start: string
    end: string
    duration: number
    status: "not_started" | "started" | "ended" | "failed" | "passed"
}
