import { defineStore } from 'pinia'
import type { Users } from '@/types'
import { ElMessage } from 'element-plus'
import { dateFormatter } from '@/utils/dateFormatter' // assuming you import this

export const useStudents = defineStore('students', {
  state: () => ({
    students: JSON.parse(localStorage.getItem('students') || '[]') as Users[],
    filterCourse: '',
    filterName: '',
  }),

  getters: {
    allStudents: (state): Users[] => {
      // Filter by course & name (case insensitive)
      return state.students.filter((student) => {
        const matchCourse = state.filterCourse
          ? student.course.toLowerCase() === state.filterCourse.toLowerCase()
          : true

        const fullName =
          `${student.firstname} ${student.middlename} ${student.lastname}`.toLowerCase()
        const matchName = state.filterName
          ? fullName.includes(state.filterName.toLowerCase())
          : true

        return matchCourse && matchName
      })
    },

    getStudentById: (state) => {
      return (id: string) => state.students.find((student) => student.id === id)
    },

    getStudentByCourse: (state) => {
      return (course: string) => state.students.find((student) => student.course === course)
    },
  },

  actions: {
    setFilterCourse(course: string) {
      this.filterCourse = course
    },

    setFilterName(name: string) {
      this.filterName = name
    },

    fetchStudents() {
      return JSON.parse(localStorage.getItem('students') || '[]')
    },

    onAddStudents(studentData: Users) {
      const studentList = this.fetchStudents()
      studentData.birthdate = dateFormatter(studentData.birthdate.toString())
      studentList.push(studentData)
      localStorage.setItem('students', JSON.stringify(studentList))
      this.students = studentList
      ElMessage.success('Successfully added new User')
    },

    onUpdateStudentInfo(studentData: Users) {
      studentData.birthdate = dateFormatter(studentData.birthdate.toString())

      try {
        const updatedStudents = this.students.map((student: Users) =>
          student.id === studentData.id ? { ...studentData } : student,
        )
        localStorage.setItem('students', JSON.stringify(updatedStudents))
        this.students = updatedStudents
        ElMessage.success('Update successful')
      } catch (error) {
        ElMessage.error('Update failed')
        console.error(error)
      }
    },

    onDeleteStudentInfo(id: string) {
      try {
        console.log('argument id: ' + id)
        const currentStudents = this.fetchStudents()
        const updatedStudents = currentStudents.filter((student: Users) => student.id !== id)

        localStorage.setItem('students', JSON.stringify(updatedStudents))
        this.students = updatedStudents
        ElMessage.success('Deletion successful')
      } catch (error) {
        ElMessage.error('Deletion failed')
        console.error(error)
      }
    },
  },
})

// export const useStudents = defineStore('students', () => {
//   const students = ref<Users[]>(fetchStudents())

//   // fetch students
//   function fetchStudents() {
//     return JSON.parse(localStorage.getItem('students') || '[]')
//   }

//   // add new student to the localstorage
//   function onAddStudents(studentData: Users) {
//     const studentList = fetchStudents()
//     studentData.birthdate = dateFormatter(studentData.birthdate.toString())
//     studentList.push(studentData)
//     localStorage.setItem('students', JSON.stringify(studentList))
//     ElMessage.success('Successfully added new User')
//   }

//   // update data on existing list
//   function onUpdateStudentInfo(studentData: Users) {
//     try {
//       const updatedStudents = students.value.map((student: Users) =>
//         student.id === studentData.id ? { ...studentData } : student,
//       )
//       localStorage.setItem('students', JSON.stringify(updatedStudents))
//       students.value = updatedStudents
//       ElMessage.success('Update successfull')
//     } catch (error) {
//       ElMessage.error('Update failed')
//       console.error(error)
//     }
//   }

//   // delete user from the list
//   function onDeleteStudentInfo(id: string) {
//     try {
//       console.log('argument id: ' + id)
//       const currentStudents = fetchStudents()
//       const updatedStudents = currentStudents.filter((student: Users) => student.id !== id)

//       localStorage.setItem('students', JSON.stringify(updatedStudents))
//       // Update the reactive students ref to trigger re-render
//       students.value = updatedStudents
//       ElMessage.success('Deletion successful')
//     } catch (error) {
//       ElMessage.error('Deletion failed')
//       console.error(error)
//     }
//   }

//   return {
//     fetchStudents,
//     onUpdateStudentInfo,
//     onDeleteStudentInfo,
//     students,
//     onAddStudents,
//   }
// })
