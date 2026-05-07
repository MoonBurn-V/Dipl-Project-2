const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('Users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.ENUM('Пользователь', 'Преподаватель', 'Администратор'), defaultValue: "Пользователь"},
    avatar: {type: DataTypes.STRING},
    refreshToken: {type: DataTypes.STRING, allowNull: true}
})

const Courses = sequelize.define('Courses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2)},
    difficulty: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    mini_description: {type: DataTypes.STRING, allowNull: false},
    number_lessons: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING},
    rating: {type: DataTypes.DECIMAL(3, 2), defaultValue: 0, validate: {min: 0, max: 5}},
    status: {type: DataTypes.ENUM('В разработке', 'Готов', 'Не актуален'), defaultValue: 'В разработке'},
    created_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
})

const Lessons = sequelize.define('Lessons', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT},
    video: {type: DataTypes.STRING},
    test: {type: DataTypes.ENUM('да', 'нет'), allowNull: false, defaultValue: 'нет'},
    order_number: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.ENUM('В разработке', 'Готов', 'Не актуален'), defaultValue: 'В разработке'},
})

const Tests = sequelize.define('Tests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    passing_percentage: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.ENUM('В разработке', 'Готов', 'Не актуален'), defaultValue: 'В разработке'},
})

const Questions = sequelize.define('Questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT, allowNull: false},
    type: {
        type: DataTypes.ENUM('single', 'multiple', 'text'),
        allowNull: false,
        defaultValue: 'single'
    }
})

const Answers = sequelize.define('Answers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT, allowNull: false},
    is_correct: {type: DataTypes.BOOLEAN, allowNull: false},
})

const UserProgress = sequelize.define('UserProgress', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    completed: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const CourseReview = sequelize.define('CourseReview', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT},
    rating: {type: DataTypes.INTEGER},
    review_date: {type: DataTypes.DATE, allowNull: false},
})

const Payment = sequelize.define('Payment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    status: {type: DataTypes.ENUM('Успешна', 'Не прошла', 'Возврат'), allowNull: false},
    payment_date: {type: DataTypes.DATE, allowNull: false},
})

const Courses_Users = sequelize.define('Courses_Users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lessons_completed: { type:DataTypes.INTEGER, defaultValue: 0 },
    enrollment_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false},
    expiration_date: {type: DataTypes.DATE},
    completed: {type: DataTypes.BOOLEAN, defaultValue: false},
})



Users.hasMany(Courses, { as: 'CreatedCourses', foreignKey: 'creator_id' })
Courses.belongsTo(Users, { as: 'Creator', foreignKey: 'creator_id' })

Courses.hasMany(Lessons, { foreignKey: 'course_id', onDelete: 'CASCADE' })
Lessons.belongsTo(Courses, { foreignKey: 'course_id' })

Lessons.hasOne(Tests, { foreignKey: 'lesson_id', onDelete: 'CASCADE' })
Tests.belongsTo(Lessons, { foreignKey: 'lesson_id' })

Tests.hasMany(Questions, { foreignKey: 'test_id', onDelete: 'CASCADE' })
Questions.belongsTo(Tests, { foreignKey: 'test_id' })

Questions.hasMany(Answers, { foreignKey: 'question_id', onDelete: 'CASCADE' })
Answers.belongsTo(Questions, { foreignKey: 'question_id' })

Courses_Users.belongsTo(Courses, { foreignKey: 'course_id' })
Courses_Users.belongsTo(Users, { foreignKey: 'user_id' })

Users.belongsToMany(Lessons, {
  through: UserProgress,
  as: 'LessonProgress',
  foreignKey: 'user_id',
  otherKey: 'lesson_id'
})
Lessons.belongsToMany(Users, {
  through: UserProgress,
  as: 'ProgressUsers',
  foreignKey: 'lesson_id',
  otherKey: 'user_id'
})

Users.belongsToMany(Courses, {
  through: Courses_Users,
  as: 'EnrolledCourses',
  foreignKey: 'user_id',
  otherKey: 'course_id'
})
Courses.belongsToMany(Users, {
  through: Courses_Users,
  as: 'EnrolledUsers',
  foreignKey: 'course_id',
  otherKey: 'user_id'
})

Users.belongsToMany(Courses, {
  through: CourseReview,
  as: 'ReviewedCourses',
  foreignKey: 'user_id',
  otherKey: 'course_id'
})
Courses.belongsToMany(Users, {
  through: CourseReview,
  as: 'CourseReviews',
  foreignKey: 'course_id',
  otherKey: 'user_id'
})

Users.belongsToMany(Courses, {
  through: Payment,
  as: 'PaidCourses',
  foreignKey: 'user_id',
  otherKey: 'course_id'
})
Courses.belongsToMany(Users, {
  through: Payment,
  as: 'CoursePayments',
  foreignKey: 'course_id',
  otherKey: 'user_id'
})

module.exports = {
  Users,
  Courses,
  Lessons,
  Tests,
  Questions,
  Answers,
  Payment,
  Courses_Users,
  UserProgress,
  CourseReview,
}