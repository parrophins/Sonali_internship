// const Attendance = require('../models/attendanceSchema.js');

// // Mark attendance
// exports.markAttendance = async (req, res) => {
//     try {
//         const { subject, classId, attendanceData } = req.body;

//         const records = attendanceData.map(student => ({
//             studentId: student.studentId,
//             classId,
//             subject,
//             date: new Date(),
//             present: student.present,
//         }));

//         await Attendance.insertMany(records);
//         res.status(201).json({ message: 'Attendance marked successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to mark attendance', details: error.message });
//     }
// };

// // Get attendance
// exports.getAttendance = async (req, res) => {
//     try {
//         const { classId, subject, date } = req.query;

//         const query = {};
//         if (classId) query.classId = classId;
//         if (subject) query.subject = subject;
//         if (date) query.date = new Date(date);

//         const attendanceRecords = await Attendance.find(query);
//         res.json(attendanceRecords);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve attendance', details: error.message });
//     }
// };
