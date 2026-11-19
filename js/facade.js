//Facade Pattern (Structural)
class AttendanceFacade {
    constructor() {
        this.records = [];
        this.presentCreator = new PresentAttendanceCreator();
        this.absentCreator = new AbsentAttendanceCreator();
    }

    //Single unified method for the UI to call
    record_attendance(attendanceId, student, course, attendDate, statusType) {
        //Check input validation
        if (!student || !course || !statusType) {
            console.error("Validation Error: Missing student, course, or status details.");
            return false;
        }

        let attendanceObject;

        //Use the correct factory creator based on input status
        if (statusType === "Present") {
            attendanceObject = this.presentCreator.createAttendance(attendanceId, student, course, attendDate);
        } else if (statusType === "Absent") {
            attendanceObject = this.absentCreator.createAttendance(attendanceId, student, course, attendDate);
        } else {
            console.error("Invalid status type specified.");
            return false;
        }

        //Save the attendance record
        this.records.push(attendanceObject);
        console.log(`Successfully recorded attendance for ${student.name} as ${attendanceObject.getStatus()}`);
        return true;
    }

    getRecords() {
        return this.records;
    }
}