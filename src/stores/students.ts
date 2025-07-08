import { defineStore } from 'pinia'
import type { Users } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { v4 as uuidv4 } from "uuid"


export const useStudents = defineStore('students', {
  // Defines the default state for the store.
  state: () => ({
    students: JSON.parse(localStorage.getItem('students') || '[]') as Users[],
    filterCourse: '',
    filterName: '',
  }),

  getters: {
    allStudents: (state): Users[] => {
    return state.students.filter((student) => {
      const matchCourse = state.filterCourse
        ? student.course?.toLowerCase() === state.filterCourse.toLowerCase()
        : true

      const first = student.firstname?.toLowerCase()
      const middle = student.middlename?.toLowerCase() || ''
      const last = student.lastname?.toLowerCase()

      const full1 = `${first} ${last}`.trim()
      const full2 = `${first} ${middle} ${last}`.trim()
      const filter = state.filterName.toLowerCase().trim()

      const matchName = filter
        ? full1.includes(filter) || full2.includes(filter)
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
    getLocalStorage(){
      return JSON.parse(localStorage.getItem('students') || '[]') as Users[]
    },
    setFilterCourse(course: string) {
      this.filterCourse = course
    },

    setFilterName(name: string) {
      this.filterName = name
    },
    async onAddStudents(studentData: Users) {
      const newStudent = {
        ...studentData,
        id: uuidv4(),
      };

      if (this.isDuplicateStudent(newStudent)) {
        try {
          await ElMessageBox.confirm(
            `${studentData.firstname } ${studentData.lastname} student record already exists. \nDo you want to continue adding?`,
            'Warning',
            {
              confirmButtonText: 'Yes',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
          );

          this.students.push(newStudent);
          this.SaveLocalStorage();
          ElMessage.success('Duplicate student added by user confirmation');
        } catch {
          ElMessage.info('Operation canceled');
        }
      } else {
        this.students.push(newStudent);
        this.SaveLocalStorage();
        ElMessage.success('Successfully added new student record');
      }
    },

    isDuplicateStudent(newStudent: Users): boolean {
      return this.students.some(student => this.onExistingData(student, newStudent));
    },

    onExistingData(oldStudentData: Users, newStudentData: Users) {
      return (
        oldStudentData.firstname === newStudentData.firstname &&
        oldStudentData?.middlename === newStudentData?.middlename &&
        oldStudentData.lastname === newStudentData.lastname 
        // oldStudentData.age === newStudentData.age &&
        // oldStudentData.birthdate === newStudentData.birthdate &&
        // oldStudentData.address === newStudentData.address &&
        // oldStudentData.course === newStudentData.course
      );
    },
    async onUpdateStudentInfo(studentData: Users) {
      
      const index = this.students.findIndex(student => student.id === studentData.id)

      const originalStudent = this.students[index];

      // If nothing changed, show a message and exit
      const isUnchanged = this.onExistingData(originalStudent, studentData);
      if (isUnchanged) {
        ElMessage.info('No changes were made');
        return;
      }

      // check data duplication
      if(this.isDuplicateStudent(studentData)){
        await ElMessageBox.confirm( 
            'Student information already exists. Do you wish to continue?',
            'Warning', 
            {
              confirmButtonText: 'Yes',
              cancelButtonText: 'Cancel',
              type: 'warning',
            })
      }

      // check if the user try to create/update existing data
       if(index != -1){
          this.students[index] = studentData;
          ElMessage.success('Update successful')
          } else {
          ElMessage.error('Update failed')
        }
      this.SaveLocalStorage();
    },

    onDeleteStudentInfo(id: string) {
      try {
        console.log('argument id: ' + id)
        
        this.students = this.students.filter((student: Users) => student.id !== id)
        this.SaveLocalStorage()
        ElMessage.success('Deletion successful')
      } catch (error) {
        ElMessage.error('Deletion failed')
        console.error(error)
      }
    },
    SaveLocalStorage(){
      localStorage.setItem('students',JSON.stringify(this.students))
    }
  },
})
