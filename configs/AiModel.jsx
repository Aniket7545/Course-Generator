/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial On Following Detail With field as Course Name,Description, Along with Chapter Name,about,Duration:Category:'Programming',\nTopic:Python,Level:Basic,Duration:1 hours, NoOfChapters:5,in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Course\": {\n    \"Name\": \"Python Programming Fundamentals\",\n    \"Description\": \"This course provides a comprehensive introduction to the Python programming language, covering the fundamentals of syntax, data types, control flow, functions, and modules. You will learn how to write basic Python programs and gain a solid foundation for further exploration of the language.\",\n    \"Chapters\": [\n      {\n        \"Name\": \"Introduction to Python\",\n        \"About\": \"This chapter introduces the Python programming language, its history, and its applications. You will learn how to set up your Python environment and execute basic Python code.\",\n        \"Duration\": \"15 minutes\"\n      },\n      {\n        \"Name\": \"Data Types and Variables\",\n        \"About\": \"This chapter covers fundamental data types in Python, such as integers, floats, strings, and booleans. You will learn how to declare variables, assign values, and perform basic operations on data.\",\n        \"Duration\": \"20 minutes\"\n      },\n      {\n        \"Name\": \"Control Flow\",\n        \"About\": \"This chapter explores control flow statements in Python, including conditional statements (if, elif, else) and loops (for, while). You will learn how to write programs that execute different blocks of code based on conditions and iterate over collections of data.\",\n        \"Duration\": \"25 minutes\"\n      },\n      {\n        \"Name\": \"Functions\",\n        \"About\": \"This chapter introduces functions in Python, which allow you to modularize your code and reuse blocks of functionality. You will learn how to define functions, pass arguments, and return values.\",\n        \"Duration\": \"20 minutes\"\n      },\n      {\n        \"Name\": \"Modules and Libraries\",\n        \"About\": \"This chapter explores modules and libraries in Python, which provide pre-written code for various tasks. You will learn how to import modules, access functions and classes, and utilize popular libraries such as NumPy, Pandas, and Matplotlib.\",\n        \"Duration\": \"20 minutes\"\n      }\n    ],\n    \"Level\": \"Basic\",\n    \"Duration\": \"1 hour\",\n    \"Category\": \"Programming\",\n    \"Topic\": \"Python\",\n    \"NoOfChapters\": 5\n  }\n}\n```"},
          ],
        },
      ],
    });

    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial On Following Detail With field as Course Name,Description, Along with Chapter Name,about,Duration:Category:'Programming',\nTopic:Python,Level:Basic,Duration:1 hours, NoOfChapters:5,in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Course\": {\n    \"Name\": \"Python Programming Fundamentals\",\n    \"Description\": \"This course provides a comprehensive introduction to the Python programming language, covering the fundamentals of syntax, data types, control flow, functions, and modules. You will learn how to write basic Python programs and gain a solid foundation for further exploration of the language.\",\n    \"Chapters\": [\n      {\n        \"Name\": \"Introduction to Python\",\n        \"About\": \"This chapter introduces the Python programming language, its history, and its applications. You will learn how to set up your Python environment and execute basic Python code.\",\n        \"Duration\": \"15 minutes\"\n      },\n      {\n        \"Name\": \"Data Types and Variables\",\n        \"About\": \"This chapter covers fundamental data types in Python, such as integers, floats, strings, and booleans. You will learn how to declare variables, assign values, and perform basic operations on data.\",\n        \"Duration\": \"20 minutes\"\n      },\n      {\n        \"Name\": \"Control Flow\",\n        \"About\": \"This chapter explores control flow statements in Python, including conditional statements (if, elif, else) and loops (for, while). You will learn how to write programs that execute different blocks of code based on conditions and iterate over collections of data.\",\n        \"Duration\": \"25 minutes\"\n      },\n      {\n        \"Name\": \"Functions\",\n        \"About\": \"This chapter introduces functions in Python, which allow you to modularize your code and reuse blocks of functionality. You will learn how to define functions, pass arguments, and return values.\",\n        \"Duration\": \"20 minutes\"\n      },\n      {\n        \"Name\": \"Modules and Libraries\",\n        \"About\": \"This chapter explores modules and libraries in Python, which provide pre-written code for various tasks. You will learn how to import modules, access functions and classes, and utilize popular libraries such as NumPy, Pandas, and Matplotlib.\",\n        \"Duration\": \"20 minutes\"\n      }\n    ],\n    \"Level\": \"Basic\",\n    \"Duration\": \"1 hour\",\n    \"Category\": \"Programming\",\n    \"Topic\": \"Python\",\n    \"NoOfChapters\": 5\n  }\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail On Topic:Python Basic,Chapter:Variables and Data Types, in JSON Format with field as title, explanation on given chapter in detail,Code Example(Code field in <precode> format)if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Chapter\": {\n    \"Title\": \"Variables and Data Types in Python\",\n    \"Explanation\": \"In Python, variables act as containers for storing data. They are essentially labels or names assigned to data values. Data types define the kind of information a variable can hold, such as numbers, text, or logical values. Understanding variables and data types is crucial for writing meaningful Python programs.\",\n    \"Details\": {\n      \"Variables\": {\n        \"Definition\": \"A variable is a named location in memory where a program can store and retrieve data.\",\n        \"Declaration\": \"In Python, you don't explicitly declare a variable's data type. You simply assign a value to a name using the assignment operator (=).\",\n        \"Example\": \"```python\\nmy_name = \\\"Alice\\\"\\nage = 25\\n```\",\n        \"Naming Conventions\": \"Variable names should be descriptive, use lowercase letters and underscores to separate words, and avoid using reserved keywords.\"\n      },\n      \"Data Types\": {\n        \"Overview\": \"Python provides built-in data types to represent various kinds of data. Some common data types include:\",\n        \"Integers (int)\": \"Represent whole numbers without decimal points. Example: `age = 25`\",\n        \"Floating-Point Numbers (float)\": \"Represent numbers with decimal points. Example: `price = 19.99`\",\n        \"Strings (str)\": \"Represent sequences of characters enclosed in single or double quotes. Example: `greeting = \\\"Hello, world!\\\"\"`,\n        \"Booleans (bool)\": \"Represent logical values, either True or False. Example: `is_active = True`\",\n        \"Lists (list)\": \"Ordered collections of items enclosed in square brackets. Example: `colors = [\\\"red\\\", \\\"green\\\", \\\"blue\\\"]`\",\n        \"Tuples (tuple)\": \"Similar to lists but immutable (values cannot be changed after creation). Example: `coordinates = (10, 20)`\",\n        \"Dictionaries (dict)\": \"Unordered collections of key-value pairs enclosed in curly braces. Example: `person = {\\\"name\\\": \\\"Bob\\\", \\\"age\\\": 30}`\"\n      },\n      \"Data Type Conversion\": {\n        \"Explanation\": \"Sometimes, you might need to convert data from one type to another. Python provides functions like `int()`, `float()`, and `str()` for type conversion.\",\n        \"Example\": \"```python\\nnumber_str = \\\"10\\\"\\nnumber_int = int(number_str)\\n```\"\n      }\n    },\n    \"Code Example\": \"<precode>name = \\\"John\\\"\\nage = 30\\nis_student = True\\nprint(name)\\nprint(age)\\nprint(is_student)\\n\\n# Data Type Conversion\\nnumber_str = \\\"25\\\"\\nnumber_int = int(number_str)\\nprint(number_int)\\n</precode>\"\n  }\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  