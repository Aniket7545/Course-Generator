

// "use client"
// import { db } from '@/configs/db';
// import { Chapters, CourseList } from '@/configs/schema'
// import { useUser } from '@clerk/nextjs';
// import { and, eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react'
// import CourseBasicInfo from './_components/CourseBasicInfo';
// import CourseDetail from './_components/CourseDetail';
// import ChapterList from './_components/ChapterList';
// import { Button } from '@/components/ui/button';
// import { GenerateChapterContent_AI } from '@/configs/AiModel';
// import LoadingDialog from '../_components/LoadingDialog';
// import service from '@/configs/service';
// import { useRouter } from 'next/navigation';

// function CourseLayout({params}) {
//   const {user} = useUser();
//   const [course, setCourse] = useState();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
  
//   useEffect(() => {
//     params && GetCourse();
//   }, [params, user])

//   const GetCourse = async () => {
//     try {
//       const result = await db.select().from(CourseList)
//         .where(and(
//           eq(CourseList.courseId, params?.courseId),
//           eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
//         ))
//       setCourse(result[0]);
//       console.log("Fetched course:", result[0]);
//     } catch (error) {
//       console.error("Error fetching course:", error);
//     }
//   }
  
//   const GenerateChapterContent = async () => {
//     setLoading(true);
//     const chapters = course?.courseOutput?.Course?.Chapters;
    
//     for (let index = 0; index < chapters.length; index++) {
//       const Chapter = chapters[index];
//       const PROMPT = `Explain the concept in Detail On Topic: ${course?.name}, Chapter: ${Chapter?.Name}, in JSON Format with field as title, description in detail, Code Example (Code field in <precode> format) if applicable`;
  
//       try {
//         // Await the video fetching response
//         const videoResponse = await service.getVideos(course?.name + ':' + Chapter?.Name);
//         const videoId = videoResponse[0]?.id?.videoId || '';
  
//         // Generate Chapter Content
//         const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
//         const content = JSON.parse(result?.response?.text());
  
//         // Save Chapter Content + Video URL to the database
//         await db.insert(Chapters).values({
//           courseId: course?.courseId,  // Use courseId from schema
//           chapterId: index,  // Index is used as chapterId
//           content: content,
//           videoId: videoId
//         });
  
//         console.log(`Saved chapter ${index + 1} with videoId: ${videoId}`);
//       } catch (e) {
//         console.error("Error generating or saving chapter content:", e);
//       }
//     }
  
//     await db.update(CourseList).set({ publish: true });
//     setLoading(false);
//     router.replace('/create-course/' + course?.courseId + "/finish");
//   };
  
  
  

//   return (
//     <div className='mt-10 px-7 md:px-20 lg:px-44'>
//       <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
      
//       <LoadingDialog loading={loading}/>
      
//       {/* Basic Info */}
//       <CourseBasicInfo course={course} refreshData={GetCourse} />
      
//       {/* Course Detail */}
//       <CourseDetail course={course} />
      
//       {/* List Of Lesson */}
//       <ChapterList course={course} refreshData={GetCourse}/>
      
//       <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>
//     </div>
//   )
// }

// export default CourseLayout

"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({params}) {
  const {user} = useUser();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    params && GetCourse();
  }, [params, user])

  const GetCourse = async () => {
    try {
      const result = await db.select().from(CourseList)
        .where(and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        ))
      setCourse(result[0]);
      console.log("Fetched course:", result[0]);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }
  
  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Course?.Chapters;
    
    try {
      // First, delete any existing chapters for this course
      await db.delete(Chapters).where(eq(Chapters.courseId, course?.courseId));
      console.log("Deleted existing chapters for course:", course?.courseId);
  
      for (let index = 0; index < chapters.length; index++) {
        const Chapter = chapters[index];
        const PROMPT = `Explain the concept in Detail On Topic: ${course?.name}, Chapter: ${Chapter?.Name}, in JSON Format with field as title, description in detail, Code Example(HTML Code format) if applicable`;
        console.log("Generating content for chapter:", index, Chapter?.Name);
  
        // Generate Video URL
        let videoId = '';
        try {
          const videoResponse = await service.getVideos(`${course?.name}:${Chapter?.Name}`);
          console.log('YouTube API Response:', videoResponse);
          if (videoResponse && videoResponse.length > 0 && videoResponse[0].id) {
            videoId = videoResponse[0].id.videoId;
            console.log(`Video ID for chapter ${index + 1}:`, videoId);
          } else {
            console.warn(`No video found for chapter ${index + 1}`);
          }
        } catch (error) {
          console.error("Error fetching video:", error);
        }
  
        // Generate Chapter Content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        console.log("AI response:", result.response?.text());
        
        let content;
        try {
          content = JSON.parse(result.response?.text());
        } catch (parseError) {
          console.error(`Error parsing JSON for chapter ${index}:`, parseError);
          content = {
            title: `Chapter ${index + 1}`,
            description: "Error generating content. Please try again.",
            codeExample: ""
          };
        }
  
        // Save Chapter Content + Video URL
        try {
          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: JSON.stringify(content),  // Ensure content is stringified
            videoId: videoId
          });
          console.log(`Chapter ${index} inserted successfully`);
        } catch (error) {
          console.error(`Error inserting chapter ${index}:`, error);
        }
      }
  
      // Update course as published
      await db.update(CourseList).set({
        publish: true
      }).where(eq(CourseList.courseId, course?.courseId));
  
      setLoading(false);
      router.replace('/dashboard');
    } catch (e) {
      setLoading(false);
      console.error("Error in GenerateChapterContent:", e);
    }

  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
      
      <LoadingDialog loading={loading}/>
      
      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={GetCourse} />
      
      {/* Course Detail */}
      <CourseDetail course={course} />
      
      {/* List Of Lesson */}
      <ChapterList course={course} refreshData={GetCourse}/>
      
      <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout