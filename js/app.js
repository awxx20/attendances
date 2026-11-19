//Initialize Facade and test data
const facade = new AttendanceFacade();

const student1 = new Student(1, "Alice Smith", "alice@mtu.ie");
const student2 = new Student(2, "Bob Jones", "bob@mtu.ie");
const course1 = new Course(101, "Software Engineering", 5);

document.addEventListener("DOMContentLoaded", () => {
    //Render an empty table initially
    renderTable();

    //Handle form submission to record attendance 
    const form = document.getElementById("attendance-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedStudentId = document.getElementById("student-select").value;
        const status = document.getElementById("status-select").value;
        const today = new Date().toISOString().split('T')[0];
        
        const targetStudent = selectedStudentId === "1" ? student1 : student2;

        //Call the Facade method
        const success = facade.record_attendance(Date.now(), targetStudent, course1, today, status);

        if (success) {
            renderTable();
        }
    });
});

function renderTable() {
    const tableBody = document.getElementById("attendance-table-body");
    tableBody.innerHTML = "";

    const records = facade.getRecords();

    //Show a placeholder message if no records exist yet
    if (records.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #777;">No attendance records found. Use the form above to add one.</td></tr>`;
        return;
    }

    records.forEach(record => {
        const row = document.createElement("tr");
        const statusText = record.getStatus();
        const badgeClass = statusText === "Present" ? "status-present" : "status-absent";

        row.innerHTML = `
            <td>${record.student.name}</td>
            <td>${record.course.courseName}</td>
            <td>${record.attendDate}</td>
            <td><span class="status-badge ${badgeClass}">${statusText}</span></td>
        `;
        tableBody.appendChild(row);
    });
}