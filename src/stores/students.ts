import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Users } from '@/types'
import { ElMessage } from 'element-plus'

export const useStudents = defineStore('students', () => {
  const students = ref<Users[]>(fetchStudents())

  function fetchStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]')
  }

  function initializeStudents() {
    students.value = fetchStudents()
  }

  function onAddStudents(studentData: Users) {
    const studentList = fetchStudents()
    studentList.push(studentData)
    localStorage.setItem('students', JSON.stringify(studentList))
    ElMessage.success('Successfully added new User')
  }

  function onUpdateStudentInfo(studentData: Users) {
    try {
      students.value = fetchStudents()
      const updatedStudents = students.value.map((student: Users) =>
        student.id === studentData.id ? { ...studentData } : student,
      )
      localStorage.setItem('students', JSON.stringify(updatedStudents))

      console.log('Updated students:', updatedStudents)

      students.value = updatedStudents

      ElMessage.success('Update successfull')
    } catch (error) {
      ElMessage.error('Update failed')
      console.error(error)
    }
  }

  // delete user from the list
  function onDeleteStudentInfo(id: number) {
    try {
      const currentStudents = fetchStudents()
      const updatedStudents = currentStudents.filter((student: Users) => student.id !== id)
      localStorage.setItem('students', JSON.stringify(updatedStudents))
      // Update the reactive students ref to trigger re-render
      students.value = updatedStudents
      ElMessage.success('Deletion successful')
    } catch (error) {
      ElMessage.error('Deletion failed')
      console.error(error)
    }
  }

  return {
    fetchStudents,
    onUpdateStudentInfo,
    onDeleteStudentInfo,
    students,
    initializeStudents,
    onAddStudents,
  }
})
