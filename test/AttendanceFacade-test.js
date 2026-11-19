// Import your class (adjust the file path as needed)
const AttendanceFacade = require('./AttendanceFacade');

describe('AttendanceFacade', () => {
    let facade;
    const mockStudent = { id: 1, name: 'Jane Doe' };
    const mockCourse = { id: 101, title: 'Intro to JS' };
    const mockDate = '2026-11-19';

    // Runs before each test to give us a fresh, clean instance
    beforeEach(() => {
        facade = new AttendanceFacade();

        // Mock the internal creators so we only test the Facade's logic
        facade.presentCreator = {
            createAttendance: jest.fn().mockReturnValue({ getStatus: () => 'Present' })
        };
        facade.absentCreator = {
            createAttendance: jest.fn().mockReturnValue({ getStatus: () => 'Absent' })
        };

        // Silence console logs/errors during tests to keep terminal output clean
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    // Clean up mocks after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('records "Present" attendance successfully', () => {
        const result = facade.record_attendance(1, mockStudent, mockCourse, mockDate, 'Present');

        expect(result).toBe(true);
        expect(facade.presentCreator.createAttendance).toHaveBeenCalledTimes(1);
        expect(facade.getRecords().length).toBe(1);
    });

    test('records "Absent" attendance successfully', () => {
        const result = facade.record_attendance(2, mockStudent, mockCourse, mockDate, 'Absent');

        expect(result).toBe(true);
        expect(facade.absentCreator.createAttendance).toHaveBeenCalledTimes(1);
        expect(facade.getRecords().length).toBe(1);
    });

    test('returns false when required fields are missing', () => {
        const result = facade.record_attendance(3, null, mockCourse, mockDate, 'Present');

        expect(result).toBe(false);
        expect(facade.getRecords().length).toBe(0);
    });

    test('returns false when given an invalid status type', () => {
        const result = facade.record_attendance(4, mockStudent, mockCourse, mockDate, 'Late');

        expect(result).toBe(false);
        expect(facade.getRecords().length).toBe(0);
    });
});
