import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'



function FinishScreen() {
    const {user}=useUser()
    const [course,setCourse]=useState([]);
    const router=useRouter();

    useEffect(()=>{
     params&&GetCourse();
},[params,user])
const GetCourse=async()=>{
  const result=await db.select().from(CourseList)
  .where(and(eq(CourseList.courseId,params?.courseId),
  eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress)))
   
   setCourse(result[0]);
  console.log(result);
}
  return (
    <div clas> 

    </div>
  )
}

export default FinishScreen