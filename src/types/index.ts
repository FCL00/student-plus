interface Credentials {
  username: string
  password: string
  newpassword?: string
}

interface LoginRuleForm {
  username: string
  password: string
  newpassword?: string
}

interface Users {
  id?: number | string
  firstname: string
  middlename: string
  lastname: string
  birthdate: string
  age: number
  address: string
  course: string
}

interface UsersRuleForm {
  firstname: string
  middlename: string
  lastname: string
  birthdate: string
  age: number
  address: string
  course: string
}

export type { Credentials, LoginRuleForm, Users, UsersRuleForm }
