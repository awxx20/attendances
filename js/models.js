//State Pattern (Behavioral)
class AttendanceState {
    getStatus() {
        throw new Error("Abstract method 'getStatus' must be implemented.");
    }
}

class PresentState extends AttendanceState {
    getStatus() {
        return "Present";
    }
}

class AbsentState extends AttendanceState {
    getStatus() {
        return "Absent";
    }
}

//Domain Models
class Student {
    constructor(studentId, name, email) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
    }
}

class Course {
    constructor(courseId, courseName, credits) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.credits = credits;
    }
}

//Updated Attendance Class
class Attendance {
    constructor(attendanceId, student, course, attendDate, state) {
        this.attendanceId = attendanceId;
        this.student = student;
        this.course = course;
        this.attendDate = attendDate;
        this.state = state; // Holds an AttendanceState instance
    }

    changeState(newState) {
        this.state = newState;
    }

    getStatus() {
        return this.state.getStatus();
    }
}