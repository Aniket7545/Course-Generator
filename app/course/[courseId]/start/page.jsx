"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React ,{useEffect,useState} from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapContent from './_components/ChapContent'


function CourseStart({params}) {

const [course,setCourse]=useState();
const [selectedChapter,setSelectedChapter]=useState();
const [chapterContent,setChapterContent]=useState();
useEffect(()=>{
    GetCourse();
},[])

/*
Used to get Course Info by Couse Id
*/
const GetCourse=async()=>{
    const result=await db.select().from(CourseList)
    .where(eq(CourseList?.courseId,params?.courseId));
    setCourse(result[0]);
    GetSelectedChapterContent[0];
}
 const GetSelectedChapterContent=async(chapterId)=>{
     const result=await db.select().from(Chapters)
     .where(and(eq(Chapters?.chapterId,chapterId),
    eq(Chapters.courseId,course?.courseId)));

    setChapterContent(result[0]);
    console.log(result);
 }


  return (
    <div>
        {/* Chapter List Side Bar  */}
        <div className='fixed md:w-64 hidden md:block h-screen border-r shadow-sm'>
              <h2 className='font-medium text-lg bg-primary p-4
              text-white'>{course?.courseOutput?.Course?.Name}</h2>
              <div>
                {course?.courseOutput?.Course?.Chapters.map((chapter,index)=>(
                    <div key={index} 
                    className={`cursor-pointer 
                    hover:bg-purple-50
                    ${selectedChapter?.Name == chapter?.Name && 'bg-purple-100'}
                    `}
                    onClick={() => {setSelectedChapter(chapter)
                             GetSelectedChapterContent(index)
                    }}
                  >
                    <ChapterListCard chapter={chapter} index={index}/>
                  </div>
                ))}
              </div>
        </div>
        {/* Content Div  */}
        <div className='md:ml-64'>
          <ChapContent chapter={selectedChapter}
          content={chapterContent}
          />
        </div>

    </div>
  )
}

export default CourseStart


  