import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
  

function EditCourseBasicInfo({course,refreshData}) {

    const [Name, setName] = useState(course?.Name || ''); // Set initial value from 'course' if available
    const [Description, setDescription] = useState(course?.Description || '');

    useEffect(() => {
        if (course && course.courseOutput && course.courseOutput.Course) {
          setName(course.courseOutput.Course.Name || '');
          setDescription(course.courseOutput.Course.Description || '');
        }
      }, [course]);

const onUpdateHandler=async()=>{
    course.courseOutput.Course.Name=Name;
    course.courseOutput.Course.Description=Description;
    const result=await db.update(CourseList).set({
        courseOutput:course?.courseOutput
    }).where(eq(CourseList?.id,course?.id))
    .returning({id:CourseList.id});
    refreshData(true)
}

  return (
    <Dialog>
  <DialogTrigger><HiPencilSquare /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title && Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label>Course Title</label>
            <Input defaultValue={course?.courseOutput?.Course?.Name}
            onChange={(event)=>setName(event?.target.value)}
            />
        </div>
        <div>
            <label>Description</label>
            <Textarea className='h-40' defaultValue={course?.courseOutput?.Course?.Description}
            onChange={(event)=>setDescription(event?.target.value)}
            />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandler}>
                Update
            </Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default EditCourseBasicInfo 