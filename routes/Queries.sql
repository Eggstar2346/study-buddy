--------------TABLE: STUDENT---------------------
-- Query 1: ... create new student
INSERT INTO student (student_id, email, pwd, student_name, mode) VALUES (values from user);
-- Query 2: ...edit mode
UPDATE Student set mode = "new mode" WHERE student_id = student_id;

--------------TABLE: COURSES---------------------
-- Query 1: ... create course
INSERT INTO courses (course_id, student_id, profs, profs_email, tas, ta_emails, descr, course_name, grade, course_type, course_priority, timetable) VALUES (values from user);

--Search for courses associated with a particular student
--let student id = <sid>
--this will return an object and we can just access each of the individual values in javascript
SELECT * FROM courses
WHERE student = <sid>;

--Update course grade from tasks
--let course id = <cid>
UPDATE Courses SET grade =
SELECT sum(grade) / sum(grade_weight) * 100 FROM Tasks
WHERE course_id = <cid> AND grade IS NOT NULL
GROUP BY <cid>;

-- Query 2: ... get grade
SELECT grade FROM courses WHERE course_id = <course_id> AND student_id = <id>;

-- Query 3: ... get priority
SELECT course_priority FROM courses WHERE course_id = <course_id> AND student_id = <id>;

-- Query 4: ... get timetable
SELECT timetable FROM courses WHERE course_id = <course_id> AND student_id = <id>

-- Query 5: ... delete course
--add on delete cascade in table definition
DELETE FROM courses WHERE course_id = <course_id>
DELETE FROM tasks WHERE course_id = <course_id>

--------------TABLE: TASKS---------------------
-- Query 1: ... add new task
INSERT INTO tasks (task_id, course_id, task_type, due_date, completed, grade, grade_weight, score, time_completed) VALUES (values from user input);

-- Query 2: ... find grade of task
SELECT grade FROM TASKS WHERE task_id = <taskId you want>;

-- Query 3: ... find due date and grade weight of task
SELECT due_date, grade_weight FROM TASKS WHERE task_id = <taskId you want>;

-- Query 4: ... insert score of task
UPDATE TASKS SET score = <score> WHERE task_id = <taskId you want>;

-- Query 5: ... set task to complete
UPDATE TASKS SET completed = 'TRUE' WHERE task_id = <taskId you want>;


