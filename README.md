# StudentPlus

StudentPlus is a simple student registration form application designed to store and manage student registration data.

![StudentPlus](./src/assets/demo/image.png)

## Installation and Setup
Follow the steps below to set up the project:

1. Clone Repository
    ```
    git clone https://github.com/FCL00/student-registration.git
    ```

2. Run `npm run install`
    ```
    npm run install
    ```
3. Then run the server
    ```
    npm run dev
    ```
## Features
- Add new student records
- Update existing student details
- Delete students from the record
- View all registered students
- Input validation and error handling
- Authentication / Forgot Password

## Usage
After installing the required packages, you can start the application using the test account provided:
```
Username: admin123@gmail.com  
Password: admin123!
```
## Project Structure
```
student-registration/
│
├── public/                # Static files
├── src/
│   ├── assets/            # Images, fonts, styles
│   ├── components/        # Vue components
│   ├── composable/        # Api
|   ├── constants/         # Constants variables
│   ├── router/            # Vue Router setup
│   ├── store/             # Pinia Store
│   ├── types/             # types
│   ├── utils/             # utility functions
│   ├── views/             # View pages (Home.vue, Students.vue, etc.)
│   └── App.vue            # Main App component
│   └── main.ts            # App entry point
├── package.json
└── README.md     
```


## Demo
![Demo](./src/assets/demo/landpage.png)
### Add student record
![Demo](./src/assets/demo/add-students.png)
### Update student record
![Demo](./src/assets/demo/delete.png)
### View all registered students
![Demo](./src/assets/demo/dashboard.png)
### Input validation and error handling
![Demo](./src/assets/demo/validation.png)
### Authentication / Forgot Password
![Demo](./src/assets/demo/login.png)
