DROP SCHEMA IF EXISTS StudyBuddy CASCADE;
CREATE SCHEMA StudyBuddy;
SET SEARCH_PATH TO StudyBuddy;

CREATE TABLE IF NOT EXISTS Student (
    student_id char(10) PRIMARY KEY,
    email TEXT NOT NULL,
    pwd TEXT NOT NULL,
    student_name TEXT NOT NULL,
    mode TEXT
);

CREATE TABLE IF NOT EXISTS Course (
    course_id INT PRIMARY KEY,
    student_id char(10) REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    profs TEXT,
    profs_email TEXT,
    tas TEXT,
    ta_emails TEXT,
    descr TEXT,
    course_name TEXT NOT NULL,
    grade FLOAT,
    course_type BOOLEAN,
    course_priority INT,
	timetable TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Tasks (
    task_id INT PRIMARY KEY,
    task_name TEXT,
    course_id INT REFERENCES Course(course_id),
    task_type TEXT,
    due_date TEXT,
    completed BOOLEAN,
    grade FLOAT,
    grade_weight FLOAT,
    score FLOAT,
    time_completed FLOAT,
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);