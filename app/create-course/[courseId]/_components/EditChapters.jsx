import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditChapters({ course, index,refreshData }) {
  const Chapters = course?.courseOutput?.Course?.Chapters;

  const [Name, setName] = useState();
  const [About, setAbout] = useState();

  useEffect(() => {
    if (Chapters && Chapters[index]) {
      setName(Chapters[index].Name);
      setAbout(Chapters[index].About);
    }
  }, [index, Chapters]); // specify dependencies
  

  const onUpdateHandler = async() => {
    course.courseOutput.Course.Chapters[index].Name=Name;
    course.courseOutput.Course.Chapters[index].About=About;
    const result=await db.update(CourseList).set({
      courseOutput:course?.courseOutput
  }).where(eq(CourseList?.id,course?.id))
  .returning({id:CourseList.id});
  await refreshData()
}


  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={Chapters[index].Name}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <Textarea
                className="h-40"
                defaultValue={Chapters[index].About}
                onChange={(event) => setAbout(event?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
