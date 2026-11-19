//Factory Method Pattern (Creational)
class AttendanceCreator {
    createAttendance(attendanceId, student, course, attendDate) {
        throw new Error("Abstract method must be implemented");
    }
}

class PresentAttendanceCreator extends AttendanceCreator {
    createAttendance(attendanceId, student, course, attendDate) {
        return new Attendance(attendanceId, student, course, attendDate, new PresentState());
    }
}

class AbsentAttendanceCreator extends AttendanceCreator {
    createAttendance(attendanceId, student, course, attendDate) {
        return new Attendance(attendanceId, student, course, attendDate, new AbsentState());
    }
}