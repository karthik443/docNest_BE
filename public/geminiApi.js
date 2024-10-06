// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './config.json'  assert { type: 'json' };
const genAI = new GoogleGenerativeAI(config.geminiApi_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let reqData= `The context is given below. please go through this carefully
•
Energetic and skilled fresher web developer with expertise in Backend development. Proficient in data structures and
algorithms and Object-oriented programming along with knowledge in Linux OS
Education
University college of engineering, Osmania University
2019 - 2023
CGPA: 8.23
Bachelor of Engineering in Computer Science
Sri Gayatri Junior college
2017 - 2019
Percentage : 96.6
Board of Intermediate Education, Telangana
Telangana State model school
2016 - 2017
CGPA: 9.7
Board of Secondary Education, Telangana
Technical Skills
Languages frameworks: Java, C,C++, Express.js, Node.js,Bash
Databases: Oracle SQL, MongoDb
Operating Systems: Linux , Windows
Others:: Data structures and algorithms, OOPs, MVC architecture, Authorisation and Authentication, Knowledge on AWS
resources
Projects
E-commerce Website | Express.js, MongoDB, Node.js, Authentication and authorization, Rest APIs
November 2023
• developed a shop web application where user can view products and have to sign up and login to order the items in the
shop. user can add products to cart and order them. Only admins have the right to add products to the page and edit
the page.
• the shop data is added in Mongodb database using node.js for interacting with server side-logic. Restful apis are used
interact with data for enhanced communication of data and improved decoupling
• Added pagination, serverside validation, protected from csrf attacks by adding tokens, used session for checking
authentication, and passwords are protected using hashing technique
• The whole project is designed in MVC architecture and dynamic pages are loaded using ejs tempating enige.Stripe is
used for payment services
OOP ATM Application in Java | Java, OOPs
November 2022
• Developed an object-oriented ATM program with robust security features. Account Manager verifies login credentials,
enabling secure access for customers to withdraw funds or check account balances
• Implemented a detailed plan ensuring data security and accuracy. Validated the software system thoroughly,
guaranteeing a seamless and secure banking experience for users.
Experience
Bharat Electronics Limited
May 2022 – August 2022
Research Intern
• Developed a Receiver Autonomous Integrity Monitoring (RAIM) method for GNSS receivers, ensuring the accuracy and
reliability of GPS positioning.
• Implemented efficient C and C++ code optimized for low memory usage and high-speed processing.
• Achieved 91 accuracy rate in analyzing and interpreting research results, demonstrating strong analytical skills.
• Generated original ideas and continuously improved the RAIM method, contributing to advancements in navigation
technology.
Achievements
• Achieved the honor for Best Major Project [Kilambi Srinivas and Babu Chilkuri Award] in UCEOU Computer Science
department among over 40 submitted projects.
• Awarded merit scholarship ’FFE’ for securing 1206 rank in TSEAMCET`

let ques=` based only on the given information provided by me. can you rate the resume of this pirticular candidate .its ciritical that dont use your imagination give me accurate results and can you change this to make this resume 5 out of 5`
const prompt = reqData+ques;

const result = await model.generateContent(prompt);
console.log(result.response.text());