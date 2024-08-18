const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
// POST /admin/signup
// Description: Creates a new admin account.
// Input Body: { username: 'admin', password: 'pass' }
// Output: { message: 'Admin created successfully' }
// - POST /admin/courses
// Description: Creates a new course.
// Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
// Output: { message: 'Course created successfully', courseId: "new course id" }
// - GET /admin/courses
// Description: Returns all the courses.
// Input: Headers: { 'username': 'username', 'password': 'password' }
// Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

// // Admin Routes
router.post('/signup',async (req, res) => {
    const name=req.body.username;
    const pass=req.body.password;
    await Admin.create({
        username:name,
        password:pass
    });
    res.json({message: 'Admin created successfully'});
    // Implement admin signup logic
 });
// Description: Creates a new course.
// Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
// Output: { message: 'Course created successfully', courseId: "new course id" }
// - GET /admin/courses
// Description: Returns all the courses.
// Input: Headers: { 'username': 'username', 'password': 'password' }
// Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }


router.post('/courses', adminMiddleware, async(req, res) => {
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const newcourse=await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink

    })
    res.json({
        message: 'Course created successfully'
    })

    // Implement course creation logic
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const response = await Course.find({});

    res.json({
        courses: response
    })


    // Implement fetching all courses logic
});

module.exports = router;